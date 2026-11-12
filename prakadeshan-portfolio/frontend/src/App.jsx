import { useEffect, useState } from "react";
import {
  ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Menu, X,
  Code2, BrainCircuit, Database, Globe, Moon, Sun, Send, CheckCircle2
} from "lucide-react";

const API = "http://localhost:5000";

const fallbackProjects = [
  { id: 1, title: "PRANOVA AI", category: "AI / COMPUTER VISION", description: "An AI-based deepfake detection and image authenticity analysis system focused on identifying manipulated visual content.", tech_stack: "Python · AI/ML · Computer Vision", project_url: "https://pranova-ai.lovable.app/" },
  { id: 2, title: "FLIPSKILL", category: "WEB APPLICATION", description: "A skill-exchange platform designed to help people share what they know and learn new skills from others.", tech_stack: "Web Development · Database", project_url: "" },
  { id: 3, title: "AI IN CYBERSECURITY", category: "RESEARCH", description: "Academic journal and research work exploring how Artificial Intelligence can support cybersecurity.", tech_stack: "Artificial Intelligence · Cybersecurity", project_url: "" }
];

const skills = [
  { icon: Code2, title: "Programming", items: ["Python", "C#", "JavaScript"] },
  { icon: Globe, title: "Web Development", items: ["React.js", "HTML & CSS", "Node.js", "Express.js"] },
  { icon: Database, title: "Database", items: ["MySQL", "Database Design"] },
  { icon: BrainCircuit, title: "Areas of Interest", items: ["Artificial Intelligence", "Cybersecurity", "Computer Vision"] }
];

