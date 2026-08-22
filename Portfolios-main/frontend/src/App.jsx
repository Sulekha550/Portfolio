import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  Code2,
  Server,
  Database,
  ExternalLink,
  Award,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Sun,
  Moon,
} from "lucide-react";

import Admin from "./Admin.jsx";
import Login from "./Login.jsx";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const fallbackProjects = [
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
    ],
    github: "https://github.com/Sulekha550",
    featured: true,
  },
  {
    title: "Fixify",
    description:
      "Full-stack service booking platform using MERN Stack with JWT Authentication, Role-Based Authorization and MVC Architecture.",
    technologies: ["React.js", "Node.js", "MongoDB", "JWT"],
    github: "https://github.com/Sulekha550/Fixify",
    featured: true,
  },
  {
    title: "K72 Agency Website Clone",
    description:
      "Responsive agency website clone built using React.js with reusable components and modern responsive layouts.",
    technologies: ["React.js", "HTML5", "CSS3"],
    github: "https://github.com/Sulekha550/K72-Project-Clone",
  },
];

function App() {
  const [adminLogged, setAdminLogged] = useState(
    localStorage.getItem("portfolio_admin") === "true"
  );

  const isAdmin = window.location.pathname === "/admin";

  const [projects, setProjects] = useState(fallbackProjects);
  const [menu, setMenu] = useState(false);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("portfolio_theme") === "dark"
  );

  const [accent, setAccent] = useState(
    localStorage.getItem("portfolio_accent") || "orange"
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");

  // ================= THEME =================

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
    document.documentElement.dataset.accent = accent;

    localStorage.setItem(
      "portfolio_theme",
      darkMode ? "dark" : "light"
    );

    localStorage.setItem("portfolio_accent", accent);
  }, [darkMode, accent]);

  // ================= FETCH PROJECTS =================

  useEffect(() => {
    axios
      .get(`${API}/projects`)
      .then((res) => {
        if (res.data?.projects?.length) {
          setProjects(res.data.projects);
        }
      })
      .catch(() => {
        // Fallback projects will remain visible
      });
  }, []);

  // ================= SCROLL =================

  const scrollTo = (id) => {
    setMenu(false);

    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // ================= CONTACT =================

  const submitContact = async (e) => {
    e.preventDefault();

    setStatus("Sending...");
    setStatusType("");

    try {
      await axios.post(`${API}/messages`, form);

      setForm({
        name: "",
        email: "",
        message: "",
      });

      setStatus("Message sent successfully!");
      setStatusType("success");
    } catch (error) {
      setStatus(
        "Unable to send. Please make sure the backend is running."
      );
      setStatusType("error");
    }
  };

  // ================= ADMIN LOGIN =================

  if (isAdmin && !adminLogged) {
    return (
      <Login
        onLogin={() => {
          setAdminLogged(true);
        }}
      />
    );
  }

  // ================= ADMIN PANEL =================

  if (isAdmin && adminLogged) {
    return (
      <Admin
        onLogout={() => {
          localStorage.removeItem("portfolio_admin");
          setAdminLogged(false);
        }}
      />
    );
  }

  // ================= MAIN WEBSITE =================

  return (
    <div className="portfolio-app">

      {/* ================= NAVBAR ================= */}

      <header className="navbar">

        <button
          className="brand"
          onClick={() => scrollTo("home")}
        >
          Sulekha<span>.</span>
        </button>

        <nav className={menu ? "nav-links open" : "nav-links"}>
          {[
            "home",
            "about",
            "experience",
            "skills",
            "projects",
            "achievements",
            "certifications",
            "contact",
          ].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </nav>

        <div className="navbar-right">

          {/* Accent Colors */}

          <div className="color-picker">
            {[
              "orange",
              "purple",
              "blue",
              "green",
              "pink",
            ].map((color) => (
              <button
                key={color}
                type="button"
                aria-label={`Change accent to ${color}`}
                className={`color-dot ${color} ${
                  accent === color ? "active" : ""
                }`}
                onClick={() => setAccent(color)}
              />
            ))}
          </div>

          {/* Dark Mode */}

          <button
            type="button"
            className="theme-toggle"
            onClick={() => setDarkMode((value) => !value)}
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>

          {/* Contact Button */}

          <button
            type="button"
            className="nav-cta"
            onClick={() => scrollTo("contact")}
          >
            Let's Talk
            <ArrowUpRight size={16} />
          </button>

          {/* Mobile Menu */}

          <button
            type="button"
            className="mobile-menu"
            onClick={() => setMenu((value) => !value)}
            aria-label="Toggle navigation"
          >
            {menu ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main>

        {/* ================= HERO ================= */}

        <section id="home" className="section hero">

          <div className="hero-copy">

            <div className="status-badge">
              <span className="status-dot" />
              Available for opportunities
            </div>

            <p className="eyebrow">
              MERN STACK DEVELOPER
            </p>

            <h1>
              Building modern{" "}
              <span>digital experiences.</span>
            </h1>

            <p className="hero-lead">
              MERN Stack Developer passionate about building
              full-stack web applications and solving
              real-world problems through modern web
              technologies.
            </p>

            <div className="actions">

              <button
                type="button"
                className="primary"
                onClick={() => scrollTo("projects")}
              >
                View My Projects
                <ArrowUpRight size={18} />
              </button>

              <button
                type="button"
                className="secondary"
                onClick={() => scrollTo("contact")}
              >
                Contact Me
              </button>

            </div>

            <div className="socials">

              <a
                href="https://github.com/Sulekha550"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>

              <a
                href="https://linkedin.com/in/sulekha-chauhan-4648a130b"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>

              <a
                href="mailto:chauhansulekha550@gmail.com"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>

            </div>

          </div>

          {/* HERO ART */}

          <div className="hero-art">

            <div className="hero-grid" />

            <div className="gradient-orb">
              <div className="orb-inner">
                <Code2 size={70} />
              </div>
            </div>

            <div className="floating-card card-one">

              <Code2 size={18} />

              <div>
                <strong>Frontend</strong>
                <small>React.js</small>
              </div>

            </div>

            <div className="floating-card card-two">

              <Server size={18} />

              <div>
                <strong>Backend</strong>
                <small>Node.js</small>
              </div>

            </div>

            <div className="terminal">

              <div className="terminal-head">
                <span />
                <span />
                <span />
              </div>

              <pre>
{`const developer = {
  name: "Sulekha Chauhan",
  role: "MERN Stack Developer",
  focus: "Full-Stack Web Apps",
  mindset: "Build. Learn. Improve."
};`}
              </pre>

            </div>

          </div>

        </section>

        {/* ================= ABOUT ================= */}

        <section id="about" className="section">

          <SectionTitle
            number="01"
            label="ABOUT ME"
            title={
              <>
                Turning ideas into{" "}
                <span>working products.</span>
              </>
            }
          />

          <div className="about-grid">

            <div>

              <p className="large-text">
                MERN Stack Developer with experience building
                full-stack web applications using React.js,
                Node.js, Express.js and MongoDB.
              </p>

              <p className="muted">
                Skilled in REST API development, JWT
                Authentication, responsive UI design and
                scalable backend architecture. Passionate
                about solving real-world problems through
                modern web technologies.
              </p>

              <div className="about-stats">

                <div>
                  <strong>10+</strong>
                  <span>Technologies</span>
                </div>

                <div>
                  <strong>3+</strong>
                  <span>Projects</span>
                </div>

                <div>
                  <strong>2+</strong>
                  <span>Internships</span>
                </div>

              </div>

            </div>

            <div className="info-card">

              <GraduationCap size={32} />

              <div>

                <strong>
                  B.Tech — Information Technology
                </strong>

                <small>
                  Buddha Institute of Technology
                  <br />
                  CGPA 8.0/10 • 2022–2026
                </small>

              </div>

            </div>

          </div>

        </section>

        {/* ================= EXPERIENCE ================= */}

        <section
          id="experience"
          className="section dark-section"
        >

          <SectionTitle
            number="02"
            label="EXPERIENCE"
            title={
              <>
                Where I've <span>worked.</span>
              </>
            }
            dark
          />

          <div className="timeline">

            <Experience
              role="Full Stack Developer Intern"
              company="JCRM Technology"
              date="Jul 2026 – Aug 2026"
              location="Remote"
              points={[
                "Developed responsive frontend pages using React.js, HTML5, CSS3, JavaScript and Tailwind CSS.",
                "Built REST APIs using Node.js, Express.js and MongoDB for CRUD operations.",
                "Worked with Git/GitHub, debugging, testing and application performance optimization.",
              ]}
            />

            <Experience
              role="Web Development Trainee"
              company="EISystem Technologies"
              date="Jun 2025 – Jul 2025"
              location="Remote"
              points={[
                "Completed intensive training in HTML5, CSS3, JavaScript and Bootstrap.",
                "Built responsive web pages using Bootstrap Grid System.",
                "Improved UI consistency through structured styling practices.",
              ]}
            />

          </div>

        </section>

        {/* ================= SKILLS ================= */}

        <section id="skills" className="section">

          <SectionTitle
            number="03"
            label="TECHNICAL SKILLS"
            title={
              <>
                My technical <span>toolkit.</span>
              </>
            }
          />

          <div className="skills-grid">

            <Skill
              icon={<Code2 />}
              title="Languages"
              items={[
                "JavaScript",
                "Java",
                "C",
              ]}
            />

            <Skill
              icon={<Code2 />}
              title="Frontend"
              items={[
                "React.js",
                "HTML5",
                "CSS3",
                "SCSS",
                "Tailwind CSS",
                "Bootstrap",
              ]}
            />

            <Skill
              icon={<Server />}
              title="Backend"
              items={[
                "Node.js",
                "Express.js",
                "REST APIs",
                "JWT Authentication",
              ]}
            />

            <Skill
              icon={<Database />}
              title="Database"
              items={[
                "MongoDB",
                "Mongoose",
              ]}
            />

            <Skill
              icon={<Code2 />}
              title="Tools"
              items={[
                "Git",
                "GitHub",
                "Postman",
                "VS Code",
              ]}
            />

            <Skill
              icon={<ShieldCheck />}
              title="Concepts"
              items={[
                "Data Structures",
                "OOP",
                "MVC Architecture",
                "Authentication",
              ]}
            />

          </div>

        </section>

        {/* ================= PROJECTS ================= */}

        <section id="projects" className="section">

          <SectionTitle
            number="04"
            label="PROJECTS"
            title={
              <>
                Things I've <span>built.</span>
              </>
            }
          />

          <div className="projects-grid">

            {projects.map((project, index) => (

              <article
                className={`project-card ${
                  project.featured ? "featured" : ""
                }`}
                key={project._id || project.title}
              >

                <div className="project-top">

                  <span className="project-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {project.featured && (
                    <span className="featured-label">
                      FEATURED
                    </span>
                  )}

                </div>

                <div className="project-icon">
                  <Code2 size={25} />
                </div>

                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div className="tags">

                  {project.technologies?.map(
                    (technology) => (
                      <span key={technology}>
                        {technology}
                      </span>
                    )
                  )}

                </div>

                <div className="project-links">

                  <a
                    href={
                      project.github ||
                      "https://github.com/Sulekha550"
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github size={18} />
                    GitHub
                  </a>

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink size={18} />
                      Live
                    </a>
                  )}

                </div>

              </article>

            ))}

          </div>

        </section>

        {/* ================= ACHIEVEMENTS ================= */}

        <section
          id="achievements"
          className="section dark-section"
        >

          <SectionTitle
            number="05"
            label="ACHIEVEMENTS"
            title={
              <>
                Milestones I'm{" "}
                <span>proud of.</span>
              </>
            }
            dark
          />

          <div className="achievement-grid">

            <Achievement
              icon={<Award />}
              title="Academic Excellence Award"
              text="Awarded Academic Excellence Award at Buddha Institute of Technology."
            />

            <Achievement
              icon={<Award />}
              title="First Position in Data Structures"
              text="Secured First Position in Data Structures."
            />

          </div>

        </section>

        {/* ================= CERTIFICATIONS ================= */}

        <section
          id="certifications"
          className="section"
        >

          <SectionTitle
            number="06"
            label="CERTIFICATIONS"
            title={
              <>
                Learning beyond the{" "}
                <span>classroom.</span>
              </>
            }
          />

          <div className="cert-grid">

            <Certificate
              name="Getting Started with AI"
              issuer="IBM"
            />

            <Certificate
              name="Introduction to Java"
              issuer="LearnTube.AI"
            />

            <Certificate
              name="AIIP Certified — C, HTML, CSS"
              issuer="AIIP"
            />

          </div>

        </section>

        {/* ================= CONTACT ================= */}

        <section
          id="contact"
          className="section contact-section"
        >

          <div className="contact-copy">

            <p className="eyebrow">
              07 — CONTACT
            </p>

            <h2>
              Let's build something{" "}
              <span>great together.</span>
            </h2>

            <p className="muted">
              Have an opportunity, project or just want to
              connect? Send me a message.
            </p>

            <div className="contact-info">

              <a href="mailto:chauhansulekha550@gmail.com">
                <Mail size={18} />
                chauhansulekha550@gmail.com
              </a>

              <a href="tel:+918081946167">
                <Briefcase size={18} />
                +91-8081946167
              </a>

            </div>

          </div>

          <form
            className="contact-form"
            onSubmit={submitContact}
          >

            <label>
              Name

              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                placeholder="Your name"
              />
            </label>

            <label>
              Email

              <input
                required
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                placeholder="you@example.com"
              />
            </label>

            <label>
              Message

              <textarea
                required
                rows="6"
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value,
                  })
                }
                placeholder="Tell me about your project..."
              />
            </label>

            <button
              className="primary submit"
              type="submit"
            >
              Send Message
              <ArrowUpRight size={18} />
            </button>

            {status && (
              <p className={`status ${statusType}`}>
                {status}
              </p>
            )}

          </form>

        </section>

      </main>

      {/* ================= FOOTER ================= */}

      <footer>

        <strong>
          Sulekha<span>.</span>
        </strong>

        <p>
          © 2026 Sulekha Chauhan • MERN Stack Developer
        </p>

        <a href="#home">
          Back to top ↑
        </a>

      </footer>

    </div>
  );
}

