<template>
  <span class="msg">{{ msg }}</span>
</template>

<script lang="ts" setup>
const props = defineProps({
  msg: {
    type: String,
    default: '',
  },
})
console.log(props.msg)
</script>

<style scoped>
.msg {
  font-family: PingFangSC-Medium, PingFang SC, serif;
  font-size: 44px;
  color: #fff;
}
</style>
