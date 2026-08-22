import dotenv from "dotenv";
import mongoose from "mongoose";
import Project from "./models/Project.js";

dotenv.config();

const projects = [
  {
    title: "GEN-AI RESUME",
    description:
      "AI-powered interview preparation platform that analyzes job descriptions and resumes to generate personalized interview strategies, mock questions and preparation roadmaps.",
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Gemini API",
      "JWT",
      "Puppeteer"
    ],
    github: "https://github.com/Sulekha550",
    live: "",
    featured: true
  },
  {
    title: "Fixify",
    description:
      "Full-stack service booking platform developed using the MERN Stack with JWT Authentication, Role-Based Authorization and scalable MVC backend architecture.",
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT"
    ],
    github: "https://github.com/Sulekha550/Fixify",
    live: "",
    featured: true
  },
  {
    title: "K72 Agency Website Clone",
    description:
      "Responsive clone of the K72 Agency website built using reusable React components and responsive layouts.",
    technologies: ["React.js", "HTML5", "CSS3"],
    github: "https://github.com/Sulekha550/K72-Project-Clone",
    live: "",
    featured: false
  }
];

try {
  await mongoose.connect(process.env.MONGO_URI);
  await Project.deleteMany({});
  await Project.insertMany(projects);
  console.log("✅ Project data seeded successfully");
  await mongoose.disconnect();
} catch (error) {
  console.error("❌ Seed error:", error.message);
  process.exit(1);
}
