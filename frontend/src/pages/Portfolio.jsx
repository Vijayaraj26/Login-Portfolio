import React, { useState, useEffect } from 'react';
import {
  Brain,
  Cpu,
  Eye,
  Activity,
  Music,
  Database,
  Layers,
  Sparkles,
  Code,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  Award,
  Briefcase,
  GraduationCap,
  Trophy,
  Compass,
  CheckCircle2,
  LogOut,
  ShieldCheck,
  Server,
  User,
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
  FileText,
  Sparkle
} from 'lucide-react';
import { candidateData } from '../data/portfolioData';

// Helper icon mapper for skill categories
const getSkillIcon = (iconName) => {
  switch (iconName) {
    case 'Code': return <Code size={20} className="skill-cat-icon" />;
    case 'Brain': return <Brain size={20} className="skill-cat-icon" />;
    case 'Cpu': return <Cpu size={20} className="skill-cat-icon" />;
    case 'Eye': return <Eye size={20} className="skill-cat-icon" />;
    case 'Activity': return <Activity size={20} className="skill-cat-icon" />;
    case 'Music': return <Music size={20} className="skill-cat-icon" />;
    case 'Database': return <Database size={20} className="skill-cat-icon" />;
    case 'Layers': return <Layers size={20} className="skill-cat-icon" />;
    case 'Sparkles': return <Sparkles size={20} className="skill-cat-icon" />;
    default: return <Brain size={20} className="skill-cat-icon" />;
  }
};

