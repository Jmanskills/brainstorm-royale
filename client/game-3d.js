// BrainStorm Royale - 3D ENGINE! 🎮
// Built with Three.js - Polytoria/Roblox style!

class Game3D {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.player = null;
    this.controls = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      jump: false
    };
    this.velocity = new THREE.Vector3();
    this.canJump = false;
    
    this.init();
  }
  
  init() {
    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87CEEB); // Sky blue!
    this.scene.fog = new THREE.Fog(0x87CEEB, 100, 1000);
    
    // Create camera (third-person)
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    this.camera.position.set(0, 10, 20);
    
    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('game-canvas-3d').appendChild(this.renderer.domElement);
    
    // Lighting
    this.setupLighting();
    
    // Create world
    this.createGround();
    this.createPlayer();
    this.createBuildings();
    
    // Controls
    this.setupControls();
    
    // Start game loop
    this.clock = new THREE.Clock();
    this.animate();
    
    // Window resize handler
    window.addEventListener('resize', () => this.onWindowResize());
    
    console.log('🎮 3D Engine initialized!');
  }
  
  setupLighting() {
    // Sun (directional light)
    const sun = new THREE.DirectionalLight(0xFFFFFF, 1);
    sun.position.set(50, 100, 50);
    sun.castShadow = true;
    sun.shadow.camera.left = -200;
    sun.shadow.camera.right = 200;
    sun.shadow.camera.top = 200;
    sun.shadow.camera.bottom = -200;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    this.scene.add(sun);
    
    // Ambient light
    const ambient = new THREE.AmbientLight(0xFFFFFF, 0.5);
    this.scene.add(ambient);
    
    // Hemisphere light (sky effect)
    const hemi = new THREE.HemisphereLight(0x87CEEB, 0x7EC850, 0.6);
    this.scene.add(hemi);
  }
  
  createGround() {
    // BRIGHT GREEN GRASS (Polytoria style!)
    const groundSize = 1000;
    const geometry = new THREE.PlaneGeometry(groundSize, groundSize);
    const material = new THREE.MeshLambertMaterial({ 
      color: 0x7FFF00, // Bright lime green!
      side: THREE.DoubleSide 
    });
    
    const ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);
    
    // Add some colorful patches
    for (let i = 0; i < 50; i++) {
      const patch = new THREE.Mesh(
        new THREE.CircleGeometry(Math.random() * 10 + 5, 32),
        new THREE.MeshLambertMaterial({
          color: Math.random() * 0xFFFFFF,
          transparent: true,
          opacity: 0.3
        })
      );
      patch.rotation.x = -Math.PI / 2;
      patch.position.set(
        Math.random() * groundSize - groundSize/2,
        0.1,
        Math.random() * groundSize - groundSize/2
      );
      this.scene.add(patch);
    }
    
    // Add trees (simple blocky style)
    for (let i = 0; i < 30; i++) {
      this.createTree(
        Math.random() * groundSize - groundSize/2,
        Math.random() * groundSize - groundSize/2
      );
    }
  }
  
  createTree(x, z) {
    // Trunk
    const trunk = new THREE.Mesh(
      new THREE.BoxGeometry(2, 8, 2),
      new THREE.MeshLambertMaterial({ color: 0x8B4513 })
    );
    trunk.position.set(x, 4, z);
    trunk.castShadow = true;
    this.scene.add(trunk);
    
    // Leaves (sphere)
    const leaves = new THREE.Mesh(
      new THREE.SphereGeometry(5, 8, 8),
      new THREE.MeshLambertMaterial({ color: 0x228B22 })
    );
    leaves.position.set(x, 10, z);
    leaves.castShadow = true;
    this.scene.add(leaves);
  }
  
  createPlayer() {
    // BLOCKY CHARACTER (Polytoria style!)
    const playerGroup = new THREE.Group();
    
    // Head (cube)
    const head = new THREE.Mesh(
      new THREE.BoxGeometry(4, 4, 4),
      new THREE.MeshLambertMaterial({ color: 0x667eea })
    );
    head.position.y = 9;
    head.castShadow = true;
    playerGroup.add(head);
    
    // Face (emoji texture would go here, but using simple face for now)
    const eyeL = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.MeshLambertMaterial({ color: 0x000000 })
    );
    eyeL.position.set(-1, 9.5, 2.1);
    playerGroup.add(eyeL);
    
    const eyeR = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.MeshLambertMaterial({ color: 0x000000 })
    );
    eyeR.position.set(1, 9.5, 2.1);
    playerGroup.add(eyeR);
    
    // Body
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(5, 6, 3),
      new THREE.MeshLambertMaterial({ color: 0x764ba2 })
    );
    body.position.y = 4;
    body.castShadow = true;
    playerGroup.add(body);
    
    // Arms
    const armL = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 5, 1.5),
      new THREE.MeshLambertMaterial({ color: 0x667eea })
    );
    armL.position.set(-3.5, 4.5, 0);
    armL.castShadow = true;
    playerGroup.add(armL);
    
    const armR = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 5, 1.5),
      new THREE.MeshLambertMaterial({ color: 0x667eea })
    );
    armR.position.set(3.5, 4.5, 0);
    armR.castShadow = true;
    playerGroup.add(armR);
    
    // Legs
    const legL = new THREE.Mesh(
      new THREE.BoxGeometry(2, 4, 2),
      new THREE.MeshLambertMaterial({ color: 0x667eea })
    );
    legL.position.set(-1.5, 0, 0);
    legL.castShadow = true;
    playerGroup.add(legL);
    
    const legR = new THREE.Mesh(
      new THREE.BoxGeometry(2, 4, 2),
      new THREE.MeshLambertMaterial({ color: 0x667eea })
    );
    legR.position.set(1.5, 0, 0);
    legR.castShadow = true;
    playerGroup.add(legR);
    
    playerGroup.position.set(0, 0, 0);
    this.scene.add(playerGroup);
    
    this.player = playerGroup;
    this.canJump = true;
  }
  
  createBuildings() {
    // Create some colorful blocky buildings!
    const buildings = [
      { x: 30, z: 30, w: 15, h: 20, d: 15, color: 0xFF69B4 }, // Pink
      { x: -40, z: 40, w: 12, h: 25, d: 12, color: 0x87CEEB }, // Blue
      { x: 50, z: -30, w: 20, h: 15, d: 20, color: 0xFFD700 }, // Gold
      { x: -30, z: -40, w: 18, h: 30, d: 18, color: 0x9370DB }, // Purple
      { x: 0, z: 60, w: 25, h: 18, d: 15, color: 0xFF6347 }, // Red
    ];
    
    buildings.forEach(b => {
      const building = new THREE.Mesh(
        new THREE.BoxGeometry(b.w, b.h, b.d),
        new THREE.MeshLambertMaterial({ color: b.color })
      );
      building.position.set(b.x, b.h/2, b.z);
      building.castShadow = true;
      building.receiveShadow = true;
      this.scene.add(building);
      
      // Add windows
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const window = new THREE.Mesh(
            new THREE.BoxGeometry(2, 2, 0.5),
            new THREE.MeshLambertMaterial({ 
              color: 0x87CEEB,
              emissive: 0x87CEEB,
              emissiveIntensity: 0.3
            })
          );
          window.position.set(
            b.x + (i - 1) * 5,
            b.h/2 + (j - 1) * 7,
            b.z + b.d/2 + 0.3
          );
          this.scene.add(window);
        }
      }
    });
  }
  
  setupControls() {
    document.addEventListener('keydown', (e) => {
      switch(e.code) {
        case 'KeyW': this.controls.forward = true; break;
        case 'KeyS': this.controls.backward = true; break;
        case 'KeyA': this.controls.left = true; break;
        case 'KeyD': this.controls.right = true; break;
        case 'Space': 
          if (this.canJump) {
            this.velocity.y = 15;
            this.canJump = false;
          }
          break;
      }
    });
    
    document.addEventListener('keyup', (e) => {
      switch(e.code) {
        case 'KeyW': this.controls.forward = false; break;
        case 'KeyS': this.controls.backward = false; break;
        case 'KeyA': this.controls.left = false; break;
        case 'KeyD': this.controls.right = false; break;
      }
    });
    
    // Mouse look
    let mouseX = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = e.movementX || 0;
      if (this.player) {
        this.player.rotation.y -= mouseX * 0.002;
      }
    });
  }
  
  updatePlayer(delta) {
    if (!this.player) return;
    
    const speed = 20;
    const direction = new THREE.Vector3();
    
    // Get forward/right directions from player rotation
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(this.player.quaternion);
    const right = new THREE.Vector3(1, 0, 0);
    right.applyQuaternion(this.player.quaternion);
    
    // Movement
    if (this.controls.forward) direction.add(forward);
    if (this.controls.backward) direction.sub(forward);
    if (this.controls.right) direction.add(right);
    if (this.controls.left) direction.sub(right);
    
    direction.normalize();
    
    // Apply movement
    this.player.position.x += direction.x * speed * delta;
    this.player.position.z += direction.z * speed * delta;
    
    // Gravity
    this.velocity.y -= 50 * delta;
    this.player.position.y += this.velocity.y * delta;
    
    // Ground collision
    if (this.player.position.y <= 0) {
      this.player.position.y = 0;
      this.velocity.y = 0;
      this.canJump = true;
    }
    
    // Update camera to follow player (third-person)
    const cameraOffset = new THREE.Vector3(0, 10, 20);
    cameraOffset.applyQuaternion(this.player.quaternion);
    this.camera.position.copy(this.player.position).add(cameraOffset);
    this.camera.lookAt(this.player.position.clone().add(new THREE.Vector3(0, 5, 0)));
  }
  
  animate() {
    requestAnimationFrame(() => this.animate());
    
    const delta = this.clock.getDelta();
    
    this.updatePlayer(delta);
    
    this.renderer.render(this.scene, this.camera);
  }
  
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

// Initialize when Three.js is loaded
let game3D = null;

function init3DGame() {
  if (typeof THREE === 'undefined') {
    console.error('Three.js not loaded!');
    return;
  }
  game3D = new Game3D();
}

// Export for use in main game
window.Game3D = Game3D;
window.init3DGame = init3DGame;
