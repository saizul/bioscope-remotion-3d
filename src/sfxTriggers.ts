import type { SFXTrigger } from './types';

// Frame-accurate sound effects for the master timeline. Kept free of React so
// scripts/check-timeline.ts can validate it in Node. Ids start with s<scene>_ and the
// frame must fall inside that scene (checked by `npm run check`).
export const SFX_TRIGGERS: SFXTrigger[] = [
  // Scene 1: 0 - 450
  { id: 's1_whoosh_intro', name: 'Scene 1 Camera Whoosh', frame: 0, file: 'whoosh.mp3', volume: 0.8 },
  { id: 's1_swoosh_logo', name: '3D Logo Assembly Swoosh', frame: 30, file: 'swoosh.mp3', volume: 0.85 },
  { id: 's1_pop_tagline', name: 'Tagline Reveal Pop', frame: 80, file: 'pop.mp3', volume: 0.75 },
  { id: 's1_chime_map', name: '3D Bangladesh Map Chime', frame: 150, file: 'chime.mp3', volume: 0.9 },
  { id: 's1_pop_districts', name: '64 Districts Glow Pop', frame: 210, file: 'pop.mp3', volume: 0.7 },
  { id: 's1_click_partner', name: 'Partner Accreditation Click', frame: 320, file: 'click.mp3', volume: 0.65 },
  { id: 's1_whoosh_trans', name: 'Transition to Scene 2', frame: 420, file: 'whoosh.mp3', volume: 0.8 },

  // Scene 2: 450 - 1050
  { id: 's2_whoosh_enter', name: 'Scene 2 Enter Whoosh', frame: 450, file: 'whoosh.mp3', volume: 0.8 },
  { id: 's2_swoosh_hex1', name: 'Service 1: Consultancy Swoosh', frame: 480, file: 'swoosh.mp3', volume: 0.7 },
  { id: 's2_swoosh_hex2', name: 'Service 2: Manpower Swoosh', frame: 520, file: 'swoosh.mp3', volume: 0.7 },
  { id: 's2_swoosh_hex3', name: 'Service 3: Digital IT Swoosh', frame: 560, file: 'swoosh.mp3', volume: 0.7 },
  { id: 's2_swoosh_hex4', name: 'Service 4: Research Swoosh', frame: 600, file: 'swoosh.mp3', volume: 0.7 },
  { id: 's2_swoosh_hex5', name: 'Service 5: Event Mgmt Swoosh', frame: 640, file: 'swoosh.mp3', volume: 0.7 },
  { id: 's2_swoosh_hex6', name: 'Service 6: Procurement Swoosh', frame: 680, file: 'swoosh.mp3', volume: 0.7 },
  { id: 's2_click_cnt1', name: 'Counter 10+ Years Click', frame: 740, file: 'click.mp3', volume: 0.75 },
  { id: 's2_click_cnt2', name: 'Counter 100+ Projects Click', frame: 780, file: 'click.mp3', volume: 0.75 },
  { id: 's2_click_cnt3', name: 'Counter 1500+ Manpower Click', frame: 820, file: 'click.mp3', volume: 0.75 },
  { id: 's2_click_cnt4', name: 'Counter 64 Districts Click', frame: 860, file: 'click.mp3', volume: 0.75 },
  { id: 's2_chime_complete', name: 'Milestone Numbers Chime', frame: 980, file: 'chime.mp3', volume: 0.95 },
  { id: 's2_whoosh_trans', name: 'Transition to Scene 3', frame: 1020, file: 'whoosh.mp3', volume: 0.8 },

  // Scene 3: 1050 - 1950
  { id: 's3_whoosh_enter', name: 'Scene 3 Enter Whoosh', frame: 1050, file: 'whoosh.mp3', volume: 0.8 },
  { id: 's3_click_shield', name: '3D Compliance Shield Lock', frame: 1080, file: 'click.mp3', volume: 0.85 },
  { id: 's3_chime_gov', name: 'Govt Grade Compliance Chime', frame: 1160, file: 'chime.mp3', volume: 0.8 },
  { id: 's3_pop_cat1', name: 'Cat 1: Office Admin Pop', frame: 1230, file: 'pop.mp3', volume: 0.65 },
  { id: 's3_pop_cat2', name: 'Cat 2: Cleaning Housekeeping Pop', frame: 1280, file: 'pop.mp3', volume: 0.65 },
  { id: 's3_pop_cat3', name: 'Cat 3: Security Facility Pop', frame: 1330, file: 'pop.mp3', volume: 0.65 },
  { id: 's3_pop_cat4', name: 'Cat 4: Driving Delivery Pop', frame: 1380, file: 'pop.mp3', volume: 0.65 },
  { id: 's3_pop_cat5', name: 'Cat 5: IT Media Pop', frame: 1430, file: 'pop.mp3', volume: 0.65 },
  { id: 's3_pop_cat6', name: 'Cat 6: Engineering Pop', frame: 1480, file: 'pop.mp3', volume: 0.65 },
  { id: 's3_pop_cat7', name: 'Cat 7: Sales Marketing Pop', frame: 1530, file: 'pop.mp3', volume: 0.65 },
  { id: 's3_pop_cat8', name: 'Cat 8: Training Skills Pop', frame: 1580, file: 'pop.mp3', volume: 0.65 },
  { id: 's3_swoosh_align', name: '63 Roles Alignment Swoosh', frame: 1680, file: 'swoosh.mp3', volume: 0.75 },
  { id: 's3_click_rjsc', name: 'RJSC DIFE Compliance Click', frame: 1760, file: 'click.mp3', volume: 0.7 },
  { id: 's3_chime_guarantee', name: 'Payroll Discipline Chime', frame: 1850, file: 'chime.mp3', volume: 0.9 },
  { id: 's3_whoosh_trans', name: 'Transition to Scene 4', frame: 1920, file: 'whoosh.mp3', volume: 0.8 },

  // Scene 4: 1950 - 2850
  { id: 's4_swoosh_portal', name: 'Scene 4 3D Portal Swoosh', frame: 1950, file: 'swoosh.mp3', volume: 0.85 },
  { id: 's4_pop_device', name: '3D Smartphone Device Pop', frame: 2000, file: 'pop.mp3', volume: 0.8 },
  { id: 's4_click_apply', name: '2-Minute Application Click', frame: 2070, file: 'click.mp3', volume: 0.7 },
  { id: 's4_pop_badge1', name: 'Badge 63 Roles Pop', frame: 2160, file: 'pop.mp3', volume: 0.7 },
  { id: 's4_pop_badge2', name: 'Badge Nationwide Pop', frame: 2240, file: 'pop.mp3', volume: 0.7 },
  { id: 's4_pop_badge3', name: 'Badge Timely Pay Pop', frame: 2320, file: 'pop.mp3', volume: 0.7 },
  { id: 's4_pop_badge4', name: 'Badge Skill Dev Pop', frame: 2400, file: 'pop.mp3', volume: 0.7 },
  { id: 's4_click_type', name: 'Quick Registration Click', frame: 2520, file: 'click.mp3', volume: 0.65 },
  { id: 's4_chime_career', name: 'Career Unlock Chime', frame: 2640, file: 'chime.mp3', volume: 0.9 },
  { id: 's4_whoosh_trans', name: 'Transition to Scene 5', frame: 2800, file: 'whoosh.mp3', volume: 0.8 },

  // Scene 5: 2850 - 3240
  { id: 's5_whoosh_enter', name: 'Scene 5 Enter Whoosh', frame: 2850, file: 'whoosh.mp3', volume: 0.8 },
  { id: 's5_chime_seal1', name: 'Govt Approved Vendor Chime', frame: 2890, file: 'chime.mp3', volume: 0.85 },
  { id: 's5_click_seal2', name: 'RJSC Registered C-123913 Click', frame: 2960, file: 'click.mp3', volume: 0.75 },
  { id: 's5_pop_seal3', name: 'DIFE Licensed Pop', frame: 3030, file: 'pop.mp3', volume: 0.75 },
  { id: 's5_click_seal4', name: 'PPR CPTU Compliant Click', frame: 3100, file: 'click.mp3', volume: 0.75 },
  { id: 's5_chime_sheen', name: 'Golden Credential Sheen Chime', frame: 3180, file: 'chime.mp3', volume: 0.9 },
  { id: 's5_whoosh_trans', name: 'Transition to Scene 6', frame: 3220, file: 'whoosh.mp3', volume: 0.8 },

  // Scene 6: 3240 - 3600
  { id: 's6_swoosh_logo', name: 'Outro 3D Logo Swoosh', frame: 3240, file: 'swoosh.mp3', volume: 0.85 },
  { id: 's6_pop_cta', name: 'CTA Headline Pop', frame: 3280, file: 'pop.mp3', volume: 0.8 },
  { id: 's6_click_btn1', name: 'Hire Staff Button Click', frame: 3340, file: 'click.mp3', volume: 0.75 },
  { id: 's6_click_btn2', name: 'Apply Job Button Click', frame: 3380, file: 'click.mp3', volume: 0.75 },
  { id: 's6_chime_contact', name: 'Contact Dashboard Chime', frame: 3440, file: 'chime.mp3', volume: 0.85 },
  { id: 's6_chime_final', name: 'Grand Finale Chime', frame: 3520, file: 'chime.mp3', volume: 1.0 },
];
