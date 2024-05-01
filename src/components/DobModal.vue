<template>
  <div class="modal">
  <div class="modal-content">
    <span @click="store.showModal = false" class="close">&times;</span>
    <h2>Enter Date of Birth</h2>
  
    <div class="dob-inputs">
        <div class="col"> 
       <div>
      <label for="dob-day">From</label>
      <input :max="maxDate" v-model="fdob" type="date" id="dob-day" name="dob-day" placeholder="Enter DOB" >
      </div>
      <div>
      <label for="dob-day">To</label>
      <input :max="maxDate" v-model="tdob" type="date" id="dob-day" name="dob-day" placeholder="Enter DOB" >
      </div>
      </div> 
    </div>
   
    <button @click="$emit('dobRangeSorting', fdob, tdob); fdob='';tdob='';" class="submit-btn" >Submit</button>
  </div>
</div>
</template>

<script>
import { computed, ref } from 'vue'
import { useCounterStore } from '@/stores/counter';
export default {
  setup(){
    const fdob = ref('');
    const tdob = ref('');
    const store = useCounterStore();
     const maxDate = computed(()=>{
       
         let today = new Date().toISOString().split('T')[0]
        return today
   })
    return {fdob, tdob, store, maxDate}
  }
}
</script>

<style>
.route-enter-from{
  opacity: 0;
  transform: translateX(-30px);
}
.route-enter-active{
  transform: translateX(0px);
  transition: all 0.3s ease-out;
}
.col{
    display: flex;
    justify-content: space-between;
}
.modal {
  /* display: none; Hidden by default */
  position: absolute; /* Stay in place */
  /* z-index: -1;  */
  /* left: 0;
  top: 0; */
  top: 0px;
    left: 30%;
  width: 35%; 
  overflow: auto; /* Enable scroll if needed */
  margin:0px auto;
}

.modal-content {
  background-color: #fefefe;
  margin: 0px auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.dob-inputs {
   
  margin-bottom: 20px;
}

.dob-inputs label,
.dob-inputs input {
     padding: 14px 12px;
    font-size: 1.1rem;
  display: block;
  margin-bottom: 10px;
}

.submit-btn {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #45a049;
}

</style>