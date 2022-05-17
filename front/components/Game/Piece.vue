<script lang="ts" setup>

import {Cell, Piece, PieceType} from "@/classes/Game/Piece.class"
import {PropType, Ref} from "@vue/runtime-core";
import {computed, onMounted, ref} from "#imports";

const props = defineProps({
  type: {
    type: String as PropType<PieceType>,
    required: true
  }
})

let piece = ref<Piece>(null)
let cells = ref<Cell[]>([])

onMounted(() => {
  piece.value = Piece.From(props.type)
  cells.value = piece.value.getCells()
})

function rotate () {
  piece.value.rotate(90)
  cells.value = piece.value.getCells()
}

const pieceStyle = computed(() => {
  const dimensions = piece.value?.getDimensions(cells.value)
  return {
    width: dimensions?.width + "px",
    height: dimensions?.height + "px",
  }
})

</script>

<template>
  <div class="piece" :style="pieceStyle">
    <div class="cell" :style="cell.style" v-for="cell of cells">
    </div>
  </div>
</template>

<style lang="scss" scoped>

.piece {
  @apply relative;

  .cell {
    @apply absolute;

    outline: 1px solid #faf0ca;
  }
}

</style>
