<template>
    <div class="screen">
      <div class="bg-white">
        <div class="bg-sky">
          <HubGraphicsStarsLayout/>
          <HubGraphicsFloatingPieces class="hidden md:block"/>
          <div class="w-full h-full container mx-auto flex items-center justify-center relative z-10">
            <HubDialog/>
          </div>
        </div>
      </div>
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
  @apply w-screen h-screen relative;

  > .bg-white, .bg-sky {
    width: 100%;
    height: 100%;
  }


}

</style>
