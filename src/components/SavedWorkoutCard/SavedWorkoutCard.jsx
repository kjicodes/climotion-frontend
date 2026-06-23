import React, { useState } from "react";
import "./SavedWorkoutCard.css";
import EditSavedWorkoutForm from "../EditSavedWorkoutForm/EditSavedWorkoutForm";

const difficultyColors = {
  beginner: "bg-green-500/20 text-green-300 border-green-500/30",
  intermediate: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  advanced: "bg-red-500/20 text-red-300 border-red-500/30",
};

const basePillClassName =
  "inline-block text-xs font-medium px-3 py-1 rounded-full border capitalize";
const typePillClassName = `${basePillClassName} bg-blue-500/20 text-blue-300 border-blue-500/30`;
const musclePillClassName = `${basePillClassName} bg-purple-500/20 text-purple-300 border-purple-500/30`;

export default function SavedWorkoutCard({ savedWorkout, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  const workout = savedWorkout.workout;
  const difficultyPillClassName = `${basePillClassName} ${difficultyColors[workout.difficulty] ?? "bg-white/10 text-gray-300 border-white/10"}`;
  const isReflectionEmpty =
    !savedWorkout.workout_reflection ||
    (savedWorkout.workout_reflection.before_workout === "" &&
      savedWorkout.workout_reflection.after_workout === "");

  const handleOnUpdate = async (reflectionBefore, reflectionAfter) => {
    await onUpdate(savedWorkout.id, reflectionBefore, reflectionAfter);
    setIsEditing(false);
  };

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
      <div className="flex items-start gap-2 mt-3">
        <span className="text-sm font-bold text-gray-300 flex-shrink-0">
          Instructions:
        </span>
        <p className="text-sm text-gray-300">{workout.instructions}</p>
      </div>
      <div className="flex items-start gap-2 mt-3">
        <span className="text-sm font-bold text-gray-300 flex-shrink-0">Equipment:</span>
        {workout.equipments.length > 0 ? (
          <p className="text-sm text-gray-300">{workout.equipments.join(", ")}</p>
        ) : (
          <p className="text-gray-500 italic">No equipment needed.</p>
        )}
      </div>
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide pt-7">
        💭 Reflection Notes - What are your thoughts?
      </h3>
      {isEditing ? (
        <EditSavedWorkoutForm
          onUpdate={handleOnUpdate}
          initialBeforeReflection={
            savedWorkout.workout_reflection?.before_workout
          }
          initialAfterReflection={
            savedWorkout.workout_reflection?.after_workout
          }
        />
      ) : !isReflectionEmpty ? (
        <div>
          <p className="text-sm text-gray-300 mt-3">
            <span className="font-bold">Before Reflection: </span>{savedWorkout.workout_reflection.before_workout}
          </p>
          <p className="text-sm text-gray-300 mt-3">
            <span className="font-bold">After Reflection: </span>{savedWorkout.workout_reflection.after_workout}
          </p>
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic mt-3">
          No reflection notes yet.
        </p>
      )}
      <div className="flex justify-end">
        {isEditing ? (
          <div className="px-5">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="button-primary rounded-3xl px-6 py-2.5 text-sm font-semibold mt-2"
            >
              Cancel Edit
            </button>
          </div>
        ) : (
          <div className="px-5">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="button-primary rounded-3xl px-6 py-2.5 text-sm font-semibold mt-2"
            >
              Edit
            </button>
          </div>
        )}
        <div>
          <button
            type="button"
            onClick={() => onDelete(savedWorkout.id)}
            className="button-danger rounded-3xl px-6 py-2.5 text-sm font-semibold mt-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
