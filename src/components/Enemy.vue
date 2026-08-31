<script setup>
import {inject, ref} from "vue";

const random = ref(Math.floor(Math.random() * 360))
const emits = defineEmits(['elementRef'])
const elementRef = ref(null)
const mainRef = defineProps(['mainRef'])
const enemyRight = ref(false)


const gameLoop = ()=>{
  emits('elementRef', elementRef)
  if (mainRef.mainRef.getBoundingClientRect().left > elementRef.value.getBoundingClientRect().left){
    enemyRight.value = false
  }else if (mainRef.mainRef.getBoundingClientRect().right - 5 < elementRef.value.getBoundingClientRect().right){
    enemyRight.value = true
  }
  if (enemyRight.value){
    random.value += 0.3
  }
  if (!enemyRight.value) {
    random.value -= 0.3
  }
  requestAnimationFrame(gameLoop)}
requestAnimationFrame(gameLoop)

</script>

<template>
  <div ref="elementRef" :style="{transform: `translateX(-${random}px)`, marginBlock: '-50%', display: 'inline-block'}">
  <img
      style="width: 50px; height: 50px "
  src="../assets/enemy.png"  alt="enemy.png"
  />
  </div>
</template>