const Portfolio = ({ userData, backendStatus, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [copiedText, setCopiedText] = useState('');

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
  ];

  // Scrollspy to highlight active nav link
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const sectionId = navItems[i].href.substring(1);
        const element = document.getElementById(sectionId);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const username = userData?.username || localStorage.getItem('username') || 'Member';

  return (
    <div className="portfolio-wrapper" id="home">
      {/* Sticky Navigation Bar */}
      <header className="portfolio-navbar">
        <div className="navbar-container">
          <a href="#home" className="navbar-brand">
            <div className="brand-badge">
              <Brain size={20} />
            </div>
            <div className="brand-text">
              <span className="brand-name">{candidateData.name}</span>
              <span className="brand-role">AI / ML Portfolio</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`nav-link ${activeSection === item.href.substring(1) ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* User Status & Logout */}
          <div className="navbar-actions">
            <div className="user-pill" title={`Logged in as ${username}`}>
              <span className="user-status-dot"></span>
              <User size={15} />
              <span className="user-pill-name">{username}</span>
            </div>
            <button
              onClick={onLogout}
              className="btn-nav-logout"
              title="Sign Out"
              aria-label="Logout"
            >
              <LogOut size={16} />
              <span className="logout-text">Logout</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-nav-dropdown">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`mobile-nav-link ${activeSection === item.href.substring(1) ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mobile-nav-footer">
              <div className="mobile-user-info">
                <CheckCircle2 size={16} className="text-success" />
                <span>Signed in as <strong>{username}</strong></span>
              </div>
              <button onClick={onLogout} className="btn btn-danger btn-sm">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Authenticated Session & System Health Banner */}
      <div className="auth-status-bar">
        <div className="status-bar-inner">
          <div className="status-badge-item">
            <ShieldCheck size={16} className="text-success" />
            <span>Authenticated Session Active (JWT Verified)</span>
          </div>
          <div className="status-divider">|</div>
          <div className="status-badge-item">
            <Server size={16} className={backendStatus === 'connected' ? 'text-success' : 'text-warning'} />
            <span>Backend: {backendStatus === 'connected' ? 'FastAPI 8000 (Connected)' : 'Connecting...'}</span>
          </div>
          <div className="status-divider">|</div>
          <div className="status-badge-item">
            <Database size={16} className="text-success" />
            <span>Database: PostgreSQL (Connected)</span>
          </div>
        </div>
      </div>

      <main className="portfolio-content">
        {/* HERO SECTION */}
        <section className="section hero-section">
          <div className="hero-grid">
            <div className="hero-main">
              <div className="hero-status-pill">
                <span className="pulsing-dot"></span>
                <span>Available for AI / ML Roles & Projects</span>
              </div>
              <h1 className="hero-title">
                Hi, I'm <span className="gradient-text">{candidateData.name}</span>
              </h1>
              <h2 className="hero-subtitle">
                {candidateData.title}
              </h2>
              <p className="hero-description">
                {candidateData.heroIntro}
              </p>

              {/* Action Buttons */}
              <div className="hero-cta-group">
                <a href="#projects" className="btn btn-hero-primary">
                  <span>View Projects</span>
                  <ArrowUpRight size={18} />
                </a>
                <a
                  href={candidateData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-hero-outline"
                >
                  <Github size={18} />
                  <span>GitHub</span>
                </a>
                <a
                  href={candidateData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-hero-outline"
                >
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </a>
                <a href="#contact" className="btn btn-hero-secondary">
                  <Mail size={18} />
                  <span>Contact Me</span>
                </a>
              </div>
            </div>

            {/* Quick Contact & Profile Card */}
            <div className="hero-card-side">
              <div className="profile-glass-card">
                <div className="profile-header">
                  <div className="profile-avatar">
                    <Brain size={44} className="avatar-icon" />
                  </div>
                  <div>
                    <h3 className="profile-name">{candidateData.name}</h3>
                    <p className="profile-role">Junior ML Engineer</p>
                  </div>
                </div>

                <div className="profile-details-list">
                  <div className="profile-detail-row">
                    <Mail size={16} className="detail-icon" />
                    <a href={`mailto:${candidateData.contact.email}`} className="detail-link">
                      {candidateData.contact.email}
                    </a>
                  </div>
                  <div className="profile-detail-row">
                    <Phone size={16} className="detail-icon" />
                    <a href={`tel:${candidateData.contact.phone}`} className="detail-link">
                      {candidateData.contact.phone}
                    </a>
                  </div>
                  <div className="profile-detail-row">
                    <Linkedin size={16} className="detail-icon" />
                    <a
                      href={candidateData.contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="detail-link"
                    >
                      {candidateData.contact.linkedinDisplay}
                    </a>
                  </div>
                  <div className="profile-detail-row">
                    <Github size={16} className="detail-icon" />
                    <a
                      href={candidateData.contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="detail-link"
                    >
                      {candidateData.contact.githubDisplay}
                    </a>
                  </div>
                </div>

                <div className="profile-highlights">
                  <div className="profile-stat-box">
                    <span className="stat-number">3+</span>
                    <span className="stat-label">AI/ML Projects</span>
                  </div>
                  <div className="profile-stat-box">
                    <span className="stat-number">CNN</span>
                    <span className="stat-label">Vision Focus</span>
                  </div>
                  <div className="profile-stat-box">
                    <span className="stat-number">2027</span>
                    <span className="stat-label">B.E. AI & DS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RESUME SUMMARY BANNER */}
          <div className="resume-summary-banner">
            <div className="summary-icon-col">
              <div className="summary-icon-box">
                <FileText size={24} />
              </div>
            </div>
            <div className="summary-content-col">
              <h3 className="summary-heading">Professional Summary</h3>
              <p className="summary-text">{candidateData.resumeSummary}</p>
            </div>
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section className="section" id="about">
          <div className="section-header">
            <span className="section-eyebrow">Background</span>
            <h2 className="section-title">About Me</h2>
            <div className="section-line"></div>
          </div>

          <div className="about-grid">
            <div className="about-text-card">
              {candidateData.aboutMe.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="about-paragraph">{paragraph}</p>
              ))}
            </div>

            <div className="about-feature-grid">
              <div className="feature-mini-card">
                <div className="feature-icon-wrapper color-indigo">
                  <Brain size={22} />
                </div>
                <div>
                  <h4 className="feature-card-title">Computer Vision & CNN</h4>
                  <p className="feature-card-desc">Specialized in deep learning image classification, preprocessing & data augmentation pipelines.</p>
                </div>
              </div>

              <div className="feature-mini-card">
                <div className="feature-icon-wrapper color-cyan">
                  <Activity size={22} />
                </div>
                <div>
                  <h4 className="feature-card-title">Audio Feature Extraction</h4>
                  <p className="feature-card-desc">Hands-on experience in acoustic feature engineering using Librosa for audio classification models.</p>
                </div>
              </div>

              <div className="feature-mini-card">
                <div className="feature-icon-wrapper color-emerald">
                  <Briefcase size={22} />
                </div>
                <div>
                  <h4 className="feature-card-title">Industry Internship</h4>
                  <p className="feature-card-desc">Practical experience at Rodeo Digital developing machine learning models and CNN face mask detection.</p>
                </div>
              </div>

              <div className="feature-mini-card">
                <div className="feature-icon-wrapper color-purple">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <h4 className="feature-card-title">AI & Data Science Degree</h4>
                  <p className="feature-card-desc">Pursuing B.E. in Artificial Intelligence & Data Science at Dr. MCET (2023–2027).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section className="section" id="skills">
          <div className="section-header">
            <span className="section-eyebrow">Technical Competencies</span>
            <h2 className="section-title">Skills & Expertise</h2>
            <p className="section-subtitle">Categorized technologies and tools with practical application experience</p>
            <div className="section-line"></div>
          </div>

          <div className="skills-grid">
            {candidateData.skills.map((skillGroup, idx) => (
              <div key={idx} className="skill-card">
                <div className="skill-card-header">
                  <div className="skill-icon-wrap">
                    {getSkillIcon(skillGroup.icon)}
                  </div>
                  <h3 className="skill-group-title">{skillGroup.category}</h3>
                </div>
                <div className="skill-tags">
                  {skillGroup.items.map((skill, sIdx) => (
                    <span key={sIdx} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED PROJECTS SECTION */}
        <section className="section" id="projects">
          <div className="section-header">
            <span className="section-eyebrow">Portfolio Work</span>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">Real-world AI, Machine Learning, and Computer Vision solutions</p>
            <div className="section-line"></div>
          </div>

          <div className="projects-container">
            {candidateData.projects.map((project) => (
              <div
                key={project.id}
                className={`project-card ${project.isFeatured ? 'featured-project-card' : ''}`}
              >
                <div className="project-card-top">
                  <div className="project-badge-row">
                    {project.badge && (
                      <span className="project-leadership-badge">
                        <Sparkles size={14} />
                        {project.badge}
                      </span>
                    )}
                    <span className="project-date">{project.date}</span>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                </div>

                <div className="project-card-body">
                  <div className="project-description-text">
                    {project.description.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx} className="project-paragraph">{paragraph}</p>
                    ))}
                  </div>

                  <div className="project-contribution-box">
                    <strong className="contribution-label">Key Contribution:</strong>
                    <span className="contribution-text">{project.keyContribution}</span>
                  </div>

                  <div className="project-tech-stack">
                    {project.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE / INTERNSHIP SECTION */}
        <section className="section" id="experience">
          <div className="section-header">
            <span className="section-eyebrow">Professional History</span>
            <h2 className="section-title">Experience & Internships</h2>
            <div className="section-line"></div>
          </div>

          <div className="timeline-container">
            {candidateData.experience.map((exp, idx) => (
              <div key={idx} className="timeline-card">
                <div className="timeline-dot"></div>
                <div className="timeline-header">
                  <div>
                    <div className="timeline-role-badge">
                      <Briefcase size={15} />
                      <span>{exp.role}</span>
                    </div>
                    <h3 className="timeline-company">{exp.company}</h3>
                    <p className="timeline-meta">{exp.location} • <span className="timeline-period">{exp.period}</span></p>
                  </div>
                </div>
                <div className="timeline-body">
                  {exp.description.split('\n\n').map((para, pIdx) => (
                    <p key={pIdx} className="timeline-paragraph">{para}</p>
                  ))}
                  <div className="timeline-tech-tags">
                    {exp.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="tech-pill-small">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section className="section" id="education">
          <div className="section-header">
            <span className="section-eyebrow">Academic Background</span>
            <h2 className="section-title">Education</h2>
            <div className="section-line"></div>
          </div>

          <div className="education-grid">
            {candidateData.education.map((edu, idx) => (
              <div key={idx} className="education-card">
                <div className="education-icon-box">
                  <GraduationCap size={24} />
                </div>
                <div className="education-info">
                  <span className="education-period">{edu.period}</span>
                  <h3 className="education-degree">{edu.degree}</h3>
                  <h4 className="education-institution">{edu.institution}</h4>
                  <p className="education-highlight">{edu.highlight}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS & ACHIEVEMENTS */}
        <div className="dual-section-grid">
          {/* CERTIFICATIONS */}
          <section className="section nested-section" id="certifications">
            <div className="section-header">
              <span className="section-eyebrow">Credentials</span>
              <h2 className="section-title">Certifications</h2>
              <div className="section-line"></div>
            </div>

            <div className="certifications-list">
              {candidateData.certifications.map((cert, idx) => (
                <div key={idx} className="cert-card">
                  <div className="cert-icon-wrap">
                    <Award size={22} className="text-indigo" />
                  </div>
                  <div className="cert-content">
                    <h4 className="cert-name">{cert.name}</h4>
                    <p className="cert-issuer">{cert.issuer}</p>
                    <span className="cert-tag">{cert.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ACHIEVEMENTS */}
          <section className="section nested-section" id="achievements">
            <div className="section-header">
              <span className="section-eyebrow">Recognition</span>
              <h2 className="section-title">Achievements</h2>
              <div className="section-line"></div>
            </div>

            <div className="achievements-list">
              {candidateData.achievements.map((ach, idx) => (
                <div key={idx} className="achievement-card">
                  <div className="ach-icon-wrap">
                    <Trophy size={22} className="text-amber" />
                  </div>
                  <div className="ach-content">
                    <h4 className="ach-title">{ach.title}</h4>
                    <p className="ach-desc">{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* CAREER INTERESTS SECTION */}
        <section className="section" id="interests">
          <div className="section-header">
            <span className="section-eyebrow">Focus Areas</span>
            <h2 className="section-title">Career Interests</h2>
            <div className="section-line"></div>
          </div>

          <div className="interests-pill-cloud">
            {candidateData.careerInterests.map((interest, idx) => (
              <div key={idx} className="interest-chip">
                <Sparkle size={15} className="interest-sparkle" />
                <span>{interest}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="section" id="contact">
          <div className="section-header">
            <span className="section-eyebrow">Get In Touch</span>
            <h2 className="section-title">Contact Vijayaraj</h2>
            <p className="section-subtitle">Feel free to reach out directly via email, phone, or connect on LinkedIn and GitHub</p>
            <div className="section-line"></div>
          </div>

          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon-box">
                <Mail size={24} />
              </div>
              <h4 className="contact-label">Email</h4>
              <a href={`mailto:${candidateData.contact.email}`} className="contact-value">
                {candidateData.contact.email}
              </a>
              <button
                onClick={() => handleCopy(candidateData.contact.email, 'Email')}
                className="btn-copy"
              >
                {copiedText === 'Email' ? 'Copied!' : 'Copy Email'}
              </button>
            </div>

            <div className="contact-card">
              <div className="contact-icon-box">
                <Phone size={24} />
              </div>
              <h4 className="contact-label">Phone</h4>
              <a href={`tel:${candidateData.contact.phone}`} className="contact-value">
                {candidateData.contact.phone}
              </a>
              <button
                onClick={() => handleCopy(candidateData.contact.phone, 'Phone')}
                className="btn-copy"
              >
                {copiedText === 'Phone' ? 'Copied!' : 'Copy Phone'}
              </button>
            </div>

            <div className="contact-card">
              <div className="contact-icon-box">
                <Linkedin size={24} />
              </div>
              <h4 className="contact-label">LinkedIn</h4>
              <a
                href={candidateData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-value"
              >
                {candidateData.contact.linkedinDisplay}
              </a>
              <a
                href={candidateData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-external"
              >
                <span>Open Profile</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-icon-box">
                <Github size={24} />
              </div>
              <h4 className="contact-label">GitHub</h4>
              <a
                href={candidateData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-value"
              >
                {candidateData.contact.githubDisplay}
              </a>
              <a
                href={candidateData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-external"
              >
                <span>Open GitHub</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="portfolio-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-name">{candidateData.name}</span>
            <span className="footer-role">AI & Data Science Engineer</span>
          </div>
          <p className="footer-text">
            © {new Date().getFullYear()} Vijayaraj R. Authenticated Dashboard Session.
          </p>
          <a href="#home" className="btn-back-to-top">
            <span>Back to top</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
