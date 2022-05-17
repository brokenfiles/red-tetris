<script lang="ts" setup>

import {onMounted, ref} from "#imports";

const props = defineProps({
  stars: {
    type: Number,
    default: 50
  }
})

const stars = ref([])

onMounted(() => {
  for (let idx = 0; idx < props.stars; idx ++) {
    const randomX = Math.random() * 100
    const randomY = Math.random() * 100
    stars.value.push({
      style: {
        top: randomY + "%",
        left: randomX + "%",
        animationDelay: (Math.random() * 30) + "s"
      }
    })
  }
})

</script>

<template>
  <div class="absolute inset-0 w-full h-full overflow-hidden">
    <div class="star" :style="star.style" v-for="star in stars"></div>
  </div>
</template>

<style lang="scss" scoped>

.star {

  @apply absolute
         rounded-full bg-white;

  width: 2px;
  height: 2px;

  animation: 20s star-blinking infinite, 10s star-movement infinite;
}

@keyframes star-blinking {
  0% {
    opacity: 0.1;
  }
  1%, 100% {
    opacity: 1;
  }
}

@keyframes star-movement {
  0%, 100% {
    transform: translateX(-10px) translateY(-4px);
  }

  50% {
    transform: translateX(10px) translateY(8px);
  }
}

</style>
