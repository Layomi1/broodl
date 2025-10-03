import { Fugaz_One } from "next/font/google";
import Calendar from "./Calendar";

const fugaz = Fugaz_One({
  variable: "--font-fugaz-one",
  subsets: ["latin"],
  weight: ["400"],
});

type StatusType = {
  num_of_days: number;
  time_remaining: string;
  date: string;
};

type MoodType = {
  "&*@#$": string;
  Sad: string;
  Existing: string;
  Good: string;
  Elated: string;
};
export default function Dashboard() {
  const statuses = {
    num_of_days: 14,
    time_remaining: "13:08:34",
    date: new Date().toDateString(),
  };

  const moods = {
    "&*@#$": "😭",
    Sad: "🥲",
    Existing: "😶",
    Good: "😊",
    Elated: "😍",
  };
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
        How do you{" "}
        <span className={`textGradient ${fugaz.className}`}>feel</span> today?
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-5  gap-4 px-4 sm:px-6 md:px-8">
        {Object.keys(moods).map((mood, idx) => (
          <button
            key={idx}
            className={`rounded-xl p-4 purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-200 cursor-pointer flex flex-col items-center ${
              idx === 4 ? "col-span-2 sm:col-span-1" : ""
            }`}
          >
            <p className="text-4xl sm:text-6xl md:text-7xl mb-2  ">
              {moods[mood as keyof MoodType]}
            </p>
            <p
              className={`text-indigo-500 text-xs sm:text-sm  md:text-base  ${fugaz.className}`}
            >
              {mood}
            </p>
          </button>
        ))}
      </div>
      <Calendar />
    </div>
  );
}
