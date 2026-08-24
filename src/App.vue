<script setup>
import levels from './data/jump-levels.json';
import { provide } from 'vue';
const level = Math.floor(Math.random()*levels.levels.length)
provide('level', levels.levels[level])
</script>

<template>
  <router-view/>
</template>
