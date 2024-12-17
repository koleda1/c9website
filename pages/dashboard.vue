<template>
  <div class="min-h-screen">
    <!-- Navigation -->
    <nav class="bg-black p-4">
      <div class="container mx-auto flex justify-between items-center">
        <NuxtLink to="/" class="text-white">
          <img src="/images/zack_logo option002(3).gif" alt="Logo" class="h-8" />
        </NuxtLink>
        <div class="flex space-x-4">
          <NuxtLink to="/dashboard" class="text-white hover:text-gray-300">Dashboard</NuxtLink>
          <NuxtLink to="/models" class="text-white hover:text-gray-300">Models</NuxtLink>
          <NuxtLink to="/settings" class="text-white hover:text-gray-300">Settings</NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="glass-panel p-6 rounded-lg">
          <h3 class="text-xl mb-2">Total Revenue</h3>
          <p class="text-3xl font-bold">$24,500</p>
          <p class="text-sm text-gray-400">+12% from last month</p>
        </div>
        <div class="glass-panel p-6 rounded-lg">
          <h3 class="text-xl mb-2">Active Models</h3>
          <p class="text-3xl font-bold">15</p>
          <p class="text-sm text-gray-400">+3 this month</p>
        </div>
        <div class="glass-panel p-6 rounded-lg">
          <h3 class="text-xl mb-2">Total Subscribers</h3>
          <p class="text-3xl font-bold">2,450</p>
          <p class="text-sm text-gray-400">+8% growth rate</p>
        </div>
      </div>

      <!-- Models Section -->
      <div class="glass-panel p-6 rounded-lg mb-8">
        <h2 class="text-2xl font-bold mb-6">Top Performing Models</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr>
                <th class="text-left pb-4">Model</th>
                <th class="text-left pb-4">Revenue</th>
                <th class="text-left pb-4">Subscribers</th>
                <th class="text-left pb-4">Growth</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(model, index) in topModels" :key="index">
                <td class="py-2">{{ model.name }}</td>
                <td class="py-2">${{ model.revenue }}</td>
                <td class="py-2">{{ model.subscribers }}</td>
                <td class="py-2">{{ model.growth }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="glass-panel p-6 rounded-lg">
        <h2 class="text-2xl font-bold mb-6">Recent Activity</h2>
        <div class="space-y-4">
          <div v-for="(activity, index) in recentActivity" :key="index" 
               class="flex items-center justify-between py-2 border-b border-gray-700">
            <div>
              <p class="font-medium">{{ activity.description }}</p>
              <p class="text-sm text-gray-400">{{ activity.time }}</p>
            </div>
            <span :class="activity.type === 'success' ? 'text-green-500' : 'text-red-500'">
              {{ activity.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const topModels = [
  { name: 'Emma S.', revenue: '5,200', subscribers: '520', growth: 15 },
  { name: 'Sarah M.', revenue: '4,800', subscribers: '480', growth: 12 },
  { name: 'Jessica R.', revenue: '4,200', subscribers: '420', growth: 10 },
  { name: 'Laura B.', revenue: '3,900', subscribers: '390', growth: 8 },
]

const recentActivity = [
  {
    description: 'New subscriber for Emma S.',
    time: '2 minutes ago',
    status: 'Completed',
    type: 'success'
  },
  {
    description: 'Content upload by Sarah M.',
    time: '15 minutes ago',
    status: 'Processing',
    type: 'success'
  },
  {
    description: 'Payment processing for Jessica R.',
    time: '1 hour ago',
    status: 'Failed',
    type: 'error'
  },
  {
    description: 'New post scheduled by Laura B.',
    time: '2 hours ago',
    status: 'Scheduled',
    type: 'success'
  }
]
</script>

<style scoped>
.glass-panel {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
