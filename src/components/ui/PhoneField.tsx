"use client";

import { useState, useRef, useEffect } from "react";
import { countries, Country } from "@/constants/countries";
import { FaChevronDown } from "react-icons/fa";

interface PhoneFieldProps {
  label: string;
  phoneName: string;
  countryName: string;
  phoneValue: string;
  countryValue: string;
  updateField: (name: string, value: string) => void;
  required?: boolean;
  className?: string;
}

const PhoneField = ({
  label,
  phoneName,
  countryName,
  phoneValue,
  countryValue,
  updateField,
  required = false,
  className = "",
}: PhoneFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCountry =
    countries.find((c) => c.dialCode === countryValue) || countries[0];

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.dialCode.includes(search)
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCountrySelect = (country: Country) => {
    updateField(countryName, country.dialCode);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-text-primary font-medium mb-2">{label}</span>
      <div className="flex gap-2 relative" ref={dropdownRef}>
        {/* Country Selector Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-bg shadow-inner py-4 px-4 text-text-primary rounded-lg border border-border hover:border-text-muted transition-all min-w-[100px] justify-between"
        >
          <span className="flex items-center gap-2 text-lg">
            <span>{selectedCountry.flag}</span>
            <span className="text-sm font-medium">{selectedCountry.dialCode}</span>
          </span>
          <FaChevronDown className="text-xs text-text-muted" />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-[calc(100%+8px)] left-0 w-[280px] bg-surface-alt border border-border rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col">
            <div className="p-3 border-b border-border bg-surface">
              <input
                type="text"
                placeholder="Search country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-text-muted"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <ul className="max-h-[250px] overflow-y-auto">
              {filteredCountries.map((country) => (
                <li
                  key={country.code}
                  onClick={() => handleCountrySelect(country)}
                  className={`px-4 py-3 cursor-pointer hover:bg-bg flex items-center justify-between text-sm transition-colors ${
                    selectedCountry.code === country.code ? "bg-bg text-white" : "text-text-secondary"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg">{country.flag}</span>
                    <span>{country.name}</span>
                  </span>
                  <span className="text-text-muted">{country.dialCode}</span>
                </li>
              ))}
              {filteredCountries.length === 0 && (
                <li className="px-4 py-3 text-sm text-text-muted text-center">
                  No countries found.
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Phone Number Input (Floating Label inside) */}
        <div className="relative flex-1">
          <input
            id={phoneName}
            type="tel"
            name={phoneName}
            value={phoneValue}
            onChange={(e) => updateField(phoneName, e.target.value)}
            required={required}
            placeholder="Phone Number"
            className="peer bg-bg shadow-inner pt-7 pb-2 px-4 text-text-primary rounded-lg outline-none border border-border focus:border-text-muted focus:ring-1 focus:ring-text-muted transition-all font-medium w-full placeholder-transparent h-full"
          />
          <label
            htmlFor={phoneName}
            className="absolute text-sm text-text-secondary duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-white pointer-events-none"
          >
            Phone Number
          </label>
        </div>
      </div>
    </div>
  );
};

export default PhoneField;
