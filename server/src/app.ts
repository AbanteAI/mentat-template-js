import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

export const app = express();
export const PORT = process.env.PORT || 5000;
export const CLIENT_DIST_PATH = path.join(__dirname, '../../client/dist');

// Middleware
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse JSON bodies
app.use(express.static(CLIENT_DIST_PATH)); // Serve static files from client/dist

// Basic route
app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Mentat API!' });
});

// Serve React app or fallback page
app.get('*', (req: Request, res: Response) => {
  const indexPath = path.join(CLIENT_DIST_PATH, 'index.html');

  // Check if the built client exists
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    // Serve a nice fallback page when the client hasn't been built
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Mentat Template JS - Development Server</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
            }
            
            .container {
              text-align: center;
              max-width: 600px;
              padding: 2rem;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 20px;
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.2);
              box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            }
            
            h1 {
              font-size: 2.5rem;
              margin-bottom: 1rem;
              background: linear-gradient(45deg, #fff, #f0f0f0);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
            
            .subtitle {
              font-size: 1.2rem;
              margin-bottom: 2rem;
              opacity: 0.9;
            }
            
            .build-info {
              background: rgba(0, 0, 0, 0.2);
              padding: 1.5rem;
              border-radius: 10px;
              margin: 2rem 0;
              text-align: left;
            }
            
            .build-info h3 {
              margin-bottom: 1rem;
              color: #ffd700;
            }
            
            .command {
              background: rgba(0, 0, 0, 0.3);
              padding: 0.5rem 1rem;
              border-radius: 5px;
              font-family: 'Courier New', monospace;
              display: inline-block;
              margin: 0.25rem 0;
            }
            
            .api-link {
              display: inline-block;
              margin-top: 1rem;
              padding: 1rem 2rem;
              background: rgba(255, 255, 255, 0.2);
              border: none;
              border-radius: 50px;
              color: white;
              text-decoration: none;
              font-weight: bold;
              transition: all 0.3s ease;
            }
            
            .api-link:hover {
              background: rgba(255, 255, 255, 0.3);
              transform: translateY(-2px);
            }
            
            .status {
              margin-top: 2rem;
              padding: 1rem;
              background: rgba(0, 255, 0, 0.2);
              border-radius: 10px;
              border-left: 4px solid #00ff00;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🚀 Mentat Template JS</h1>
            <p class="subtitle">Development Server Running</p>
            
            <div class="build-info">
              <h3>📦 Build the Project</h3>
              <p>To see the full React application, build the client first:</p>
              <br>
              <div class="command">npm run build</div>
              <br><br>
              <p>Or start the development server with hot reloading:</p>
              <br>
              <div class="command">npm run dev</div>
            </div>
            
            <div class="status">
              <strong>✅ API Server Active</strong><br>
              The Express backend is running and ready to serve API requests.
            </div>
            
            <a href="/api" class="api-link">Test API Endpoint →</a>
          </div>
        </body>
      </html>
    `);
  }
});
