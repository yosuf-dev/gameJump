<script setup>
import {inject, onMounted, ref, watch} from 'vue';
import Normal from "../components/Normal.vue";
import Moving from "../components/Moving.vue";
import Breakable from "../components/Breakable.vue";

const level = inject('level')
const timer = ref(level.timeLimit)
const gameStart = ref(false)
const gameEnd = ref(false)
const score = ref(0)
const caracterBottom = ref(90)
const caracterLeft = ref(200)
const jumpBol = ref(false)
const mainRef = ref(null)
const earthRef = ref(null)
const caracterRef = ref(null)
const platformTypes = ref([])
// const emitEndGmae = defineEmits(['endGame'])
const parentRef = ref(null)
const parentBottom = ref(0)
const finishLineRef = ref(null)
const objectGame = ref({
      "playerName": null,
      "game": "Vertical Jump Challenge",
      "levelId": level.id,
      "levelTitle": level.title,
      "difficulty": level.difficulty,
      "score": score.value,
      "height": 0,
      "coins": null,
      "usedSprings": 2,
      "platformHits": {
        "normal": 0,
        "moving": 0,
        "breakable": 0
      },
      "timeSpent": null,
      "timeRemaining": 38,
      "endReason": "fall",
      "createdAt": "2026-08-04T12:30:00.000Z"
    }
)
// console.table(level);
// console.table(objectGame.value)

//درست کردن تایمر

watch(gameStart, () => {

  const intervalTimer = setInterval(() => {
    if (gameStart.value === true) {
      timer.value -= 1
      if (gameEnd.value === true) {
        clearInterval(intervalTimer)
      }
      if (timer.value == 1) {
        gameEnd.value = true;
      }
    }
  }, 1000);
})

//درست کردن شروع بازی

const handleStart = () => {
  gameStart.value = true;
}

//ری استارت بازی

const handleRestart = () => {
  window.location.reload();
}

//سیستم امتیاز دهی

//نام کاربر

const userName = localStorage.getItem('userName')

//چپ و راست رفتن کاراکتر

document.addEventListener('keydown', (e) => {
  if (e.key === 'a' || e.key === 'ArrowLeft' || e.key === 'ش') {
    caracterLeft.value -= 10
  }
  if (e.key === 'd' || e.key === 'ArrowRight' || e.key === 'ی') {
    caracterLeft.value += 10
  }
})

//درست کردن پرش

const jump = () => {
  if (!gameStart.value) return
  jumpBol.value = true;
  const jumpPower = ref(0)
  const intervalJump = setInterval(() => {
        jumpPower.value += 1
        caracterBottom.value += level.jumpPower
        if (jumpPower.value > level.jumpPower) {
          clearInterval(intervalJump)
          jumpBol.value = false
          gravity()
        }
      }
      ,
      level.gravity * 50
  )
}

//گرانش

const gravity = () => {
  const intervalGravity = setInterval(() => {
    caracterBottom.value -= level.gravity
    if (jumpBol.value === true) {
      clearInterval(intervalGravity)
    }
  }, 5)
}

//مدام رندر شود

const gameLoop = () => {
  // برخورد با زمین
  if (earthRef.value.getBoundingClientRect().top + 10 <= caracterRef.value.getBoundingClientRect().bottom && !jumpBol.value) {
    jump()
  }

  // برخورد با دیوار
  if (mainRef.value.getBoundingClientRect().left >= caracterRef.value.getBoundingClientRect().left) {
    gameEnd.value = true
  }

  if (mainRef.value.getBoundingClientRect().right <= caracterRef.value.getBoundingClientRect().right) {
    gameEnd.value = true
  }

  if (parentRef.value.getBoundingClientRect().bottom <= caracterRef.value.getBoundingClientRect().bottom) {
    gameEnd.value = true
  }

  // خط پایان
  if (finishLineRef.value.getBoundingClientRect().bottom >= caracterRef.value.getBoundingClientRect().bottom) {
    gameEnd.value = true
  }

  if (!gameEnd.value) {
    requestAnimationFrame(gameLoop)
  }
}

requestAnimationFrame(gameLoop)

// حرکت صفحه

setInterval(()=>{if (parentRef.value.getBoundingClientRect().top + 200 >= caracterRef.value.getBoundingClientRect().top) {
  parentBottom.value +=
      parentRef.value.getBoundingClientRect().top +
      200 -
      caracterRef.value.getBoundingClientRect().top;
  score.value += 1
}
},100)

