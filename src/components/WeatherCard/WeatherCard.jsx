
import { useState } from 'react';
import "./WeatherCard.css";

export default function WeatherCard({ weather, weatherIcon }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-full overflow-hidden">
      {weather && (
        <div className="text-left h-full flex flex-col justify-evenly">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold text-white">{weather.city}</h2>
              <p className="text-white/50 text-sm mt-1">{today}</p>
            </div>
            <p className="text-4xl"><span className="text-xl pr-3">{weather.weather}</span>{weatherIcon}</p>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-5xl font-bold text-white">{weather.temperature}°C</p>
              <p className="text-white/50 text-sm mt-2">Feels like {weather.feels_like}°C</p>
            </div>
            <p className="text-white/60 text-sm">H: {weather.high}°C / L: {weather.low}°C</p>
          </div>
          <div>
            <hr className="border-white/10 mb-3" />
            <p className="text-sm font-semibold" style={{ color: '#E6F082' }}>
              {weather.description}
            </p>
          </div>
        </div>
      )}
    </div>
    
  );
}
