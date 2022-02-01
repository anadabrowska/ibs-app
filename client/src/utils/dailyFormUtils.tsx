import { IconName } from "@fortawesome/fontawesome-svg-core";

export type RadioOpiton = {
  title: string;
  icon: IconName;
  rate: number;
};

export const stressOptions: RadioOpiton[] = [
  { title: "stressOptions.not-stressed", icon: "laugh-beam", rate: 1 },
  { title: "stressOptions.a-bit-stressed", icon: "meh-rolling-eyes", rate: 2 },
  { title: "stressOptions.stressed", icon: "meh", rate: 3 },
  { title: "stressOptions.very-stressed", icon: "frown", rate: 4 },
  { title: "stressOptions.stress-overload", icon: "sad-tear", rate: 5 },
];

export const moodOptions: RadioOpiton[] = [
  { title: "moodOptions.amazing", icon: "grin-stars", rate: 5 },
  { title: "moodOptions.good", icon: "grin", rate: 4 },
  { title: "moodOptions.ok", icon: "meh", rate: 3 },
  { title: "moodOptions.bad", icon: "frown-open", rate: 2 },
  { title: "moodOptions.terrible", icon: "grimace", rate: 1 },
];

export const generalSensationOptions: RadioOpiton[] = [
  { title: "generalSensation.very-good", icon: "grin-stars", rate: 5 },
  { title: "generalSensation.good", icon: "grin", rate: 4 },
  { title: "generalSensation.ok", icon: "meh", rate: 3 },
  { title: "generalSensation.bad", icon: "frown-open", rate: 2 },
  { title: "generalSensation.terrible", icon: "grimace", rate: 1 },
];
