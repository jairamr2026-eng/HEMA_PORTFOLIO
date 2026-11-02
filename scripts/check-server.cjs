const http = require('http');

// Just test that http server is responding cleanly
http.get('http://localhost:3000', (res) => {
  console.log('HTTP Status:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTML length received:', data.length);
  });
}).on('error', err => {
  console.error('Error fetching localhost:3000:', err.message);
});
