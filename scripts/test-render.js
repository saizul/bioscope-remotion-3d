const path = require('path');
const { bundle } = require('@remotion/bundler');
const { renderMedia, selectComposition } = require('@remotion/renderer');

async function testRender() {
  console.log('1. Bundling entry file...');
  const entryPoint = path.join(__dirname, '../src/index.ts');
  const bundleLocation = await bundle({
    entryPoint,
    webpackOverride: (config) => config,
  });
  console.log('✓ Bundle created at:', bundleLocation);

  console.log('2. Selecting composition...');
  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: 'Scene6-Outro', // Test with short 360-frame scene
    chromiumOptions: {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-software-rasterizer',
      ],
    },
  });
  console.log('✓ Selected composition:', composition.id, `(${composition.durationInFrames} frames)`);

  const outputLocation = path.join(__dirname, '../out/test-outro.mp4');
  console.log('3. Rendering 30 frames test to:', outputLocation);
  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: 'h264',
    outputLocation,
    frameRange: [0, 30],
    chromiumOptions: {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    },
  });
  console.log('✓ Successfully rendered 30 frames test!');
}

testRender().catch((err) => {
  console.error('Render test failed:', err);
});
