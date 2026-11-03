const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function run() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9240',
    '--window-size=1440,900',
    '--enable-webgl',
    '--use-gl=angle',
    '--use-angle=d3d11',
    '--ignore-gpu-blocklist',
    'http://localhost:3000'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  http.get('http://127.0.0.1:9240/json', (res) => {
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
          await send('Page.enable');
          await send('Runtime.enable');
          await new Promise(r => setTimeout(r, 4000));

          // 1. Contact Page: Should be completely open and clean, no clouds
          await send('Runtime.evaluate', {
            expression: `(() => {
              const el = document.getElementById("contact");
              if (el) {
                window.scrollTo({ top: el.offsetTop, behavior: 'instant' });
              }
            })()`
          });
          await new Promise(r => setTimeout(r, 1200));
          const contactPage = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync('contact_clean_no_clouds.png', Buffer.from(contactPage.data, 'base64'));
          console.log('Saved contact_clean_no_clouds.png');

          // 2. Footer Page - Initial Cloud Concealment
          await send('Runtime.evaluate', {
            expression: `(() => {
              const el = document.getElementById("closing-statement");
              if (el) {
                const targetY = el.offsetTop - window.innerHeight * 0.70;
                window.scrollTo({ top: targetY, behavior: 'instant' });
              }
            })()`
          });
          await new Promise(r => setTimeout(r, 1200));
          const footerCloudClosed = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync('footer_cloud_closed.png', Buffer.from(footerCloudClosed.data, 'base64'));
          console.log('Saved footer_cloud_closed.png');

          // 3. Footer Page - Clouds Parting Outward on Scroll
          await send('Runtime.evaluate', {
            expression: `(() => {
              const el = document.getElementById("closing-statement");
              if (el) {
                const targetY = el.offsetTop - window.innerHeight * 0.35;
                window.scrollTo({ top: targetY, behavior: 'instant' });
              }
            })()`
          });
          await new Promise(r => setTimeout(r, 1200));
          const footerCloudParting = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync('footer_cloud_parting.png', Buffer.from(footerCloudParting.data, 'base64'));
          console.log('Saved footer_cloud_parting.png');

          // 4. Footer Page - Settled and fully revealed
          await send('Runtime.evaluate', {
            expression: `window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' });`
          });
          await new Promise(r => setTimeout(r, 1400));
          const footerRevealed = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync('footer_cloud_revealed.png', Buffer.from(footerRevealed.data, 'base64'));
          console.log('Saved footer_cloud_revealed.png');

          ws.close();
          chromeProc.kill();
        };
      } catch (err) {
        console.error(err);
        chromeProc.kill();
      }
    });
  });
}

run();
