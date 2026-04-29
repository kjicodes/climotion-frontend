import "./Header.css";
import React, { useState } from "react";
import { BoltIcon } from "@heroicons/react/24/solid";

const API_KEY = "66fde14e9066db9af613bcfab9885f1a";

export default function Header({ getWeather }) {
  const [city, setCity] = useState(null);
  const [message, setMessage] = useState(null);

  const searchedCity = (city) => {
    console.log(city);
    setCity(city);
  };

  const getWeatherData = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/weather/?city=${city}&appid=${API_KEY}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        setMessage("Error getting weather for selected city.");
        return;
      }
      const result = await response.json();
      console.log(result);
      getWeather(result);
    } catch {
      setMessage("Error getting weather for selected city.");
    }
  };

  return (
    <div>
      <div className="relative isolate px-6 pt-14 lg:px-8">
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
            <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-2xl">
              Search your city, check the skies, and find out if today calls for fresh air or four walls.
            </p>
            <div className="mt-16 flex items-center justify-start gap-x-4">
              <label htmlFor="city" className="sr-only">
                City Name
              </label>
              <input
                id="city"
                name="city"
                type="email"
                required
                placeholder="Enter city"
                onChange={(evt) => searchedCity(evt.target.value)}
                className="input-field w-80 rounded-3xl bg-white/5 px-5 py-3.5 text-lg text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2"
              />
              <button
                type="submit"
                onClick={() => getWeatherData()}
                className="button-primary flex-none rounded-3xl px-6 py-3.5 text-base font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Get Weather <span className="px-3" aria-hidden="true">&rarr;</span>
              </button>
            </div>
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
