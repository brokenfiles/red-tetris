<script lang="ts" setup>

import {ref, useNuxtApp} from "#imports";
import {usePlayer} from "~/composables/player";
const { $connectToServer } = useNuxtApp()

const playerName = ref<string>("")
const player = usePlayer()

/**
 * This function connects the user to the server
 */
const submit = () => {
  if (playerName.value.length > 3 && playerName.value.length < 16) {
      player.value = {
        playerName: playerName.value
      }
      $connectToServer(player.value.playerName)
  }
}

</script>

<template>
  <LayoutDialog>
    <template #header>
      <LayoutLogo class="mx-auto my-8 w-32 md:w-52"/>
    </template>
    <template #content>
      <form class="h-full flex flex-col" action="#" @submit.prevent="submit">
        <div class="form__group flex-1">
          <label for="playerName">Player name</label>
          <input name="playerName" type="text" v-model="playerName">
        </div>
        <div class="form__group">
          <button type="submit">Choose playername</button>
        </div>
      </form>
    </template>
  </LayoutDialog>
</template>

<style lang="scss" scoped>

</style>
