import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getSavedWorkouts,
  updateSavedWorkout,
  deleteSavedWorkout,
} from "../../api/savedWorkouts";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SavedWorkoutCard from "../../components/SavedWorkoutCard/SavedWorkoutCard";

export default function SavedWorkoutsPage() {
  const { accessToken } = useAuth();
  const [savedWorkouts, setSavedWorkouts] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    //create func upload page load
    const fetchSavedWorkouts = async () => {
      const result = await getSavedWorkouts(accessToken);

      if (!result.success) {
        setMessage(result.error);
        return;
      }
      setSavedWorkouts(result.data);
    };
    //call func
    fetchSavedWorkouts();
  }, [accessToken]);

  //edit saved workout - only add/update reflection notes
  const handleUpdateWorkout = async (
    id,
    reflection_before,
    reflection_after,
  ) => {
    console.log(reflection_before, reflection_after)
    const updates = {
      workout_reflection_before: reflection_before,
      workout_reflection_after: reflection_after,
    };
    
    const result = await updateSavedWorkout(id, updates, accessToken);

    if (!result.success) {
      setMessage(result.error);
      return;
    }
    //update state
    setSavedWorkouts((prev) =>
      prev.map((saved) => (saved.id === id ? result.data : saved)),
    );
    return;
  };

  //delete saved workout
  const handleDeleteWorkout = async (id) => {
    const result = await deleteSavedWorkout(id, accessToken);

    if (!result.success) {
      setMessage(result.error);
      return;
    }
    //update state to show saved workouts list after deleting
    setSavedWorkouts((prev) => prev.filter((saved) => saved.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col max-w-6xl mx-auto px-6 py-12">
        <div>
          <h1 className="text-3xl font-bold text-white text-left ">
            My Workouts
          </h1>
        </div>
        <div className="flex flex-col gap-8">
          <div>
            {savedWorkouts &&
              savedWorkouts.map((savedWorkout) => (
                <SavedWorkoutCard
                  key={savedWorkout.id}
                  savedWorkout={savedWorkout}
                  onUpdate={handleUpdateWorkout}
                  onDelete={handleDeleteWorkout}
                />
              ))}
          </div>
        </div>
        {message && (
          <p className="text-red-400 text-sm text-center">{message}</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
