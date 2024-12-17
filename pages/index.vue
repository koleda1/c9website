<template>
  <div class="min-h-screen">
    <!-- Navigation -->
    <nav class="bg-black p-4">
      <div class="container mx-auto flex justify-between items-center">
        <NuxtLink to="/" class="text-white">
          <img src="/images/zack_logo option002(3).gif" alt="Logo" class="h-8" />
        </NuxtLink>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-16">
      <!-- Services Section -->
      <section class="mb-24">
        <h2 class="text-4xl font-bold text-center mb-16 glow-text">Our Services</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Content Strategy -->
          <div class="glass-panel p-8 rounded-lg text-center">
            <h3 class="text-2xl font-bold mb-4">Content Strategy</h3>
            <p>Expert guidance on content creation, pricing, and engagement strategies</p>
          </div>

          <!-- Marketing & Growth -->
          <div class="glass-panel p-8 rounded-lg text-center">
            <h3 class="text-2xl font-bold mb-4">Marketing & Growth</h3>
            <p>Targeted promotion and brand building across multiple platforms</p>
          </div>

          <!-- Revenue Optimization -->
          <div class="glass-panel p-8 rounded-lg text-center">
            <h3 class="text-2xl font-bold mb-4">Revenue Optimization</h3>
            <p>Maximize earnings through strategic pricing and exclusive content</p>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section class="mb-24">
        <div class="glass-panel p-12 rounded-lg max-w-4xl mx-auto">
          <h2 class="text-4xl font-bold text-center mb-8 glow-text">About Zack Agency</h2>
          <div class="space-y-6">
            <p class="text-lg leading-relaxed">
              We are a premier OnlyFans management agency dedicated to helping content creators reach their
              full potential. With years of experience in digital marketing and content creation, we provide
              comprehensive support to ensure your success.
            </p>
            <p class="text-lg leading-relaxed">
              Our team of experts works tirelessly to optimize your content strategy, grow your audience, and
              maximize your earnings while maintaining your unique brand and vision.
            </p>
          </div>
        </div>
      </section>

      <!-- Dashboard Link -->
      <div class="text-center">
        <NuxtLink to="/dashboard" class="glass-panel px-8 py-4 rounded-lg inline-block text-xl">
          Go to Dashboard
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Add any additional initialization if needed
})
</script>

<style scoped>
.glow-text {
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8),
               0 0 20px rgba(255, 255, 255, 0.8),
               0 0 30px rgba(255, 255, 255, 0.6);
}
</style>
