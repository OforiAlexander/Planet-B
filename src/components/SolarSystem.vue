<template>
    <div class="relative w-full h-96">
      <div ref="container" class="w-full h-full"></div>
      <div v-if="error" class="absolute inset-0 flex items-center justify-center bg-red-100 text-red-500">
        {{ error }}
      </div>
      <div v-else>
        <div class="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
          {{ currentPlanet }}
        </div>
        <div class="absolute top-4 right-4 text-white">
          <button @click="toggleRotation" class="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mr-2">
            {{ isRotating ? 'Pause' : 'Rotate' }}
          </button>
          <button @click="resetView" class="bg-green-500 hover:bg-green-700 font-bold py-2 px-4 rounded">
            Reset View
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, watch } from 'vue';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  
  const props = defineProps({
    currentPlanet: {
      type: String,
      default: 'Earth'
    }
  });
  
  const container = ref(null);
  const isRotating = ref(true);
  const error = ref(null);
  
  let scene, camera, renderer, controls, planet;
  
  
  const planetTextures = {
  Mercury: './src/assets/img/planets/2k_mercury.jpg',
  Venus: './src/assets/img/planets/2k_venus_surface.jpg',
  Earth: './src/assets/img/planets/2k_earth_daymap.jpg',
  Mars: './src/assets/img/planets/2k_mars.jpg',
  Jupiter: './src/assets/img/planets/2k_jupiter.jpg',
  Saturn: './src/assets/img/planets/2k_saturn.jpg',
  Uranus: './src/assets/img/planets/2k_uranus.jpg',
  Neptune: './src/assets/img/planets/2k_neptune.jpg'
};
  
  const init = () => {
    try {
      if (!container.value) {
        throw new Error('Container not initialized');
      }
  
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, container.value.clientWidth / container.value.clientHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ antialias: true });
      
      renderer.setSize(container.value.clientWidth, container.value.clientHeight);
      container.value.appendChild(renderer.domElement);
  
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.screenSpacePanning = false;
      controls.minDistance = 3;
      controls.maxDistance = 10;
      
      camera.position.z = 5;
  
      // Add stars to the background
      addStarField();
  
      // Create planet
      createPlanet(props.currentPlanet);
  
      // Add lighting
      const ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);
  
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(5, 3, 5);
      scene.add(directionalLight);
  
      animate();
    } catch (e) {
      error.value = `Error initializing 3D scene: ${e.message}`;
      console.error(e);
    }
  };
  
  const addStarField = () => {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({color: 0xFFFFFF, size: 0.1});
  
    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = -Math.random() * 2000;
      starVertices.push(x, y, z);
    }
  
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
  };
  
  const createPlanet = (planetName) => {
    if (planet) {
      scene.remove(planet);
    }
  
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const texture = new THREE.TextureLoader().load(planetTextures[planetName]);
    const material = new THREE.MeshPhongMaterial({ map: texture });
    planet = new THREE.Mesh(geometry, material);
    scene.add(planet);
  };
  
  const animate = () => {
    if (error.value) return;
  
    requestAnimationFrame(animate);
  
    if (isRotating.value && planet) {
      planet.rotation.y += 0.005;
    }
  
    // Pulsing effect
    if (planet) {
      const scale = 1 + Math.sin(Date.now() * 0.001) * 0.01;
      planet.scale.set(scale, scale, scale);
    }
  
    controls.update();
    renderer.render(scene, camera);
  };
  
  const toggleRotation = () => {
    isRotating.value = !isRotating.value;
  };
  
  const resetView = () => {
    if (error.value) return;
    camera.position.set(0, 0, 5);
    controls.reset();
  };
  
  onMounted(() => {
    init();
    
    if (!error.value) {
      window.addEventListener('resize', onWindowResize, false);
    }
  });
  
  onUnmounted(() => {
    if (renderer) {
      renderer.dispose();
    }
    window.removeEventListener('resize', onWindowResize, false);
  });
  
  const onWindowResize = () => {
    if (!container.value || error.value) return;
  
    camera.aspect = container.value.clientWidth / container.value.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  };
  
  // Watch for changes to maintain responsiveness
  watch(() => container.value, (newValue) => {
    if (newValue) {
      onWindowResize();
    }
  }, { immediate: true });
  
  // Watch for changes in the currentPlanet prop
  watch(() => props.currentPlanet, (newPlanet) => {
    console.log(`Switching to ${newPlanet}`);
    createPlanet(newPlanet);
  });
  </script>