export default function App() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/projects`)
      .then(r => { if (!r.ok) throw new Error("API unavailable"); return r.json(); })
      .then(data => { if (Array.isArray(data) && data.length) setProjects(data); })
      .catch(() => {});
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true); setStatus("");
    try {
      const response = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to send message.");
      setStatus("Message sent. Thanks for reaching out!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("Backend connection failed. Start the backend and check your MySQL settings.");
    } finally { setSending(false); }
  };

  const closeMenu = () => setMenuOpen(false);
  const nav = ["About", "Skills", "Projects", "Contact"];

  return (
    <div className={dark ? "site dark" : "site light"}>
      <header className="header">
        <a className="brand" href="#home" onClick={closeMenu}>P<span>.</span></a>
        <nav className={menuOpen ? "nav open" : "nav"}>
          {nav.map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>)}
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Let's talk <ArrowUpRight size={15}/></a>
        </nav>
        <div className="header-actions">
          <button className="icon-btn" aria-label="Toggle theme" onClick={() => setDark(!dark)}>{dark ? <Sun size={18}/> : <Moon size={18}/>}</button>
          <button className="icon-btn menu-btn" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
        </div>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse"/> AVAILABLE FOR OPPORTUNITIES</div>
            <p className="intro">Hello, I'm</p>
            <h1>Pragadeeshan MS<span className="accent">.</span></h1>
            <h2>Software Systems Student <span className="muted">&</span><br/>Aspiring Developer.</h2>
            <p className="hero-desc">I enjoy building useful digital experiences and exploring how technology can solve real-world problems — from web applications to AI-powered systems.</p>
            <div className="hero-buttons">
              <a className="btn primary" href="#projects">Explore my work <ArrowUpRight size={17}/></a>
              <a className="btn secondary" href="#contact">Contact me <Mail size={16}/></a>
            </div>
            <div className="socials">
              <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18}/></a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18}/></a>
              <span className="social-line"/>
              <span className="mono small">COIMBATORE, INDIA</span>
            </div>
          </div>
          <div className="hero-art" aria-label="Decorative technology graphic">
            <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
            <div className="core"><span>P<span className="accent">.</span></span><small>BUILD · LEARN · CREATE</small></div>
            <div className="float-card card-top"><Code2 size={17}/><span>DEVELOPMENT</span></div>
            <div className="float-card card-bottom"><BrainCircuit size={17}/><span>ARTIFICIAL INTELLIGENCE</span></div>
            <div className="art-dot dot-one"/><div className="art-dot dot-two"/>
          </div>
          <a className="scroll-hint" href="#about"><ArrowDown size={15}/> SCROLL TO EXPLORE</a>
        </section>

        <section className="content-section section-wrap" id="about">
          <div className="section-label">01 / ABOUT</div>
          <div className="section-grid">
            <h2 className="section-title">Curious mind.<br/><span className="muted">Practical builder.</span></h2>
            <div className="about-copy">
              <p>I'm currently pursuing a <strong>Bachelor's degree in Software Systems</strong> at Sri Krishna Arts and Science College, Coimbatore.</p>
              <p>My interests include software development, Artificial Intelligence and cybersecurity. Through academic projects and research, I've been learning to turn concepts into working solutions.</p>
              <p>I value clear communication, teamwork and continuous learning — and I'm looking forward to applying these skills in real-world projects.</p>
              <div className="about-meta"><div><strong>03+</strong><span>Academic projects</span></div><div><strong>01</strong><span>Research publication</span></div><div><strong>2027</strong><span>Graduation batch</span></div></div>
            </div>
          </div>
        </section>

        <section className="content-section section-wrap" id="skills">
          <div className="section-label">02 / SKILLS</div>
          <div className="section-heading"><h2 className="section-title">Tools I work with<span className="accent">.</span></h2><p>A growing toolkit shaped by coursework, projects and hands-on practice.</p></div>
          <div className="skills-grid">
            {skills.map(({icon: Icon, title, items}) => <article className="skill-card" key={title}><div className="skill-icon"><Icon size={21}/></div><h3>{title}</h3><div className="chips">{items.map(x => <span key={x}>{x}</span>)}</div></article>)}
          </div>
        </section>

        <section className="content-section section-wrap" id="projects">
          <div className="section-label">03 / SELECTED WORK</div>
          <div className="section-heading"><h2 className="section-title">Projects & research<span className="accent">.</span></h2><p>A few things I've explored, designed and developed.</p></div>
          <div className="projects-grid">
            {projects.map((project, i) => <article className="project-card" key={project.id}>
              <div className="project-top"><span className="mono">0{i+1}</span><span className="project-category">{project.category}</span></div>
              <div className={`project-visual visual-${i%3}`}><div className="visual-ring"/><span>{i===0 ? "AI" : i===1 ? "↔" : "⌘"}</span></div>
              <h3>{project.title}</h3><p>{project.description}</p>
              <div className="project-bottom"><span className="mono tech">{project.tech_stack}</span>{project.project_url ? <a href={project.project_url} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}><ArrowUpRight size={19}/></a> : <span className="project-soon">ACADEMIC WORK</span>}</div>
            </article>)}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-wrap contact-inner">
            <div className="section-label">04 / GET IN TOUCH</div>
            <div className="contact-grid">
              <div><h2 className="section-title">Have a project<br/>in mind<span className="accent">?</span></h2><p className="contact-desc">Have an opportunity, collaboration or just want to connect? Send me a message.</p><a className="email-link" href="mailto:hello@example.com"><Mail size={18}/> hello@example.com <ArrowUpRight size={16}/></a></div>
              <form className="contact-form" onSubmit={submit}>
                <div className="form-row"><label>Your name<input required maxLength="100" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name"/></label><label>Email address<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com"/></label></div>
                <label>Subject<input value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} placeholder="What is this about?"/></label>
                <label>Message<textarea required rows="4" maxLength="5000" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Write your message..."/></label>
                <button className="btn primary submit-btn" disabled={sending}>{sending ? "Sending..." : "Send message"} <Send size={16}/></button>
                {status && <p className="form-status"><CheckCircle2 size={16}/>{status}</p>}
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer section-wrap"><a className="brand" href="#home">P<span>.</span></a><span>Designed & built with curiosity.</span><span className="mono">© {new Date().getFullYear()} PRAGADEESHAN MS</span></footer>
    </div>
  );
}
