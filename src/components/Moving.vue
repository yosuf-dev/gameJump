<script setup>
import {inject, ref} from "vue";

const random = ref(Math.floor(Math.random() * 360))
const level = inject('level')
const randomGap = (Math.floor(Math.random() * (level.platformMaxGap - level.platformMinGap)) + level.platformMinGap) / 2
const emits = defineEmits(['elementRef'])
const elementRef = ref(null)
const mainRef = defineProps(['mainRef'])
const movingRight = ref(false)

const gameLoop = ()=>{
  emits('elementRef', elementRef)
  if (mainRef.mainRef.getBoundingClientRect().left > elementRef.value.getBoundingClientRect().left){
    movingRight.value = true
  }else if (mainRef.mainRef.getBoundingClientRect().right - 5 < elementRef.value.getBoundingClientRect().right){
    movingRight.value = false
  }
  if (movingRight.value){
    random.value -= 0.5
  }
  if (!movingRight.value) {
    random.value += 0.5
  }
  requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)
</script>
<template>
  <span ref="elementRef" :style="{display: 'inline-block',width: '60px', height:'10px', flexShrink: 0, background: 'yellow', borderRadius: 'var(--border-r)', marginTop: `${randomGap}px`, transform: `translateX(-${random}px)`}"></span>
</template>
<style></style>