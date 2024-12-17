import { onMounted, onUnmounted } from 'vue'

export function useGlowEffect(selector: string) {
  let interval: number | undefined

  onMounted(() => {
    const element = document.querySelector(selector)
    if (!element) return

    const updateGlow = () => {
      const now = new Date()
      const intensity = Math.sin(now.getTime() * 0.002) * 0.5 + 0.5
      const glowSize = 10 + (intensity * 20)
      const glowOpacity = 0.5 + (intensity * 0.3)

      element.style.textShadow = `
        0 0 ${glowSize}px rgba(88, 101, 242, ${glowOpacity}),
        0 0 ${glowSize * 1.5}px rgba(88, 101, 242, ${glowOpacity * 0.8}),
        0 0 ${glowSize * 2}px rgba(88, 101, 242, ${glowOpacity * 0.6})
      `
    }

    interval = setInterval(updateGlow, 50)
  })

  onUnmounted(() => {
    if (interval) {
      clearInterval(interval)
    }
  })
}
