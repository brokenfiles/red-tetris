<script lang="ts" setup>

import {PropType} from "@vue/runtime-core";
import {IHub} from "~/interfaces/Hub.interface";
import {createOrJoin, pushToHash, useHub} from "~/composables/hub";
import {useNuxtApp, useRouter} from "#imports";
import {usePlayer} from "~/composables/player";
const { $socket, $showToast } = useNuxtApp()

const props = defineProps({
  hub: {
    type: Object as PropType<IHub>,
    required: true
  }
})

const hub = useHub()
const router = useRouter()
const player = usePlayer()

const join = async () => {
  hub.value = await createOrJoin($socket, props.hub.name)
  $showToast(`You joined ${hub.value.name} hub`, "success")
  pushToHash(hub.value, player.value.playerName, router)
}

</script>

<template>
  <div class="p-2 border flex">
    <div class="flex-1">
      <h2>{{ props.hub.name }}</h2>
      <p>Players : {{ props.hub.playerNumber }}</p>
    </div>
    <button @click="join" class="form__button px-8">Join</button>
  </div>
</template>

<style lang="scss" scoped>

</style>
