import { IconName } from "@fortawesome/fontawesome-svg-core";

export type RadioOpiton = {
  title: string;
  icon: IconName;
  rate: number;
};

export const stressOptions: RadioOpiton[] = [
  { title: "not stressed", icon: "laugh-beam", rate: 1 },
  { title: "a bit stressed", icon: "meh-rolling-eyes", rate: 2 },
  { title: "stressed", icon: "meh", rate: 3 },
  { title: "very stressed", icon: "frown", rate: 4 },
  { title: "stress overload", icon: "sad-tear", rate: 5 },
];

export const moodOptions: RadioOpiton[] = [
  { title: "amazing", icon: "grin-stars", rate: 5 },
  { title: "good", icon: "grin", rate: 4 },
  { title: "ok", icon: "meh", rate: 3 },
  { title: "bad", icon: "frown-open", rate: 2 },
  { title: "terrible", icon: "grimace", rate: 1 },
];
