"use client";

import { useEffect, useState } from "react";
import { Fugaz_One } from "next/font/google";
import Calendar from "./Calendar";
import { moods, type MoodType, type StatusType } from "@/utils/constants";
import { useAuth } from "@/context/auth-context";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Loading from "./Loading";
import Login from "./Login";

const fugaz = Fugaz_One({
  variable: "--font-fugaz-one",
  subsets: ["latin"],
  weight: ["400"],
});

type UserMoodData = {
  [year: number]: {
    [month: number]: {
      [day: number]: MoodType;
    };
  };
};
export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, loading, setLoading } =
    useAuth();

  const [completedData, setCompletedData] = useState<UserMoodData | null>({});

  // const countValues = () => {};

  const handleSetMood = async (mood: MoodType) => {
    if (!currentUser) return;

    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

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
      setCompletedData(newData);
      // update global state
      setUserDataObj(newData);

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

      // update firebase
    } catch (error) {
      console.log("Failed to set Data", error);
    } finally {
      setLoading(false);
    }
  };

  const statuses = {
    num_of_days: 14,
    time_remaining: "13:08:34",
    date: new Date().toDateString(),
  };

  useEffect(() => {
    if (!currentUser || !userDataObj) return;
    setCompletedData(userDataObj as UserMoodData);
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
        {Object.keys(statuses).map((status, idx) => (
          <div
            key={idx}
            className="p-4 flex flex-col gap-1 sm:gap-2 bg-indigo-50"
          >
            <p className={`font-semibold uppercase text-xs sm:text-sm `}>
              {status.replace("_", " ")}
            </p>
            <p
              className={`text-base font-medium sm:text-lg ${fugaz.className}`}
            >
              {statuses[status as keyof StatusType]}
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
      <Calendar completedData={completedData} handleSetMood={handleSetMood} />
    </div>
  );
}
