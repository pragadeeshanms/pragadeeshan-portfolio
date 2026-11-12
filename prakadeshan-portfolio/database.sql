CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  tech_stack VARCHAR(255) NOT NULL,
  project_url VARCHAR(500) DEFAULT NULL,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  subject VARCHAR(180) DEFAULT '',
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO projects (title, category, description, tech_stack, project_url, sort_order)
SELECT * FROM (
  SELECT 'PRANOVA AI', 'AI / Computer Vision',
  'An AI-based system for deepfake detection and image authenticity analysis.',
  'Python, AI/ML, Computer Vision', 'https://pranova-ai.lovable.app/', 1
  UNION ALL
  SELECT 'FLIPSKILL', 'Web Application',
  'A skill-exchange platform that helps users share skills and learn from one another.',
  'Web Development, Database', '', 2
  UNION ALL
  SELECT 'AI in Cybersecurity', 'Research',
  'Academic research on applications of Artificial Intelligence in Cybersecurity.',
  'Artificial Intelligence, Cybersecurity', '', 3
) AS seed
WHERE NOT EXISTS (SELECT 1 FROM projects);
