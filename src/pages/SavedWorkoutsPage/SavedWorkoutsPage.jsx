import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SavedWorkout from "../../components/SavedWorkout/SavedWorkout";

const API_URL = process.env.REACT_APP_API_URL;

export default function SavedWorkoutsPage() {
  const { accessToken } = useAuth();

  const [savedWorkouts, setSavedWorkouts] = useState(null);
  const [message, setMessage] = useState(null);

  const getSavedWorkouts = async () => {
    try {
      const response = await fetch(`${API_URL}/saved-workouts/`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        setMessage("Error saving workout. Please try again.");
        return;
      }

      const result = await response.json();
      console.log(result);
      setSavedWorkouts(result);
    } catch {
      setMessage("Connection error.");
    }
  };

  useEffect(() => {
    getSavedWorkouts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex-col md:flex-row gap-8 max-w-6xl mx-auto px-6 py-12">
        <div>
          {savedWorkouts && savedWorkouts.map( savedWorkout => (
          <SavedWorkout key={savedWorkout.id} workout={savedWorkout.workout} />
        ))}
        </div>
      </div>
      <Footer />
      
    </div>
  );
}
