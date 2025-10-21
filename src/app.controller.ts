import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { join } from 'path';
import { existsSync } from 'fs';

@Controller()
export class AppController {
  @Get()
  getRoot(): string {
    return `
      <html>
        <head>
          <title>Dan GV Damiano | Portfolio</title>
          <link rel="stylesheet" href="/style.css">
        </head>
        <body class="home">
          <div class="center fade-in">
            <h1>🚀 Welcome to My Portfolio</h1>
            <p>Hi, I’m <b>Dan GV Damiano</b> — a <span class="highlight">Full Stack Developer</span>.</p>
            <div class="links">
              <a href="/portfolio" class="button">💼 View My Projects</a>
              <a href="/resume" class="button secondary">📄 View My Resume</a>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  @Get('portfolio')
  getPortfolio() {
    return { name: 'Dan GV Damiano', title: 'Full Stack Developer' };
  }

  @Get('resume')
  getResumeHtml(): string {
    return `
      <html>
        <head>
          <title>Dan GV Damiano | Resume</title>
          <link rel="stylesheet" href="/style.css">
        </head>
        <body class="resume-page">
          <div class="header">
            <button class="mode-toggle" onclick="toggleMode()">🌓</button>
            <h1>Dan GV Damiano</h1>
            <p>Full Stack Developer</p>
          </div>
          <div class="container fade-in">
            <h2>Summary</h2>
            <p>Creative developer passionate about full-stack development, UI/UX design, and emerging web technologies.</p>
            <div style="text-align:center;">
              <a href="/resume/download" class="button">⬇ Download PDF Resume</a>
            </div>
          </div>
          <script>
            function toggleMode(){
              document.body.classList.toggle('dark-mode');
              localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            }
            if(localStorage.getItem('darkMode') === 'true'){
              document.body.classList.add('dark-mode');
            }
          </script>
        </body>
      </html>
    `;
  }

  @Get('resume/download')
  getResumeFile(@Res() res: Response) {
    const filePath = join(__dirname, '..', 'public', 'resume.pdf');
    if (!existsSync(filePath)) {
      return res.status(404).send('Resume not found. Upload resume.pdf to /public.');
    }
    res.setHeader('Content-Disposition', 'attachment; filename="DanGV-Resume.pdf"');
    res.setHeader('Content-Type', 'application/pdf');
    return res.sendFile(filePath);
  }
}
