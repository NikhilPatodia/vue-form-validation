<template>
  <div :class ="store.isGreen === true?'isgreen':'isred'" class="alert ">
    {{ store.msg }}
  </div>
</template>

<script>
import { useCounterStore } from '@/stores/counter'
export default {
  setup(){
    const store = useCounterStore();



    return {store}
  }
}
</script>

<style>
.isred{

    background: crimson;
     z-index: 100;
}
.isgreen{
  background: green;
   z-index: 100;
}
.alert{
    font-size: 1.6rem;
    width: 30%;
    position: absolute;
    left: 3%;
     /* margin: 0px auto; */
    padding: 16px 20px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
     z-index: 101;
}
</style>