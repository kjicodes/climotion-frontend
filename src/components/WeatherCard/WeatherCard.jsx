import "./WeatherCard.css";

const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

export default function WeatherCard({ weatherData, weatherIcon, weatherGradient }) {
  return (
    <div className="weather-card-bg backdrop-blur-md border border-white/10 rounded-2xl p-6 h-full overflow-hidden" style={{ "--card-gradient": weatherGradient }}>
      {weatherData && (
        <div className="text-left h-full flex flex-col justify-evenly">
          <div className="flex justify-between items-start">
            <div className="min-w-0">
              <h2 className="text-2xl font-semibold text-white truncate">{weatherData.city}</h2>
              <p className="text-white/50 text-sm mt-1">{currentDate}</p>
            </div>
            <p className="text-4xl shrink-0"><span className="text-xl pr-3">{weatherData.condition}</span>{weatherIcon}</p>
          </div>
          <div className="flex justify-between items-end pb-4">
            <div className="min-w-0">
              <p className="text-4xl sm:text-5xl font-bold text-white">{weatherData.temperature}°C</p>
              <p className="text-white/50 text-sm mt-2">Feels like {weatherData.feels_like}°C</p>
            </div>
            <p className="text-white/60 text-sm shrink-0">H: {weatherData.high}°C / L: {weatherData.low}°C</p>
          </div>
          <div className="weather-description border-t pt-4 ">
            <p>{weatherData.description}</p>
          </div>
        </div>
      )}
    </div>
    
  );
}
