<script lang="ts" setup>

import { Piece, PieceType } from "@/classes/Game/Piece.class"
import {PropType} from "@vue/runtime-core";

const props = defineProps({
  color: {
    type: String,
    required: true
  },
  type: {
    type: String as PropType<PieceType>,
    required: true
  }
})

const piece = Piece.From(props.type)
console.log(piece.map.rawMap)

</script>

<template>
  <div>
  </div>
</template>

<style lang="scss" scoped>
</style>
