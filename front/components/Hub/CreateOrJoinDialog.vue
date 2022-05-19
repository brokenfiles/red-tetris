<script lang="ts" setup>

import {usePlayer} from "~/composables/player";
import {onMounted, ref, useNuxtApp, useRouter} from "#imports";
import {createOrJoin, pushToHash, useHub, useHubs} from "~/composables/hub";
const { $socket, $logout, $showToast } = useNuxtApp()

const hub = useHub()
const hubs = useHubs()
const player = usePlayer()
const router = useRouter()
const hubName = ref<string>("")

const createHub = async () => {
  hub.value = await createOrJoin($socket, hubName.value)
  await pushToHash(hub.value, player.value.playerName, router)
  $showToast(`You joined ${hub.value.name} hub`, "success")
}

</script>

<template>
  <LayoutDialog>
    <template #header>
      <LayoutLogo class="mx-auto my-8 w-32 md:w-52"/>
    </template>
    <template #content>

      <div class="flex flex-col space-y-4">
        <HubPickerPreview v-for="hub in hubs" :hub="hub" :key="`hub-${hub.name}`"/>
      </div>

      <form class="h-full flex flex-col" action="" @submit.prevent="createHub">
        <div class="form__group flex-1">
          <label for="hubName">Hub name</label>
          <input type="text" name="hubName" v-model="hubName">
        </div>
        <div class="form__group">
          <button type="submit">Create hub</button>
        </div>
      </form>
    </template>
  </LayoutDialog>
</template>

<style lang="scss" scoped>

</style>
