/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const glbPath = path.resolve(__dirname, '../public/jellyfish_animated_3d.glb');
const buffer = fs.readFileSync(glbPath);
const jsonChunkLength = buffer.readUInt32LE(12);
const jsonStr = buffer.toString('utf8', 20, 20 + jsonChunkLength);
const gltf = JSON.parse(jsonStr);

console.log('=== ANIMATIONS DETAILS ===');
if (gltf.animations) {
  gltf.animations.forEach((anim, i) => {
    console.log(`Anim [${i}]: "${anim.name}" channels: ${anim.channels.length}, samplers: ${anim.samplers.length}`);
    const sampler0 = anim.samplers[0];
    const inputAcc = gltf.accessors[sampler0.input];
    console.log(`   Input accessor:`, inputAcc);
    const targets = new Set();
    anim.channels.forEach(ch => {
      const nodeName = gltf.nodes[ch.target.node]?.name || ch.target.node;
      targets.add(`${nodeName} (${ch.target.path})`);
    });
    console.log(`   Targets (${targets.size}):`, Array.from(targets));
  });
}

console.log('\n=== MATERIALS DETAILS ===');
if (gltf.materials) {
  gltf.materials.forEach((mat, i) => {
    console.log(`Material [${i}]: "${mat.name}"`);
    console.log(`   pbr:`, JSON.stringify(mat.pbrMetallicRoughness));
    console.log(`   alphaMode:`, mat.alphaMode);
    console.log(`   doubleSided:`, mat.doubleSided);
    console.log(`   extensions:`, mat.extensions ? Object.keys(mat.extensions) : 'none');
  });
}

console.log('\n=== SCENE ROOT NODES ===');
const scene = gltf.scenes[gltf.scene || 0];
console.log('Root nodes:', scene.nodes.map(n => ({ id: n, name: gltf.nodes[n].name })));

// Let's compute global bounding box across all mesh primitives
let globalMin = [Infinity, Infinity, Infinity];
let globalMax = [-Infinity, -Infinity, -Infinity];
if (gltf.meshes) {
  gltf.meshes.forEach(m => {
    m.primitives.forEach(p => {
      if (p.attributes.POSITION !== undefined) {
        const acc = gltf.accessors[p.attributes.POSITION];
        if (acc.min && acc.max) {
          for (let c = 0; c < 3; c++) {
            if (acc.min[c] < globalMin[c]) globalMin[c] = acc.min[c];
            if (acc.max[c] > globalMax[c]) globalMax[c] = acc.max[c];
          }
        }
      }
    });
  });
}
console.log('\n=== BOUNDING BOX RANGE (Local primitive space) ===');
console.log('Min:', globalMin);
console.log('Max:', globalMax);
console.log('Size:', [globalMax[0] - globalMin[0], globalMax[1] - globalMin[1], globalMax[2] - globalMin[2]]);
