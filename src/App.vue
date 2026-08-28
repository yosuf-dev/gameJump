<script setup>
import levels from './data/jump-levels.json';
import { provide } from 'vue';
const level = Math.floor(Math.random()*levels.levels.length)
provide('level', levels.levels[level])

console.log(`%c
┌───────────────────────────────────────────────────┐
│                                                   │
│    ██╗   ██╗ ██████╗ ███████╗██╗   ██╗███████╗    │
│    ╚██╗ ██╔╝██╔═══██╗██╔════╝██║   ██║██╔════╝    │
│     ╚████╔╝ ██║   ██║███████╗██║   ██║█████╗      │
│      ╚██╔╝  ██║   ██║╚════██║██║   ██║██╔══╝      │
│       ██║   ╚██████╔╝███████║╚██████╔╝██║         │
│       ╚═╝    ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝         │
│                                                   │
└───────────────────────────────────────────────────┘
`, `
color: #FF3B30;
background: #1A0000;
font-weight: bold;
font-family:Consolas, monospace;
`);
</script>

<template>
  <router-view/>
</template>
