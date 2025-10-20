export type MoodType = keyof typeof moods;

export type StatusType = {
  num_of_days: number;
  time_remaining: string;
  date: string;
};

export const moods = {
  "&*@#$": "😭",
  Sad: "🥲",
  Existing: "😶",
  Good: "😊",
  Elated: "😍",
} as const;

export type UserMoodData = {
  [year: number]: {
    [month: number]: {
      [day: number]: MoodType;
    };
  };
};
