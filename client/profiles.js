// Loading Screens and Player Profiles

// Loading Screen Messages and Tips
const LOADING_SCREENS = {
  tips: [
    "💡 Build walls when taking fire for instant cover!",
    "⚡ Power-ups can turn the tide of battle - grab them fast!",
    "🏗️ Use ramps to gain high ground advantage in fights",
    "🎯 Aim for the head for bonus damage!",
    "🧠 Answer trivia questions correctly for XP and coin bonuses",
    "🌪️ Stay inside the safe zone - the storm gets more dangerous over time",
    "💊 Shield potions give you extra HP before your health is damaged",
    "🚗 Vehicles are great for rotating safely to the next zone",
    "🔫 Different weapons are better at different ranges",
    "⚔️ Third-partying weakened enemies is a valid strategy!",
    "📦 Don't forget to collect ammo boxes when you're running low",
    "🎨 Customize your character in the Shop!",
    "🏆 Complete Battle Ticket tiers for exclusive rewards",
    "👥 Play with friends in Party Mode!",
    "🎁 Gift items to your friends!",
    "🔊 Enable sound effects for better gameplay awareness",
    "🎮 Practice building in the lobby before matches",
    "💰 Coins can be used to buy skins, emotes, and more!",
    "⭐ Level up to unlock new achievements",
    "🎯 Complete daily challenges for bonus rewards!",
    "🛡️ Metal buildings are strongest but take longest to build",
    "⚡ Speed boosts let you outrun the storm",
    "💥 Explosive weapons destroy buildings quickly",
    "🎪 Special seasonal events give unique rewards!",
    "👀 Spectate your friends after being eliminated"
  ],
  
  facts: [
    "Did you know? The human brain weighs about 3 pounds!",
    "Fun fact: You blink about 15-20 times per minute",
    "Cool fact: The speed of light is 299,792 km/s",
    "Brain fact: Your brain uses 20% of your body's energy!",
    "Game fact: Over 10,000 players have joined BrainStorm Royale!",
    "Trivia: The word 'trivia' comes from Latin meaning 'three ways'",
    "Did you know? Fortnite inspired many elements of this game!",
    "Fun fact: The first video game was made in 1958!",
    "Cool fact: Esports is now a billion-dollar industry!",
    "Brain fact: You use 100% of your brain, not just 10%!"
  ],
  
  quotes: [
    "\"The best way to predict the future is to invent it.\" - Alan Kay",
    "\"Stay hungry, stay foolish.\" - Steve Jobs",
    "\"Think different.\" - Apple",
    "\"Just do it.\" - Nike",
    "\"Knowledge is power.\" - Francis Bacon",
    "\"Be the change you wish to see.\" - Gandhi",
    "\"Victory comes from finding opportunities in problems.\" - Sun Tzu"
  ]
};

// Get random loading screen content
function getRandomLoadingContent() {
  const rand = Math.random();
  
  if (rand < 0.6) {
    // 60% chance for tips
    return {
      type: 'tip',
      content: LOADING_SCREENS.tips[Math.floor(Math.random() * LOADING_SCREENS.tips.length)]
    };
  } else if (rand < 0.9) {
    // 30% chance for facts
    return {
      type: 'fact',
      content: LOADING_SCREENS.facts[Math.floor(Math.random() * LOADING_SCREENS.facts.length)]
    };
  } else {
    // 10% chance for quotes
    return {
      type: 'quote',
      content: LOADING_SCREENS.quotes[Math.floor(Math.random() * LOADING_SCREENS.quotes.length)]
    };
  }
}

