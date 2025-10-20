"use client";

import { baseRating, dayLists, gradients, months } from "@/utils";
import { MoodType, type UserMoodData } from "@/utils/constants";
import { useState } from "react";

type CalendarProps = {
  completeData: UserMoodData | null;
  handleSetMood: (mood: MoodType) => void | Promise<void>;
  demo?: boolean;
};
export default function Calendar(props: CalendarProps) {
  const { demo, completeData, handleSetMood } = props;

  const now = new Date();
  const currentMonth = now.getMonth();

  const [selectedMonth, setSelectedMonth] = useState(
    Object.keys(months)[currentMonth]
  );

  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const monthIndex = Object.keys(months).indexOf(selectedMonth);

  const monthNow = new Date(selectedYear, monthIndex, 1);
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(selectedYear, monthIndex + 1, 0).getDate();

  const daysToDisplay = firstDayOfMonth + daysInMonth;

  const numberOfRows = Math.ceil(daysToDisplay / 7);
  const numericMonth = Object.keys(months).indexOf(selectedMonth);

  const data: Record<number, number> = Object.entries(
    completeData?.[selectedYear]?.[numericMonth] || {}
  ).reduce((acc, [key, value]) => {
    acc[Number(key)] = value as unknown as number;
    return acc;
  }, {} as Record<number, number>);

  const handleIncrementMonth = () => {};
  const handleDecrementMonth = () => {};

  return (
    <div className="flex flex-col overflow-hidden gap-1 px-4 md:px-6 py-4 sm:py-6 md:py-10">
      {[...Array(numberOfRows).keys()].map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-7 gap-1 ">
          {dayLists.map((weekday, weekDayIdx) => {
            const dayIndex: number =
              rowIndex * 7 + weekDayIdx - (firstDayOfMonth - 1);

            const dayDisplay =
              dayIndex > daysInMonth || dayIndex <= 0 ? false : true;

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
  );
}
