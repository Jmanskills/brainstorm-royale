require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Database
const connectDB = require('./config/database');
const User = require('./models/User');
const authRoutes = require('./routes/auth');
const friendsRoutes = require('./routes/friends');
const battleTicketRoutes = require('./routes/battleTicket');
const shopRoutes = require('./routes/shop');
const giftingRoutes = require('./routes/gifting');
const adminRoutes = require('./routes/admin');
const { SKINS } = require('./config/battleTicket');
const { getRandomQuestion } = require('./config/trivia');
const { generateVehicleSpawns } = require('./config/vehicles');
const { getActiveEvents, applyEventBonuses } = require('./config/seasonalEvents');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/friends', friendsRoutes);
app.use('/api/battle-ticket', battleTicketRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/gifting', giftingRoutes);
app.use('/api/admin', adminRoutes);

// Add new route imports
const challengesRoutes = require('./routes/challenges');
const notificationsRoutes = require('./routes/notifications');

app.use('/api/challenges', challengesRoutes);
app.use('/api/notifications', notificationsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// ============== GAME CONSTANTS ==============
const MAPS = {
  classic: {
    name: 'Classic Arena',
    size: 2000,
    playerSize: 30,
    theme: 'grass',
    triviaStations: 15,
    powerupSpawns: 20,
    weaponSpawns: 30
  },
  mega: {
    name: 'Mega City',
    size: 3500,
    playerSize: 30,
    theme: 'urban',
    triviaStations: 25,
    powerupSpawns: 35,
    weaponSpawns: 50
  },
  desert: {
    name: 'Desert Storm',
    size: 3000,
    playerSize: 30,
    theme: 'desert',
    triviaStations: 20,
    powerupSpawns: 25,
    weaponSpawns: 40
  },
  island: {
    name: 'Brain Island',
    size: 4000,
    playerSize: 30,
    theme: 'island',
    triviaStations: 30,
    powerupSpawns: 40,
    weaponSpawns: 60
  }
};

const MAP_SIZE = 2000; // Default for backwards compatibility
const PLAYER_SIZE = 30;
const TICK_RATE = 60;
const STORM_SHRINK_RATE = 0.5;
const STORM_DAMAGE_SCALING = true; // Increases damage over time

const WEAPONS = {
  pistol: { name: 'Pistol', damage: 15, fireRate: 400, ammoUse: 1, range: 300, speed: 15, rarity: 'common' },
  shotgun: { name: 'Shotgun', damage: 40, fireRate: 800, ammoUse: 2, range: 150, speed: 12, rarity: 'uncommon' },
  rifle: { name: 'Rifle', damage: 25, fireRate: 200, ammoUse: 1, range: 400, speed: 18, rarity: 'common' },
  sniper: { name: 'Sniper', damage: 75, fireRate: 1500, ammoUse: 1, range: 600, speed: 25, rarity: 'rare' },
  smg: { name: 'SMG', damage: 12, fireRate: 100, ammoUse: 1, range: 250, speed: 20, rarity: 'common' },
  burst_rifle: { name: 'Burst Rifle', damage: 30, fireRate: 350, ammoUse: 3, range: 400, speed: 18, rarity: 'uncommon' },
  rocket_launcher: { name: 'Rocket Launcher', damage: 100, fireRate: 2000, ammoUse: 1, range: 500, speed: 10, rarity: 'legendary', explosive: true, blastRadius: 50 },
  minigun: { name: 'Minigun', damage: 20, fireRate: 150, ammoUse: 1, range: 350, speed: 15, rarity: 'epic' },
  crossbow: { name: 'Crossbow', damage: 60, fireRate: 1000, ammoUse: 1, range: 450, speed: 22, rarity: 'rare', silent: true },
  grenade_launcher: { name: 'Grenade Launcher', damage: 80, fireRate: 1500, ammoUse: 1, range: 400, speed: 12, rarity: 'epic', explosive: true, blastRadius: 40 },
  laser_rifle: { name: 'Laser Rifle', damage: 35, fireRate: 250, ammoUse: 2, range: 500, speed: 30, rarity: 'legendary' },
  brain_blaster: { name: 'Brain Blaster', damage: 50, fireRate: 600, ammoUse: 1, range: 450, speed: 20, rarity: 'epic' }
};

// Power-up types
const POWERUPS = {
  health_pack: { name: 'Health Pack', heal: 50, duration: 0, icon: '❤️', rarity: 'common' },
  big_health: { name: 'Big Health', heal: 100, duration: 0, icon: '💊', rarity: 'rare' },
  shield_potion: { name: 'Shield Potion', shield: 50, duration: 0, icon: '🛡️', rarity: 'uncommon' },
  ammo_box: { name: 'Ammo Box', ammo: 100, duration: 0, icon: '📦', rarity: 'common' },
  speed_boost: { name: 'Speed Boost', speedMultiplier: 1.5, duration: 10000, icon: '⚡', rarity: 'rare' },
  damage_boost: { name: 'Damage Boost', damageMultiplier: 1.5, duration: 15000, icon: '💥', rarity: 'epic' },
  invincibility: { name: 'Invincibility', invincible: true, duration: 5000, icon: '✨', rarity: 'legendary' }
};

// Building materials
const BUILD_MATERIALS = {
  wood: { name: 'Wood', maxHealth: 100, buildTime: 1000, color: '#8B4513' },
  brick: { name: 'Brick', maxHealth: 200, buildTime: 1500, color: '#CD5C5C' },
  metal: { name: 'Metal', maxHealth: 300, buildTime: 2000, color: '#C0C0C0' }
};

const TRIVIA_QUESTIONS = [
  { q: "What planet is known as the Red Planet?", a: ["Mars", "Venus", "Jupiter", "Mercury"], correct: 0 },
  { q: "How many sides does a hexagon have?", a: ["5", "6", "7", "8"], correct: 1 },
  { q: "What is the largest ocean?", a: ["Atlantic", "Pacific", "Indian", "Arctic"], correct: 1 },
  { q: "Who wrote Romeo and Juliet?", a: ["Dickens", "Shakespeare", "Austen", "Tolkien"], correct: 1 },
  { q: "What is 7 × 8?", a: ["54", "56", "63", "64"], correct: 1 },
  { q: "What is the capital of France?", a: ["London", "Berlin", "Paris", "Rome"], correct: 2 },
  { q: "How many continents are there?", a: ["5", "6", "7", "8"], correct: 2 },
  { q: "What gas do plants absorb?", a: ["Oxygen", "Nitrogen", "CO2", "Helium"], correct: 2 },
  { q: "What year did WWII end?", a: ["1943", "1944", "1945", "1946"], correct: 2 },
  { q: "What is the largest mammal?", a: ["Elephant", "Giraffe", "Blue Whale", "Hippo"], correct: 2 },
];

// ============== GAME STATE ==============
const games = new Map(); // gameId -> game state
const playerGames = new Map(); // socketId -> gameId
const authenticatedPlayers = new Map(); // socketId -> userId

// ============== PARTY STATE ==============
const parties = new Map(); // partyId -> party data
const playerParties = new Map(); // socketId -> partyId

// ============== CHAT STATE ==============
const chatHistory = new Map(); // gameId -> chat messages

// ============== SOCKET.IO AUTHENTICATION ==============
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    
    if (!token) {
      // Allow guest play
      socket.userId = null;
      socket.isGuest = true;
      return next();
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return next(new Error('User not found'));
    }
    
    socket.userId = user._id.toString();
    socket.username = user.username;
    socket.isGuest = false;
    
    // Update user status
    user.isOnline = true;
    await user.save();
    
    authenticatedPlayers.set(socket.id, user._id.toString());
    
    next();
  } catch (error) {
    // Allow guest play on auth error
    socket.userId = null;
    socket.isGuest = true;
    next();
  }
});

