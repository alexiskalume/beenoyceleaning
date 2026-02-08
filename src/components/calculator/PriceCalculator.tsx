"use client";

import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Calendar, Building, Zap, ArrowRight, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { debounce } from "lodash";

// Utility to calculate distance in km (Haversine formula)
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180)
}

export default function PriceCalculator() {
    const { t, language } = useLanguage();

    const [area, setArea] = useState(60); // Default 60sqm
    const [propertyType, setPropertyType] = useState<"apartment" | "house" | "office">("apartment");
    const [address, setAddress] = useState("");
    const [serviceReceiver, setServiceReceiver] = useState<"residential" | "commercial">("residential");
    const [serviceLevel, setServiceLevel] = useState<"basic" | "standard" | "premium">("standard");
    const [frequency, setFrequency] = useState<"once" | "weekly" | "biweekly" | "monthly">("biweekly");
    const [estimatedPrice, setEstimatedPrice] = useState(0);
    const [estimatedHours, setEstimatedHours] = useState(0);

    // Distance Logic
    const [distance, setDistance] = useState<number | null>(null);
    const [distanceFee, setDistanceFee] = useState(0);
    const [isCalculatingDistance, setIsCalculatingDistance] = useState(false);
    const [addressError, setAddressError] = useState(false);

    // Geolocation Logic
    const [isLocating, setIsLocating] = useState(false);
    const [locationError, setLocationError] = useState(false);
    const [countryError, setCountryError] = useState(false);

    // Autocomplete Logic
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Constants
    const RATES = {
        residential: {
            basic: 45,
            standard: 55,
            premium: 65,
        },
        commercial: {
            basic: 40,
            standard: 50,
            premium: 60,
        }
    };

    const DISCOUNTS = {
        once: 1.0,
        weekly: 0.85,
        biweekly: 0.90,
        monthly: 0.95,
    };

    const SPEED_FACTOR = 25; // m2 per hour
    const BASE_HOURS = 1; // Minimum set up time

    // Office Location: Santaradantie 7, 01370 Vantaa
    const OFFICE_COORDS = { lat: 60.293358, lon: 25.037989 };
    const FREE_DISTANCE_KM = 10;
    const FEE_PER_KM = 0.50; // Euro per extra km

    // Handle Geolocation
    const handleLocateMe = () => {
        if (!navigator.geolocation) {
            setLocationError(true);
            return;
        }

        setIsLocating(true);
        setLocationError(false);
        setCountryError(false);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    // Add addressdetails=1 to get country info
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`);
                    const data = await response.json();

                    if (data && data.address) {
                        const country = data.address.country;
                        if (country !== "Finland" && country !== "Suomi") {
                            setCountryError(true);
                            setAddress(data.display_name); // Still show address? Or clear? Showing it helps user understand.
                            setDistance(null);
                            setDistanceFee(0);
                        } else {
                            setAddress(data.display_name);
                            // Trigger distance check (will happen via effect)
                        }
                    } else {
                        setLocationError(true);
                    }
                } catch (error) {
                    console.error("Reverse geocoding error:", error);
                    setLocationError(true);
                } finally {
                    setIsLocating(false);
                }
            },
            (error) => {
                console.error("Geolocation error:", error);
                setLocationError(true);
                setIsLocating(false);
            }
        );
    };

    // Debounced Suggestions Fetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchSuggestions = useCallback(
        debounce(async (query: string) => {
            if (!query || query.length < 3) return;

            try {
                // Add addressdetails=1 and countrycodes=fi to prioritize/filter Finland if desired, 
                // but relying on validation is safer. Just getting suggestions here.
                // Prioritize Finland result with viewbox or countrycodes if API supports, 
                // but standard search is fine as we validate country later.
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`);
                const data = await response.json();

                if (data && Array.isArray(data)) {
                    setSuggestions(data.map((item: any) => item.display_name));
                    setShowSuggestions(true);
                }
            } catch (error) {
                console.error("Suggestion fetch error:", error);
            }
        }, 300),
        []
    );

    // Debounced Geocoding
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const checkDistance = useCallback(
        debounce(async (addr: string) => {
            if (!addr || addr.length < 5) {
                setDistance(null);
                setDistanceFee(0);
                setAddressError(false);
                setCountryError(false);
                return;
            }

            setIsCalculatingDistance(true);
            setAddressError(false);
            setCountryError(false);

            try {
                // Add addressdetails=1 to get country info
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addr)}&addressdetails=1`);
                const data = await response.json();

                if (data && data.length > 0) {
                    const country = data[0].address.country;

                    if (country !== "Finland" && country !== "Suomi") {
                        setCountryError(true);
                        setDistance(null);
                        setDistanceFee(0);
                    } else {
                        const lat = parseFloat(data[0].lat);
                        const lon = parseFloat(data[0].lon);
                        const dist = getDistanceFromLatLonInKm(OFFICE_COORDS.lat, OFFICE_COORDS.lon, lat, lon);

                        setDistance(dist);

                        if (dist > FREE_DISTANCE_KM) {
                            const extraKm = Math.ceil(dist - FREE_DISTANCE_KM);
                            setDistanceFee(extraKm * FEE_PER_KM);
                        } else {
                            setDistanceFee(0);
                        }
                    }
                } else {
                    setAddressError(true);
                    setDistance(null);
                    setDistanceFee(0);
                }
            } catch (error) {
                console.error("Geocoding error:", error);
                setAddressError(true);
            } finally {
                setIsCalculatingDistance(false);
            }
        }, 1000),
        []
    );

    useEffect(() => {
        checkDistance(address);
    }, [address, checkDistance]);

    useEffect(() => {
        // 0. Determine Service Receiver based on Property Type
        if (propertyType === 'office') {
            setServiceReceiver('commercial');
        } else {
            setServiceReceiver('residential');
        }
    }, [propertyType]);

    useEffect(() => {
        // 1. Calculate base hours
        let hours = BASE_HOURS + (area / SPEED_FACTOR);

        // Adjust hours based on service level (deeper cleaning takes longer)
        if (serviceLevel === "premium") hours *= 1.2;
        if (serviceLevel === "basic") hours *= 0.9;

        // Round to nearest 0.5
        hours = Math.max(2, Math.round(hours * 2) / 2); // Minimum 2 hours

        // 2. Calculate Price
        const rate = RATES[serviceReceiver][serviceLevel];
        const discount = DISCOUNTS[frequency];
        let price = hours * rate * discount;

        // Add travel fee
        price += distanceFee;

        setEstimatedHours(hours);
        setEstimatedPrice(Math.round(price));
    }, [area, serviceReceiver, serviceLevel, frequency, propertyType, distanceFee]);

    return (
        <div className="grid md:grid-cols-2 gap-8 items-start">
            <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-primary" />
                        {t.calculator.title}
                    </CardTitle>
                    <CardDescription>{t.calculator.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">

                    {/* Property Type */}
                    <div className="space-y-3">
                        <Label className="text-base font-semibold">{t.calculator.propertyTypeLabel}</Label>
                        <div className="grid grid-cols-3 gap-3">
                            {(["apartment", "house", "office"] as const).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setPropertyType(type)}
                                    className={cn(
                                        "flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200",
                                        propertyType === type
                                            ? "border-primary bg-primary/5 text-primary"
                                            : "border-border hover:border-primary/50 text-muted-foreground"
                                    )}
                                >
                                    <Building className={cn("w-6 h-6 mb-2", propertyType === type ? "text-primary" : "opacity-50")} />
                                    <span className="text-sm font-medium">{t.calculator.propertyType[type]}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <Label className="text-base font-semibold">{t.calculator.addressLabel}</Label>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs text-primary hover:text-primary/80"
                                onClick={handleLocateMe}
                                disabled={isLocating}
                            >
                                {isLocating ? (
                                    <>
                                        <span className="animate-spin mr-1 h-3 w-3 border-2 border-primary border-t-transparent rounded-full" />
                                        {t.calculator.result.locating}
                                    </>
                                ) : (
                                    <>
                                        <MapPin className="w-3 h-3 mr-1" />
                                        {t.calculator.result.locateMe}
                                    </>
                                )}
                            </Button>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder={t.calculator.addressPlaceholder}
                                className={cn(
                                    "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                                    (addressError || locationError || countryError) ? "border-red-500 focus-visible:ring-red-500" : "border-input"
                                )}
                                value={address}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setAddress(val);
                                    if (val.length > 3) {
                                        fetchSuggestions(val);
                                    } else {
                                        setSuggestions([]);
                                        setShowSuggestions(false);
                                    }
                                }}
                                onFocus={() => {
                                    if (suggestions.length > 0) setShowSuggestions(true);
                                }}
                                onBlur={() => {
                                    // Delay hide to allow click
                                    setTimeout(() => setShowSuggestions(false), 200);
                                }}
                            />
                            <div className="absolute right-3 top-2.5 pointer-events-none">
                                {isCalculatingDistance ? (
                                    <span className="animate-spin block w-4 h-4 border-2 border-primary border-t-transparent rounded-full" />
                                ) : (
                                    <Building className={cn("w-4 h-4", (addressError || locationError || countryError) ? "text-red-500" : "text-muted-foreground opacity-50")} />
                                )}
                            </div>

                            {/* Autocomplete Dropdown */}
                            {showSuggestions && suggestions.length > 0 && (
                                <ul className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto">
                                    {suggestions.map((suggestion, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 hover:bg-muted cursor-pointer text-sm"
                                            onClick={() => {
                                                setAddress(suggestion);
                                                setSuggestions([]);
                                                setShowSuggestions(false);
                                                // Trigger validation check immediately
                                                checkDistance(suggestion);
                                            }}
                                        >
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        {(addressError || locationError || countryError) && (
                            <p className="text-xs text-red-500">
                                {countryError ? t.calculator.result.countryError : (locationError ? t.calculator.result.locationError : t.calculator.result.addressError)}
                            </p>
                        )}
                        {distance !== null && !addressError && !locationError && !countryError && (
                            <p className="text-xs text-green-600 font-medium">
                                {t.calculator.result.distance}: {distance.toFixed(1)} km
                                {distanceFee > 0 ? ` (+${distanceFee.toFixed(2)}€)` : ` (${t.calculator.result.travelFeeIncluded})`}
                            </p>
                        )}
                    </div>

                    {/* Area Slider */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label className="text-base font-semibold">{t.calculator.sizeLabel}</Label>
                            <span className="text-xl font-bold text-primary">{area} m²</span>
                        </div>
                        <Slider
                            value={[area]}
                            onValueChange={(vals) => setArea(vals[0])}
                            min={20}
                            max={300}
                            step={5}
                            className="py-4"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>20 m²</span>
                            <span>300+ m²</span>
                        </div>
                    </div>

                    {/* Service Level */}
                    <div className="space-y-3">
                        <Label className="text-base font-semibold">{t.calculator.serviceLevelLabel}</Label>
                        <div className="grid grid-cols-3 gap-3">
                            {(["basic", "standard", "premium"] as const).map((level) => (
                                <button
                                    key={level}
                                    onClick={() => setServiceLevel(level)}
                                    className={cn(
                                        "flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200",
                                        serviceLevel === level
                                            ? "border-primary bg-primary/5 text-primary"
                                            : "border-border hover:border-primary/50 text-muted-foreground"
                                    )}
                                >
                                    <span className="text-sm font-medium capitalize">{t.pricing[level]}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Frequency */}
                    <div className="space-y-3">
                        <Label className="text-base font-semibold">{t.calculator.frequencyLabel}</Label>
                        <Select
                            value={frequency}
                            onValueChange={(val: any) => setFrequency(val)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="once">{t.calculator.frequency.once}</SelectItem>
                                <SelectItem value="weekly">{t.calculator.frequency.weekly}</SelectItem>
                                <SelectItem value="biweekly">{t.calculator.frequency.biweekly}</SelectItem>
                                <SelectItem value="monthly">{t.calculator.frequency.monthly}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                </CardContent>
            </Card>

            {/* Result Card */}
            <Card className="bg-primary text-primary-foreground border-none shadow-xl sticky top-24">
                <CardHeader>
                    <CardTitle className="text-2xl">{t.calculator.result.estimatedPrice}</CardTitle>
                    <CardDescription className="text-primary-foreground/80">
                        {t.calculator.result.disclaimer}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="flex flex-col items-center justify-center py-6 space-y-2">
                        <div className="text-6xl font-bold tracking-tighter">
                            {estimatedPrice}€
                        </div>
                        <div className="text-lg opacity-90 font-medium">
                            {frequency === 'once' ? t.calculator.result.perVisit : t.calculator.result.perMonth}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-md">
                        <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5" />
                            <div>
                                <p className="text-xs opacity-70">{t.calculator.result.duration}</p>
                                <p className="font-semibold">{estimatedHours} {t.calculator.result.hours}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5" />
                            <div>
                                <p className="text-xs opacity-70">{t.pricing[serviceLevel]}</p>
                                <p className="font-semibold capitalize">{serviceLevel}</p>
                            </div>
                        </div>
                        {distanceFee > 0 && (
                            <div className="col-span-2 border-t border-white/20 pt-3 mt-1 flex items-center justify-between">
                                <span className="text-sm opacity-80">{t.calculator.result.travelFee}</span>
                                <span className="font-mono font-bold">+{distanceFee.toFixed(2)}€</span>
                            </div>
                        )}
                    </div>

                    <Button
                        asChild
                        size="lg"
                        variant="secondary"
                        className="w-full font-bold text-primary group"
                    >
                        <Link href="/#contact">
                            {t.calculator.result.bookButton}
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
