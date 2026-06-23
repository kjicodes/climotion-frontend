import React, { useState } from "react";

export default function EditSavedWorkoutForm({ onUpdate, initialBeforeReflection, initialAfterReflection }) {
  const [beforeReflection, setBeforeReflection] = useState(initialBeforeReflection ?? "");
  const [afterReflection, setAfterReflection] = useState(initialAfterReflection ?? "");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await onUpdate(beforeReflection, afterReflection)
  };

  return (
    <div className="pt-4">
      <form onSubmit={handleOnSubmit} classNameclassName="flex flex-col gap-4 mt-3">
        <label htmlFor="beforeReflection" className="block text-sm text-gray-400 mb-3">Before Workout</label>
        <textarea
          id="beforeReflection"
          value={beforeReflection}
          onChange={(e) => setBeforeReflection(e.target.value)}
          placeholder="Enter notes..."
          rows={3}
          className="w-full rounded-3xl bg-white/5 px-4 py-2.5 text-sm text-white outline-none border border-white/10 placeholder:text-gray-500 resize-none mb-2"
        />
        <label htmlFor="afterReflection" className="block text-sm text-gray-400 mb-3">After Workout</label>
        <textarea
          id="afterReflection"
          value={afterReflection}
          onChange={(e) => setAfterReflection(e.target.value)}
          placeholder="Enter notes..."
          rows={3}
          className="w-full rounded-3xl bg-white/5 px-4 py-2.5 text-sm text-white outline-none border border-white/10 placeholder:text-gray-500 resize-none"
        />
        <button 
          type="submit"
          className="button-primary self-start rounded-3xl px-6 py-2.5 text-sm font-semibold mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