// ============== GAME LOGIC ==============
io.on('connection', (socket) => {
  console.log(`🎮 Player connected: ${socket.id} (${socket.isGuest ? 'Guest' : socket.username})`);
  
  // Send user info
  socket.emit('user-info', {
    userId: socket.userId,
    username: socket.username,
    isGuest: socket.isGuest
  });
  
  // ========== PARTY SYSTEM ==========
  
  socket.on('create-party', async () => {
    if (socket.isGuest) {
      socket.emit('error', { message: 'Guests cannot create parties' });
      return;
    }
    
    const partyId = uuidv4();
    const party = {
      id: partyId,
      leader: socket.id,
      members: new Map([[socket.id, {
        userId: socket.userId,
        username: socket.username,
        ready: false
      }]]),
      invites: new Set()
    };
    
    parties.set(partyId, party);
    playerParties.set(socket.id, partyId);
    
    socket.emit('party-created', { partyId });
    socket.emit('party-update', {
      members: Array.from(party.members.values()),
      leader: party.leader
    });
  });
  
  socket.on('invite-to-party', async (data) => {
    const partyId = playerParties.get(socket.id);
    if (!partyId) return;
    
    const party = parties.get(partyId);
    if (!party || party.leader !== socket.id) return;
    
    try {
      const invitedUser = await User.findById(data.userId);
      if (!invitedUser) return;
      
      // Find the invited user's socket
      const invitedSocket = Array.from(io.sockets.sockets.values())
        .find(s => s.userId === data.userId);
      
      if (invitedSocket) {
        party.invites.add(data.userId);
        invitedSocket.emit('party-invite', {
          partyId,
          from: socket.username,
          leader: socket.username
        });
      }
    } catch (error) {
      console.error('Invite error:', error);
    }
  });
  
  socket.on('accept-party-invite', (data) => {
    const party = parties.get(data.partyId);
    if (!party) return;
    
    if (!party.invites.has(socket.userId)) return;
    
    party.members.set(socket.id, {
      userId: socket.userId,
      username: socket.username,
      ready: false
    });
    playerParties.set(socket.id, data.partyId);
    party.invites.delete(socket.userId);
    
    // Notify all party members
    party.members.forEach((member, memberId) => {
      const memberSocket = io.sockets.sockets.get(memberId);
      if (memberSocket) {
        memberSocket.emit('party-update', {
          members: Array.from(party.members.values()),
          leader: party.leader
        });
      }
    });
  });
  
  socket.on('leave-party', () => {
    const partyId = playerParties.get(socket.id);
    if (!partyId) return;
    
    const party = parties.get(partyId);
    if (!party) return;
    
    party.members.delete(socket.id);
    playerParties.delete(socket.id);
    
    if (party.members.size === 0) {
      parties.delete(partyId);
      return;
    }
    
    // If leader left, assign new leader
    if (party.leader === socket.id) {
      party.leader = Array.from(party.members.keys())[0];
    }
    
    // Notify remaining members
    party.members.forEach((member, memberId) => {
      const memberSocket = io.sockets.sockets.get(memberId);
      if (memberSocket) {
        memberSocket.emit('party-update', {
          members: Array.from(party.members.values()),
          leader: party.leader
        });
      }
    });
  });
  
  socket.on('party-ready-toggle', () => {
    const partyId = playerParties.get(socket.id);
    if (!partyId) return;
    
    const party = parties.get(partyId);
    if (!party) return;
    
    const member = party.members.get(socket.id);
    if (member) {
      member.ready = !member.ready;
      
      party.members.forEach((m, memberId) => {
        const memberSocket = io.sockets.sockets.get(memberId);
        if (memberSocket) {
          memberSocket.emit('party-update', {
            members: Array.from(party.members.values()),
            leader: party.leader
          });
        }
      });
    }
  });
  
  // ========== CHAT SYSTEM ==========
  
  socket.on('send-chat-message', async (data) => {
    const gameId = playerGames.get(socket.id);
    if (!gameId) return;
    
    const game = games.get(gameId);
    if (!game) return;
    
    // Check if user has chat enabled
    if (!socket.isGuest) {
      try {
        const user = await User.findById(socket.userId);
        if (!user.settings.chatEnabled) return;
        
        // Basic profanity filter if enabled
        if (user.settings.profanityFilter) {
          data.message = filterProfanity(data.message);
        }
      } catch (error) {
        console.error('Chat settings check error:', error);
      }
    }
    
    const chatMessage = {
      id: uuidv4(),
      username: socket.username || 'Guest',
      message: data.message.substring(0, 200), // Max 200 chars
      timestamp: Date.now()
    };
    
    // Store in history
    if (!chatHistory.has(gameId)) {
      chatHistory.set(gameId, []);
    }
    const history = chatHistory.get(gameId);
    history.push(chatMessage);
    if (history.length > 50) history.shift(); // Keep last 50 messages
    
    // Broadcast to all players in game
    io.to(gameId).emit('chat-message', chatMessage);
  });
  
  // ========== VOICE CHAT SIGNALING ==========
  
  socket.on('voice-offer', (data) => {
    const targetSocket = io.sockets.sockets.get(data.to);
    if (targetSocket) {
      targetSocket.emit('voice-offer', {
        from: socket.id,
        offer: data.offer
      });
    }
  });
  
  socket.on('voice-answer', (data) => {
    const targetSocket = io.sockets.sockets.get(data.to);
    if (targetSocket) {
      targetSocket.emit('voice-answer', {
        from: socket.id,
        answer: data.answer
      });
    }
  });
  
  socket.on('voice-ice-candidate', (data) => {
    const targetSocket = io.sockets.sockets.get(data.to);
    if (targetSocket) {
      targetSocket.emit('voice-ice-candidate', {
        from: socket.id,
        candidate: data.candidate
      });
    }
  });
  
  // ==========
  socket.on('create-game', (data) => {
    const gameCode = generateGameCode();
    const gameId = uuidv4();
    
    const game = {
      id: gameId,
      code: gameCode,
      host: socket.id,
      players: new Map(),
      state: 'lobby',
      mapType: 'classic',
      map: MAPS.classic,
      startTime: null,
      stormRadius: MAPS.classic.size / 2,
      stormCenter: { x: MAPS.classic.size / 2, y: MAPS.classic.size / 2 },
      stormPhase: 0,
      triviaStations: [],
      bullets: [],
      buildings: [], // [{id, type, material, x, y, health, ownerId, rotation}]
      powerups: [], // [{id, type, x, y, collected}]
      weaponSpawns: [], // [{id, weapon, x, y, collected}]
      vehicles: [], // [{id, type, x, y, health, fuel, occupied, driver, passengers}]
      killFeed: [],
      activeEvents: getActiveEvents()
    };
    
    const playerData = {
      id: socket.id,
      userId: socket.userId,
      username: data.username || socket.username || 'Guest',
      x: MAP_SIZE / 2,
      y: MAP_SIZE / 2,
      health: 100,
      maxHealth: 100,
      shield: 0,
      maxShield: 100,
      ammo: 50,
      weapon: 'pistol',
      kills: 0,
      questionsCorrect: 0,
      questionsTotal: 0,
      damageDealt: 0,
      damageTaken: 0,
      isReady: true,
      isAlive: true,
      skin: data.skin || 'default',
      materials: {
        wood: 100,
        brick: 100,
        metal: 100
      },
      activeEffects: [], // [{type, endTime, multiplier}]
      buildMode: false,
      currentBuildType: 'wall',
      currentMaterial: 'wood'
    };
    
    game.players.set(socket.id, playerData);
    games.set(gameId, game);
    playerGames.set(socket.id, gameId);
    
    socket.join(gameId);
    socket.emit('game-created', { gameId, gameCode, playerData });
    
    io.to(gameId).emit('lobby-update', {
      players: Array.from(game.players.values()),
      host: game.host
    });
    
    console.log(`🎲 Game created: ${gameCode} (${gameId})`);
  });
  
  // ========== JOIN GAME ==========
  socket.on('join-game', async (data) => {
    const game = Array.from(games.values()).find(g => g.code === data.gameCode.toUpperCase());
    
    if (!game) {
      socket.emit('join-error', { message: 'Game not found' });
      return;
    }
    
    if (game.state !== 'lobby') {
      socket.emit('join-error', { message: 'Game already started' });
      return;
    }
    
    if (game.players.size >= 50) {
      socket.emit('join-error', { message: 'Game is full' });
      return;
    }
    
    const playerData = {
      id: socket.id,
      userId: socket.userId,
      username: data.username || socket.username || 'Guest',
      x: game.map.size / 2 + Math.random() * 200 - 100,
      y: game.map.size / 2 + Math.random() * 200 - 100,
      health: 100,
      maxHealth: 100,
      shield: 0,
      maxShield: 100,
      ammo: 50,
      weapon: 'pistol',
      kills: 0,
      questionsCorrect: 0,
      questionsTotal: 0,
      damageDealt: 0,
      damageTaken: 0,
      isReady: false,
      isAlive: true,
      skin: data.skin || 'default',
      materials: {
        wood: 100,
        brick: 100,
        metal: 100
      },
      activeEffects: [],
      buildMode: false,
      currentBuildType: 'wall',
      currentMaterial: 'wood'
    };
    
    game.players.set(socket.id, playerData);
    playerGames.set(socket.id, game.id);
    
    socket.join(game.id);
    socket.emit('game-joined', { gameId: game.id, gameCode: game.code, playerData });
    
    io.to(game.id).emit('lobby-update', {
      players: Array.from(game.players.values()),
      host: game.host
    });
    
    console.log(`✅ ${playerData.username} joined game ${game.code}`);
  });
  
  // ========== TOGGLE READY ==========
  socket.on('toggle-ready', () => {
    const gameId = playerGames.get(socket.id);
    if (!gameId) return;
    
    const game = games.get(gameId);
    if (!game || game.state !== 'lobby') return;
    
    const player = game.players.get(socket.id);
    if (player) {
      player.isReady = !player.isReady;
      
      io.to(gameId).emit('lobby-update', {
        players: Array.from(game.players.values()),
        host: game.host
      });
    }
  });
  
  // ========== START GAME ==========
  socket.on('start-game', () => {
    const gameId = playerGames.get(socket.id);
    if (!gameId) return;
    
    const game = games.get(gameId);
    if (!game || game.host !== socket.id || game.state !== 'lobby') return;
    
    // Check if all players are ready
    const allReady = Array.from(game.players.values()).every(p => p.isReady);
    if (!allReady) {
      socket.emit('error', { message: 'All players must be ready' });
      return;
    }
    
    // Initialize game
    game.state = 'playing';
    game.startTime = Date.now();
    game.triviaStations = generateTriviaStations(game.map);
    game.powerups = generatePowerups(game.map);
    game.weaponSpawns = generateWeaponSpawns(game.map);
    game.vehicles = generateVehicleSpawns(game.map, 10); // 10 vehicles per map
    game.activeEvents = getActiveEvents();
    
    io.to(gameId).emit('game-started', {
      map: game.map,
      stormCenter: game.stormCenter,
      stormRadius: game.stormRadius,
      triviaStations: game.triviaStations,
      powerups: game.powerups,
      weaponSpawns: game.weaponSpawns,
      vehicles: game.vehicles,
      activeEvents: game.activeEvents
    });
    
    startGameLoop(gameId);
    console.log(`▶️ Game ${game.code} started!`);
  });
  
  // ========== PLAYER MOVEMENT ==========
  socket.on('move', (data) => {
    const gameId = playerGames.get(socket.id);
    if (!gameId) return;
    
    const game = games.get(gameId);
    if (!game || game.state !== 'playing') return;
    
    const player = game.players.get(socket.id);
    if (!player || !player.isAlive) return;
    
    player.x = Math.max(0, Math.min(MAP_SIZE, data.x));
    player.y = Math.max(0, Math.min(MAP_SIZE, data.y));
  });
  
  // ========== SHOOT ==========
  socket.on('shoot', (data) => {
    const gameId = playerGames.get(socket.id);
    if (!gameId) return;
    
    const game = games.get(gameId);
    if (!game || game.state !== 'playing') return;
    
    const player = game.players.get(socket.id);
    if (!player || !player.isAlive || player.ammo < WEAPONS[player.weapon].ammoUse) return;
    
    player.ammo -= WEAPONS[player.weapon].ammoUse;
    
    const bullet = {
      id: uuidv4(),
      x: player.x,
      y: player.y,
      vx: data.dirX,
      vy: data.dirY,
      owner: socket.id,
      weapon: player.weapon,
      damage: WEAPONS[player.weapon].damage
    };
    
    game.bullets.push(bullet);
  });
  
  // ========== ANSWER TRIVIA ==========
  socket.on('answer-trivia', (data) => {
    const gameId = playerGames.get(socket.id);
    if (!gameId) return;
    
    const game = games.get(gameId);
    if (!game || game.state !== 'playing') return;
    
    const player = game.players.get(socket.id);
    if (!player || !player.isAlive) return;
    
    const station = game.triviaStations.find(s => s.id === data.stationId);
    if (!station || station.completed) return;
    
    player.questionsTotal++;
    
    const isCorrect = data.answer === station.question.correct;
    if (isCorrect) {
      player.questionsCorrect++;
      player.ammo += 20;
      player.health = Math.min(player.maxHealth, player.health + 25);
      station.completed = true;
      
      socket.emit('trivia-correct', { ammo: player.ammo, health: player.health });
    } else {
      socket.emit('trivia-wrong');
    }
  });
  
  // ========== SWITCH WEAPON ==========
  socket.on('switch-weapon', (data) => {
    const gameId = playerGames.get(socket.id);
    if (!gameId) return;
    
    const game = games.get(gameId);
    if (!game) return;
    
    const player = game.players.get(socket.id);
    if (player && WEAPONS[data.weapon]) {
      player.weapon = data.weapon;
    }
  });
  
  // ========== BUILDING SYSTEM ==========
  socket.on('toggle-build-mode', () => {
    const gameId = playerGames.get(socket.id);
    if (!gameId) return;
    
    const game = games.get(gameId);
    if (!game || game.state !== 'playing') return;
    
    const player = game.players.get(socket.id);
    if (player && player.isAlive) {
      player.buildMode = !player.buildMode;
      socket.emit('build-mode-changed', { buildMode: player.buildMode });
    }
  });
  
  socket.on('switch-build-type', (data) => {
    const gameId = playerGames.get(socket.id);
    if (!gameId) return;
    
    const game = games.get(gameId);
    if (!game) return;
    
    const player = game.players.get(socket.id);
    if (player) {
      player.currentBuildType = data.type; // 'wall', 'floor', 'ramp'
    }
  });
  
  socket.on('switch-material', (data) => {
    const gameId = playerGames.get(socket.id);
    if (!gameId) return;
    
    const game = games.get(gameId);
    if (!game) return;
    
    const player = game.players.get(socket.id);
    if (player) {
      player.currentMaterial = data.material; // 'wood', 'brick', 'metal'
    }
  });
  
  socket.on('place-building', (data) => {
    const gameId = playerGames.get(socket.id);
    if (!gameId) return;
    
    const game = games.get(gameId);
    if (!game || game.state !== 'playing') return;
    
    const player = game.players.get(socket.id);
    if (!player || !player.isAlive || !player.buildMode) return;
    
    const material = player.currentMaterial;
    const buildType = player.currentBuildType;
    
    // Check if player has materials
    if (player.materials[material] < 10) {
      socket.emit('error', { message: 'Not enough materials!' });
      return;
    }
    
    // Deduct materials
    player.materials[material] -= 10;
    
    const building = {
      id: uuidv4(),
      type: buildType,
      material: material,
      x: data.x,
      y: data.y,
      rotation: data.rotation || 0,
      health: BUILD_MATERIALS[material].maxHealth,
      maxHealth: BUILD_MATERIALS[material].maxHealth,
      ownerId: socket.id,
      buildTime: Date.now(),
      building: true // Is currently being built
    };
    
    game.buildings.push(building);
    
    // After build time, set building to false
    setTimeout(() => {
      building.building = false;
    }, BUILD_MATERIALS[material].buildTime);
  });
  
  socket.on('destroy-building', (data) => {
    const gameId = playerGames.get(socket.id);
    if (!gameId) return;
    
    const game = games.get(gameId);
    if (!game || game.state !== 'playing') return;
    
    const player = game.players.get(socket.id);
    if (!player || !player.isAlive) return;
    
    // Find building to destroy
    const buildingIndex = game.buildings.findIndex(b => b.id === data.buildingId);
    if (buildingIndex === -1) return;
    
    const building = game.buildings[buildingIndex];
    
    // Give materials back if owned by player
    if (building.ownerId === socket.id) {
      player.materials[building.material] += 5; // Get half back
    }
    
    game.buildings.splice(buildingIndex, 1);
  });
  
  // ========== POWER-UP COLLECTION ==========
  socket.on('collect-powerup', (data) => {
    const gameId = playerGames.get(socket.id);
    if (!gameId) return;
    
    const game = games.get(gameId);
    if (!game || game.state !== 'playing') return;
    
    const player = game.players.get(socket.id);
    if (!player || !player.isAlive) return;
    
    const powerup = game.powerups.find(p => p.id === data.powerupId && !p.collected);
    if (!powerup) return;
    
    // Check if player is close enough
    const dist = Math.hypot(player.x - powerup.x, player.y - powerup.y);
    if (dist > 50) return;
    
    // Apply powerup effect
    const powerupData = POWERUPS[powerup.type];
    
    if (powerupData.heal) {
      player.health = Math.min(player.maxHealth, player.health + powerupData.heal);
    }
    
    if (powerupData.shield) {
      player.shield = Math.min(player.maxShield, player.shield + powerupData.shield);
    }
    
    if (powerupData.ammo) {
      player.ammo += powerupData.ammo;
    }
    
    if (powerupData.duration > 0) {
      player.activeEffects.push({
        type: powerup.type,
        endTime: Date.now() + powerupData.duration,
        speedMultiplier: powerupData.speedMultiplier || 1,
        damageMultiplier: powerupData.damageMultiplier || 1,
        invincible: powerupData.invincible || false
      });
    }
    
    powerup.collected = true;
    
    socket.emit('powerup-collected', {
      type: powerup.type,
      name: powerupData.name
    });
  });
  
  // ========== WEAPON PICKUP ==========
  socket.on('pickup-weapon', (data) => {
    const gameId = playerGames.get(socket.id);
    if (!gameId) return;
    
    const game = games.get(gameId);
    if (!game || game.state !== 'playing') return;
    
    const player = game.players.get(socket.id);
    if (!player || !player.isAlive) return;
    
    const weaponSpawn = game.weaponSpawns.find(w => w.id === data.weaponId && !w.collected);
    if (!weaponSpawn) return;
    
    // Check if player is close enough
    const dist = Math.hypot(player.x - weaponSpawn.x, player.y - weaponSpawn.y);
    if (dist > 50) return;
    
    player.weapon = weaponSpawn.weapon;
    weaponSpawn.collected = true;
    
    socket.emit('weapon-picked', {
      weapon: weaponSpawn.weapon,
      name: WEAPONS[weaponSpawn.weapon].name
    });
  });
  
  // ========== VEHICLE SYSTEM ==========
  socket.on('enter-vehicle', (data) => {
    const gameId = playerGames.get(socket.id);
    if (!gameId) return;
    
    const game = games.get(gameId);
    if (!game || game.state !== 'playing') return;
    
    const player = game.players.get(socket.id);
    if (!player || !player.isAlive) return;
    
    const vehicle = game.vehicles.find(v => v.id === data.vehicleId);
    if (!vehicle) return;
    
    const dist = Math.hypot(player.x - vehicle.x, player.y - vehicle.y);
    if (dist > 100) return;
    
    const { VEHICLES } = require('./config/vehicles');
    const vehicleData = VEHICLES[vehicle.type];
    
    // Check if vehicle has space
    if (!vehicle.occupied) {
      vehicle.occupied = true;
      vehicle.driver = socket.id;
      player.inVehicle = vehicle.id;
      player.isDriver = true;
      
      socket.emit('entered-vehicle', {
        vehicleId: vehicle.id,
        type: vehicle.type,
        isDriver: true
      });
    } else if (vehicle.passengers.length < (vehicleData.seats - 1)) {
      vehicle.passengers.push(socket.id);
      player.inVehicle = vehicle.id;
      player.isDriver = false;
      
      socket.emit('entered-vehicle', {
        vehicleId: vehicle.id,
        type: vehicle.type,
        isDriver: false
      });
    }
  });
  
  socket.on('exit-vehicle', () => {
    const gameId = playerGames.get(socket.id);
    if (!gameId) return;
    
    const game = games.get(gameId);
    if (!game) return;
    
    const player = game.players.get(socket.id);
    if (!player || !player.inVehicle) return;
    
    const vehicle = game.vehicles.find(v => v.id === player.inVehicle);
    if (!vehicle) return;
    
    if (vehicle.driver === socket.id) {
      vehicle.occupied = false;
      vehicle.driver = null;
    } else {
      const idx = vehicle.passengers.indexOf(socket.id);
      if (idx > -1) vehicle.passengers.splice(idx, 1);
    }
    
    player.inVehicle = null;
    player.isDriver = false;
    
    socket.emit('exited-vehicle');
  });
  
  socket.on('vehicle-input', (data) => {
    const gameId = playerGames.get(socket.id);
    if (!gameId) return;
    
    const game = games.get(gameId);
    if (!game) return;
    
    const player = game.players.get(socket.id);
    if (!player || !player.inVehicle || !player.isDriver) return;
    
    const vehicle = game.vehicles.find(v => v.id === player.inVehicle);
    if (!vehicle) return;
    
    // Store vehicle input for update loop
    vehicle.input = data;
  });
  
  // ========== EMOTE SYSTEM ==========
  socket.on('play-emote', (data) => {
    const gameId = playerGames.get(socket.id);
    if (!gameId) return;
    
    const game = games.get(gameId);
    if (!game) return;
    
    const player = game.players.get(socket.id);
    if (!player) return;
    
    player.currentEmote = data.emoteId;
    player.emoteStartTime = Date.now();
    
    // Broadcast to all players
    io.to(gameId).emit('player-emote', {
      playerId: socket.id,
      emoteId: data.emoteId
    });
    
    // Clear emote after 3 seconds
    setTimeout(() => {
      if (player) {
        player.currentEmote = null;
      }
    }, 3000);
  });
  
  // ========== ADMIN COMMANDS (Socket.io) ==========
  socket.on('admin-kick-player', async (data) => {
    try {
      const admin = await User.findById(socket.userId);
      if (!admin || !admin.isAdmin) {
        return socket.emit('error', { message: 'Admin access required' });
      }
      
      const gameId = playerGames.get(data.playerId);
      if (gameId) {
        const game = games.get(gameId);
        if (game) {
          game.players.delete(data.playerId);
          playerGames.delete(data.playerId);
          
          io.to(data.playerId).emit('kicked', {
            reason: data.reason || 'Kicked by admin'
          });
        }
      }
      
      socket.emit('kick-success', { playerId: data.playerId });
    } catch (error) {
      console.error('Admin kick error:', error);
    }
  });
  
  socket.on('admin-broadcast', async (data) => {
    try {
      const admin = await User.findById(socket.userId);
      if (!admin || !admin.isAdmin) {
        return socket.emit('error', { message: 'Admin access required' });
      }
      
      io.emit('admin-message', {
        message: data.message,
        from: admin.username
      });
    } catch (error) {
      console.error('Admin broadcast error:', error);
    }
  });
  
  socket.on('admin-enable-aimbot', async (data) => {
    try {
      const admin = await User.findById(socket.userId);
      if (!admin || !admin.isAdmin) {
        return socket.emit('error', { message: 'Admin access required' });
      }
      
      socket.emit('aimbot-enabled', { enabled: data.enabled });
    } catch (error) {
      console.error('Admin aimbot error:', error);
    }
  });
  
  // ========== PLAYER MOVEMENT ==========
  socket.on('player-input', (data) => {
    const gameId = playerGames.get(socket.id);
    if (!gameId) {
      console.log('❌ No gameId for player input');
      return;
    }
    
    const game = games.get(gameId);
    if (!game) {
      console.log('❌ No game found');
      return;
    }
    if (game.state !== 'playing') {
      console.log('❌ Game not playing, state:', game.state);
      return;
    }
    
    const player = game.players.get(socket.id);
    if (!player) {
      console.log('❌ No player found');
      return;
    }
    if (!player.isAlive) {
      console.log('❌ Player not alive');
      return;
    }
    
    // Calculate movement
    const speed = 5;
    let dx = 0;
    let dy = 0;
    
    if (data.up) dy -= speed;
    if (data.down) dy += speed;
    if (data.left) dx -= speed;
    if (data.right) dx += speed;
    
    // Normalize diagonal movement
    if (dx !== 0 && dy !== 0) {
      const magnitude = Math.sqrt(dx * dx + dy * dy);
      dx = (dx / magnitude) * speed;
      dy = (dy / magnitude) * speed;
    }
    
    // Debug log
    if (dx !== 0 || dy !== 0) {
      console.log(`🏃 Player ${player.username} moving: dx=${dx.toFixed(1)}, dy=${dy.toFixed(1)}, pos=(${player.x.toFixed(0)}, ${player.y.toFixed(0)})`);
    }
    
    // Update position
    player.x += dx;
    player.y += dy;
    
    // Keep within map bounds
    const mapSize = game.map.size;
    player.x = Math.max(0, Math.min(mapSize, player.x));
    player.y = Math.max(0, Math.min(mapSize, player.y));
    
    // Store mouse position for shooting
    if (data.mouseX !== undefined) player.mouseX = data.mouseX;
    if (data.mouseY !== undefined) player.mouseY = data.mouseY;
  });
  
  socket.on('player-shoot', (data) => {
    const gameId = playerGames.get(socket.id);
    if (!gameId) return;
    
    const game = games.get(gameId);
    if (!game || game.state !== 'playing') return;
    
    const player = game.players.get(socket.id);
    if (!player || !player.isAlive || player.ammo <= 0) return;
    
    // Calculate direction
    const dx = data.targetX - player.x;
    const dy = data.targetY - player.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist === 0) return;
    
    // Create bullet
    const bullet = {
      id: uuidv4(),
      x: player.x,
      y: player.y,
      vx: dx / dist,
      vy: dy / dist,
      weapon: player.weapon,
      damage: WEAPONS[player.weapon].damage,
      ownerId: socket.id,
      ownerName: player.username
    };
    
    game.bullets.push(bullet);
    player.ammo -= 1;
  });
  
  // ========== DISCONNECT ==========
  socket.on('disconnect', async () => {
    console.log(`👋 Player disconnected: ${socket.id}`);
    
    const gameId = playerGames.get(socket.id);
    if (gameId) {
      const game = games.get(gameId);
      if (game) {
        game.players.delete(socket.id);
        
        if (game.players.size === 0) {
          games.delete(gameId);
          console.log(`🗑️ Game ${game.code} deleted (empty)`);
        } else {
          if (game.host === socket.id) {
            game.host = Array.from(game.players.keys())[0];
          }
          
          io.to(gameId).emit('lobby-update', {
            players: Array.from(game.players.values()),
            host: game.host
          });
        }
      }
      
      playerGames.delete(socket.id);
    }
    
    // Update user status in database
    if (!socket.isGuest) {
      try {
        const user = await User.findById(socket.userId);
        if (user) {
          user.isOnline = false;
          user.currentGameId = null;
          await user.save();
        }
      } catch (error) {
        console.error('Error updating user status:', error);
      }
    }
    
    authenticatedPlayers.delete(socket.id);
  });
});

