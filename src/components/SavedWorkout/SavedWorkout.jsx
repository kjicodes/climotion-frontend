import React from "react";
import "./SavedWorkout.css";

const difficultyColors = {
  beginner: "bg-green-500/20 text-green-300 border-green-500/30",
  intermediate: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  advanced: "bg-red-500/20 text-red-300 border-red-500/30",
};

export default function SavedWorkout({ workout }) {
  const editSavedWorkout = () => {};

  const basePillClassName =
    "inline-block text-xs font-medium px-3 py-1 rounded-full border capitalize";
  const typePillClassName = `${basePillClassName} bg-blue-500/20 text-blue-300 border-blue-500/30`;
  const musclePillClassName = `${basePillClassName} bg-purple-500/20 text-purple-300 border-purple-500/30`;
  const difficultyPillClassName = `${basePillClassName} ${difficultyColors[workout.difficulty] ?? "bg-white/10 text-gray-300 border-white/10"}`;

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-left my-10">
      <h2 className="text-lg font-bold text-white">{workout.name}</h2>
      <div className="flex flex-wrap gap-2 mt-2">
        {workout.type && (
          <span className={typePillClassName}>{workout.type}</span>
        )}
        {workout.difficulty && (
          <span className={difficultyPillClassName}>{workout.difficulty}</span>
        )}
        {workout.muscle && (
          <span className={musclePillClassName}>{workout.muscle}</span>
        )}
      </div>
      <p className="text-sm text-gray-300 mt-3">
        Instructions: {workout.instructions}
      </p>
      {workout.equipments.length > 0 ? (
        <p className="text-sm text-gray-300 mt-3">
          Equipment: {workout.equipments}
        </p>
      ) : (
        <p className="text-sm text-gray-300 mt-3">
          Equipment: No equipment needed.
        </p>
      )}
      <div className="flex justify-end">
        <div className="px-5">
          <button
            type="button"
            //   onClick={editSavedWorkout}
            className="button-primary rounded-3xl px-6 py-2.5 text-sm font-semibold mt-2"
          >
            Edit
          </button>
        </div>
        <div>
          <button
            type="button"
            //   onClick={deleteSavedWorkout}
            className="button-danger rounded-3xl px-6 py-2.5 text-sm font-semibold mt-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
