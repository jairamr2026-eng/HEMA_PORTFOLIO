const fs = require('fs');
const path = require('path');

const glbPath = path.resolve(__dirname, '../public/jellyfish_animated_3d.glb');
const buffer = fs.readFileSync(glbPath);

// GLB Header
const magic = buffer.readUInt32LE(0);
const version = buffer.readUInt32LE(4);
const length = buffer.readUInt32LE(8);

console.log(`GLB Magic: 0x${magic.toString(16)} (expected 0x46546c67)`);
console.log(`GLB Version: ${version}`);
console.log(`Total Length: ${length} bytes`);

// Chunk 0: JSON
const jsonChunkLength = buffer.readUInt32LE(12);
const jsonChunkType = buffer.readUInt32LE(16);
console.log(`JSON Chunk Length: ${jsonChunkLength}`);

const jsonStr = buffer.toString('utf8', 20, 20 + jsonChunkLength);
const gltf = JSON.parse(jsonStr);

console.log('\n--- GLTF METADATA ---');
console.log('Asset:', gltf.asset);

console.log('\n--- SCENES & NODES ---');
console.log(`Number of nodes: ${gltf.nodes ? gltf.nodes.length : 0}`);
if (gltf.nodes) {
  gltf.nodes.forEach((node, idx) => {
    console.log(`Node [${idx}]: name="${node.name || 'unnamed'}", mesh=${node.mesh !== undefined ? node.mesh : 'none'}, skin=${node.skin !== undefined ? node.skin : 'none'}, children=${node.children ? JSON.stringify(node.children) : '[]'}`);
    if (node.translation) console.log(`   translation: ${JSON.stringify(node.translation)}`);
    if (node.rotation) console.log(`   rotation: ${JSON.stringify(node.rotation)}`);
    if (node.scale) console.log(`   scale: ${JSON.stringify(node.scale)}`);
  });
}

console.log('\n--- ANIMATIONS ---');
console.log(`Number of animations: ${gltf.animations ? gltf.animations.length : 0}`);
if (gltf.animations) {
  gltf.animations.forEach((anim, idx) => {
    console.log(`Animation [${idx}]: name="${anim.name}", samplers=${anim.samplers.length}, channels=${anim.channels.length}`);
    anim.channels.slice(0, 10).forEach((ch, cIdx) => {
      const targetNode = gltf.nodes ? gltf.nodes[ch.target.node]?.name : ch.target.node;
      console.log(`   ch[${cIdx}]: target node "${targetNode}" (node index ${ch.target.node}), path="${ch.target.path}"`);
    });
    if (anim.channels.length > 10) {
      console.log(`   ... and ${anim.channels.length - 10} more channels`);
    }
  });
}

console.log('\n--- SKINS (Rigging) ---');
console.log(`Number of skins: ${gltf.skins ? gltf.skins.length : 0}`);
if (gltf.skins) {
  gltf.skins.forEach((skin, idx) => {
    console.log(`Skin [${idx}]: name="${skin.name}", joints count=${skin.joints ? skin.joints.length : 0}`);
    if (skin.joints) {
      console.log('Joint names:', skin.joints.map(j => gltf.nodes[j]?.name || j));
    }
  });
}

console.log('\n--- MATERIALS ---');
console.log(`Number of materials: ${gltf.materials ? gltf.materials.length : 0}`);
if (gltf.materials) {
  gltf.materials.forEach((mat, idx) => {
    console.log(`Material [${idx}]: name="${mat.name}"`);
    console.log(`   pbrMetallicRoughness:`, mat.pbrMetallicRoughness);
    console.log(`   alphaMode: ${mat.alphaMode || 'OPAQUE'}, doubleSided: ${mat.doubleSided}`);
    if (mat.transmission) console.log(`   transmission:`, mat.transmission);
  });
}

console.log('\n--- MESHES & BOUNDS (From Accessors) ---');
console.log(`Number of meshes: ${gltf.meshes ? gltf.meshes.length : 0}`);
if (gltf.meshes) {
  gltf.meshes.forEach((mesh, idx) => {
    console.log(`Mesh [${idx}]: name="${mesh.name}"`);
    mesh.primitives.forEach((prim, pIdx) => {
      const posAccIdx = prim.attributes.POSITION;
      if (posAccIdx !== undefined && gltf.accessors) {
        const acc = gltf.accessors[posAccIdx];
        console.log(`   Prim [${pIdx}]: count=${acc.count}, min=${JSON.stringify(acc.min)}, max=${JSON.stringify(acc.max)}`);
      }
    });
  });
}