// ============== GAME LOOP ==============
function startGameLoop(gameId) {
  const game = games.get(gameId);
  if (!game) return;
  
  const interval = setInterval(async () => {
    if (!games.has(gameId) || game.state !== 'playing') {
      clearInterval(interval);
      return;
    }
    
    // Update bullets
    game.bullets = game.bullets.filter(bullet => {
      bullet.x += bullet.vx * WEAPONS[bullet.weapon].speed;
      bullet.y += bullet.vy * WEAPONS[bullet.weapon].speed;
      
      // Check collision with buildings
      for (const building of game.buildings) {
        if (building.building) continue; // Skip buildings that are still being built
        
        const bSize = 50; // Building size
        if (bullet.x >= building.x - bSize && bullet.x <= building.x + bSize &&
            bullet.y >= building.y - bSize && bullet.y <= building.y + bSize) {
          building.health -= bullet.damage;
          
          if (building.health <= 0) {
            // Destroy building
            const idx = game.buildings.indexOf(building);
            if (idx > -1) game.buildings.splice(idx, 1);
          }
          
          return false; // Remove bullet
        }
      }
      
      // Check collision with players
      for (const [playerId, player] of game.players) {
        if (playerId === bullet.owner || !player.isAlive) continue;
        
        const dist = Math.hypot(player.x - bullet.x, player.y - bullet.y);
        if (dist < PLAYER_SIZE) {
          // Check for invincibility
          const invincible = player.activeEffects.some(e => e.invincible && Date.now() < e.endTime);
          if (invincible) return false;
          
          let damage = bullet.damage;
          
          // Apply damage multiplier from shooter
          const shooter = game.players.get(bullet.owner);
          if (shooter) {
            const damageBoost = shooter.activeEffects.find(e => e.damageMultiplier && Date.now() < e.endTime);
            if (damageBoost) {
              damage *= damageBoost.damageMultiplier;
            }
          }
          
          // Apply to shield first, then health
          if (player.shield > 0) {
            const shieldDamage = Math.min(player.shield, damage);
            player.shield -= shieldDamage;
            damage -= shieldDamage;
          }
          
          if (damage > 0) {
            player.health -= damage;
            player.damageTaken += damage;
          }
          
          if (shooter) {
            shooter.damageDealt += bullet.damage;
          }
          
          if (player.health <= 0) {
            player.isAlive = false;
            player.health = 0;
            
            if (shooter) {
              shooter.kills++;
            }
            
            game.killFeed.unshift({
              killer: shooter ? shooter.username : 'Unknown',
              victim: player.username,
              weapon: bullet.weapon,
              timestamp: Date.now()
            });
            
            if (game.killFeed.length > 5) game.killFeed.pop();
            
            io.to(gameId).emit('player-eliminated', {
              playerId,
              killerId: bullet.owner
            });
          }
          
          // Handle explosive weapons
          if (WEAPONS[bullet.weapon].explosive) {
            const blastRadius = WEAPONS[bullet.weapon].blastRadius;
            for (const [pid, p] of game.players) {
              if (!p.isAlive || pid === playerId) continue;
              const blastDist = Math.hypot(p.x - bullet.x, p.y - bullet.y);
              if (blastDist < blastRadius) {
                const blastDamage = bullet.damage * (1 - blastDist / blastRadius);
                p.health -= blastDamage;
                p.damageTaken += blastDamage;
                if (p.health <= 0) {
                  p.isAlive = false;
                  p.health = 0;
                }
              }
            }
          }
          
          return false;
        }
      }
      
      // Remove bullets out of bounds
      return bullet.x >= 0 && bullet.x <= game.map.size && bullet.y >= 0 && bullet.y <= game.map.size;
    });
    
    // Update active effects
    for (const player of game.players.values()) {
      player.activeEffects = player.activeEffects.filter(effect => Date.now() < effect.endTime);
    }
    
    // Update vehicles
    const { updateVehicle } = require('./config/vehicles');
    for (const vehicle of game.vehicles) {
      if (vehicle.occupied && vehicle.input) {
        const updated = updateVehicle(vehicle, vehicle.input, 1000 / TICK_RATE);
        if (updated) {
          Object.assign(vehicle, updated);
          
          // Update driver position
          const driver = game.players.get(vehicle.driver);
          if (driver) {
            driver.x = vehicle.x;
            driver.y = vehicle.y;
          }
          
          // Update passenger positions
          for (const passengerId of vehicle.passengers) {
            const passenger = game.players.get(passengerId);
            if (passenger) {
              passenger.x = vehicle.x;
              passenger.y = vehicle.y;
            }
          }
        }
      }
    }
    
    // Update storm
    const gameTime = Date.now() - game.startTime;
    
    // Storm phases (damage increases over time)
    if (gameTime > 180000 && game.stormPhase < 3) game.stormPhase = 3; // 3 min
    else if (gameTime > 120000 && game.stormPhase < 2) game.stormPhase = 2; // 2 min
    else if (gameTime > 60000 && game.stormPhase < 1) game.stormPhase = 1; // 1 min
    
    if (game.stormRadius > 50) {
      game.stormRadius -= STORM_SHRINK_RATE;
    }
    
    // Damage players outside storm
    const stormDamage = STORM_DAMAGE_SCALING ? [2, 5, 10, 20][game.stormPhase] : 2;
    
    for (const player of game.players.values()) {
      if (!player.isAlive) continue;
      
      const distToCenter = Math.hypot(player.x - game.stormCenter.x, player.y - game.stormCenter.y);
      if (distToCenter > game.stormRadius) {
        player.health -= stormDamage;
        player.damageTaken += stormDamage;
        
        if (player.health <= 0) {
          player.isAlive = false;
          player.health = 0;
          
          game.killFeed.unshift({
            killer: 'Storm',
            victim: player.username,
            weapon: 'storm',
            timestamp: Date.now()
          });
        }
      }
    }
    
    // Check for game end
    const alivePlayers = Array.from(game.players.values()).filter(p => p.isAlive);
    if (alivePlayers.length <= 1) {
      game.state = 'ended';
      clearInterval(interval);
      
      const winner = alivePlayers[0] || null;
      
      // Save game results to database
      await saveGameResults(game, winner);
      
      io.to(gameId).emit('game-ended', {
        winner: winner ? winner.username : 'None',
        stats: Array.from(game.players.values()).map(p => ({
          username: p.username,
          kills: p.kills,
          damageDealt: p.damageDealt,
          questionsCorrect: p.questionsCorrect,
          questionsTotal: p.questionsTotal,
          placement: p.isAlive ? 1 : 0
        }))
      });
      
      console.log(`🏆 Game ${game.code} ended! Winner: ${winner ? winner.username : 'None'}`);
      
      // Clean up after 30 seconds
      setTimeout(() => {
        games.delete(gameId);
        console.log(`🗑️ Game ${game.code} cleaned up`);
      }, 30000);
    }
    
    // Broadcast game state
    io.to(gameId).emit('game-update', {
      players: Array.from(game.players.values()),
      bullets: game.bullets,
      buildings: game.buildings,
      powerups: game.powerups,
      weaponSpawns: game.weaponSpawns,
      vehicles: game.vehicles,
      stormRadius: game.stormRadius,
      stormCenter: game.stormCenter,
      stormPhase: game.stormPhase,
      killFeed: game.killFeed,
      triviaStations: game.triviaStations
    });
    
  }, 1000 / TICK_RATE);
}

