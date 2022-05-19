<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>

import {onMounted, useHead, useNuxtApp, watch} from "#imports";
import {listenHubEvents, listenHubsEvents} from "~/composables/hub";
import {IException} from "~/interfaces/Exception.interface";

const { $socket, $showToast } = useNuxtApp()

onMounted(() => {
  listenToErrors()

  listenHubsEvents($socket)
  listenHubEvents($socket, $showToast)
})

const listenToErrors = () => {
  $socket.on('exception', (exception: IException) => {
    if (typeof exception.message === 'string') {
      $showToast(exception.message, "error")
    } else if (exception.message instanceof Array) {
      for (const message of exception.message) {
        $showToast(message, "error")
      }
    }
  })
}

useHead({
  title: "A 42 project",
  titleTemplate: "Red tetris - %s"
})

</script>
