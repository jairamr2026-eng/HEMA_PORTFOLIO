const { spawn } = require('child_process');
const http = require('http');

async function run() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--window-size=1440,900',
    'http://localhost:3000'
  ]);

  // wait 2 seconds for chrome to start
  await new Promise(r => setTimeout(r, 2000));

  http.get('http://127.0.0.1:9222/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', async () => {
      try {
        const targets = JSON.parse(data);
        const pageTarget = targets.find(t => t.type === 'page');
        if (!pageTarget) {
          console.log('No page target found');
          chromeProc.kill();
          return;
        }

        const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
        let id = 1;
        const send = (method, params = {}) => new Promise((resolve) => {
          const reqId = id++;
          const handler = (event) => {
            const msg = JSON.parse(event.data);
            if (msg.id === reqId) {
              ws.removeEventListener('message', handler);
              resolve(msg.result);
            }
          };
          ws.addEventListener('message', handler);
          ws.send(JSON.stringify({ id: reqId, method, params }));
        });

        ws.onopen = async () => {
          console.log('CDP Connected!');
          await send('Page.enable');
          await send('Runtime.enable');

          // Wait 3.5 seconds for jellyfish and shaders to render
          await new Promise(r => setTimeout(r, 3500));

          // 1. Take hero screenshot
          const heroShot = await send('Page.captureScreenshot', { format: 'png' });
          const fs = require('fs');
          fs.writeFileSync('J:\\hema\\portfolio\\ocean_hero_verified.png', Buffer.from(heroShot.data, 'base64'));
          console.log('Hero screenshot captured!');

          // 2. Click Projects navigation item to test water drop ripple and scroll
          await send('Runtime.evaluate', {
            expression: `
              const navBtn = Array.from(document.querySelectorAll('nav button')).find(b => b.textContent.includes('Projects'));
              if (navBtn) {
                const rect = navBtn.getBoundingClientRect();
                const clickEvent = new MouseEvent('click', {
                  bubbles: true,
                  cancelable: true,
                  clientX: rect.left + rect.width / 2,
                  clientY: rect.top + rect.height / 2
                });
                navBtn.dispatchEvent(clickEvent);
              }
            `
          });

          // Wait 250ms during ripple animation
          await new Promise(r => setTimeout(r, 220));
          const rippleShot = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync('J:\\hema\\portfolio\\nav_water_ripple.png', Buffer.from(rippleShot.data, 'base64'));
          console.log('Nav water ripple screenshot captured!');

          // Wait for smooth scroll to finish (1.5 seconds)
          await new Promise(r => setTimeout(r, 1400));
          const projShot = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync('J:\\hema\\portfolio\\projects_ocean_verified.png', Buffer.from(projShot.data, 'base64'));
          fs.copyFileSync('J:\\hema\\portfolio\\projects_ocean_verified.png', 'C:\\Users\\jaira\\.gemini\\antigravity\\brain\\dc252187-5085-433f-a8bf-cc79aff07d3a\\projects_preview.png');
          console.log('Projects section screenshot captured!');

          ws.close();
          chromeProc.kill();
        };
      } catch (err) {
        console.error('Error in CDP:', err);
        chromeProc.kill();
      }
    });
  }).on('error', (err) => {
    console.error('Failed to connect to Chrome debug port:', err);
    chromeProc.kill();
  });
}

run();
