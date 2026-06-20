import "./Header.css";
import React, { useState } from "react";
import { BoltIcon } from "@heroicons/react/24/solid";
import { MapPinIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const API_URL = process.env.REACT_APP_API_URL;

export default function Header({ getWeather }) {
  const [city, setCity] = useState("");
  const [message, setMessage] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const getCitySuggestions = async () => {
    setMessage(null);
    try {
      const response = await fetch(`${API_URL}/searched-cities/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        setMessage("Error getting city suggestions.");
        return;
      }
      const result = await response.json();
      setSuggestions(result.slice(0, 5));
    } catch {
      setMessage("Connection error.");
    }
  };

  const selectCity = (selectedCity) => {
    setCity(selectedCity);
    setShowDropdown(false);
  };

  const getCity = (e) => {
    setCity(e.target.value)
  }

  const getWeatherData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/weather/?city=${city.toLowerCase()}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        setMessage("Now that isn't a real city, is it?");
        return;
      }
      const result = await response.json();
      getWeather(result);
    } catch {
      setMessage("Connection error.");
    }
  };

  return (
    <div>
      <div className="relative isolate px-6 pt-6 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div className="header-blob relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75" />
        </div>
        <div className="mx-auto max-w-2xl py-8">
          <div className="text-start">
            <div className="flex items-center gap-0">
              <h1 className="text-5xl font-bold tracking-tight text-balance text-white sm:text-7xl">
                Your weather. Your workout.
              </h1>
              <div className="bolt-wrapper">
                <BoltIcon className="bolt-shake w-16 h-16 sm:w-24 sm:h-24 text-white" />
              </div>
            </div>
            <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl">
              Search your city, check the skies, and find out if today calls for
              fresh air or four walls.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-start gap-x-4 gap-y-3">
              <label htmlFor="city" className="sr-only">
                City Name
              </label>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  placeholder="Enter city"
                  value={city}
                  autoComplete="off"
                  onChange={(e) => getCity(e)}
                  onFocus={() => { getCitySuggestions(); setShowDropdown(true); }}
                  onBlur={() => setShowDropdown(false)}
                  onKeyDown={(e) => { if (e.key === 'Enter') getWeatherData(); }}
                  className={`input-field w-64 rounded-3xl bg-white/5 pl-10 pr-4 py-2.5 text-base text-white outline-none border border-white/10 placeholder:text-gray-500 ${showDropdown && suggestions.length > 0 ? "input-field-dropdown-open" : ""}`}
                />
                {showDropdown && suggestions.length > 0 && (
                  <ul className="city-dropdown">
                    <li className="city-dropdown-label">Popular Cities</li>
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.id}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => selectCity(suggestion.city_name)}
                        className="city-dropdown-item"
                      >
                        <MapPinIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        {suggestion.city_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                type="submit"
                onClick={() => getWeatherData()}
                className="button-primary flex-none rounded-3xl px-4 py-2.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Get Weather
                <span className="px-3" aria-hidden="true">
                  &rarr;
                </span>
              </button>
            </div>
            {message && <p className="mt-4 text-red-400 text-sm">{message}</p>}
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div className="header-blob relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75" />
        </div>
      </div>
    </div>
  );
}
