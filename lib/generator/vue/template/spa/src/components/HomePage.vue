<template>
  <div class="msg">{{ `>> ${msg || currentRoute.meta.title}` }}</div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

const currentRoute = useRoute()
const props = defineProps({
  msg: {
    type: String,
    default: '',
  },
})
console.log(props.msg)
</script>
