import { useState, useRef, useEffect } from "react";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import Workout from "../../components/Workout/Workout";
import Footer from "../../components/Footer/Footer";
import "./HomePage.css";
import { FaArrowDown } from "react-icons/fa";

const weatherThemes = {
  Clear: {
    gradient: "linear-gradient(135deg, #f59e0b 0%, #fb923c 40%, #fde68a 100%)",
    icon: "☀️",
  },
  Clouds: {
    gradient: "linear-gradient(135deg, #374151 0%, #6b7280 50%, #9ca3af 100%)",
    icon: "☁️",
  },
  Rain: {
    gradient: "linear-gradient(135deg, #0f2027 0%, #1e3a5f 40%, #2563eb 100%)",
    icon: "🌧️",
  },
  Drizzle: {
    gradient: "linear-gradient(135deg, #334155 0%, #3b82f6 50%, #60a5fa 100%)",
    icon: "🌦️",
  },
  Thunderstorm: {
    gradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    icon: "⛈️",
  },
  Snow: {
    gradient: "linear-gradient(135deg, #c7d9f5 0%, #dbeafe 50%, #f0f9ff 100%)",
    icon: "❄️",
  },
  Mist: {
    gradient: "linear-gradient(135deg, #4b5563 0%, #6b7280 50%, #9ca3af 100%)",
    icon: "🌫️",
  },
  default: {
    gradient: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #6b6b6b 100%)",
    icon: "🌡️",
  },
};

// show weather animation depending on the weather condition
const getGradient = (weatherData) => {
  let condition = weatherData.condition

  if (condition === null) {
    return weatherThemes.default.gradient;
  } else {
    return weatherThemes[condition].gradient;
  }
};



export default function HomePage() {

  const [weatherData, setWeatherData] = useState(null);
  const weatherSectionRef = useRef(null);

  // IF weather data returned from API call (city search), scroll down to weather results section
  useEffect(() => {
    if (weatherData) {
      weatherSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [weatherData]);

  return (
    <div className="home-page">
      <div className="home-content">
        <div className="hero-section">
          <Navbar className="pt-5" />
          <div className="flex-1 flex items-center justify-center">
            <Header getWeather={setWeatherData} />
          </div>
        </div>
        {/* IF weather data returns from API (not null),
        render the weather results section below */}
        {weatherData && (
          <div
            ref={weatherSectionRef}
            className="results-section px-16 md:px-32 flex flex-col items-center justify-center gap-8"
          >
            <div className="w-full fade-in mb-2">
              <div className="flex flex-row justify-center">
                <p className="text-center text-white/40 text-sm uppercase tracking-widest mb-1">
                  Your results
                </p>
              </div>
              <div className="flex flex-row justify-center">
                <h2 className="text-center text-4xl font-bold text-white pr-5">
                  Here's your <span id="weather-forecast">forecast</span>
                </h2>
                <FaArrowDown className="weather-arrow w-15 h-20"/>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* weather card */}
              <div className="weather-section fade-in">
                <WeatherCard
                  weatherData={weatherData}
                  weatherIcon={weatherThemes[weatherData.condition].icon}
                  weatherGradient={getGradient(weatherData)}
                />
              </div>
              {/* workout card */}
              <div className="workout-section flex justify-center fade-in">
                <Workout />
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}
