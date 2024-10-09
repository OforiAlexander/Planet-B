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
          <p><strong>Moons:</strong> {{ planet.moons }}</p>
        </div>
      </div>
      <p class="mt-4"><strong>Fun Fact:</strong> {{ planet.funFact }}</p>

     <router-link class="w-full py-4 px-8 flex items-center justify-center mt-4 mb-2 text-lg capitalize font-semibold bg-blue-500 hover:bg-blue-700 transition-all duration-300 ease-linear"> View More Detials</router-link>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    planetName: {
      type: String,
      required: true
    }
  });
  
  const planetData = {
    Mercury: {
      name: 'Mercury',
      type: 'Terrestrial planet',
      diameter: 4879,
      mass: '3.3011 × 10^23 kg',
      gravity: 3.7,
      dayLength: '58.6 Earth days',
      yearLength: '88 Earth days',
      avgTemp: 167,
      moons: 0,
      funFact: 'Mercury is the smallest planet in our solar system.'
    },
    Venus: {
      name: 'Venus',
      type: 'Terrestrial planet',
      diameter: 12104,
      mass: '4.8675 × 10^24 kg',
      gravity: 8.9,
      dayLength: '243 Earth days',
      yearLength: '225 Earth days',
      avgTemp: 464,
      moons: 0,
      funFact: 'Venus rotates on its axis in the opposite direction to most planets.'
    },
    Earth: {
      name: 'Earth',
      type: 'Terrestrial planet',
      diameter: 12742,
      mass: '5.97 × 10^24 kg',
      gravity: 9.8,
      dayLength: '24 hours',
      yearLength: '365.25 days',
      avgTemp: 15,
      moons: 1,
      funFact: 'Earth is the only planet known to support life.'
    },
    // Add data for other planets...
  };
  
  const planet = computed(() => planetData[props.planetName] || {});
  </script>