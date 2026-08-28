<script setup>
import {inject, ref} from "vue";

const level = inject('level')
const random = Math.floor(Math.random() * 360)
const randomGap = (Math.floor(Math.random() * (level.platformMaxGap - level.platformMinGap)) + level.platformMinGap) / 2
const emits = defineEmits(['elementRef'])
const elementRef = ref(null)
const gameLoop = ()=>{
  emits('elementRef', elementRef)
  requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)
</script>
<template>
  <span ref="elementRef" :style="{display: 'inline-block',width: '60px', height:'10px', flexShrink: 0, background: 'blue', borderRadius: 'var(--border-r)', marginTop: `${randomGap}px`, transform: `translateX(-${random}px)`}"></span>
</template>