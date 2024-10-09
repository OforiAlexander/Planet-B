<template>
  <div class="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-4">{{ planet.name }}</h2>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <p><strong>Type:</strong> {{ planet.type }}</p>
        <p><strong>Diameter:</strong> {{ planet.diameter }} km</p>
        <p><strong>Mass:</strong> {{ planet.mass }}</p>
        <p><strong>Gravity:</strong> {{ planet.gravity }} m/s²</p>
      </div>
      <div>
        <p><strong>Day Length:</strong> {{ planet.dayLength }}</p>
        <p><strong>Year Length:</strong> {{ planet.yearLength }}</p>
        <p><strong>Average Temperature:</strong> {{ planet.avgTemp }}°C</p>
        <p><strong>Moons:</strong> {{ planet.moons.length }}</p>
      </div>
    </div>
    <p class="mt-4"><strong>Fun Fact:</strong> {{ planet.funFact }}</p>
    <router-link 
      :to="{ name: 'PlanetDetail', params: { name: planet.name.toLowerCase() } }" 
      class="w-full py-4 px-8 flex items-center justify-center mt-4 mb-2 text-lg capitalize font-semibold bg-blue-500 hover:bg-blue-700 transition-all duration-300 ease-linear"
    >
      View More Details
    </router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import planetData from '@/data/planets.json';

const props = defineProps({
  planetName: {
    type: String,
    required: true
  }
});

const planet = computed(() => {
  return planetData.planets.find(p => p.name.toLowerCase() === props.planetName.toLowerCase()) || {};
});
</script>