<template>
  <div>{{ `>> aboutPage` }}</div>
  <div class="about">
    <div>{{ name }}: {{ count }}</div>
    <div>doublePlusOne: {{ doublePlusOne }}</div>
    <button @click="increment">increment</button>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { counterStore } from '@/store/index'

const counter = counterStore()
// 响应式 refs
const { name, count, doublePlusOne } = storeToRefs(counter)
// 名为 increment 的 action 可以直接提取
const { increment } = counter
</script>

<style>
.about {
  margin-left: 20px;
}
</style>
