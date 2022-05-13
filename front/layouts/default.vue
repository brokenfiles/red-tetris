<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>

import {useHead} from "#imports";

useHead({
  title: "A 42 project",
  titleTemplate: "Red tetris - %s"
})

</script>