//درست کردن سکو ها

for (let i = 1; i <= (level.platformCount+100); i++) {
  const randomPlatForm = Math.floor(Math.random() * 100) + 1
  if (randomPlatForm <= level.platformTypes[0].chance) {
    platformTypes.value.push('normal')
  } else if (randomPlatForm <= level.platformTypes[1].chance + level.platformTypes[0].chance) {
    platformTypes.value.push('moving')
  } else {
    platformTypes.value.push('breakable')
  }
}

//پرش روی مان

const handleNormal = (e) => {
  const isColliding =
      e.value.getBoundingClientRect().left < caracterRef.value.getBoundingClientRect().right &&
      e.value.getBoundingClientRect().right > caracterRef.value.getBoundingClientRect().left &&
      e.value.getBoundingClientRect().top < caracterRef.value.getBoundingClientRect().bottom &&
      e.value.getBoundingClientRect().bottom > caracterRef.value.getBoundingClientRect().bottom && !jumpBol.value;
  if (isColliding) {
    jump()
    score.value += level.platformTypes[0].score
  }
}
const handleMoving = (e) => {
  const isColliding =
      e.value.getBoundingClientRect().left < caracterRef.value.getBoundingClientRect().right &&
      e.value.getBoundingClientRect().right > caracterRef.value.getBoundingClientRect().left &&
      e.value.getBoundingClientRect().top < caracterRef.value.getBoundingClientRect().bottom &&
      e.value.getBoundingClientRect().bottom > caracterRef.value.getBoundingClientRect().bottom && !jumpBol.value;
  if (isColliding) {
    jump()
    score.value += level.platformTypes[1].score
  }
}
const handleBreakable = (e) => {
  if (!e[1].value) {
    const isColliding =
        e[0].value.getBoundingClientRect().left < caracterRef.value.getBoundingClientRect().right &&
        e[0].value.getBoundingClientRect().right > caracterRef.value.getBoundingClientRect().left &&
        e[0].value.getBoundingClientRect().top < caracterRef.value.getBoundingClientRect().bottom &&
        e[0].value.getBoundingClientRect().bottom > caracterRef.value.getBoundingClientRect().bottom && !jumpBol.value;
    if (isColliding) {
      jump()
      score.value += level.platformTypes[2].score
    }
  }
}

//دکمه های چپ و راست
const intervalBtnLeft = ref(null);
const handleBtnLeft = (x) => {
  if (x === true) {
    if (intervalBtnLeft.value) {
      clearInterval(intervalBtnLeft.value);
      intervalBtnLeft.value = null;
    }
    intervalBtnLeft.value = setInterval(() => {
      caracterLeft.value -= 20;
    }, 100);
  } else if (x === false) {
    if (intervalBtnLeft.value) {
      clearInterval(intervalBtnLeft.value);
      intervalBtnLeft.value = null;
    }
  }
};
const intervalBtnRight = ref(null);
const handleBtnRight = (x) => {
  if (x === true) {
    if (intervalBtnRight.value) {
      clearInterval(intervalBtnRight.value);
      intervalBtnRight.value = null;
    }
    intervalBtnRight.value = setInterval(() => {
      caracterLeft.value += 20;
    }, 100);
  } else if (x === false) {
    if (intervalBtnRight.value) {
      clearInterval(intervalBtnRight.value);
      intervalBtnRight.value = null;
    }
  }
};