// ============== SAVE GAME RESULTS ==============
async function saveGameResults(game, winner) {
  try {
    const players = Array.from(game.players.values());
    const sortedPlayers = players.sort((a, b) => {
      if (a.isAlive && !b.isAlive) return -1;
      if (!a.isAlive && b.isAlive) return 1;
      return b.kills - a.kills;
    });
    
    for (let i = 0; i < sortedPlayers.length; i++) {
      const player = sortedPlayers[i];
      
      if (!player.userId) continue; // Skip guests
      
      try {
        const user = await User.findById(player.userId);
        if (!user) continue;
        
        const placement = i + 1;
        const isWin = placement === 1;
        
        // Calculate XP and coins
        const baseXP = 50;
        const killXP = player.kills * 20;
        const winXP = isWin ? 100 : 0;
        const triviaXP = player.questionsCorrect * 10;
        let totalXP = baseXP + killXP + winXP + triviaXP;
        
        const baseCoins = 25;
        const killCoins = player.kills * 10;
        const winCoins = isWin ? 100 : 0;
        const triviaCoins = player.questionsCorrect * 5;
        let totalCoins = baseCoins + killCoins + winCoins + triviaCoins;
        
        // Apply seasonal event bonuses
        const rewards = applyEventBonuses({ xp: totalXP, coins: totalCoins, triviaXP });
        totalXP = rewards.xp;
        totalCoins = rewards.coins;
        
        // Update stats
        user.stats.gamesPlayed++;
        if (isWin) {
          user.stats.wins++;
          user.stats.currentWinStreak++;
          if (user.stats.currentWinStreak > user.stats.longestWinStreak) {
            user.stats.longestWinStreak = user.stats.currentWinStreak;
          }
        } else {
          user.stats.currentWinStreak = 0;
        }
        
        user.stats.kills += player.kills;
        if (!player.isAlive) user.stats.deaths++;
        user.stats.questionsAnswered += player.questionsTotal;
        user.stats.questionsCorrect += player.questionsCorrect;
        user.stats.totalDamageDealt += player.damageDealt;
        user.stats.totalDamageTaken += player.damageTaken;
        
        if (player.kills > user.stats.highestKillGame) {
          user.stats.highestKillGame = player.kills;
        }
        
        // Add XP and coins
        user.addXP(totalXP);
        user.addCoins(totalCoins);
        
        // Add Battle Ticket XP (same as regular XP)
        user.battleTicket.xp += totalXP;
        
        // Add to match history
        user.addMatchToHistory({
          gameId: game.id,
          placement,
          kills: player.kills,
          damageDealt: player.damageDealt,
          questionsCorrect: player.questionsCorrect,
          questionsTotal: player.questionsTotal,
          xpGained: totalXP,
          coinsGained: totalCoins
        });
        
        user.currentGameId = null;
        
        await user.save();
        
        // Send post-game stats to player
        const socket = io.sockets.sockets.get(player.id);
        if (socket) {
          socket.emit('post-game-stats', {
            placement,
            isWin,
            kills: player.kills,
            damageDealt: player.damageDealt,
            questionsCorrect: player.questionsCorrect,
            questionsTotal: player.questionsTotal,
            xpGained: totalXP,
            coinsGained: totalCoins,
            newLevel: user.stats.level,
            newCoins: user.stats.coins,
            newXP: user.stats.xp
          });
        }
        
        console.log(`💾 Saved results for ${user.username}`);
      } catch (error) {
        console.error(`Error saving results for player ${player.username}:`, error);
      }
    }
  } catch (error) {
    console.error('Error in saveGameResults:', error);
  }
}

