<script setup>
import {inject, ref} from "vue";

const random = Math.floor(Math.random() * 360)
const level = inject('level')
const randomGap = (Math.floor(Math.random() * (level.platformMaxGap - level.platformMinGap)) + level.platformMinGap) / 2
const emits = defineEmits(['elementRef'])
const breakableBol = ref(false)
const elementRef = ref(null)
const prop = defineProps(['caracterRef', 'jumpBol'])

const gameLoop = () => {
  const isColliding =
      elementRef.value.getBoundingClientRect().left < prop.caracterRef.getBoundingClientRect().right &&
      elementRef.value.getBoundingClientRect().right > prop.caracterRef.getBoundingClientRect().left &&
      elementRef.value.getBoundingClientRect().top < prop.caracterRef.getBoundingClientRect().bottom &&
      elementRef.value.getBoundingClientRect().bottom > prop.caracterRef.getBoundingClientRect().bottom && !prop.jumpBol;
  if (isColliding) {
    setTimeout(() => {
      breakableBol.value = true
    }, 100)
  }
  emits('elementRef', [elementRef, breakableBol])
  requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)

</script>
<template>
  <div ref="elementRef"
       :style="{display: 'inline-flex', justifyContent: 'center',alignItems: 'center', marginTop: `${randomGap}px`, gap: '2px', transform: `translateX(-${random}px)`,opacity: breakableBol ? 0 : 1, transition: 'opacity 0.5s 0.4s'}">
    <span
        :style="{width: '29px', height:'10px', background: 'red', borderRadius: 'var(--border-r)', transform: breakableBol ? 'rotate(-90deg)': null, transition: 'all 0.5s'}"></span>
    <span
        :style="{width: '29px', height:'10px', background: 'red', borderRadius: 'var(--border-r)', transform: breakableBol ? 'rotate(90deg)': null, transition: 'all 0.5s'}"></span>
  </div>
</template>
