import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Edit3, Plus, LogOut, MessageSquare } from "lucide-react";
import "./admin.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const emptyProject = {
  title: "",
  description: "",
  technologies: "",
  github: "",
  live: "",
  featured: false
};

export default function Admin({ onLogout }) {
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState(emptyProject);
  const [editing, setEditing] = useState(null);
  const [tab, setTab] = useState("projects");
  const [status, setStatus] = useState("");

  async function loadData() {
    try {
      const [projectsResponse, messagesResponse] = await Promise.all([
        axios.get(`${API}/projects`),
        axios.get(`${API}/messages`)
      ]);

      setProjects(projectsResponse.data.projects || []);
      setMessages(messagesResponse.data.messages || []);
    } catch {
      setStatus("Backend is not running.");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      ...form,
      technologies: form.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    };

    try {
      if (editing) {
        await axios.put(`${API}/projects/${editing}`, payload);
      } else {
        await axios.post(`${API}/projects`, payload);
      }

      setForm(emptyProject);
      setEditing(null);
      setStatus("Saved successfully.");
      loadData();
    } catch {
      setStatus("Could not save project.");
    }
  }

  function editProject(project) {
    setEditing(project._id);
    setForm({
      ...project,
      technologies: (project.technologies || []).join(", ")
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteProject(id) {
    if (!window.confirm("Delete this project?")) return;

    try {
      await axios.delete(`${API}/projects/${id}`);
      loadData();
    } catch {
      setStatus("Could not delete project.");
    }
  }

  function cancelEdit() {
    setEditing(null);
    setForm(emptyProject);
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <span>PORTFOLIO ADMIN</span>
          <h1>Sulekha Chauhan</h1>
        </div>

        <button onClick={onLogout}>
          <LogOut size={17} /> Logout
        </button>
      </header>

      <div className="admin-tabs">
        <button
          className={tab === "projects" ? "active" : ""}
          onClick={() => setTab("projects")}
        >
          Projects
        </button>

        <button
          className={tab === "messages" ? "active" : ""}
          onClick={() => setTab("messages")}
        >
          <MessageSquare size={16} /> Messages ({messages.length})
        </button>
      </div>

      {tab === "projects" ? (
        <div className="admin-grid">
          <form className="admin-form" onSubmit={handleSubmit}>
            <h2>{editing ? "Edit Project" : "Add Project"}</h2>

            <input
              required
              placeholder="Project title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <textarea
              required
              rows="5"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <input
              required
              placeholder="Technologies, comma separated"
              value={form.technologies}
              onChange={(e) =>
                setForm({ ...form, technologies: e.target.value })
              }
            />

            <input
              placeholder="GitHub URL"
              value={form.github}
              onChange={(e) => setForm({ ...form, github: e.target.value })}
            />

            <input
              placeholder="Live URL"
              value={form.live}
              onChange={(e) => setForm({ ...form, live: e.target.value })}
            />

            <label className="check">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
              />
              Featured project
            </label>

            <div className="admin-actions">
              <button className="save" type="submit">
                {editing ? <Edit3 size={16} /> : <Plus size={16} />}
                {editing ? "Update" : "Add"} Project
              </button>

              {editing && (
                <button type="button" onClick={cancelEdit}>
                  Cancel
                </button>
              )}
            </div>

            {status && <p className="admin-status">{status}</p>}
          </form>

          <div className="admin-list">
            <h2>Projects</h2>

            {projects.map((project) => (
              <div className="admin-item" key={project._id}>
                <div>
                  <b>{project.title}</b>
                  <p>{project.description}</p>
                  <small>
                    {(project.technologies || []).join(" • ")}
                  </small>
                </div>

                <div className="item-actions">
                  <button onClick={() => editProject(project)}>
                    <Edit3 size={16} />
                  </button>
                  <button onClick={() => deleteProject(project._id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="messages">
          <h2>Contact Messages</h2>

          {messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            messages.map((message) => (
              <article key={message._id}>
                <b>{message.name}</b>
                <a href={`mailto:${message.email}`}>{message.email}</a>
                <p>{message.message}</p>
                <small>
                  {new Date(message.createdAt).toLocaleString()}
                </small>
              </article>
            ))
          )}
        </div>
      )}
    </div>
  );
}
