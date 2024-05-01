<template>
  <transition name="alert">
  <Alert  v-if="store.alert"/>
  </transition>
  <FormVue/>
</template>
<script>
import { defineComponent } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import DobModal from './components/DobModal.vue'

import FormVue from './components/Form.vue'
import Alert from './components/Alert.vue'
import { useCounterStore } from './stores/counter'

export default defineComponent({
 components:{ FormVue, DobModal, Alert },
  setup() {
  const store = useCounterStore()
    return { store }
  }
})
</script>

<style>
.alert-enter-from, .alet-leave-to{
   
    opacity: 0;
    transform: translateY(-100%);
  /* transform: translateY(-130px); */
}
.alert-enter-active,.alert-leave-active{
  transform: translateY(0%);
  /* transform: translateY(0px); */
  transition: all 0.5s ease-out;
}
</style>