// ============== HELPER FUNCTIONS ==============
function generateGameCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function generateTriviaStations(map) {
  const stations = [];
  for (let i = 0; i < map.triviaStations; i++) {
    stations.push({
      id: uuidv4(),
      x: Math.random() * (map.size - 200) + 100,
      y: Math.random() * (map.size - 200) + 100,
      question: TRIVIA_QUESTIONS[Math.floor(Math.random() * TRIVIA_QUESTIONS.length)],
      completed: false
    });
  }
  return stations;
}

function generatePowerups(map) {
  const powerups = [];
  const powerupTypes = Object.keys(POWERUPS);
  
  for (let i = 0; i < map.powerupSpawns; i++) {
    const type = powerupTypes[Math.floor(Math.random() * powerupTypes.length)];
    powerups.push({
      id: uuidv4(),
      type: type,
      x: Math.random() * (map.size - 200) + 100,
      y: Math.random() * (map.size - 200) + 100,
      collected: false
    });
  }
  
  return powerups;
}

function generateWeaponSpawns(map) {
  const spawns = [];
  const weaponTypes = Object.keys(WEAPONS);
  
  for (let i = 0; i < map.weaponSpawns; i++) {
    // Weight by rarity
    let weapon;
    const rand = Math.random();
    if (rand < 0.5) {
      weapon = weaponTypes.filter(w => WEAPONS[w].rarity === 'common')[Math.floor(Math.random() * 3)];
    } else if (rand < 0.75) {
      weapon = weaponTypes.filter(w => WEAPONS[w].rarity === 'uncommon')[0] || 'shotgun';
    } else if (rand < 0.9) {
      weapon = weaponTypes.filter(w => WEAPONS[w].rarity === 'rare')[Math.floor(Math.random() * 2)] || 'sniper';
    } else if (rand < 0.97) {
      weapon = weaponTypes.filter(w => WEAPONS[w].rarity === 'epic')[0] || 'minigun';
    } else {
      weapon = weaponTypes.filter(w => WEAPONS[w].rarity === 'legendary')[0] || 'rocket_launcher';
    }
    
    spawns.push({
      id: uuidv4(),
      weapon: weapon || 'pistol',
      x: Math.random() * (map.size - 200) + 100,
      y: Math.random() * (map.size - 200) + 100,
      collected: false
    });
  }
  
  return spawns;
}

function filterProfanity(text) {
  const badWords = ['damn', 'hell', 'crap', 'stupid']; // Add more as needed
  let filtered = text;
  badWords.forEach(word => {
    const regex = new RegExp(word, 'gi');
    filtered = filtered.replace(regex, '*'.repeat(word.length));
  });
  return filtered;
}

// ============== START SERVER ==============
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║  🧠 BrainStorm Royale Server Running  ║
  ╠════════════════════════════════════════╣
  ║  Port: ${PORT}                           ║
  ║  Database: Connected                   ║
  ║  Status: ✅ Ready                       ║
  ╚════════════════════════════════════════╝
  `);
});
