"use client";

import { baseRating, months, dayLists, gradients } from "@/utils";
import { useState } from "react";

type CalendarProps = {
  demo: Array<string>;
  // handleSetMood: (mood: string) => void;
  data: Record<string, number>;
};
export default function Calendar(props: CalendarProps) {
  const { demo, data } = props;

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

  const handleIncrementMonth = () => {};
  const handleDecrementMonth = () => {};

  return (
    <div className="flex flex-col overflow-hidden gap-1 px-4 md:px-6 py-4 sm:py-6 md:py-10">
      {[...Array(numberOfRows).keys()].map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-7 gap-1 ">
          {dayLists.map((day, idx) => {
            const dayIndex = rowIndex * 7 + idx - (firstDayOfMonth - 1);

            const dayDisplay =
              dayIndex > daysInMonth
                ? false
                : row === 0 && idx < firstDayOfMonth
                ? false
                : true;

            const isToday = dayIndex === now.getDate();

            if (!dayDisplay) {
              return <div className="bg-white" key={idx} />;
            }

            const color = demo
              ? gradients.indigo[baseRating[dayIndex]]
              : dayIndex in data
              ? gradients.indigo[data[dayIndex]]
              : "white";

            return (
              <div
                key={idx}
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
