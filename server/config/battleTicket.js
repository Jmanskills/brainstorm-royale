// Battle Ticket Configuration
// Season 1: "Brain Storm Rising"

const BATTLE_TICKET_CONFIG = {
  currentSeason: 1,
  seasonName: "Brain Storm Rising",
  seasonStart: new Date('2026-01-01'),
  seasonEnd: new Date('2026-03-31'),
  
  // XP required per tier (cumulative)
  xpPerTier: 1000,
  maxTier: 50,
  
  // Premium ticket price in coins
  premiumPrice: 950,
  
  // Rewards by tier
  rewards: {
    // Tier: { free: [...], premium: [...] }
    0: {
      free: [{ type: 'coins', amount: 100 }],
      premium: [{ type: 'skin', id: 'season1_starter' }]
    },
    1: {
      free: [{ type: 'xp_boost', amount: 10 }],
      premium: [{ type: 'emote', id: 'brain_power' }]
    },
    2: {
      free: [{ type: 'coins', amount: 150 }],
      premium: [{ type: 'trail', id: 'lightning_blue' }]
    },
    3: {
      free: [],
      premium: [{ type: 'skin', id: 'scholar' }]
    },
    5: {
      free: [{ type: 'coins', amount: 200 }],
      premium: [{ type: 'emote', id: 'thinking' }]
    },
    7: {
      free: [{ type: 'xp_boost', amount: 15 }],
      premium: [{ type: 'skin', id: 'professor' }]
    },
    10: {
      free: [{ type: 'skin', id: 'student' }],
      premium: [{ type: 'trail', id: 'electric_purple' }]
    },
    12: {
      free: [{ type: 'coins', amount: 250 }],
      premium: [{ type: 'emote', id: 'genius' }]
    },
    15: {
      free: [{ type: 'xp_boost', amount: 20 }],
      premium: [{ type: 'skin', id: 'einstein' }]
    },
    18: {
      free: [{ type: 'coins', amount: 300 }],
      premium: [{ type: 'trail', id: 'rainbow_storm' }]
    },
    20: {
      free: [{ type: 'emote', id: 'celebration' }],
      premium: [{ type: 'skin', id: 'wizard' }]
    },
    25: {
      free: [{ type: 'coins', amount: 400 }],
      premium: [{ type: 'skin', id: 'cyborg' }]
    },
    30: {
      free: [{ type: 'skin', id: 'graduate' }],
      premium: [{ type: 'trail', id: 'golden_aura' }]
    },
    35: {
      free: [{ type: 'coins', amount: 500 }],
      premium: [{ type: 'emote', id: 'victory_dance' }]
    },
    40: {
      free: [{ type: 'xp_boost', amount: 50 }],
      premium: [{ type: 'skin', id: 'valedictorian' }]
    },
    45: {
      free: [{ type: 'coins', amount: 750 }],
      premium: [{ type: 'trail', id: 'platinum_flames' }]
    },
    50: {
      free: [{ type: 'skin', id: 'master_brain' }],
      premium: [{ type: 'skin', id: 'legendary_sage' }, { type: 'trail', id: 'ultimate_storm' }]
    }
  }
};

// Available skins with visual data
const SKINS = {
  // Default/Free skins
  default: {
    name: 'Default',
    rarity: 'common',
    price: 0,
    colors: { primary: '#667eea', secondary: '#764ba2', accent: '#fff' }
  },
  rookie: {
    name: 'Rookie Scholar',
    rarity: 'common',
    price: 0,
    colors: { primary: '#3498db', secondary: '#2980b9', accent: '#ecf0f1' }
  },
  student: {
    name: 'Student',
    rarity: 'uncommon',
    price: 500,
    colors: { primary: '#2ecc71', secondary: '#27ae60', accent: '#fff' }
  },
  graduate: {
    name: 'Graduate',
    rarity: 'rare',
    price: 1000,
    colors: { primary: '#9b59b6', secondary: '#8e44ad', accent: '#f1c40f' }
  },
  master_brain: {
    name: 'Master Brain',
    rarity: 'epic',
    price: 2000,
    colors: { primary: '#e74c3c', secondary: '#c0392b', accent: '#f39c12' }
  },
  
  // Battle Ticket skins
  season1_starter: {
    name: 'Storm Cadet',
    rarity: 'rare',
    battleTicket: true,
    season: 1,
    tier: 0,
    colors: { primary: '#3498db', secondary: '#2c3e50', accent: '#1abc9c' }
  },
  scholar: {
    name: 'Wise Scholar',
    rarity: 'rare',
    battleTicket: true,
    season: 1,
    tier: 3,
    colors: { primary: '#16a085', secondary: '#1abc9c', accent: '#f1c40f' }
  },
  professor: {
    name: 'Professor',
    rarity: 'epic',
    battleTicket: true,
    season: 1,
    tier: 7,
    colors: { primary: '#34495e', secondary: '#2c3e50', accent: '#e74c3c' }
  },
  einstein: {
    name: 'Einstein',
    rarity: 'epic',
    battleTicket: true,
    season: 1,
    tier: 15,
    colors: { primary: '#ecf0f1', secondary: '#bdc3c7', accent: '#3498db' }
  },
  wizard: {
    name: 'Knowledge Wizard',
    rarity: 'epic',
    battleTicket: true,
    season: 1,
    tier: 20,
    colors: { primary: '#9b59b6', secondary: '#8e44ad', accent: '#f39c12' }
  },
  cyborg: {
    name: 'Cyborg Scholar',
    rarity: 'legendary',
    battleTicket: true,
    season: 1,
    tier: 25,
    colors: { primary: '#34495e', secondary: '#7f8c8d', accent: '#1abc9c' }
  },
  valedictorian: {
    name: 'Valedictorian',
    rarity: 'legendary',
    battleTicket: true,
    season: 1,
    tier: 40,
    colors: { primary: '#f39c12', secondary: '#f1c40f', accent: '#fff' }
  },
  legendary_sage: {
    name: 'Legendary Sage',
    rarity: 'legendary',
    battleTicket: true,
    season: 1,
    tier: 50,
    colors: { primary: '#e67e22', secondary: '#d35400', accent: '#ecf0f1' }
  }
};

// Emotes
const EMOTES = {
  wave: { name: 'Wave', price: 0, animation: 'wave' },
  thumbsup: { name: 'Thumbs Up', price: 0, animation: 'thumbsup' },
  brain_power: { name: 'Brain Power', price: 300, animation: 'brain' },
  thinking: { name: 'Thinking', price: 400, animation: 'thinking' },
  genius: { name: 'Genius', price: 500, animation: 'lightbulb' },
  celebration: { name: 'Celebration', price: 600, animation: 'celebrate' },
  victory_dance: { name: 'Victory Dance', price: 800, animation: 'dance' }
};

// Trails
const TRAILS = {
  default: { name: 'No Trail', price: 0, color: null },
  lightning_blue: { name: 'Blue Lightning', price: 400, color: '#3498db' },
  electric_purple: { name: 'Purple Electric', price: 600, color: '#9b59b6' },
  rainbow_storm: { name: 'Rainbow Storm', price: 800, color: 'rainbow' },
  golden_aura: { name: 'Golden Aura', price: 1000, color: '#f1c40f' },
  platinum_flames: { name: 'Platinum Flames', price: 1500, color: '#bdc3c7' },
  ultimate_storm: { name: 'Ultimate Storm', price: 2000, color: 'gradient' }
};

module.exports = {
  BATTLE_TICKET_CONFIG,
  SKINS,
  EMOTES,
  TRAILS
};
