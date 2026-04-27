import { Link } from 'react-router-dom';
import { FaRunning } from 'react-icons/fa';
import './Workout.css';

export default function Workout ({ recommendation }) {
    const isOutdoor = recommendation?.toLowerCase().includes('outdoor');

    return(
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 w-full h-full text-left flex flex-col justify-evenly">
            <FaRunning className="run-alive text-4xl text-white/70" />
            <h1 className="text-3xl font-semibold text-white">Ready to move?</h1>
            <div className="flex items-center justify-between gap-4">
              <p className="text-white/50 text-sm">
                {isOutdoor
                  ? "Today's weather is perfect for an outdoor workout. Get moving!"
                  : "Today's better for an indoor session. Let's find you a great workout."}
              </p>
              <Link
                  to='/workouts'
                  className='flex-none button-primary rounded-3xl px-6 py-3.5 text-base font-semibold text-black hover:opacity-90 transition-opacity duration-200'
              >
                  Get Workouts
              </Link>
            </div>
        </div>
    )
}