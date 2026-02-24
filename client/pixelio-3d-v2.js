// PIXELIO 3D ENGINE V2 - REBUILT WITH WORKING MOVEMENT
class Pixelio3D {
  constructor() {
    console.log('🎮 Pixelio 3D v2 Starting...');
    
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.players = new Map();
    this.myPlayerId = null;
    this.buildings = [];
    
    this.init();
  }
  
  init() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87CEEB);
    this.scene.fog = new THREE.Fog(0x87CEEB, 1000, 8000);
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    this.camera.position.set(0, 100, 200);
    
    // Canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'pixelio-3d-canvas';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:999999';
    document.body.appendChild(canvas);
    
    // Renderer with better quality
    this.renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true,
      alpha: false
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    
    // Better lighting setup
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambient);
    
    // Main sun
    const sun = new THREE.DirectionalLight(0xffffff, 1.0);
    sun.position.set(100, 200, 100);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 500;
    sun.shadow.camera.left = -200;
    sun.shadow.camera.right = 200;
    sun.shadow.camera.top = 200;
    sun.shadow.camera.bottom = -200;
    this.scene.add(sun);
    
    // Fill light (softer, from opposite side)
    const fillLight = new THREE.DirectionalLight(0x8888ff, 0.3);
    fillLight.position.set(-50, 50, -50);
    this.scene.add(fillLight);
    
    // Hemisphere light for better ambient
    const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x7FFF00, 0.4);
    this.scene.add(hemiLight);
    
    // Ground with better material
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(6000, 6000),
      new THREE.MeshStandardMaterial({ 
        color: 0x7FFF00,
        metalness: 0,
        roughness: 0.8
      })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);
    
    // Grid
    this.scene.add(new THREE.GridHelper(6000, 120, 0x000000, 0x333333));
    
    console.log('✅ 3D Engine initialized');
    
    // Animate
    this.animate();
    
    // Resize
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
  
  setMyPlayer(id) {
    this.myPlayerId = id;
    console.log('👤 My ID:', id);
  }
  
  updatePlayers(playersArray, mapSize) {
    if (!playersArray) return;
    
    const currentIds = new Set();
    
    playersArray.forEach(p => {
      currentIds.add(p.id);
      
      if (!this.players.has(p.id)) {
        const mesh = this.createPlayer();
        this.players.set(p.id, { mesh, x: p.x, y: p.y });
        console.log('✅ Player created:', p.username);
      }
      
      const player = this.players.get(p.id);
      player.x = p.x;
      player.y = p.y;
      player.mesh.position.x = p.x - mapSize / 2;
      player.mesh.position.z = p.y - mapSize / 2;
    });
    
    // Remove old
    this.players.forEach((player, id) => {
      if (!currentIds.has(id)) {
        this.scene.remove(player.mesh);
        this.players.delete(id);
      }
    });
    
    // Follow my player
    if (this.myPlayerId && this.players.has(this.myPlayerId)) {
      const me = this.players.get(this.myPlayerId);
      this.camera.position.x = me.mesh.position.x;
      this.camera.position.z = me.mesh.position.z + 100;
      this.camera.lookAt(me.mesh.position.x, 0, me.mesh.position.z);
    }
  }
  
  createPlayer() {
    const group = new THREE.Group();
    
    // Get player's skin color from locker (or default)
    let skinColor = 0x667eea; // Default blue
    try {
      const loadout = localStorage.getItem('pixelioLoadout');
      if (loadout) {
        const data = JSON.parse(loadout);
        const skinData = window.availableSkins?.[data.skin];
        if (skinData?.color) {
          skinColor = parseInt(skinData.color.replace('#', '0x'));
        }
      }
    } catch(e) {}
    
    // Main body - rounded blob shape (like Fall Guys)
    const bodyGeometry = new THREE.SphereGeometry(6, 16, 16);
    bodyGeometry.scale(1, 1.2, 0.8); // Squish it slightly
    
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: skinColor,
      metalness: 0.1,
      roughness: 0.7,
      flatShading: false
    });
    
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 8;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);
    
    // Head - smaller rounded sphere
    const headGeometry = new THREE.SphereGeometry(4, 16, 16);
    const headMaterial = new THREE.MeshStandardMaterial({ 
      color: skinColor,
      metalness: 0.1,
      roughness: 0.7
    });
    
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 16;
    head.castShadow = true;
    head.receiveShadow = true;
    group.add(head);
    
    // Eyes - simple black dots
    const eyeGeometry = new THREE.SphereGeometry(0.6, 8, 8);
    const eyeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x000000,
      metalness: 0,
      roughness: 1
    });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-1.5, 17, 3.5);
    group.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(1.5, 17, 3.5);
    group.add(rightEye);
    
    // Arms - rounded capsules
    const armGeometry = new THREE.CapsuleGeometry(1, 4, 8, 8);
    const armMaterial = new THREE.MeshStandardMaterial({ 
      color: skinColor,
      metalness: 0.1,
      roughness: 0.7
    });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-6, 8, 0);
    leftArm.rotation.z = Math.PI / 6;
    leftArm.castShadow = true;
    group.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(6, 8, 0);
    rightArm.rotation.z = -Math.PI / 6;
    rightArm.castShadow = true;
    group.add(rightArm);
    
    // Legs - rounded capsules
    const legGeometry = new THREE.CapsuleGeometry(1.5, 5, 8, 8);
    const legMaterial = new THREE.MeshStandardMaterial({ 
      color: skinColor,
      metalness: 0.1,
      roughness: 0.7
    });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-2.5, 2, 0);
    leftLeg.castShadow = true;
    group.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(2.5, 2, 0);
    rightLeg.castShadow = true;
    group.add(rightLeg);
    
    // Store references for animations later
    group.userData = {
      body,
      head,
      leftArm,
      rightArm,
      leftLeg,
      rightLeg,
      leftEye,
      rightEye
    };
    
    this.scene.add(group);
    return group;
  }
  
  createBuildings(buildings, mapSize) {
    console.log(`🏗️ Creating ${buildings.length} buildings...`);
    
    buildings.forEach(b => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(b.width, b.height, b.depth),
        new THREE.MeshLambertMaterial({ color: b.color })
      );
      
      mesh.position.set(
        b.x - mapSize / 2,
        b.height / 2,
        b.y - mapSize / 2
      );
      
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      
      this.scene.add(mesh);
      this.buildings.push(mesh);
    });
    
    console.log(`✅ ${buildings.length} buildings created`);
  }
  
  sendInputs(socket) {
    // Keys handled in main game
  }
  
  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }
  
  destroy() {
    if (this.renderer) {
      this.renderer.dispose();
      document.getElementById('pixelio-3d-canvas')?.remove();
    }
  }
}

window.Pixelio3D = Pixelio3D;
