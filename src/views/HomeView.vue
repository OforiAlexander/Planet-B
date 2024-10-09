<script setup>
import { ref } from 'vue'
import SolarSystem from '@/components/SolarSystem.vue'
import PlanetInfo from '@/components/PlanetInfo.vue'

const planets = ref(['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']);
const selectedPlanet = ref('Earth');

const selectPlanet = (planet) => {
  selectedPlanet.value = planet;
};
</script>

<template>
  <div class="home">
    <div class="mx-auto py-1 bg-solar_bg bg-no-repeat w-full bg-cover bg-center bg-blend-multiply bg-black bg-opacity-35">
      <h1 class="text-4xl font-bold text-center my-8">Solar System Explorer</h1>
      <div class="text-center mb-8">
        <p class="mb-4">Welcome to our interactive Solar System Explorer!</p>
        <p>Click on a planet to learn more about it, or explore the entire solar system in 3D.</p>
      </div>
      <div class="grid grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
        <button
          v-for="planet in planets"
          :key="planet"
          @click="selectPlanet(planet)"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          {{ planet }}
        </button>
      </div>
      <div class="w-full max-w-4xl mx-auto">
        <SolarSystem :currentPlanet="selectedPlanet" />
      </div>
      <div class="w-full max-w-4xl mx-auto mt-8">
        <PlanetInfo :planetName="selectedPlanet" />
      </div>
    </div>
  </div>
</template>