// BrainStorm Royale - Unique Cartoony Robot/AI Character System
// All characters are robot variants with different themes and personalities!

const CharacterRenderer = {
  // All skins are Robot/AI variants
  skins: {
    // Default & Common Robots
    default: { 
      name: 'BrainBot Classic',
      primary: '#667eea', 
      secondary: '#764ba2', 
      accent: '#fff', 
      screen: '#00ffff',
      antenna: true,
      antennaColor: '#ffff00',
      eyes: 'happy',
      special: null
    },
    rookie: { 
      name: 'Rookie Bot',
      primary: '#3498db', 
      secondary: '#2980b9', 
      accent: '#ecf0f1', 
      screen: '#00ff00',
      antenna: true,
      antennaColor: '#00ff00',
      eyes: 'determined',
      special: null
    },
    
    // Special Themed Robots (User Requested)
    peely: {
      name: 'Banana Bot',
      primary: '#fff200',
      secondary: '#ffd700',
      accent: '#8B4513',
      screen: '#000',
      antenna: false,
      special: 'banana',
      eyes: 'silly'
    },
    pug: {
      name: 'Pug Bot',
      primary: '#D2B48C',
      secondary: '#8B7355',
      accent: '#000',
      screen: '#8B4513',
      antenna: false,
      special: 'dog_ears',
      eyes: 'cute'
    },
    
    // Awesome Themed Robots
    cyber_ninja: {
      name: 'Cyber Ninja',
      primary: '#1a1a2e',
      secondary: '#16213e',
      accent: '#0f3460',
      screen: '#ff00ff',
      antenna: true,
      antennaColor: '#ff00ff',
      eyes: 'focused',
      special: 'ninja_mask'
    },
    galaxy: {
      name: 'Galaxy Bot',
      primary: '#4B0082',
      secondary: '#8B008B',
      accent: '#FFD700',
      screen: '#ffffff',
      antenna: true,
      antennaColor: '#ffffff',
      eyes: 'cosmic',
      special: 'stars'
    },
    lava: {
      name: 'Lava Bot',
      primary: '#ff4500',
      secondary: '#ff6347',
      accent: '#ffff00',
      screen: '#ff0000',
      antenna: true,
      antennaColor: '#ff0000',
      eyes: 'angry',
      special: 'flames'
    },
    ice: {
      name: 'Ice Bot',
      primary: '#87ceeb',
      secondary: '#4682b4',
      accent: '#ffffff',
      screen: '#00ffff',
      antenna: true,
      antennaColor: '#ffffff',
      eyes: 'chill',
      special: 'frost'
    },
    golden: {
      name: 'Golden Bot',
      primary: '#ffd700',
      secondary: '#ffdf00',
      accent: '#ffffff',
      screen: '#ffff00',
      antenna: true,
      antennaColor: '#ffd700',
      eyes: 'rich',
      special: 'sparkles'
    },
    shadow: {
      name: 'Shadow Bot',
      primary: '#2d2d2d',
      secondary: '#1a1a1a',
      accent: '#8b00ff',
      screen: '#8b00ff',
      antenna: true,
      antennaColor: '#8b00ff',
      eyes: 'mysterious',
      special: 'smoke'
    },
    rainbow: {
      name: 'Rainbow Bot',
      primary: '#ff0000',
      secondary: '#00ff00',
      accent: '#0000ff',
      screen: '#ffffff',
      antenna: true,
      antennaColor: 'rainbow',
      eyes: 'happy',
      special: 'rainbow_pulse'
    },
    
    // Battle Ticket Robots
    student: { name: 'Scholar Bot', primary: '#2ecc71', secondary: '#27ae60', accent: '#fff', screen: '#00ff00', antenna: true, antennaColor: '#2ecc71', eyes: 'smart', special: null },
    graduate: { name: 'Graduate Bot', primary: '#9b59b6', secondary: '#8e44ad', accent: '#f1c40f', screen: '#9b59b6', antenna: true, antennaColor: '#f1c40f', eyes: 'proud', special: 'cap' },
    professor: { name: 'Professor Bot', primary: '#34495e', secondary: '#2c3e50', accent: '#e74c3c', screen: '#ffffff', antenna: true, antennaColor: '#e74c3c', eyes: 'wise', special: 'glasses' },
    master_brain: { name: 'Master Brain', primary: '#e74c3c', secondary: '#c0392b', accent: '#f39c12', screen: '#ff0000', antenna: true, antennaColor: '#f39c12', eyes: 'genius', special: 'crown' }
  },

  // Eye expressions for robot screens
  eyeExpressions: {
    happy: { leftEye: '◕', rightEye: '◕', mouth: '⌣' },
    determined: { leftEye: '◉', rightEye: '◉', mouth: '―' },
    silly: { leftEye: '◕', rightEye: '○', mouth: '⌣' },
    cute: { leftEye: '●', rightEye: '●', mouth: 'ω' },
    focused: { leftEye: '⊙', rightEye: '⊙', mouth: '―' },
    cosmic: { leftEye: '✦', rightEye: '✦', mouth: '⌣' },
    angry: { leftEye: '◢', rightEye: '◣', mouth: '∩' },
    chill: { leftEye: '◕', rightEye: '◕', mouth: '~' },
    rich: { leftEye: '$', rightEye: '$', mouth: '⌣' },
    mysterious: { leftEye: '◆', rightEye: '◆', mouth: '―' },
    smart: { leftEye: '◕', rightEye: '◕', mouth: 'v' },
    proud: { leftEye: '◉', rightEye: '◉', mouth: '⌣' },
    wise: { leftEye: '⊙', rightEye: '⊙', mouth: '~' },
    genius: { leftEye: '★', rightEye: '★', mouth: '⌣' }
  },

  // Emote animations
  emoteAnimations: {
    wave: { icon: '👋', animated: true, frames: ['👋', '🙌', '👋', '✋'] },
    thumbsup: { icon: '👍', animated: false },
    brain_power: { icon: '🧠', animated: true, frames: ['🧠', '💡', '✨', '💡'] },
    thinking: { icon: '🤔', animated: false },
    genius: { icon: '🤓', animated: true, frames: ['🤓', '💡', '⚡', '✨'] },
    celebration: { icon: '🎉', animated: true, frames: ['🎉', '🎊', '✨', '🎈'] },
    victory_dance: { icon: '💃', animated: true, frames: ['💃', '🕺', '💃', '🕺'] },
    laugh: { icon: '😂', animated: true, frames: ['😂', '🤣', '😂', '😆'] },
    flex: { icon: '💪', animated: true, frames: ['💪', '💪', '😎', '💪'] },
    heart: { icon: '❤️', animated: true, frames: ['❤️', '💖', '💕', '💝'] },
    sad: { icon: '😢', animated: false },
    angry: { icon: '😠', animated: true, frames: ['😠', '😡', '🤬', '😤'] }
  },

  // Main drawing function
  drawCharacter(ctx, x, y, skinId, scale = 1, facing = 'right') {
    const skin = this.skins[skinId] || this.skins.default;
    const size = 40 * scale;
    
    ctx.save();
    ctx.translate(x, y);
    
    if (facing === 'left') {
      ctx.scale(-1, 1);
    }
    
    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.beginPath();
    ctx.ellipse(0, size * 0.55, size * 0.5, size * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw based on special type
    if (skin.special === 'banana') {
      this.drawBananaBot(ctx, skin, size);
    } else if (skin.special === 'dog_ears') {
      this.drawPugBot(ctx, skin, size);
    } else {
      this.drawStandardBot(ctx, skin, size);
    }
    
    ctx.restore();
  },
  
  // Alias for render (used in game)
  render(ctx, skinId, size) {
    // This is called from the game with translate already applied
    const skin = this.skins[skinId] || this.skins.default;
    
    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.beginPath();
    ctx.ellipse(0, size * 0.55, size * 0.5, size * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw based on special type
    if (skin.special === 'banana') {
      this.drawBananaBot(ctx, skin, size);
    } else if (skin.special === 'dog_ears') {
      this.drawPugBot(ctx, skin, size);
    } else {
      this.drawStandardBot(ctx, skin, size);
    }
  },

  // Standard robot design
  drawStandardBot(ctx, skin, size) {
    // === CUTE ROUNDED BODY (like uploaded image!) ===
    const bodyGradient = ctx.createLinearGradient(0, -size * 0.4, 0, size * 0.5);
    bodyGradient.addColorStop(0, skin.primary);
    bodyGradient.addColorStop(0.5, skin.secondary);
    bodyGradient.addColorStop(1, this.darkenColor(skin.secondary, 0.8));
    
    // Main body - super round!
    ctx.fillStyle = bodyGradient;
    ctx.strokeStyle = '#000';
    ctx.lineWidth = size * 0.1; // THICK outline like the image!
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    
    ctx.beginPath();
    // Oval body shape
    ctx.ellipse(0, 0, size * 0.45, size * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // === CUTE SIMPLE EYES (oval shapes like the image) ===
    ctx.fillStyle = '#000';
    
    // Left eye - simple oval
    ctx.beginPath();
    ctx.ellipse(-size * 0.15, -size * 0.08, size * 0.08, size * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Right eye - simple oval
    ctx.beginPath();
    ctx.ellipse(size * 0.15, -size * 0.08, size * 0.08, size * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // === SHORT CUTE LEGS (like the image) ===
    const legGradient = ctx.createLinearGradient(0, size * 0.4, 0, size * 0.6);
    legGradient.addColorStop(0, this.darkenColor(skin.secondary, 0.9));
    legGradient.addColorStop(1, this.darkenColor(skin.secondary, 0.7));
    
    ctx.fillStyle = legGradient;
    ctx.strokeStyle = '#000';
    ctx.lineWidth = size * 0.1;
    
    // Left leg - short and cute
    ctx.beginPath();
    this.roundRect(ctx, -size * 0.28, size * 0.4, size * 0.25, size * 0.18, size * 0.1);
    ctx.fill();
    ctx.stroke();
    
    // Right leg - short and cute
    ctx.beginPath();
    this.roundRect(ctx, size * 0.03, size * 0.4, size * 0.25, size * 0.18, size * 0.1);
    ctx.fill();
    ctx.stroke();
    
    // === HIGHLIGHT for 3D effect ===
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.beginPath();
    ctx.ellipse(-size * 0.12, -size * 0.25, size * 0.2, size * 0.25, -0.4, 0, Math.PI * 2);
    ctx.fill();
    
    // === ANTENNA (optional) ===
    if (skin.antenna !== false) {
      ctx.strokeStyle = skin.accent || skin.primary;
      ctx.lineWidth = size * 0.06;
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.5);
      ctx.lineTo(0, -size * 0.7);
      ctx.stroke();
      
      // Antenna bulb with glow
      const antennaGradient = ctx.createRadialGradient(0, -size * 0.7, 0, 0, -size * 0.7, size * 0.12);
      antennaGradient.addColorStop(0, skin.accent || skin.primary);
      antennaGradient.addColorStop(0.5, skin.accent || skin.primary);
      antennaGradient.addColorStop(1, 'rgba(255,255,255,0)');
      
      ctx.fillStyle = antennaGradient;
      ctx.beginPath();
      ctx.arc(0, -size * 0.7, size * 0.12, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = skin.accent || skin.primary;
      ctx.strokeStyle = '#000';
      ctx.lineWidth = size * 0.06;
      ctx.beginPath();
      ctx.arc(0, -size * 0.7, size * 0.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    
    // === CHEST DETAIL (optional) ===
    if (skin.special !== 'banana' && skin.special !== 'dog_ears') {
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.beginPath();
      ctx.arc(0, size * 0.15, size * 0.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = size * 0.03;
      ctx.stroke();
    }
  },
  
  // Helper to darken colors
  darkenColor(color, factor) {
    // Simple darkening - multiply RGB values
    const hex = color.replace('#', '');
    const r = Math.floor(parseInt(hex.substr(0, 2), 16) * factor);
    const g = Math.floor(parseInt(hex.substr(2, 2), 16) * factor);
    const b = Math.floor(parseInt(hex.substr(4, 2), 16) * factor);
    return `rgb(${r}, ${g}, ${b})`;
  },

  // Banana Bot (Peely-inspired)
  drawBananaBot(ctx, skin, size) {
    // Banana body shape
    ctx.fillStyle = skin.primary;
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.4, size * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Banana gradient
    const gradient = ctx.createRadialGradient(-size * 0.2, -size * 0.2, 0, 0, 0, size * 0.6);
    gradient.addColorStop(0, '#fff200');
    gradient.addColorStop(0.7, '#ffd700');
    gradient.addColorStop(1, '#ffaa00');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Brown spots
    ctx.fillStyle = skin.accent;
    ctx.beginPath();
    ctx.arc(-size * 0.15, -size * 0.3, size * 0.08, 0, Math.PI * 2);
    ctx.arc(size * 0.2, -size * 0.1, size * 0.06, 0, Math.PI * 2);
    ctx.arc(-size * 0.25, size * 0.1, size * 0.07, 0, Math.PI * 2);
    ctx.fill();
    
    // Banana peel on top
    ctx.fillStyle = '#ffd700';
    ctx.strokeStyle = skin.accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-size * 0.1, -size * 0.6);
    ctx.quadraticCurveTo(-size * 0.3, -size * 0.8, -size * 0.4, -size * 0.6);
    ctx.quadraticCurveTo(-size * 0.35, -size * 0.5, -size * 0.2, -size * 0.55);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Robot face
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(-size * 0.15, -size * 0.15, size * 0.08, 0, Math.PI * 2);
    ctx.arc(size * 0.15, -size * 0.15, size * 0.08, 0, Math.PI * 2);
    ctx.fill();
    
    // Happy smile
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.2, 0.2, Math.PI - 0.2);
    ctx.stroke();
    
    // Arms
    ctx.fillStyle = skin.primary;
    ctx.beginPath();
    ctx.ellipse(-size * 0.45, 0, size * 0.12, size * 0.25, -0.3, 0, Math.PI * 2);
    ctx.ellipse(size * 0.45, 0, size * 0.12, size * 0.25, 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Screen panel (robot element)
    ctx.fillStyle = skin.screen;
    ctx.fillRect(-size * 0.15, size * 0.15, size * 0.3, size * 0.15);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(-size * 0.15, size * 0.15, size * 0.3, size * 0.15);
  },

  // Pug Bot
  drawPugBot(ctx, skin, size) {
    // Round body/head
    ctx.fillStyle = skin.primary;
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.45, 0, Math.PI * 2);
    ctx.fill();
    
    const gradient = ctx.createRadialGradient(-size * 0.2, -size * 0.2, 0, 0, 0, size * 0.45);
    gradient.addColorStop(0, skin.primary);
    gradient.addColorStop(1, skin.secondary);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Floppy dog ears
    ctx.fillStyle = skin.secondary;
    ctx.beginPath();
    ctx.ellipse(-size * 0.4, -size * 0.3, size * 0.2, size * 0.3, -0.5, 0, Math.PI * 2);
    ctx.ellipse(size * 0.4, -size * 0.3, size * 0.2, size * 0.3, 0.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Face mask (pug coloring)
    ctx.fillStyle = skin.accent;
    ctx.beginPath();
    ctx.ellipse(0, -size * 0.1, size * 0.35, size * 0.25, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Big cute eyes
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(-size * 0.15, -size * 0.15, size * 0.12, 0, Math.PI * 2);
    ctx.arc(size * 0.15, -size * 0.15, size * 0.12, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(-size * 0.15, -size * 0.13, size * 0.07, 0, Math.PI * 2);
    ctx.arc(size * 0.15, -size * 0.13, size * 0.07, 0, Math.PI * 2);
    ctx.fill();
    
    // Nose
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(0, -size * 0.05, size * 0.08, 0, Math.PI * 2);
    ctx.fill();
    
    // Tongue (cute!)
    ctx.fillStyle = '#ff69b4';
    ctx.beginPath();
    ctx.ellipse(0, size * 0.08, size * 0.1, size * 0.06, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Robot badge on chest
    ctx.fillStyle = skin.screen;
    ctx.fillRect(-size * 0.12, size * 0.25, size * 0.24, size * 0.15);
    ctx.strokeStyle = skin.accent;
    ctx.lineWidth = 2;
    ctx.strokeRect(-size * 0.12, size * 0.25, size * 0.24, size * 0.15);
    
    // Legs
    ctx.fillStyle = skin.primary;
    ctx.beginPath();
    ctx.ellipse(-size * 0.25, size * 0.5, size * 0.12, size * 0.18, 0, 0, Math.PI * 2);
    ctx.ellipse(size * 0.25, size * 0.5, size * 0.12, size * 0.18, 0, 0, Math.PI * 2);
    ctx.fill();
  },

  // Draw face on robot screen
  drawFace(ctx, skin, size) {
    const expression = this.eyeExpressions[skin.eyes] || this.eyeExpressions.happy;
    
    ctx.fillStyle = skin.screen;
    ctx.font = `${size * 0.15}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Eyes
    ctx.fillText(expression.leftEye, -size * 0.15, -size * 0.3);
    ctx.fillText(expression.rightEye, size * 0.15, -size * 0.3);
    
    // Mouth
    ctx.fillText(expression.mouth, 0, -size * 0.18);
  },

  // Accessories
  drawGraduationCap(ctx, skin, size) {
    ctx.fillStyle = skin.accent;
    ctx.beginPath();
    this.roundRect(ctx, -size * 0.35, -size * 0.65, size * 0.7, size * 0.08, size * 0.02);
    ctx.fill();
    
    ctx.beginPath();
    this.roundRect(ctx, -size * 0.2, -size * 0.72, size * 0.4, size * 0.12, size * 0.02);
    ctx.fill();
    
    // Tassel
    ctx.strokeStyle = skin.accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(size * 0.15, -size * 0.65);
    ctx.lineTo(size * 0.25, -size * 0.5);
    ctx.stroke();
    ctx.fillStyle = skin.accent;
    ctx.beginPath();
    ctx.arc(size * 0.25, -size * 0.5, size * 0.06, 0, Math.PI * 2);
    ctx.fill();
  },

  drawGlasses(ctx, skin, size) {
    ctx.strokeStyle = skin.accent;
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    
    // Left lens
    ctx.beginPath();
    ctx.arc(-size * 0.15, -size * 0.3, size * 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Right lens
    ctx.beginPath();
    ctx.arc(size * 0.15, -size * 0.3, size * 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Bridge
    ctx.beginPath();
    ctx.moveTo(-size * 0.05, -size * 0.3);
    ctx.lineTo(size * 0.05, -size * 0.3);
    ctx.stroke();
  },

  drawCrown(ctx, skin, size) {
    ctx.fillStyle = '#ffd700';
    ctx.strokeStyle = '#ffaa00';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(-size * 0.25, -size * 0.6);
    ctx.lineTo(-size * 0.2, -size * 0.75);
    ctx.lineTo(-size * 0.1, -size * 0.65);
    ctx.lineTo(0, -size * 0.8);
    ctx.lineTo(size * 0.1, -size * 0.65);
    ctx.lineTo(size * 0.2, -size * 0.75);
    ctx.lineTo(size * 0.25, -size * 0.6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Jewels
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(0, -size * 0.7, size * 0.05, 0, Math.PI * 2);
    ctx.fill();
  },

  // Animated character
  drawAnimated(ctx, x, y, skinId, frame, scale = 1, facing = 'right', isMoving = false, emote = null) {
    ctx.save();
    
    // Movement animation
    let bounce = 0;
    let tilt = 0;
    
    if (isMoving) {
      bounce = Math.sin(frame * 0.25) * 4 * scale;
      tilt = Math.sin(frame * 0.25) * 0.1;
    } else {
      bounce = Math.sin(frame * 0.05) * 1.5 * scale;
    }
    
    ctx.translate(x, y + bounce);
    ctx.rotate(tilt);
    
    // Draw emote bubble if active
    if (emote) {
      this.drawEmote(ctx, emote, frame, scale);
    }
    
    this.drawCharacter(ctx, 0, 0, skinId, scale, facing);
    
    ctx.restore();
  },

  // Draw emote animation
  drawEmote(ctx, emote, frame, scale) {
    const emoteData = this.emoteAnimations[emote];
    if (!emoteData) return;
    
    const y = -65 * scale;
    const bounce = Math.sin(frame * 0.2) * 5;
    
    // Bubble
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, y + bounce, 35 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Bubble tail
    ctx.beginPath();
    ctx.moveTo(-8, y + 30 + bounce);
    ctx.lineTo(0, y + 45 + bounce);
    ctx.lineTo(8, y + 30 + bounce);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Emote icon
    ctx.font = `${40 * scale}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    if (emoteData.animated) {
      const frameIndex = Math.floor(frame / 10) % emoteData.frames.length;
      ctx.fillText(emoteData.frames[frameIndex], 0, y + bounce);
    } else {
      ctx.fillText(emoteData.icon, 0, y + bounce);
    }
  },

  // Draw with power-up effects
  drawWithEffects(ctx, x, y, skinId, frame, scale, facing, effects = [], emote = null) {
    ctx.save();
    
    // Shield
    if (effects.includes('shield')) {
      ctx.strokeStyle = 'rgba(100, 200, 255, 0.6)';
      ctx.lineWidth = 5;
      ctx.setLineDash([10, 5]);
      ctx.lineDashOffset = -frame;
      ctx.beginPath();
      ctx.arc(x, y, 50 * scale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    
    // Speed
    if (effects.includes('speed')) {
      ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)';
      ctx.lineWidth = 3;
      for (let i = 0; i < 4; i++) {
        const offset = (frame * 3 + i * 15) % 60;
        ctx.beginPath();
        ctx.moveTo(x - 60 - offset, y - 10 + i * 7);
        ctx.lineTo(x - 40 - offset, y - 10 + i * 7);
        ctx.stroke();
      }
    }
    
    // Damage boost
    if (effects.includes('damage')) {
      ctx.shadowColor = 'rgba(255, 0, 0, 0.6)';
      ctx.shadowBlur = 25;
    }
    
    // Invincibility (rainbow)
    if (effects.includes('invincible')) {
      const colors = ['#ff0000', '#ff7700', '#ffff00', '#00ff00', '#0000ff', '#8b00ff'];
      const colorIndex = Math.floor(frame / 4) % colors.length;
      ctx.strokeStyle = colors[colorIndex];
      ctx.lineWidth = 4;
      ctx.shadowColor = colors[colorIndex];
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(x, y, 55 * scale, 0, Math.PI * 2);
      ctx.stroke();
      
      // Sparkles
      for (let i = 0; i < 8; i++) {
        const angle = (frame * 0.1 + i * Math.PI / 4);
        const dist = 60 * scale;
        const sparkleX = x + Math.cos(angle) * dist;
        const sparkleY = y + Math.sin(angle) * dist;
        ctx.fillStyle = colors[(i + Math.floor(frame / 5)) % colors.length];
        ctx.beginPath();
        ctx.arc(sparkleX, sparkleY, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    this.drawAnimated(ctx, x, y, skinId, frame, scale, facing, effects.includes('speed'), emote);
    
    ctx.restore();
  },

  // Helper: rounded rectangle
  roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CharacterRenderer;
}
