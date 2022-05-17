<script lang="ts" setup>

import {onBeforeUnmount, onMounted, ref} from "#imports";
import {PieceType} from "~/classes/Game/Piece.class";

const pieces = ref([
  { id: 0, type: "O" as PieceType, speed: 5, rotate: 45, additionalClasses: "top-10 left-10 ml-0 md:ml-12 ml-20 mt-0 md:mt-8 mt-8" },
  { id: 1, type: "L" as PieceType, speed: -3, rotate: -40, additionalClasses: "left-20 bottom-10 mt-20 lg:-mt-2" },
  { id: 2, type: "Z" as PieceType, speed: -2, rotate: 20, additionalClasses: "right-40 top-10 ml-0 md:ml-12 ml-20 mt-0 md:mt-8 mt-8" },
  { id: 3, type: "S" as PieceType, speed: 6, rotate: 145, additionalClasses: "right-20 bottom-20 ml-0 md:ml-12 ml-20 mt-0 md:mt-8 mt-8" },
])

/**
 * Handle mouse move to move the pieces
 * @param event
 */
function mouseMoveListener (event: MouseEvent) {
  const { innerWidth, innerHeight } = window
  const { x, y } = event

  const percentX = x / innerWidth * 100
  const percentY = y / innerHeight * 100

  for (const piece of pieces.value) {
    const $piece = document.getElementById(`piece--${piece.id}`)
    if ($piece) {
      const pieceSpeed = parseInt($piece.getAttribute('data-speed'))

      const translateX = percentX / pieceSpeed
      const translateY = percentY / pieceSpeed
      $piece.style.transform = `rotate(${piece.rotate}deg) translateX(${translateX}px) translateY(${translateY}px)`
    }
  }
}

onMounted(() => {
  window.addEventListener('mousemove', mouseMoveListener)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', mouseMoveListener)
})

</script>

<template>
  <div class="absolute inset-0">
    <div class="relative w-full h-full">
      <GamePiece class="floating-piece" :class="piece.additionalClasses" v-for="piece of pieces"
                  :type="piece.type" :data-speed="piece.speed" :id="`piece--${piece.id}`"
                  :style="{transform: `rotate(${piece.rotate}deg)`}"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>

.floating-piece {
  @apply absolute;
}

</style>
