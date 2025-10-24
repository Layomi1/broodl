"use client";

import { moods, MoodType, UserMoodData } from "@/utils/constants/index.types";
import Calendar from "./Calendar";

import CallToAction from "./CallToAction";
import { baseRating, fugaz, now } from "@/utils/constants";

export default function Hero() {
  const demoData: UserMoodData = {
    [now.getFullYear()]: {
      [now.getMonth()]: Object.entries(baseRating).reduce(
        (acc, [dayString, rating]) => {
          const day = Number(dayString);

          const moodKeys = Object.keys(moods) as MoodType[];
          acc[day] = moodKeys[rating - 1];
          return acc;
        },
        {} as { [day: number]: MoodType }
      ),
    },
  };
  return (
    <div className="py-4 md:py-10 flex flex-col gap-8 sm:gap-10 text-center">
      <h1 className={`text-5xl sm:text-6xl md:text-7xl ${fugaz.className}`}>
        <span className="textGradient">Broodl </span> helps you track your{" "}
        <span className="text-textGradient">daily</span> mood!
      </h1>
      <p className="text-lg sm:text-xl  md:text-2xl w-full mx-auto max-w-[600px]">
        Create your mood record and see how you feel on{" "}
        <span className="font-semibold">every day of every year</span>
      </p>
      <CallToAction />
      <Calendar demo completeData={demoData} handleSetMood={() => {}} />
    </div>
  );
}
