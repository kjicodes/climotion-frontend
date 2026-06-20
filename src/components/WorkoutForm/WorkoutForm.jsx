import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./WorkoutForm.css";
import { API_BASE_URL } from "../../api/config.js";

export default function WorkoutForm({ getWorkouts }) {
  const { accessToken } = useAuth();

  const [exerciseType, setExerciseType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    //recall - stops browser's default behavior to do a full page reload on submit
    e.preventDefault();
    setMessage(null);

    const needsDifficulty = exerciseType !== "stretching";
    const needsMuscleGroup = exerciseType === "strength";

    //check for valid choices
    if (
      !exerciseType ||
      (needsDifficulty && !difficulty) ||
      (needsMuscleGroup && !muscleGroup)
    ) {
      setMessage("Please select all required fields.");
      return;
    }

    //exercise type is always needed
    const paramsObj = { exercise_type: exerciseType };

    //check if difficulty and muscle group needed based on exercise type
    if (needsDifficulty) {
      paramsObj.difficulty = difficulty;
    }
    if (needsMuscleGroup) {
      paramsObj.muscle_group = muscleGroup;
    }

    const params = new URLSearchParams(paramsObj);

    try {
      const response = await fetch(`${API_BASE_URL}/workouts/?${params}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        setMessage("Error getting exercises.");
        return;
      }
      const result = await response.json();
      console.log(result);
      console.log(accessToken)
      getWorkouts(result);
    } catch {
      setMessage("Connection error.");
    }
  };

  const selectClassName = "w-full rounded-3xl bg-white/5 px-4 py-2.5 text-sm text-white outline-none border border-white/10";
  const labelClassName = "block text-sm text-gray-400 mb-1";

  return (
      <div className="w-full bg-white/5 border border-white/10 rounded-3xl p-8">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Choose Your Workout
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="exerciseType" className={labelClassName}>
              Exercise Type
            </label>
            <select
              id="exerciseType"
              value={exerciseType}
              onChange={(e) => setExerciseType(e.target.value)}
              className={selectClassName}
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="cardio">Cardio</option>
              <option value="strength">Strength</option>
              <option value="stretching">Stretching</option>
            </select>
          </div>
          {exerciseType !== "" && exerciseType !== "stretching" ? (
            <div>
              <label htmlFor="difficulty" className={labelClassName}>
                Difficulty
              </label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className={selectClassName}
              >
                <option value="" disabled>
                  Select difficulty
                </option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          ) : null}
          {exerciseType !== "" &&
          exerciseType !== "cardio" &&
          exerciseType !== "stretching" ? (
            <div>
              <label htmlFor="muscleGroup" className={labelClassName}>
                Muscle group
              </label>
              <select
                id="muscleGroup"
                value={muscleGroup}
                onChange={(e) => setMuscleGroup(e.target.value)}
                className={selectClassName}
              >
                <option value="" disabled>
                  Select group
                </option>
                <option value="upper">Upper</option>
                <option value="lower">Lower</option>
                <option value="full">Full</option>
              </select>
            </div>
          ) : null}
          <button
            type="submit"
            className="button-primary rounded-3xl px-6 py-2.5 text-sm font-semibold mt-2"
          >
            Get Workouts
          </button>

          {message && (
            <p className="text-red-400 text-sm text-center">{message}</p>
          )}
        </form>
      </div>
  );
}
