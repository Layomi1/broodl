"use client";

import { useEffect, useState } from "react";

import Calendar from "./Calendar";
import {
  moods,
  moodScores,
  UserMoodData,
  type MoodType,
  type StatusType,
} from "@/utils/constants/index.types";
import { useAuth } from "@/context/auth-context";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Loading from "./Loading";
import Login from "./Login";
import { fugaz, now } from "@/utils/constants";

const day = now.getDate();
const month = now.getMonth();
const year = now.getFullYear();
export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, loading, setLoading } =
    useAuth();

  const [data, setData] = useState<UserMoodData | null>(null);

  const handleSetMood = async (mood: MoodType) => {
    if (!currentUser) return;

    setLoading(true);
    try {
      const newData: UserMoodData = { ...userDataObj };
      if (!newData[year]) {
        newData[year] = {};
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }
      newData[year][month][day] = mood;
      // update currentuser state
      setData(newData);
      // update global state
      setUserDataObj(newData);

      // update firebase
      const docRef = doc(db, "users", currentUser.uid);
      await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
        { merge: true }
      );
    } catch (error) {
      console.log("Failed to set Data", error);
    } finally {
      setLoading(false);
    }
  };

  const countValues = (): Pick<StatusType, "num_of_days" | "average_mood"> => {
    let total_number_of_days = 0;
    let total_score = 0;

    if (!data) {
      return { num_of_days: 0, average_mood: "N/A" };
    }

    for (const year in data) {
      for (const month in data[year]) {
        for (const day in data[year][month]) {
          const day_mood = data[year][month][day];
          total_number_of_days++;
          total_score += moodScores[day_mood] ?? 0;
        }
      }
    }
    if (total_number_of_days === 0) {
      return { num_of_days: 0, average_mood: "N/A" };
    }

    const average_score = total_score / total_number_of_days;

    return {
      num_of_days: total_number_of_days,
      average_mood: average_score.toFixed(1),
    };
  };

  const statuses = {
    ...countValues(),

    time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}m 
    `,
  };
  useEffect(() => {
    if (!currentUser || !userDataObj) return;
    setData(userDataObj as UserMoodData);
  }, [currentUser, userDataObj]);

  if (loading) {
    return <Loading />;
  }
  if (!currentUser) {
    return <Login />;
  }
  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-10 md:gap-16">
      <div className="grid grid-cols-1 sm:grid-cols-3 text-indigo-500 rounded-lg gap-2 sm:gap-4 px-4 sm:px-6 md:px-8">
        {Object.entries(statuses).map(([key, status]) => (
          <div
            key={key}
            className="p-4 flex flex-col gap-1 sm:gap-2 bg-indigo-50"
          >
            <p className={`font-semibold capitalize text-xs sm:text-sm `}>
              {key.replace("_", " ")}
            </p>
            <p
              className={`text-base  font-medium sm:text-lg ${fugaz.className}`}
            >
              {status}
            </p>
          </div>
        ))}
      </div>
      <h4
        className={`text-4xl sm:text-5xl md:text-7xl text-center ${fugaz.className}`}
      >
        How do you
        <span className={`textGradient ${fugaz.className}`}> feel </span>
        today?
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-5  gap-4 px-4 sm:px-6 md:px-8">
        {Object.keys(moods).map((moodkey, idx) => (
          <button
            onClick={() => {
              handleSetMood(moodkey as MoodType);
            }}
            key={moodkey}
            className={`rounded-xl p-4 purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-200 cursor-pointer flex flex-col items-center ${
              idx === 4 ? "col-span-2 sm:col-span-1" : ""
            }`}
          >
            <p className="text-4xl sm:text-6xl md:text-7xl mb-2  ">
              {moods[moodkey as MoodType]}
            </p>
            <p
              className={`text-indigo-500 text-xs sm:text-sm  md:text-base ${fugaz.className}`}
            >
              {moodkey}
            </p>
          </button>
        ))}
      </div>
      <Calendar completeData={data} handleSetMood={handleSetMood} />
    </div>
  );
}
