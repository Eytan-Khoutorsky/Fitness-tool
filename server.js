// server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// eslint-disable-next-line no-undef
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/generate-advice", async (req, res) => {
  const {
    age,
    gender,
    height,
    weight,
    fitnessGoal,
    activityLevel,
    dietaryPreference,
    daysPerWeek,
    timePerWorkout,
  } = req.body;

  const prompt = `
You are a professional fitness and nutrition coach.

Using the following client profile, generate a personalized weekly fitness and nutrition plan. The plan should be realistic, motivating, and tailored to their lifestyle, goals, and dietary preferences.

Client Profile:
- Age: ${age}
- Gender: ${gender}
- Height: ${height} cm
- Weight: ${weight} kg
- Fitness Goal: ${fitnessGoal}
- Activity Level: ${activityLevel}
- Dietary Preference: ${dietaryPreference}
- Days Available to Train per Week: ${daysPerWeek}
- Time Available per Workout: ${timePerWorkout} minutes

Instructions:
1. Create a 7-day training schedule that fits the client's availability and time constraints.
2. Suggest realistic and goal-aligned workouts for each day (include rest days).
3. Recommend daily caloric intake and macronutrient breakdown.
4. Suggest general dietary guidelines or a sample daily meal plan.
5. Keep advice clear, concise, and beginner-friendly if applicable.

Output the plan in plain text, organized by sections: "Training Plan", "Nutrition Advice", and "Additional Tips". Keep it under 300 words, and make sure the output is structured by section with newlines that properly separate sections.
`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const result = completion.choices[0].message.content;
    res.json({ message: result });
  } catch (err) {
    console.error("OpenAI API error:", err);
    res.status(500).json({ message: "Failed to generate advice." });
  }
});

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
