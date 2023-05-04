<template>
  <div>
    Nuxt module playground!
  </div>
</template>

<script setup lang="ts">
import { useQuery, useZeus } from '#imports';

const zeus = useZeus()
const query = await useQuery()
</script>
