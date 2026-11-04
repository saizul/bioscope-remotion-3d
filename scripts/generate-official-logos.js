const fs = require('fs');
const path = require('path');

function generateLogomark(isDark = false) {
  const cx = 200, cy = 200;
  const numBlades = 32;
  const rInner = 104;
  const rOuter = 158;
  
  let blades = '';
  for (let i = 0; i < numBlades; i++) {
    const angle = (i / numBlades) * Math.PI * 2;
    const x1 = cx + Math.cos(angle) * rInner;
    const y1 = cy + Math.sin(angle) * rInner;
    
    const angle2 = angle + 0.38;
    const x2 = cx + Math.cos(angle2) * rOuter;
    const y2 = cy + Math.sin(angle2) * rOuter;
    
    const angleCtrl = angle + 0.12;
    const rCtrl = (rInner + rOuter) / 2 + 12;
    const cxP = cx + Math.cos(angleCtrl) * rCtrl;
    const cyP = cy + Math.sin(angleCtrl) * rCtrl;
    
    blades += `<path d="M ${x1.toFixed(2)} ${y1.toFixed(2)} Q ${cxP.toFixed(2)} ${cyP.toFixed(2)} ${x2.toFixed(2)} ${y2.toFixed(2)}" stroke="${isDark ? '#cbd5e1' : '#64748b'}" stroke-width="3.5" fill="none" stroke-linecap="round" />\n    `;
  }
  
  const outerBorderColor = isDark ? '#38bdf8' : '#002060';
  const coralColor = '#FA6955';
  const greenColor = '#00A86B';
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <!-- Outer Blue Ring -->
  <circle cx="200" cy="200" r="186" fill="none" stroke="${outerBorderColor}" stroke-width="8" />
  
  <!-- Coral / Salmon Accent Ring -->
  <circle cx="200" cy="200" r="172" fill="none" stroke="${coralColor}" stroke-width="18" />
  
  <!-- Annular Shutter / Turbine Blades Area -->
  <g>
    ${blades}
  </g>
  
  <!-- Inner Green Ring -->
  <circle cx="200" cy="200" r="104" fill="none" stroke="${greenColor}" stroke-width="10" />
</svg>`;
}

function generateFullLogo(isDark = false) {
  const mark = generateLogomark(isDark);
  const textColor = isDark ? '#ffffff' : '#002060';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 520" width="100%" height="100%">
  <g transform="translate(0, 0)">
    ${mark}
  </g>
  <text x="200" y="475" font-family="'Inter', 'Helvetica Neue', Arial, sans-serif" font-size="64" font-weight="900" fill="${textColor}" text-anchor="middle" letter-spacing="-1">Bioscope</text>
</svg>`;
}

const dir = path.join(__dirname, '../public/assets');
fs.mkdirSync(dir, { recursive: true });

fs.writeFileSync(path.join(dir, 'bioscope-logomark.svg'), generateLogomark(false));
fs.writeFileSync(path.join(dir, 'bioscope-logomark-dark.svg'), generateLogomark(true));
fs.writeFileSync(path.join(dir, 'bioscope-full-logo.svg'), generateFullLogo(false));
fs.writeFileSync(path.join(dir, 'bioscope-full-logo-dark.svg'), generateFullLogo(true));

console.log('✓ Successfully generated official Bioscope SVG assets in public/assets/');
