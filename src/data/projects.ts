export type Platform = "ios" | "android" | "both";

export interface Project {
  id: string;
  name: string;
  description: string;
  accentColor: string;
  platform: Platform;
  framework: string;
  screenshotUrl?: string;
}

export const projects: Project[] = [
  {
    id: "homevolt",
    name: "Homevolt",
    description:
      "Smart home energy management app for monitoring and optimizing household electricity consumption.",
    accentColor: "#22c55e",
    platform: "both",
    framework: "Flutter",
    screenshotUrl: "/screenshots/homevolt1.webp",
  },
  {
    id: "citizen-sea",
    name: "Citizen Sea",
    description:
      "Marine conservation platform connecting citizen scientists with ocean monitoring initiatives.",
    accentColor: "#06b6d4",
    platform: "both",
    framework: "Flutter",
    screenshotUrl: "/screenshots/citizensea.png",
  },
  {
    id: "claire",
    name: "Claire",
    description:
      "AI-powered personal assistant app designed for seamless daily task management.",
    accentColor: "#a78bfa",
    platform: "ios",
    framework: "Flutter",
    screenshotUrl: "/screenshots/claire.png",
  },
  {
    id: "seniora",
    name: "Seniora",
    description:
      "Elder care companion app providing health reminders, emergency contacts, and wellness tracking.",
    accentColor: "#f472b6",
    platform: "both",
    framework: "React Native",
    screenshotUrl: "/screenshots/seniora.webp",
  },
  {
    id: "sluta-roka",
    name: "Sluta Roka",
    description:
      "Smoking cessation app with progress tracking, health milestones, and motivational support.",
    accentColor: "#fb923c",
    platform: "both",
    framework: "React Native",
  },
  {
    id: "kwick-expense",
    name: "Kwick Expense",
    description:
      "Quick and intuitive expense tracker for personal finance management on the go.",
    accentColor: "#6366f1",
    platform: "both",
    framework: "Flutter",
    screenshotUrl: "/screenshots/kwick.png",
  },
];
