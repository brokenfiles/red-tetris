<script lang="ts" setup>

import {onMounted, ref, useNuxtApp} from "#imports";
const { $socket, $socket_connected, $connectToServer } = useNuxtApp()

const playerName = ref(null)
const hubName = ref(null)

function selectPlayerName () {
  if (playerName.value && !$socket_connected.value) {

    $connectToServer(playerName.value)

    $socket.on('disconnect', () => {
      $socket.close()
    })
  }
}

function joinHub () {
  if (hubName.value && $socket_connected.value) {
    $socket.emit("hub/createOrJoin", hubName.value, (hub: any) => {
      console.log('joined hub', hub)
    })
  }
}

function getHubs () {
  if ($socket_connected.value) {
    $socket.emit("hub/findAll", (hubs: any) => {
      console.log('hubs:', hubs)
    })
  }
}

function getInfos () {
  $socket.emit('user/me', (player) => {
    console.log(player)
  })
}

</script>

<template>
  <LayoutDialog>
    <template #header>
      <img class="mx-auto my-8 w-32 md:w-52" src="/img/red-tetris.png" alt="Red-tetris brand image">
    </template>
    <template #content>
      <div :class="{ 'bg-red-500': !$socket_connected, 'bg-green-500': $socket_connected }" class="p-4 w-full">CONNECTION STATUS</div>
      <input v-model="playerName" class="p-2 w-full" type="text" placeholder="Name">
      <button @click="selectPlayerName" class="w-full bg-red-500 text-white mt-8">Pick name</button>

      <div v-if="$socket_connected">
        <button @click="getInfos" class="w-full bg-amber-100 mt-8">Get infos</button>

        <input v-model="hubName" class="p-2 w-full" type="text" placeholder="hub name">
        <button @click="joinHub" class="w-full bg-cyan-200 mt-8">Join hub</button>
        <button @click="getHubs" class="w-full bg-red-200 mt-8">get hubs</button>
      </div>
    </template>
  </LayoutDialog>
</template>

<style lang="scss" scoped>

</style>
