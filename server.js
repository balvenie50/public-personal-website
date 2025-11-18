import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
// import transporter from './emailConfig.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const BOT_ID = process.env.BOT_ID || '';
const CHAT_ID = process.env.CHAT_ID || '';
const startTime = new Date().toISOString();

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const serveStaticFile = (req, res) => {
  let filePath = path.join(__dirname, 'dist', req.url === '/' ? 'index.html' : req.url || '');
  
  // Handle client-side routing
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(__dirname, 'dist', 'index.html');
  }

  const extname = path.extname(filePath);
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found, serve index.html for SPA routing
        fs.readFile(path.join(__dirname, 'dist', 'index.html'), (err, content) => {
          if (err) {
            res.writeHead(500);
            res.end('Error loading index.html');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        res.writeHead(500);
        res.end('Server Error: ' + error.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
}

// API request handler
const handleApiRequest = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  const url = req.url;
  
  if (url === '/api/health') {
    res.writeHead(200);
    res.end(JSON.stringify({
      status: 'OK',
      timestamp: new Date().toISOString(),
      serverStartTime: startTime,
      uptime: Date.now() - new Date(startTime).getTime(),
      message: 'Server is running and healthy!'
    }));
  } else if (url === '/api/contact' && req.method === 'POST') {
    // Handle contact form submission
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        const contactData = JSON.parse(body);
        
        // Validate required fields
        if (!contactData.name || !contactData.email || !contactData.subject || !contactData.message) {
          res.writeHead(400);
          res.end(JSON.stringify({
            error: 'All fields are required',
            received: contactData
          }));
          return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contactData.email)) {
          res.writeHead(400);
          res.end(JSON.stringify({
            error: 'Please provide a valid email address',
            received: contactData
          }));
          return;
        }

        // Log the contact submission
        console.log('📧 New contact form submission:');
        console.log('   Name:', contactData.name);
        console.log('   Email:', contactData.email);
        console.log('   Subject:', contactData.subject);
        console.log('   Message:', contactData.message);
        console.log('   Timestamp:', new Date().toISOString());

        // Telegram message
        const telegramMessage = [
          '🔔 NEW CONTACT FORM SUBMISSION',
          '',
          `📅 Received: ${new Date().toLocaleString()}`,
          '',
          '👤 CONTACT INFORMATION',
          '─'.repeat(25),
          `Name: ${contactData.name}`,
          `Email: ${contactData.email}`,
          '',
          '💬 MESSAGE DETAILS',
          '─'.repeat(25),
          `Subject: ${contactData.subject}`,
          '',
          `Message:`,
          `${contactData.message}`
        ].join('\n');
        try {
          // Send the email
          // const info = await transporter.sendMail(mailOptions);
          // console.log('✅ Email sent successfully:', info.messageId);

          // Send Telegram message
          const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_ID}/sendMessage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              chat_id: CHAT_ID,
              text: telegramMessage
            })
          });

          // If Telegram API returns a non-OK response, return an error to the frontend
          if (!telegramResponse.ok) {
            const respText = await telegramResponse.text().catch(() => '');
            console.error('❌ Telegram API error', telegramResponse.status, respText);
            res.writeHead(502);
            res.end(JSON.stringify({
              error: 'NotificationFailed',
              userMessage: 'There was a problem sending a message. Please email me via the address under "Get In Touch" on the left.',
              details: `Telegram API returned ${telegramResponse.status}`
            }));
            return;
          }

          console.log('✅ Telegram message sent successfully:', telegramResponse.status);
          res.writeHead(200);
          res.end(JSON.stringify({
            message: 'Thank you for your message! I\'ll get back to you soon.',
            received: {
              name: contactData.name,
              email: contactData.email,
              subject: contactData.subject,
              messageLength: contactData.message.length
            },
            timestamp: new Date().toISOString()
          }));
        } catch (messageError) {
          console.error('❌ Failed to send a message:', messageError);
          // Return an error to the frontend so it can surface a friendly message to the user
          res.writeHead(502);
          res.end(JSON.stringify({
            error: 'NotificationFailed',
            userMessage: 'There was a problem sending a message. Please email me via the address under "Get In Touch" on the left.',
            details: messageError && messageError.message ? messageError.message : String(messageError)
          }));
          return;
        }

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.writeHead(400);
        res.end(JSON.stringify({
          error: 'Invalid JSON data',
          details: errorMessage
        }));
      }
    });
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({
      error: 'API endpoint not found',
      availableEndpoints: ['/api/health', '/api/contact (POST)']
    }));
  }
}

const server = http.createServer((req, res) => {
  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // CORS headers (only in development)
  if (NODE_ENV === 'development') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API endpoints
  if (req.url?.startsWith('/api/')) {
    handleApiRequest(req, res);
    return;
  }

  // Serve static files
  serveStaticFile(req, res);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running in ${NODE_ENV} mode on port ${PORT}`);
  console.log(`📅 Started at: ${startTime}`);
  console.log(`🌐 Visit http://localhost:${PORT}`);
  
  if (NODE_ENV === 'development') {
    console.log(`🔧 API endpoints available at http://localhost:${PORT}/api/`);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('📴 Received SIGTERM, shutting down gracefully');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
