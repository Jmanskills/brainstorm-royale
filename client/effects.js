// Sound Effects and Particle Effects Configuration

// Sound Effects Library (URLs or paths to audio files)
const SOUND_EFFECTS = {
  // UI Sounds
  ui: {
    click: { file: '/sounds/ui/click.mp3', volume: 0.5 },
    hover: { file: '/sounds/ui/hover.mp3', volume: 0.3 },
    success: { file: '/sounds/ui/success.mp3', volume: 0.6 },
    error: { file: '/sounds/ui/error.mp3', volume: 0.6 },
    notification: { file: '/sounds/ui/notification.mp3', volume: 0.5 }
  },
  
  // Weapon Sounds
  weapons: {
    pistol: { file: '/sounds/weapons/pistol.mp3', volume: 0.7 },
    rifle: { file: '/sounds/weapons/rifle.mp3', volume: 0.7 },
    shotgun: { file: '/sounds/weapons/shotgun.mp3', volume: 0.8 },
    sniper: { file: '/sounds/weapons/sniper.mp3', volume: 0.75 },
    smg: { file: '/sounds/weapons/smg.mp3', volume: 0.6 },
    rocket: { file: '/sounds/weapons/rocket.mp3', volume: 0.9 },
    explosion: { file: '/sounds/weapons/explosion.mp3', volume: 0.8 },
    reload: { file: '/sounds/weapons/reload.mp3', volume: 0.5 }
  },
  
  // Building Sounds
  building: {
    place: { file: '/sounds/building/place.mp3', volume: 0.6 },
    destroy: { file: '/sounds/building/destroy.mp3', volume: 0.7 },
    edit: { file: '/sounds/building/edit.mp3', volume: 0.5 }
  },
  
  // Pickup Sounds
  pickups: {
    weapon: { file: '/sounds/pickups/weapon.mp3', volume: 0.6 },
    powerup: { file: '/sounds/pickups/powerup.mp3', volume: 0.7 },
    ammo: { file: '/sounds/pickups/ammo.mp3', volume: 0.5 },
    health: { file: '/sounds/pickups/health.mp3', volume: 0.6 },
    shield: { file: '/sounds/pickups/shield.mp3', volume: 0.7 }
  },
  
  // Character Sounds
  character: {
    footstep: { file: '/sounds/character/footstep.mp3', volume: 0.4 },
    jump: { file: '/sounds/character/jump.mp3', volume: 0.5 },
    land: { file: '/sounds/character/land.mp3', volume: 0.5 },
    damage: { file: '/sounds/character/damage.mp3', volume: 0.6 },
    death: { file: '/sounds/character/death.mp3', volume: 0.7 },
    emote: { file: '/sounds/character/emote.mp3', volume: 0.6 }
  },
  
  // Vehicle Sounds
  vehicles: {
    engine: { file: '/sounds/vehicles/engine.mp3', volume: 0.5, loop: true },
    honk: { file: '/sounds/vehicles/honk.mp3', volume: 0.7 },
    boost: { file: '/sounds/vehicles/boost.mp3', volume: 0.8 },
    crash: { file: '/sounds/vehicles/crash.mp3', volume: 0.8 }
  },
  
  // Game Events
  events: {
    kill: { file: '/sounds/events/kill.mp3', volume: 0.8 },
    victory: { file: '/sounds/events/victory.mp3', volume: 0.9 },
    defeat: { file: '/sounds/events/defeat.mp3', volume: 0.7 },
    levelup: { file: '/sounds/events/levelup.mp3', volume: 0.8 },
    achievement: { file: '/sounds/events/achievement.mp3', volume: 0.8 },
    storm: { file: '/sounds/events/storm.mp3', volume: 0.6, loop: true }
  },
  
  // Music
  music: {
    menu: { file: '/sounds/music/menu.mp3', volume: 0.3, loop: true },
    lobby: { file: '/sounds/music/lobby.mp3', volume: 0.3, loop: true },
    gameplay: { file: '/sounds/music/gameplay.mp3', volume: 0.25, loop: true },
    victory: { file: '/sounds/music/victory.mp3', volume: 0.4 }
  }
};

