export const profile = {
  name: "Samyak Vikas Gedam",
  nameLines: ["Samyak", "Vikas", "Gedam"],
  tagline: "B.Tech. Computer Engineering · Pune University · Batch 2029",
  eyebrow: "Portfolio",
  email: "samyakgedam69@gmail.com",
  phone: "+91 9420296105",
  location: "Chandrapur, Maharashtra, India",
  dob: "28 / 03 / 2006",
  languages: ["English", "Hindi", "Marathi"],
  nationality: "Indian",
  linkedin: "https://www.linkedin.com/in/samyak-gedam-827a51394?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  github: "https://github.com/vitsamyak",
};

export const objective =
  "Motivated Computer Engineering student with a strong interest in programming and software development. Eager to apply problem-solving skills and gain practical experience in real-world projects.";

export const education = [
  {
    degree: "B.Tech. Computer Engineering",
    school: "Vishwakarma Institute of Technology, Pune",
    board: "Savitribai Phule Pune University",
    period: "2025 – 2029",
  },
  {
    degree: "HSC — 12th",
    school: "Maharashtra State Board",
    board: null,
    period: "2025",
    note: "65.87%",
  },
  {
    degree: "SSC — 10th",
    school: "Central Board Of Secondary Education (CBSE)",
    board: null,
    period: "2023",
    note: "90%",
  },
];

export const achievements = [
  "Scored 93.68 percentile in JEE Mains",
  "Scored 96.97 percentile in MHT CET (PCM)",
  "Qualified for JEE Advanced (Preparatory Rank)",
];

export const skillGroups = [
  {
    label: "Programming",
    items: ["Java (Basic)", "C++ (Basic)", "Python"],
  },
  {
    label: "Web",
    items: ["HTML", "CSS", "JavaScript", "Full Stack Development (Learning)", "AI Development (Learning)", "AI Design (Learning)"],
  },
  {
    label: "Tools",
    items: ["VS Code", "Git"],
  },
  {
    label: "Concepts",
    items: ["Problem Solving", "Basic Programming"],
  },
];

export const softSkills = [
  "Communication",
  "Teamwork",
  "Problem-solving",
  "Adaptability",
  "Leadership",
  "Time Management",
  "Decision Making",
  "Critical Thinking",
  "Creativity",
  "Attention to Detail",
  "Organizational Skills",
  "Project Management",

];

export const projects = [
  {
    title: "ASEP-2: Smart Zebra Crossing System",
    category: "Implementation · IoT",
    description:
      "Developed a smart zebra crossing system utilizing IoT technologies to enhance pedestrian safety and automate traffic flow.",
    tags: ["Arduino", "Ultrasonic Sensors", "Firebase", "IoT"],
    year: "2025",
    highlights: [
      "Developed a smart zebra crossing system to enhance pedestrian safety",
      "Used sensors to detect pedestrians and automatically control traffic signals",
      "Integrated Firebase for real-time monitoring and data handling",
      "Applied IoT concepts for real-world problem solving",
    ],
  },
  {
    title: "ASEP-1: CanteenEase (Canteen Management)",
    category: "System Design · Management",
    description:
      "Designed a comprehensive college canteen management system focused on improving operational efficiency and digital order management.",
    tags: ["System Design", "UI/UX Planning", "Project Management"],
    year: "2025",
    highlights: [
      "Designed a solution to improve efficiency in college canteens",
      "Focused on reducing waiting time and managing orders digitally",
      "Created basic workflow and user interface idea for ordering system",
      "Learned project planning, problem analysis, and teamwork",
    ],
  },
];

export const scrollNarrative = [
  {
    id: "hero",
    fadeIn: 0,
    fadeOut: 0.2,
    align: "left" as const,
    layout: "hero-editorial" as const,
    eyebrow: profile.eyebrow,
    title: profile.name,
    titleLines: profile.nameLines,
    subtitle: profile.tagline,
    parallax: 0.08,
  },
  {
    id: "build",
    fadeIn: 0.28,
    fadeOut: 0.48,
    align: "right" as const,
    title: "I build through code and curiosity.",
    titleLines: ["I build through", "code and curiosity."],
    subtitle: "Programming, IoT, and hands-on engineering projects.",
    parallax: -0.14,
  },
  {
    id: "bridge",
    fadeIn: 0.55,
    fadeOut: 0.75,
    align: "left" as const,
    title: "From problem-solving to real-world impact.",
    titleLines: ["From problem-solving", "to real-world", "impact."],
    subtitle: "Classroom foundations meeting practical project experience.",
    parallax: 0.16,
  },
];
