<template>
    <div class="screen">
      <hub-graphics-floating-pieces/>
    </div>
</template>

<script lang="ts" setup>

import {useHead} from "#imports";

useHead({
  title: "Homepage"
})

</script>

<style lang="scss" scoped>

.screen {
  @apply w-screen h-screen
         flex items-center justify-center;

  background-image:
      radial-gradient(circle, #9a0680, #950382, #8f0184, #890087, #820089, #7b0088, #740086, #6d0185, #650180, #5c017b, #540075, #4c0070);
}

</style>
