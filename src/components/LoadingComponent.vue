<script>
  export default {
    name: 'LoadingComponent',
    props: {},
  }
</script>

<template>
    <div class="container">
        <img src="@/assets/img/burger_header.png" alt="">

        <svg class="anim" width="300px" height="300px" viewBox="0 0 300 300" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

        <circle class="circle" stroke="#FF7400" stroke-width="10" fill-rule="nonzero" fill="transparent" cx="150" cy="150" r="145"></circle>
        
        </svg>
        <svg class="anim2" width="300px" height="300px" viewBox="0 0 300 300" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

        <circle class="circle" stroke="#FF7400" stroke-width="10" fill-rule="nonzero" fill="transparent" cx="150" cy="150" r="145"></circle>
        
        </svg>
    </div>
</template>

<style scoped>
.container{
    height: 100vh;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 150px;
  }
  .anim{
    position: absolute;
    top: 50%;
    left: 50%;
    height: 300px;
    width: 300px;
    transform: translate(-50%, -50%);
  }
  .anim2{
    position: absolute;
    top: 50%;
    left: 50%;
    height: 200px;
    width: 200px;
    transform: translate(-50%, -50%);
  }
  .anim .circle {
    --colorStart: #DBC1A8;
    --colorTo: #A1AAB1;
    transform-origin: 50% 50%;
    stroke-dasharray: 190;
    stroke-dashoffset: 10;
    animation: loading 2.8s ease-in-out infinite;
  }
  .anim2 .circle {
    --colorStart: #DBC1A8;
    --colorTo: #A1AAB1;
    transform-origin: 50% 50%;
    stroke-dasharray: 190;
    stroke-dashoffset: 10;
    animation: loading2 2.8s ease-in-out infinite;
  }
  
  @keyframes loading {
    0% {
      transform: rotate(0);
      stroke-dasharray: 235;
      stroke: var(--colorStart);
    }
    50% {
      stroke-dasharray: 500;
      stroke: var(--colorTo);
    }
    93%, 100% {
      transform: rotate(1080deg);
      stroke-dasharray: 1000;
      stroke: var(--colorStart);
    }
  }
  
  @keyframes loading2 {
    0% {
      transform: rotate(0);
      stroke-dasharray: 235;
      stroke: var(--colorStart);
    }
    50% {
      stroke-dasharray: 500;
      stroke: var(--colorTo);
    }
    93%, 100% {
      transform: rotate(-1080deg);
      stroke-dasharray: 1000;
      stroke: var(--colorStart);
    }
  }
</style>