/* =====================================================
   SECTION TITLE
===================================================== */

function SectionTitle({
  number,
  label,
  title,
  dark = false,
}) {
  return (
    <div className="section-title">

      <p className="eyebrow">
        {number} — {label}
      </p>

      <h2 className={dark ? "dark-title" : ""}>
        {title}
      </h2>

    </div>
  );
}

/* =====================================================
   EXPERIENCE
===================================================== */

function Experience({
  role,
  company,
  date,
  location,
  points,
}) {
  return (
    <article className="experience">

      <span className="timeline-dot" />

      <div className="experience-main">

        <div className="experience-head">

          <div>

            <h3>{role}</h3>

            <strong>{company}</strong>

          </div>

          <div>

            <b>{date}</b>

            <small>{location}</small>

          </div>

        </div>

        <ul>

          {points.map((point) => (
            <li key={point}>
              {point}
            </li>
          ))}

        </ul>

      </div>

    </article>
  );
}

/* =====================================================
   SKILL
===================================================== */

function Skill({
  icon,
  title,
  items,
}) {
  return (
    <article className="skill-card">

      <div className="skill-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <div className="skill-tags">

        {items.map((item) => (
          <span key={item}>
            {item}
          </span>
        ))}

      </div>

    </article>
  );
}

/* =====================================================
   ACHIEVEMENT
===================================================== */

function Achievement({
  icon,
  title,
  text,
}) {
  return (
    <article className="achievement">

      <div>
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

    </article>
  );
}

/* =====================================================
   CERTIFICATE
===================================================== */

function Certificate({
  name,
  issuer,
}) {
  return (
    <article className="certificate">

      <div className="cert-icon">
        <Award size={28} />
      </div>

      <div>

        <span>{issuer}</span>

        <h3>{name}</h3>

      </div>

    </article>
  );
}

export default App;