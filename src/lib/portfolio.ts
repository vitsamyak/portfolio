export const profile = {
  name: "Samyak Vikas Gedam",
  nameLines: ["Samyak", "Vikas", "Gedam"],
  tagline: "B.E. Computer Engineering · Pune University · Batch 2029",
  eyebrow: "Portfolio",
  email: "samyakgedam69@gmail.com",
  phone: "+91 9420296105",
  location: "Chandrapur, Maharashtra, India",
  dob: "28 / 03 / 2006",
  languages: ["English", "Hindi", "Marathi"],
  nationality: "Indian",
  linkedin: "https://linkedin.com/in/samyak-gedam",
  github: "https://github.com/samyak-gedam",
};

export const objective =
  "Motivated Computer Engineering student with a strong interest in programming and software development. Eager to apply problem-solving skills and gain practical experience in real-world projects.";

export const education = [
  {
    degree: "B.E. Computer Engineering",
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
    school: "Maharashtra State Board",
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
    items: ["Java (Basic)", "C++ (Basic)", "Python (Basic)"],
  },
  {
    label: "Web",
    items: ["HTML", "CSS (Learning)", "JavaScript (Learning)", "Full Stack Development (Learning)", "AI Development (Learning)", "AI Design (Learning)"],
  },
  {
    label: "Tools",
    items: ["VS Code", "Git (Basic)"],
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
      "Working prototype using ultrasonic sensors to detect pedestrians, automate traffic signal control, and integrate Firebase for real-time monitoring and data handling.",
    tags: ["Arduino", "Ultrasonic Sensors", "Firebase", "IoT"],
    year: "2025",
    highlights: [
      "Automated traffic signals based on real-time pedestrian detection",
      "Firebase integration for monitoring and data handling",
      "Applied IoT concepts to a real-world safety problem",
    ],
  },
  {
    title: "ASEP-1: Smart Zebra Crossing",
    category: "Planning & Design",
    description:
      "Studied pedestrian safety at crossings and planned a smart solution using sensors and automation, including workflow, structure, and team coordination.",
    tags: ["Research", "System Design", "Teamwork"],
    year: "2025",
    highlights: [
      "Problem analysis for pedestrian safety at crossings",
      "Basic design, workflow, and project structure",
      "Developed teamwork and project planning skills",
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
