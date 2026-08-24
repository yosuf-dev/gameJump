<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const handleSubmit=(e)=>{
    e.preventDefault()
    localStorage.setItem('userName', e.target['name'].value)
    router.push('/game')
}

</script>
<template>
   <div class="center">
     <form class="center" @submit="handleSubmit($event)">
        <h2>Vertical Jump Challenge</h2>
        <input type="text" placeholder="نام خود را وارد کنید" name="name" required>
        <button type="submit">شروع بازی</button>
    </form>
   </div>
</template>

<style scoped>
div{
    width: 100%;
    height: 100vh;
}
form{
    width: 420px;
    box-shadow: var(--shadow);
    border-radius: var(--border-r);
    padding: 40px;
    flex-direction: column;
    gap: 30px;
}
input{
    width: 100%;
    height: 30px;
    padding-inline: 10px;
    margin: 10px 20px 0;
}
button{
    width: 100px;
    height: 50px;
    border-radius: var(--border-r);
    border: none;
    background-color: var(--color-1);
    cursor: pointer;
}
</style>