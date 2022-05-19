<script lang="ts" setup>

import {onMounted, useHead, useNuxtApp, useRoute} from "#imports";
import {createOrJoin, useHub} from "~/composables/hub";
import {usePlayer} from "~/composables/player";

const { $socket_connected, $connectToServer, $socket } = useNuxtApp()
const route = useRoute()
const hub = useHub()
const player = usePlayer()

onMounted(async () => {

  const { hash } = route
  const regex = /#[a-zA-Z0-9]+-[a-zA-Z0-9]+/gm

  if (regex.exec(hash) !== null && !$socket_connected.value) {
    let [hubName, playerName] = hash.split('-')
    hubName = hubName.replace("#", "")
    player.value = {
      playerName
    }
    const connected = await $connectToServer(playerName)
    if (connected) {
      hub.value = await createOrJoin($socket, hubName)
    }
  }
})

useHead({
  title: "Homepage"
})

</script>

<template>
    <div class="screen">
      <div class="bg-white">
        <div class="bg-sky">
          <HubGraphicsStarsLayout/>
          <HubGraphicsFloatingPieces class="hidden md:block"/>
          <div class="w-full h-full container mx-auto flex items-center justify-center relative z-10">
            <HubLoginDialog v-if="!$socket_connected"/>
            <HubCreateOrJoinDialog v-if="$socket_connected"/>
          </div>
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>

.screen {
  @apply w-screen h-screen relative;

  > .bg-white, .bg-sky {
    width: 100%;
    height: 100%;
  }


}

</style>
