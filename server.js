const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3021;
const OUT_DIR = path.join(__dirname, 'out');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain',
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';

  // Handle Next.js RSC requests (client-side navigation only)
  // Only 'rsc: 1' header indicates a true RSC flight data request
  // 'next-router-prefetch' is for prefetching and still needs HTML, not .txt
  const isRSC = req.headers['rsc'] === '1';

  let filePath = path.join(OUT_DIR, urlPath);

  // If no extension, handle route resolution
  if (!path.extname(filePath)) {
    if (isRSC) {
      // RSC request: serve the .txt flight data file
      if (fs.existsSync(filePath + '.txt')) {
        filePath = filePath + '.txt';
      } else if (fs.existsSync(path.join(filePath, 'index.txt'))) {
        filePath = path.join(filePath, 'index.txt');
      } else if (fs.existsSync(filePath + '.html')) {
        filePath = filePath + '.html';
      } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
        filePath = path.join(filePath, 'index.html');
      }
    } else {
      // Normal request: serve HTML
      if (fs.existsSync(filePath + '.html')) {
        filePath = filePath + '.html';
      } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
        filePath = path.join(filePath, 'index.html');
      }
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  let contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // RSC flight data needs special content type
  if (ext === '.txt' && isRSC) {
    contentType = 'text/x-component';
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Fallback to 404.html if it exists
      const notFoundPath = path.join(OUT_DIR, '404.html');
      fs.readFile(notFoundPath, (err2, notFoundData) => {
        if (err2) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(notFoundData);
        }
      });
      return;
    }
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': (ext === '.html' || ext === '.txt') ? 'no-cache' : 'public, max-age=31536000, immutable',
    });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`PoPP Landing Page serving on port ${PORT}`);
});
