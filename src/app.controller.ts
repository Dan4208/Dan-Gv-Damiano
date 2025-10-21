import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { join } from 'path';
import { existsSync } from 'fs';

@Controller()
export class AppController {
  // Homepage
  @Get()
  getRoot(): string {
    return `
      <html>
        <head>
          <title>Dan GV Damiano | Portfolio</title>
          <style>
            body { font-family: 'Segoe UI', sans-serif; margin: 40px; background: #f9fafb; color: #333; text-align: center; }
            h1 { color: #1e3a8a; font-size: 2.2em; }
            a { color: #2563eb; text-decoration: none; }
            a:hover { text-decoration: underline; }
            .links { margin-top: 20px; }
          </style>
        </head>
        <body>
          <h1>Demo Testing</h1>
          <p>Hi, I’m <b>Dan GV Damiano</b> — a Full Stack Developer passionate about creating impactful digital experiences.</p>
          <div class="links">
            <p>💼 <a href="/portfolio">View My Projects</a></p>
            <p>📄 <a href="/resume">View My Resume</a></p>
          </div>
        </body>
      </html>
    `;
  }

  // Portfolio (JSON)
  @Get('portfolio')
  getPortfolio() {
    return {
      name: 'Jane Doe',
      title: 'Full Stack Developer',
      description: 'Building modern web applications using NestJS and React.',
      projects: [
        { name: 'Awesome App', tech: ['NestJS', 'React', 'PostgreSQL'] },
        { name: 'Portfolio Site', tech: ['Next.js', 'TailwindCSS'] },
        { name: 'API Gateway', tech: ['NestJS', 'GraphQL', 'Redis'] },
      ],
      contact: {
        email: 'jane@example.com',
        github: 'https://github.com/janedoe',
        linkedin: 'https://linkedin.com/in/janedoe',
      },
    };
  }

  // Stylish HTML Resume
  @Get('resume')
  getResumeHtml(): string {
    return `
      <html>
        <head>
          <title>Jane Doe | Resume</title>
          <style>
            body { font-family: 'Segoe UI', sans-serif; margin: 40px; background: #f8fafc; color: #111827; line-height: 1.6; }
            .container { max-width: 850px; margin: auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
            h1, h2, h3 { color: #1e3a8a; }
            h1 { border-bottom: 3px solid #2563eb; padding-bottom: 10px; }
            .section { margin-top: 35px; }
            ul { padding-left: 20px; }
            li { margin-bottom: 8px; }
            a { color: #2563eb; text-decoration: none; }
            a:hover { text-decoration: underline; }
            .download { margin-top: 40px; text-align: center; }
            .button {
              display: inline-block; background: #2563eb; color: white;
              padding: 10px 22px; border-radius: 8px; text-decoration: none;
              transition: background 0.3s;
            }
            .button:hover { background: #1d4ed8; }
            .header-info { margin-bottom: 20px; }
            .header-info p { margin: 5px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Jane Doe</h1>
            <div class="header-info">
              <h2>Full Stack Developer</h2>
              <p>Email: <a href="mailto:jane@example.com">jane@example.com</a> |
                 GitHub: <a href="https://github.com/janedoe">janedoe</a> |
                 LinkedIn: <a href="https://linkedin.com/in/janedoe">in/janedoe</a></p>
            </div>

            <div class="section">
              <h3>Summary</h3>
              <p>Passionate software developer with 5+ years of experience building high-performance web applications. 
              Skilled in full-stack JavaScript (NestJS, React, Next.js) and cloud-based solutions. 
              I enjoy solving complex problems and turning ideas into real, user-focused products.</p>
            </div>

            <div class="section">
              <h3>Experience</h3>
              <ul>
                <li><b>Software Engineer</b> at Acme Corp (2021–Present) — Designed and maintained scalable APIs with NestJS, PostgreSQL, and Redis.</li>
                <li><b>Frontend Developer</b> at Webify (2019–2021) — Developed rich UI components and dashboards using React and TailwindCSS.</li>
                <li><b>Intern</b> at DevStudio (2018–2019) — Built prototype apps and automated internal tools with Node.js.</li>
              </ul>
            </div>

            <div class="section">
              <h3>Skills</h3>
              <ul>
                <li><b>Languages:</b> TypeScript, JavaScript, Python</li>
                <li><b>Frameworks:</b> NestJS, React, Next.js</li>
                <li><b>Databases:</b> PostgreSQL, MongoDB</li>
                <li><b>Tools:</b> Docker, Git, AWS, CI/CD</li>
              </ul>
            </div>

            <div class="section">
              <h3>Certifications</h3>
              <ul>
                <li>AWS Certified Developer – Associate</li>
                <li>Google Cloud Professional Engineer</li>
                <li>Scrum Master Certified (SMC)</li>
              </ul>
            </div>

            <div class="section">
              <h3>Education</h3>
              <p>B.S. in Computer Science, MIT (2014–2018)</p>
            </div>

            <div class="section">
              <h3>Hobbies & Interests</h3>
              <ul>
                <li>🎸 Playing electric guitar and composing music</li>
                <li>📸 Photography and digital art</li>
                <li>🌍 Traveling and exploring new cultures</li>
                <li>🧠 Mentoring junior developers and open-source contributions</li>
              </ul>
            </div>

            <div class="download">
              <a href="/resume/download" class="button">⬇ Download PDF Resume</a>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  // PDF Download Route
  @Get('resume/download')
  getResumeFile(@Res() res: Response) {
    const filePath = join(__dirname, '..', 'public', 'resume.pdf');

    if (!existsSync(filePath)) {
      return res
        .status(404)
        .send('Resume not found. Please upload resume.pdf to the /public folder.');
    }

    res.setHeader('Content-Disposition', 'attachment; filename="JaneDoe-Resume.pdf"');
    res.setHeader('Content-Type', 'application/pdf');

    return res.sendFile(filePath);
  }
}
