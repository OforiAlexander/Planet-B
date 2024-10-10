<template>
  <div class="mx-auto px-4 pt-8 w-full bg-earth h-screen bg-fixed bg-cover bg-no-repeat bg-black bg-opacity-35 bg-blend-multiply"  id="bg_position">
    <!-- Render content only if planetDetail is loaded -->
    <div v-if="planetDetail">
      <div class="h-42 w-full px-4 py-8 mb-12 bg-opacity-35 border-b-2 border-gray-50 rounded shadow-white shadow-b">
        <h1 class="text-5xl text-center font-bold mb-6">{{ planetDetail.name }}</h1>
      </div>
      <div class="grid grid-cols-1 py-2 md:grid-cols-2 gap-8">
        <!-- Quick Facts Section -->
        <div class="flex flex-col md:flex-row gap-12 justify-center items-start w-full">
          <ul class="space-y-2">
            <router-link to="/" class="text-blue-500 hover:text-blue-700 text-lg relative -top-7 -left-6">Go Back</router-link>
            <h2 class="text-2xl font-semibold mb-4 text-left w-full">Quick Facts</h2>
            <li><strong>Diameter:</strong> {{ planetDetail.diameter }} km</li>
            <li>
              <strong>Distance from Sun:</strong> {{ planetDetail.distanceFromSun }} million km
            </li>
            <li><strong>Orbital Period:</strong> {{ planetDetail.orbitalPeriod }} Earth days</li>
            <li><strong>Orbital Speed:</strong> {{ planetDetail.orbitalSpeed }} km/s</li>
            <li><strong>Gravity:</strong> {{ planetDetail.gravity }} m/s²</li>
            <li>
              <strong>Min Surface Temperature:</strong> {{ planetDetail.surfaceTemperature.min }} °C
            </li>
            <li>
              <strong>Max Surface Temperature:</strong> {{ planetDetail.surfaceTemperature.max }} °C
            </li>
            <li><strong>Atmospheric Pressure:</strong> {{ planetDetail.atmosphere.pressure }}</li>
          </ul>

          <div>
            <ul class="space-y-4">
              <li>
                <!-- Discovery Section -->
                <div v-if="planetDetail.discovery">
                  <h3 class="text-xl font-semibold mt-4 mb-2">Discovery</h3>
                  <p><strong>Discoverer:</strong> {{ planetDetail.discovery.discoverer }}</p>
                  <p><strong>Year:</strong> {{ planetDetail.discovery.year }}</p>
                </div>
              </li>

              <li>
                <!-- Moons Section (Hidden if no moons) -->
                <div v-if="planetDetail.moons && planetDetail.moons.length > 0">
                  <h3 class="text-xl font-semibold mt-4 mb-2">Moons</h3>
                  <ul>
                    <li v-for="moon in planetDetail.moons" :key="moon">{{ moon }}</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Description and Fun Fact Section -->
        <div>
          <h2 class="text-2xl font-semibold mb-4">Description</h2>
          <p>{{ planetDetail.description }}</p>
          <h3 class="text-xl font-semibold mt-4 mb-2">Fun Fact</h3>

          <div
            class="max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <p class="mb-3 font-bold text-gray-300">{{ planetDetail.funFact }}</p>
          </div>

          <!-- Atmosphere Composition Section -->
          <div v-if="planetDetail.atmosphere && planetDetail.atmosphere.composition.length > 0">
            <h3 class="text-xl font-semibold mt-4 mb-2">Atmosphere Composition</h3>
            <ul>
              <li v-for="component in planetDetail.atmosphere.composition" :key="component">
                {{ component }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Show a loading message while planetDetail is being fetched -->
    <div v-else>
      <p>Loading planet details...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import planetData from '@/data/planets.json'

// Declare the route and ref variables
const route = useRoute()
const planetDetail = ref(null)

// Function to load the planet data based on the route parameter
const loadPlanetData = () => {
  try {
    const planetName = route.params.name

    console.log('Loading planet:', planetName) // Log the planet name for debugging

    const foundPlanet = planetData.planets.find(
      (p) => p.name.toLowerCase() === planetName.toLowerCase()
    )

    if (foundPlanet) {
      planetDetail.value = foundPlanet
      console.log('Planet found:', foundPlanet) // Log the planet details
    } else {
      console.warn(`Planet with name "${planetName}" not found.`)
      planetDetail.value = null
    }
  } catch (error) {
    console.error('Error loading planet data:', error)
    planetDetail.value = null
  }
}

// Load the planet data when the component is mounted
onMounted(loadPlanetData)

// Watch for route changes and reload planet data if the route param changes
watch(() => route.params.name, loadPlanetData)
</script>

<style scope>
#bg_position {
  background-position: 30% 70%;
  height: 100vh;
}
</style>