// Particle Effects Configuration
const PARTICLE_EFFECTS = {
  // Muzzle flash
  muzzleFlash: {
    count: 5,
    lifetime: 100,
    size: { min: 3, max: 8 },
    speed: { min: 2, max: 5 },
    color: ['#ffff00', '#ff9900', '#ff0000'],
    alpha: { start: 1, end: 0 }
  },
  
  // Bullet impact
  bulletImpact: {
    count: 8,
    lifetime: 200,
    size: { min: 2, max: 5 },
    speed: { min: 1, max: 3 },
    color: ['#808080', '#a0a0a0'],
    alpha: { start: 0.8, end: 0 }
  },
  
  // Explosion
  explosion: {
    count: 30,
    lifetime: 500,
    size: { min: 5, max: 15 },
    speed: { min: 3, max: 8 },
    color: ['#ff4400', '#ff8800', '#ffcc00', '#808080'],
    alpha: { start: 1, end: 0 },
    gravity: 0.1
  },
  
  // Health pickup
  healthPickup: {
    count: 10,
    lifetime: 800,
    size: { min: 3, max: 6 },
    speed: { min: 0.5, max: 1.5 },
    color: ['#ff0000', '#ff6666'],
    alpha: { start: 1, end: 0 },
    float: true
  },
  
  // Shield pickup
  shieldPickup: {
    count: 10,
    lifetime: 800,
    size: { min: 3, max: 6 },
    speed: { min: 0.5, max: 1.5 },
    color: ['#0088ff', '#66ccff'],
    alpha: { start: 1, end: 0 },
    float: true
  },
  
  // Speed boost effect
  speedBoost: {
    count: 3,
    lifetime: 200,
    size: { min: 4, max: 8 },
    speed: { min: -5, max: -2 },
    color: ['#ffff00', '#ffaa00'],
    alpha: { start: 0.7, end: 0 },
    continuous: true
  },
  
  // Damage boost effect
  damageBoost: {
    count: 2,
    lifetime: 300,
    size: { min: 5, max: 10 },
    speed: { min: 0, max: 1 },
    color: ['#ff0000', '#ff4444'],
    alpha: { start: 0.6, end: 0 },
    continuous: true
  },
  
  // Invincibility effect
  invincibility: {
    count: 5,
    lifetime: 400,
    size: { min: 4, max: 8 },
    speed: { min: 1, max: 2 },
    color: ['#ff0000', '#ff7700', '#ffff00', '#00ff00', '#0000ff', '#9900ff'],
    alpha: { start: 0.8, end: 0 },
    continuous: true,
    rainbow: true
  },
  
  // Building placement
  buildingPlace: {
    count: 15,
    lifetime: 300,
    size: { min: 2, max: 5 },
    speed: { min: 1, max: 3 },
    color: ['#8B4513', '#A0522D'],
    alpha: { start: 0.8, end: 0 }
  },
  
  // Building destruction
  buildingDestroy: {
    count: 20,
    lifetime: 600,
    size: { min: 3, max: 8 },
    speed: { min: 2, max: 5 },
    color: ['#8B4513', '#A0522D', '#696969'],
    alpha: { start: 1, end: 0 },
    gravity: 0.2
  },
  
  // Level up
  levelUp: {
    count: 30,
    lifetime: 1000,
    size: { min: 5, max: 12 },
    speed: { min: 2, max: 5 },
    color: ['#ffd700', '#ffea00', '#fff'],
    alpha: { start: 1, end: 0 },
    float: true,
    sparkle: true
  },
  
  // Death
  death: {
    count: 40,
    lifetime: 1500,
    size: { min: 4, max: 10 },
    speed: { min: 2, max: 6 },
    color: ['#666666', '#888888'],
    alpha: { start: 1, end: 0 },
    gravity: 0.15
  },
  
  // Vehicle boost
  vehicleBoost: {
    count: 5,
    lifetime: 300,
    size: { min: 6, max: 12 },
    speed: { min: -3, max: -1 },
    color: ['#0088ff', '#00ccff'],
    alpha: { start: 0.8, end: 0 },
    continuous: true
  },
  
  // Storm edge
  stormEdge: {
    count: 2,
    lifetime: 500,
    size: { min: 8, max: 15 },
    speed: { min: 0.5, max: 1 },
    color: ['#6600cc', '#9933ff'],
    alpha: { start: 0.6, end: 0 },
    continuous: true
  }
};

// Particle system class
class ParticleSystem {
  constructor() {
    this.particles = [];
  }
  
  emit(effect, x, y, angle = 0) {
    const config = PARTICLE_EFFECTS[effect];
    if (!config) return;
    
    for (let i = 0; i < config.count; i++) {
      const particleAngle = angle + (Math.random() - 0.5) * Math.PI;
      const speed = config.speed.min + Math.random() * (config.speed.max - config.speed.min);
      
      const particle = {
        x,
        y,
        vx: Math.cos(particleAngle) * speed,
        vy: Math.sin(particleAngle) * speed,
        size: config.size.min + Math.random() * (config.size.max - config.size.min),
        color: config.color[Math.floor(Math.random() * config.color.length)],
        alpha: config.alpha.start,
        lifetime: config.lifetime,
        age: 0,
        gravity: config.gravity || 0,
        float: config.float || false
      };
      
      this.particles.push(particle);
    }
  }
  
  update(deltaTime) {
    this.particles = this.particles.filter(p => {
      p.age += deltaTime;
      
      if (p.age >= p.lifetime) {
        return false;
      }
      
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.gravity) {
        p.vy += p.gravity;
      }
      
      if (p.float) {
        p.vy -= 0.05;
      }
      
      p.alpha = 1 - (p.age / p.lifetime);
      
      return true;
    });
  }
  
  render(ctx) {
    this.particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }
}

module.exports = {
  SOUND_EFFECTS,
  PARTICLE_EFFECTS,
  ParticleSystem
};
