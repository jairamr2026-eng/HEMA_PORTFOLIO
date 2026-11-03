const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function run() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9239',
    '--window-size=1440,900',
    '--enable-webgl',
    '--use-gl=angle',
    '--use-angle=d3d11',
    '--ignore-gpu-blocklist',
    'http://localhost:3000'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  http.get('http://127.0.0.1:9239/json', (res) => {
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

          // 1. Hero before click
          const heroInitial = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync('hero_before_click.png', Buffer.from(heroInitial.data, 'base64'));
          console.log('Saved hero_before_click.png');

          // 2. Click the jellyfish bell (x=935, y=380)
          await send('Input.dispatchMouseEvent', {
            type: 'mousePressed',
            x: 935,
            y: 380,
            button: 'left',
            clickCount: 1
          });
          await send('Input.dispatchMouseEvent', {
            type: 'mouseReleased',
            x: 935,
            y: 380,
            button: 'left',
            clickCount: 1
          });

          // Wait 250ms into the dive reaction (peak compression & downward acceleration)
          await new Promise(r => setTimeout(r, 260));
          const heroClickReaction = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync('jellyfish_click_reaction.png', Buffer.from(heroClickReaction.data, 'base64'));
          console.log('Saved jellyfish_click_reaction.png');

          // 3. Contact Encounter: Clouds meeting in center
          await send('Runtime.evaluate', {
            expression: `(() => {
              const el = document.getElementById("contact");
              if (el) {
                const targetY = el.offsetTop - window.innerHeight * 0.75;
                window.scrollTo({ top: targetY, behavior: 'instant' });
              }
            })()`
          });
          await new Promise(r => setTimeout(r, 1200));
          const cloudClosed = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync('contact_cloud_closed.png', Buffer.from(cloudClosed.data, 'base64'));
          console.log('Saved contact_cloud_closed.png');

          // 4. Contact Parting: Clouds opening outward to the left & right
          await send('Runtime.evaluate', {
            expression: `(() => {
              const el = document.getElementById("contact");
              if (el) {
                const targetY = el.offsetTop - window.innerHeight * 0.40;
                window.scrollTo({ top: targetY, behavior: 'instant' });
              }
            })()`
          });
          await new Promise(r => setTimeout(r, 1200));
          const cloudParting = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync('contact_cloud_parting.png', Buffer.from(cloudParting.data, 'base64'));
          console.log('Saved contact_cloud_parting.png');

          // 5. Contact Settled: Clouds open, contact form and links revealed
          await send('Runtime.evaluate', {
            expression: `(() => {
              const el = document.getElementById("contact");
              if (el) {
                window.scrollTo({ top: el.offsetTop - 50, behavior: 'instant' });
              }
            })()`
          });
          await new Promise(r => setTimeout(r, 1200));
          const contactOpen = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync('contact_cloud_open.png', Buffer.from(contactOpen.data, 'base64'));
          console.log('Saved contact_cloud_open.png');

          // 6. Bottom Closing Statement: Scrolled all the way to bottom
          await send('Runtime.evaluate', {
            expression: `window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' });`
          });
          await new Promise(r => setTimeout(r, 1400));
          const statementBottom = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync('contact_statement_bottom.png', Buffer.from(statementBottom.data, 'base64'));
          console.log('Saved contact_statement_bottom.png');

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