// Player Profile Statistics Categories
const PROFILE_STATS = {
  combat: {
    name: 'Combat Stats',
    stats: [
      { id: 'kills', name: 'Total Kills', icon: '⚔️' },
      { id: 'deaths', name: 'Total Deaths', icon: '💀' },
      { id: 'kd', name: 'K/D Ratio', icon: '📊' },
      { id: 'damageDealt', name: 'Damage Dealt', icon: '💥' },
      { id: 'accuracy', name: 'Accuracy', icon: '🎯' },
      { id: 'headshots', name: 'Headshots', icon: '🎯' }
    ]
  },
  
  general: {
    name: 'General Stats',
    stats: [
      { id: 'gamesPlayed', name: 'Games Played', icon: '🎮' },
      { id: 'wins', name: 'Total Wins', icon: '🏆' },
      { id: 'winRate', name: 'Win Rate', icon: '📈' },
      { id: 'topTen', name: 'Top 10 Finishes', icon: '🥇' },
      { id: 'timePlayed', name: 'Time Played', icon: '⏰' }
    ]
  },
  
  trivia: {
    name: 'Trivia Stats',
    stats: [
      { id: 'questionsAnswered', name: 'Questions Answered', icon: '❓' },
      { id: 'correctAnswers', name: 'Correct Answers', icon: '✅' },
      { id: 'triviaAccuracy', name: 'Trivia Accuracy', icon: '🧠' },
      { id: 'favoriteCategory', name: 'Favorite Category', icon: '📚' }
    ]
  },
  
  building: {
    name: 'Building Stats',
    stats: [
      { id: 'structuresBuilt', name: 'Structures Built', icon: '🏗️' },
      { id: 'materialsGathered', name: 'Materials Gathered', icon: '📦' },
      { id: 'structuresDestroyed', name: 'Structures Destroyed', icon: '💥' }
    ]
  },
  
  progression: {
    name: 'Progression',
    stats: [
      { id: 'level', name: 'Level', icon: '⭐' },
      { id: 'xp', name: 'Total XP', icon: '💫' },
      { id: 'coins', name: 'Coins', icon: '💰' },
      { id: 'battleTicketTier', name: 'Battle Ticket Tier', icon: '🎫' }
    ]
  }
};

// Achievement System
const ACHIEVEMENTS = {
  // Combat achievements
  first_kill: {
    name: 'First Blood',
    description: 'Get your first elimination',
    icon: '⚔️',
    xp: 50,
    coins: 25,
    condition: (stats) => stats.kills >= 1
  },
  
  killing_spree: {
    name: 'Killing Spree',
    description: 'Get 10 eliminations in one match',
    icon: '🔥',
    xp: 200,
    coins: 100,
    condition: (stats) => stats.killsInMatch >= 10
  },
  
  sharpshooter: {
    name: 'Sharpshooter',
    description: 'Get 5 headshots in one match',
    icon: '🎯',
    xp: 150,
    coins: 75,
    condition: (stats) => stats.headshotsInMatch >= 5
  },
  
  // Victory achievements
  first_win: {
    name: 'Victory Royale',
    description: 'Win your first match',
    icon: '🏆',
    xp: 100,
    coins: 50,
    condition: (stats) => stats.wins >= 1
  },
  
  win_streak: {
    name: 'On Fire',
    description: 'Win 3 matches in a row',
    icon: '🔥',
    xp: 300,
    coins: 150,
    condition: (stats) => stats.currentWinStreak >= 3
  },
  
  // Trivia achievements
  brain_master: {
    name: 'Brain Master',
    description: 'Answer 100 trivia questions correctly',
    icon: '🧠',
    xp: 200,
    coins: 100,
    condition: (stats) => stats.correctAnswers >= 100
  },
  
  perfect_score: {
    name: 'Perfect Score',
    description: 'Answer all trivia questions correctly in a match',
    icon: '💯',
    xp: 250,
    coins: 125,
    condition: (stats) => stats.triviaAccuracy === 100
  },
  
  // Building achievements
  architect: {
    name: 'Master Architect',
    description: 'Build 1000 structures',
    icon: '🏗️',
    xp: 150,
    coins: 75,
    condition: (stats) => stats.structuresBuilt >= 1000
  },
  
  // Progression achievements
  level_10: {
    name: 'Rising Star',
    description: 'Reach level 10',
    icon: '⭐',
    xp: 100,
    coins: 50,
    condition: (stats) => stats.level >= 10
  },
  
  level_50: {
    name: 'Legend',
    description: 'Reach level 50',
    icon: '👑',
    xp: 500,
    coins: 250,
    condition: (stats) => stats.level >= 50
  },
  
  rich: {
    name: 'Coin Collector',
    description: 'Earn 10,000 total coins',
    icon: '💰',
    xp: 200,
    coins: 100,
    condition: (stats) => stats.totalCoinsEarned >= 10000
  }
};

module.exports = {
  LOADING_SCREENS,
  PROFILE_STATS,
  ACHIEVEMENTS,
  getRandomLoadingContent
};
