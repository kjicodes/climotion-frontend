import React, { useState } from "react";
import "./WorkoutPage.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import WorkoutForm from "../../components/WorkoutForm/WorkoutForm";
import WorkoutCard from "../../components/WorkoutCard/WorkoutCard";

export default function WorkoutPage() {
  const [workouts, setWorkouts] = useState(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col md:flex-row gap-8 max-w-6xl mx-auto px-6 py-12">
        <div className="md:w-96 md:flex-shrink-0 md:self-start">
          <WorkoutForm getWorkouts={setWorkouts} />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          {workouts && workouts.length > 0 ? (
            workouts.map(workout => (
              <WorkoutCard key={workout.name} workout={workout} />
            ))
          ) : (
            <p className="text-gray-400 text-center mt-12">
              Set your filters to see workouts.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