</script>
<template>
  <div class="container center">
    <div ref="parentRef" class="parent" :style="{ width: `${level.gameWidth}px`, height: `${level.gameHeight}px` }">
      <header>
        <button @click="handleRestart">Restart</button>
        <span>{{ timer }}s</span>
        <span>{{ score }}</span>
        <span>{{ userName }}</span>
      </header>
      <div ref="mainRef" class="main" :style="{bottom: `-${parentBottom}px`}">
        <span ref="finishLineRef" class="finishLine"></span>
        <div v-for="(value, index) in platformTypes" :key="index">
          <Normal v-if="value === 'normal'" @elementRef="handleNormal($event)"/>
          <Moving v-else-if="value === 'moving'" @elementRef="handleMoving($event)" :mainRef="mainRef"/>
          <Breakable v-else @elementRef="handleBreakable($event)" :caracterRef="caracterRef" :jumpBol="jumpBol"/>
        </div>

        <span ref="caracterRef" class="caracter"
              :style="{bottom: `${caracterBottom}px`, left: `${caracterLeft}px`}"></span>
        <span ref="earthRef" class="earth"></span>
      </div>
      <div v-if="!gameStart" ref="gameStartedRef" class='gameStarted center'>
        <button @click="handleStart">شروع بازی</button>
      </div>
    </div>
    <button
        @mousedown="handleBtnLeft(true)"
        @mouseup="handleBtnLeft(false)"
        @mouseleave="handleBtnLeft(false)"
        @touchstart="handleBtnLeft(true)"
        @touchend="handleBtnLeft(false)"
        @touchcancel="handleBtnLeft(false)"
        class="btn-left"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M15 19l-7-7 7-7"/>
      </svg>
    </button>
    <button
        @mousedown="handleBtnRight(true)"
        @mouseup="handleBtnRight(false)"
        @mouseleave="handleBtnRight(false)"
        @touchstart="handleBtnRight(true)"
        @touchend="handleBtnRight(false)"
        @touchcancel="handleBtnRight(false)"
        class="btn-right"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M9 5l7 7-7 7"/>
      </svg>
    </button>
  </div>
  <div v-if="gameEnd" class="endGame center">
    <h1>پایان بازی</h1>
    <button @click="handleRestart">شروع دوباره بازی</button>
  </div>
</template>
<style scoped>
.container {
  width: 100%;
  min-height: 100vh;
}

.parent {
  box-shadow: var(--shadow);
  border-radius: var(--border-r);
  position: relative;
  overflow: hidden;
}

header {
  width: 100%;
  height: 50px;
  position: absolute;
  top: 0;
  background-color: rgba(235, 234, 234, 0.497);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(128, 128, 128, 0.493);
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 14px;
  z-index: 999;
}

header button {
  width: 75px;
  height: 30px;
  background-color: var(--color-1);
  border: none;
  border-radius: var(--border-r);
  color: white;
}

.gameStarted {
  position: absolute;
  inset: 0;
  background-color: #ffffff6c;
  backdrop-filter: blur(5px);
  z-index: 200;
}

.gameStarted button {
  width: 100px;
  height: 50px;
  color: white;
  font-size: 16px;
  background-color: var(--color-1);
  border: none;
  border-radius: var(--border-r);
  cursor: pointer;
}

.main {
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding: 100px 0 150px;
  transition: bottom 0.3s;
}

.earth {
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 100px;
  background-color: orange;
  box-shadow: inset 0 10px 5px rgba(255, 255, 255, 0.373);
}

.caracter {
  width: 40px;
  height: 70px;
  background-color: black;
  position: absolute;
  bottom: 150px;
  border-radius: var(--border-r);
  transition: left 0.1s ease;
  z-index: 100;
}

.btn-left {
  display: none;
  width: 70px;
  height: 70px;
  background-color: var(--color-1);
  opacity: 0.8;
  backdrop-filter: blur(5px);
  position: fixed;
  bottom: 10px;
  left: 10px;
  border: 1px solid #bd7c00;
  border-radius: 100%;
  z-index: 999;

  & svg {
    width: 100%;
    height: 100%;
  }
}

.btn-right {
  display: none;
  width: 70px;
  height: 70px;
  background-color: var(--color-1);
  opacity: 0.8;
  backdrop-filter: blur(5px);
  position: fixed;
  bottom: 10px;
  right: 10px;
  border: 1px solid #bd7c00;
  border-radius: 100%;
  z-index: 999;

  & svg {
    width: 100%;
    height: 100%;
  }
}

.endGame {
  position: absolute;
  inset: 0;
  background-color: white;
  z-index: 1000;
  flex-direction: column;
  gap: 10px;

  & button {
    padding: 20px;
    border: none;
    border-radius: var(--border-r);
    background-color: var(--color-1);
    color: white;
    font-size: 14px;
    margin-top: 20px;
  }
}

.finishLine {
  width: 100%;
  height: 30px;

  background: linear-gradient(45deg,
  #000 25%,
  transparent 25%,
  transparent 75%,
  #000 75%),
  linear-gradient(45deg,
      #000 25%,
      transparent 25%,
      transparent 75%,
      #000 75%);

  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
  background-color: #fff;
}

@media screen and (max-width: 500px) {
  .btn-left, .btn-right {
    display: block;
  }
}

</style>