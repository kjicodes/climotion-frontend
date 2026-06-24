import { apiFetch } from "./apiFetch.js";

export async function getSavedWorkouts() {
  try {
    const response = await apiFetch("/saved-workouts/", { method: "GET" });

    if (!response.ok) {
      return { "success": false, "error": "Error getting saved workouts." }
    }
    const data = await response.json();
    return { "success": true, data };
  } catch {
    return { "success": false, "error": "Connection error." }
  }
};

export async function createSavedWorkout(workout) {
  try {
    const response = await apiFetch("/saved-workouts/", {
      method: "POST",
      body: JSON.stringify({ workout }),
    });
    if (!response.ok) {
      return { "success": false, "error": "Error saving workout." }
    }
    const data = await response.json();
    return { "success": true, data };
  } catch {
    return { "success": false, "error": "Connection error." }
  }
};

export async function updateSavedWorkout(id, updates) {
  try {
    const response = await apiFetch(`/saved-workouts/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(updates)
    });
    if (!response.ok) {
      return { "success": false, "error": "Error updating workout." }
    }
    const data = await response.json();
    return { "success": true, data };
  } catch {
    return { "success": false, "error": "Connection error." }
  }
};

export async function deleteSavedWorkout(id) {
  try {
    const response = await apiFetch(`/saved-workouts/${id}/`, { method: "DELETE" });
    
    if (!response.ok) {
      return { "success": false, "error": "Error deleting workout." }
    }
    return { "success": true };
  } catch {
    return { "success": false, "error": "Connection error." }
  }
};