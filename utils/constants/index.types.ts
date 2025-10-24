export type MoodType = keyof typeof moods;

export const moodScores: Record<MoodType, number> = {
  "&*@#$": 1,
  Sad: 2,
  Existing: 3,
  Good: 4,
  Elated: 5,
};

export type StatusType = {
  num_of_days: number;
  time_remaining: string;
  average_mood: string;
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
