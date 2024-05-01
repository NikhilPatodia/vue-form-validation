<template>
 <transition  name="route">
  <DobModal @dobRangeSorting ="dobRangeSorting" v-if="store.showModal"/>
 </transition>

<div class="filter">
  <input v-model="fsearch" type="text" class="filterinput" placeholder="Search Keyword...">
  
  <button class="btn ml-10" @click="handleSorting('filtersorting')">Search</button>
  <button class="btn ml-10" v-if="filterValid" @click="filterValid = false;filterError = ''">Back To Table</button>
  <button class="btn ml-10" @click="store.showModal = true">Filter DOB</button>
</div>
<div style="color:red;" class="red" v-if="filterError">{{ filterError }}</div>
    <div class="table">
       <div class="total mt-10">
 <span>Total Rows</span> : <span style="font-weight:600;">{{ store.allDetails.length }} </span>
</div>
    <table>
     
  <thead>
    <tr>
      <th @click="handleSorting('fsorting')" @mouseover="showf = true" @mouseleave="showf = false"><button class="sort faccending button"><span>First Name</span> <img v-if="showf && fup" class="arrow up" src="../icons/up-arrow.svg" alt=""> <img v-if="showf && !fup" class="arrow down" src="../icons/up-arrow.svg" alt=""></button></th>
      <th @click="handleSorting('lsorting')" @mouseover="showl = true" @mouseleave="showl = false"><button class="sort faccending button"><span>Last Name</span> <img v-if="showl && lup" class="arrow up" src="../icons/up-arrow.svg" alt=""> <img v-if="showl && !lup" class="arrow down" src="../icons/up-arrow.svg" alt=""></button></th>
      <th @click="handleSorting('esorting')" @mouseover="showe = true" @mouseleave="showe = false"><button class="sort faccending button"><span>Email</span> <img v-if="showe && eup" class="arrow up" src="../icons/up-arrow.svg" alt=""> <img v-if="showe && !eup" class="arrow down" src="../icons/up-arrow.svg" alt=""></button></th>
      <th @click="handleSorting('dsorting')" @mouseover="showd = true" @mouseleave="showd = false"><button class="sort faccending button"><span>DOB</span> <img v-if="showd && dup" class="arrow up" src="../icons/up-arrow.svg" alt=""> <img v-if="showd && !dup" class="arrow down" src="../icons/up-arrow.svg" alt=""></button></th>
      <th>Country</th>
      <th>State</th>
      <th>City</th>
      <th>Gender</th>
    </tr>
  </thead>
  <tbody v-if="!filterValid">
    <tr v-for="(user, index) in store.allDetails" :key="user.email">
      <template v-if="index >= store.precount && index <= store.nextcount" >
      <td>{{ user.fname }}</td>
      <td>{{ user.lname }}</td>
      <td>{{ user.email }}</td>
      <td>{{ user.dob }}</td>
      <td>{{ user.country }}</td>
      <td>{{ user.state }}</td>
      <td>{{ user.city }}</td>
      <td>{{ user.gender }}</td>
      <td><img @click="$emit('editUser', user)" src="../icons/edit.svg" alt="">
      <img class="delete" @click="store.deleteUser(user);store.checkNext();store.checkPre();" src="../icons/delete.svg" alt=""></td>
      </template>
    </tr>
   
  </tbody>
  <tbody v-else-if="filterValid">
    <tr v-for="user in filterArr" :key="user.email" >
      <td>{{ user.fname }}</td>
      <td>{{ user.lname }}</td>
      <td>{{ user.email }}</td>
      <td>{{ user.dob }}</td>
      <td>{{ user.country }}</td>
      <td>{{ user.state }}</td>
      <td>{{ user.city }}</td>
      <td>{{ user.gender }}</td>
      <td><img @click="$emit('editUser', user)" src="../icons/edit.svg" alt="">
      <img class="delete" @click="store.deleteUser(user);store.checkPre();store.checkNext();" src="../icons/delete.svg" alt=""></td>
    </tr>
  </tbody>
  <!-- <tbody v-else-if="filterError">
    <div class="filterError"> {{ filterError }} </div>
  </tbody> -->
  
</table>
  </div>
  <div class="showIndex mt-10" v-if="store.allDetails.length">
     {{ store.currentIndex }}/{{ Math.ceil(store.allDetails.length / 10) }}
  </div>
  <div class="pagination">
    <button :disabled="store.checkPreDisabled" @click="store.handleButton('pre')" class="btn">Previous</button>
    <button :disabled="store.checkNextDisabled" @click="store.handleButton('next')" class="btn">Next</button>
  </div>

</template>

 
<script>

import DobModal from './DobModal.vue'
import sortingArray from '@/composables/chechArrow'
import { computed, ref } from 'vue'
export default {
components: { DobModal },
setup(){
  const {filterError, showf, store,fsearch, showe,eup,lup,fup,showl,showd,dup,handleSorting,filterValid,filterArr, dobRangeSorting } = sortingArray()

 store.handleButton('default')
 console.log(store.allDetails.length)
 return {
  
  filterError,
 showf,
  store,
  fsearch,
  showe,
  eup,
  lup,
  fup,
  showl,
  showd,
  dup,
  handleSorting,
  filterValid,
  filterArr,
  dobRangeSorting,
};
}

}
</script>

<style>
.mt-10{
  margin-top: 10px;
  font-size: 1.1rem;
}
.btn:disabled{
      background: #6fb4ff;
}
.pagination{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.filterinput{
  padding: 10px 14px;
  margin-top: 15px;
  font-size: 1rem;

}
.filterError{
  margin: 0px auto;
  color:red;
}
.ml-10{
  margin-left: 10px;
}
.sort{
      display: flex;
    align-items: center;
}
.down{
  transform: rotate(180deg);
}
.button{
  background: transparent;
  border: none;
}
.arrow{
  width: 20px;
}
table {
    margin-top: 25px;
    width: 100%;
    border-collapse: collapse;
  }
 tr{
  position: relative;
 }
  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    cursor: pointer;
    background-color: #f2f2f2;
  }
  td img{
    cursor: pointer;
    width: 20px;
    margin-right: 6px;
  }
  tr:hover {
    background-color: #f5f5f5;
  }
  .delete{
    width: 25px;
  }
  .showIndex{
     display: flex;
  justify-content: center;
  align-items: center;
  }
</style>