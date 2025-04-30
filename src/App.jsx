// src/App.jsx

import React, { useState } from "react";

export default function App() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [dietaryPreference, setDietaryPreference] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState("");
  const [timePerWorkout, setTimePerWorkout] = useState("");

  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState(null);

  const handleNumberInput = (value, setter) => {
    if (/^\d*$/.test(value)) setter(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAdvice(null);

    const formData = {
      age,
      gender,
      height,
      weight,
      fitnessGoal,
      activityLevel,
      dietaryPreference,
      daysPerWeek,
      timePerWorkout,
    };

    try {
      const res = await fetch("http://localhost:4000/generate-advice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setAdvice(data.message || "Here is your custom fitness advice.");
    } catch (err) {
      console.error("Error sending data to server:", err);
      setAdvice("There was an error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-800 text-white flex items-center justify-center p-4">
      <div className="bg-gray-900 shadow-lg rounded-lg w-full max-w-lg p-6 text-center">
        {loading ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Generating Advice...</h2>
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mx-auto" />
          </div>
        ) : advice ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Fitness Plan</h2>
            <pre className="text-left whitespace-pre-wrap text-gray-300">
              {advice}
            </pre>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-extrabold mb-6">AI Fitness Planner</h1>
            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Age (years)</label>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => handleNumberInput(e.target.value, setAge)}
                    className="w-full border rounded-md px-3 py-2 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="e.g. 27"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 bg-gray-700 text-white"
                  >
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Height (cm)</label>
                  <input
                    type="text"
                    value={height}
                    onChange={(e) => handleNumberInput(e.target.value, setHeight)}
                    className="w-full border rounded-md px-3 py-2 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="e.g. 178"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                  <input
                    type="text"
                    value={weight}
                    onChange={(e) => handleNumberInput(e.target.value, setWeight)}
                    className="w-full border rounded-md px-3 py-2 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="e.g. 82"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Fitness Goal</label>
                  <select
                    value={fitnessGoal}
                    onChange={(e) => setFitnessGoal(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 bg-gray-700 text-white"
                  >
                    <option value="">Select</option>
                    <option>Lose Fat</option>
                    <option>Gain Muscle</option>
                    <option>Improve Endurance</option>
                    <option>Maintain Fitness</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Activity Level</label>
                  <select
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 bg-gray-700 text-white"
                  >
                    <option value="">Select</option>
                    <option>Sedentary</option>
                    <option>Lightly Active</option>
                    <option>Active</option>
                    <option>Very Active</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Dietary Preference</label>
                <select
                  value={dietaryPreference}
                  onChange={(e) => setDietaryPreference(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 bg-gray-700 text-white"
                >
                  <option value="">Select</option>
                  <option>Omnivore</option>
                  <option>Vegetarian</option>
                  <option>Vegan</option>
                  <option>Pescatarian</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Days per Week to Train</label>
                  <input
                    type="text"
                    value={daysPerWeek}
                    onChange={(e) => handleNumberInput(e.target.value, setDaysPerWeek)}
                    className="w-full border rounded-md px-3 py-2 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="e.g. 4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Time per Workout (min)</label>
                  <input
                    type="text"
                    value={timePerWorkout}
                    onChange={(e) => handleNumberInput(e.target.value, setTimePerWorkout)}
                    className="w-full border rounded-md px-3 py-2 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="e.g. 45"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 font-semibold py-3 rounded-lg shadow-md transition"
              >
                Generate Plan
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
