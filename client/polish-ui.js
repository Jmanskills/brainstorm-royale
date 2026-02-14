// Pixelio Polish - UI Effects & Utilities

class PixelioUI {
  constructor() {
    this.loadingTips = [
      "💡 Tip: Use WASD to move around the map!",
      "🎯 Tip: Answer trivia questions for bonus loot!",
      "🏠 Tip: Enter buildings to find better weapons!",
      "⚡ Tip: Power-ups give you temporary advantages!",
      "🎨 Tip: Customize your character in the locker!",
      "👥 Tip: Team up with friends for more fun!",
      "🗺️ Tip: Explore the map to find hidden chests!",
      "🔫 Tip: Different weapons have different strengths!",
    ];
    
    this.currentTip = 0;
    this.notifications = [];
  }
  
  // Loading Screen
  showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading-screen';
    loading.id = 'loading-screen';
    loading.innerHTML = `
      <div class="loading-logo">PIXELIO</div>
      <div class="loading-bar-container">
        <div class="loading-bar" id="loading-bar"></div>
      </div>
      <div class="loading-text" id="loading-text">Loading...</div>
      <div class="loading-tips" id="loading-tips">${this.loadingTips[0]}</div>
    `;
    document.body.appendChild(loading);
    
    this.updateLoadingProgress(0);
    this.rotateTips();
  }
  
  updateLoadingProgress(percent) {
    const bar = document.getElementById('loading-bar');
    const text = document.getElementById('loading-text');
    
    if (bar) bar.style.width = percent + '%';
    if (text) {
      if (percent < 30) text.textContent = 'Loading assets...';
      else if (percent < 60) text.textContent = 'Connecting to server...';
      else if (percent < 90) text.textContent = 'Preparing world...';
      else text.textContent = 'Almost ready...';
    }
  }
  
  hideLoading() {
    const loading = document.getElementById('loading-screen');
    if (loading) {
      loading.classList.add('hidden');
      setTimeout(() => loading.remove(), 500);
    }
  }
  
  rotateTips() {
    setInterval(() => {
      const tipsEl = document.getElementById('loading-tips');
      if (tipsEl) {
        this.currentTip = (this.currentTip + 1) % this.loadingTips.length;
        tipsEl.style.opacity = '0';
        setTimeout(() => {
          tipsEl.textContent = this.loadingTips[this.currentTip];
          tipsEl.style.opacity = '1';
        }, 200);
      }
    }, 4000);
  }
  
  // Notifications
  showNotification(title, message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-title">${title}</div>
      <div class="notification-message">${message}</div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
      notification.remove();
    }, 3000);
    
    // Play sound effect
    this.playSound('notification');
  }
  
  // Victory Screen
  showVictory(stats) {
    const victory = document.createElement('div');
    victory.className = 'victory-screen active';
    victory.innerHTML = `
      <div class="victory-title">🏆 VICTORY! 🏆</div>
      <div class="victory-subtitle">You are the champion!</div>
      <div class="victory-stats">
        <div class="victory-stat">
          <div class="victory-stat-value">${stats.kills || 0}</div>
          <div class="victory-stat-label">Eliminations</div>
        </div>
        <div class="victory-stat">
          <div class="victory-stat-value">${stats.damage || 0}</div>
          <div class="victory-stat-label">Damage Dealt</div>
        </div>
        <div class="victory-stat">
          <div class="victory-stat-value">${stats.time || '0:00'}</div>
          <div class="victory-stat-label">Time Survived</div>
        </div>
      </div>
      <button class="victory-button" onclick="pixelioUI.returnToMenu()">Return to Menu</button>
    `;
    
    document.body.appendChild(victory);
    this.playSound('victory');
  }
  
  // Death Screen
  showDeath(killer, stats) {
    const death = document.createElement('div');
    death.className = 'death-screen active';
    death.innerHTML = `
      <div class="death-title">☠️ ELIMINATED ☠️</div>
      <div class="death-subtitle">Eliminated by ${killer}</div>
      <div class="death-stats">
        <div class="death-stat">
          <span class="death-stat-label">Kills:</span>
          <span class="death-stat-value">${stats.kills || 0}</span>
        </div>
        <div class="death-stat">
          <span class="death-stat-label">Damage Dealt:</span>
          <span class="death-stat-value">${stats.damage || 0}</span>
        </div>
        <div class="death-stat">
          <span class="death-stat-label">Time Survived:</span>
          <span class="death-stat-value">${stats.time || '0:00'}</span>
        </div>
        <div class="death-stat">
          <span class="death-stat-label">Placement:</span>
          <span class="death-stat-value">#${stats.placement || 'N/A'}</span>
        </div>
      </div>
      <button class="victory-button" onclick="pixelioUI.returnToMenu()">Return to Menu</button>
    `;
    
    document.body.appendChild(death);
    this.playSound('death');
  }
  
  // Sound Effects
  playSound(type) {
    // Create simple beep sounds using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different sounds for different events
    switch(type) {
      case 'click':
        oscillator.frequency.value = 600;
        gainNode.gain.value = 0.1;
        break;
      case 'notification':
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.15;
        break;
      case 'victory':
        oscillator.frequency.value = 1200;
        gainNode.gain.value = 0.2;
        break;
      case 'death':
        oscillator.frequency.value = 200;
        gainNode.gain.value = 0.15;
        break;
      default:
        oscillator.frequency.value = 500;
        gainNode.gain.value = 0.1;
    }
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  }
  
  // Button click effect
  addButtonEffects() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn') || 
          e.target.classList.contains('menu-btn') ||
          e.target.classList.contains('victory-button')) {
        this.playSound('click');
        
        // Ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        const rect = e.target.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        
        e.target.style.position = 'relative';
        e.target.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      }
    });
    
    // Add ripple animation
    if (!document.getElementById('ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // HUD Creation
  createHUD() {
    const hud = document.createElement('div');
    hud.className = 'hud';
    hud.innerHTML = `
      <div class="hud-item">
        <span class="hud-icon">❤️</span>
        <div>
          <div class="hud-label">Health</div>
          <div class="hud-value" id="hud-health">100</div>
        </div>
      </div>
      <div class="hud-item">
        <span class="hud-icon">🛡️</span>
        <div>
          <div class="hud-label">Shield</div>
          <div class="hud-value" id="hud-shield">0</div>
        </div>
      </div>
      <div class="hud-item">
        <span class="hud-icon">🔫</span>
        <div>
          <div class="hud-label">Ammo</div>
          <div class="hud-value" id="hud-ammo">50</div>
        </div>
      </div>
      <div class="hud-item">
        <span class="hud-icon">👥</span>
        <div>
          <div class="hud-label">Players</div>
          <div class="hud-value" id="hud-players">100</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(hud);
  }
  
  updateHUD(data) {
    if (data.health !== undefined) {
      const el = document.getElementById('hud-health');
      if (el) el.textContent = data.health;
    }
    if (data.shield !== undefined) {
      const el = document.getElementById('hud-shield');
      if (el) el.textContent = data.shield;
    }
    if (data.ammo !== undefined) {
      const el = document.getElementById('hud-ammo');
      if (el) el.textContent = data.ammo;
    }
    if (data.players !== undefined) {
      const el = document.getElementById('hud-players');
      if (el) el.textContent = data.players;
    }
  }
  
  returnToMenu() {
    // Remove victory/death screens
    document.querySelectorAll('.victory-screen, .death-screen').forEach(el => el.remove());
    
    // Reload or redirect to menu
    window.location.reload();
  }
}

// Initialize
const pixelioUI = new PixelioUI();

// Auto-add button effects when page loads
window.addEventListener('load', () => {
  pixelioUI.addButtonEffects();
});

// Export for use in main game
window.pixelioUI = pixelioUI;
