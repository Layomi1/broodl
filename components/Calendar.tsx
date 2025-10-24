"use client";

import {
  baseRating,
  dayLists,
  fugaz,
  gradients,
  months,
  now,
} from "@/utils/constants";
import {
  moodScores,
  MoodType,
  type UserMoodData,
} from "@/utils/constants/index.types";

import { useState } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";

type CalendarProps = {
  completeData?: UserMoodData | null;
  handleSetMood?: (mood: MoodType) => void | Promise<void>;
  demo?: boolean;
};

export default function Calendar(props: CalendarProps) {
  const { demo, completeData } = props;

  const currentMonth = now.getMonth();
  const monthArray = Object.keys(months);

  const [selectedMonth, setSelectedMonth] = useState(monthArray[currentMonth]);

  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const monthIndex = monthArray.indexOf(selectedMonth);

  const monthNow = new Date(selectedYear, monthIndex, 1);
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(selectedYear, monthIndex + 1, 0).getDate();

  const daysToDisplay = firstDayOfMonth + daysInMonth;

  const numberOfRows = Math.ceil(daysToDisplay / 7);
  const numericMonth = monthArray.indexOf(selectedMonth);

  const data: Record<number, number> = Object.entries(
    completeData?.[selectedYear]?.[numericMonth] || {}
  ).reduce((acc, [key, value]) => {
    const moodType = value as MoodType;
    acc[Number(key)] = moodScores[moodType];
    // acc[Number(key)] = value as unknown as number;
    return acc;
  }, {} as Record<number, number>);

  const handleMonthControl = (val: number) => {
    if (numericMonth + val < 0) {
      setSelectedYear((curr) => curr - 1);
      setSelectedMonth(monthArray[monthArray.length - 1]);
    } else if (numericMonth + val > 11) {
      setSelectedYear((curr) => curr + 1);
      setSelectedMonth(monthArray[0]);
    } else {
      setSelectedMonth(monthArray[numericMonth + val]);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 px-4 md:px-6">
      <div className=" grid grid-cols-3 justify-between gap-4 items-center">
        <div className="text-left">
          <button
            onClick={() => handleMonthControl(-1)}
            className="text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60 "
          >
            <IoIosArrowDropleftCircle />
          </button>
        </div>

        <p
          className={`text-center capitalize textGradient whitespace-nowrap ${fugaz.className}`}
        >
          {selectedMonth} {""} {selectedYear}
        </p>
        <div className="text-right ">
          <button
            onClick={() => handleMonthControl(1)}
            className="text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60"
          >
            <IoIosArrowDroprightCircle />
          </button>
        </div>
      </div>
      <div className="flex flex-col overflow-hidden gap-1  py-4 sm:py-6 md:py-10">
        {[...Array(numberOfRows).keys()].map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-7 gap-1 ">
            {dayLists.map((weekday, weekDayIdx) => {
              const dayIndex: number =
                rowIndex * 7 + weekDayIdx - (firstDayOfMonth - 1);

              const dayDisplay =
                dayIndex > daysInMonth
                  ? false
                  : row === 0 && rowIndex < firstDayOfMonth
                  ? false
                  : true;

              if (!dayDisplay) {
                return <div className="bg-white" key={weekDayIdx} />;
              }

              const isToday = dayIndex === now.getDate();

              const color = demo
                ? gradients.indigo[baseRating[dayIndex]]
                : data?.[dayIndex]
                ? gradients.indigo[data[dayIndex]]
                : "white";

              return (
                <div
                  key={weekDayIdx}
                  style={{ background: color }}
                  className={`text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ${
                    isToday ? "border-indigo-400" : "border-indigo-100"
                  } ${color === "white" ? "text-indigo-400" : "text-white"}`}
                >
                  <p>{dayIndex}</p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
