<template>
<form class="form" @submit.prevent="handleSubmit">
    <div class="heading">
        <h1>Add Details</h1>
    </div>
     <div class="grid-form">
            <div class="names" id="fname">
            <h2>Enter Your First Name</h2>
            <input @change="handleOnChange('fname')" name="fname"  v-model="fname" type="text" placeholder="Enter Your First Name">
            <div class="error" v-if="fnameError"> {{ fnameError }} </div>
            </div>
            <div class="names">
            <h2>Enter Your Last Name</h2>
            <input @change="handleOnChange('lname')"  v-model="lname" type="text" placeholder="Enter Your Last Name">
            <div class="error" v-if="lnameError"> {{ lnameError }} </div>
            </div>
            <div class="names">
            <h2>Enter Your Email</h2>
            <input @change="handleOnChange('email')" name="email"  v-model="email" type="text" placeholder="Enter Your Email">
            <div class="error" v-if="emailError"> {{ emailError }} </div>
            </div>
            <div class="names">
                <h2>Enter Your DOB</h2>
                <input  @change="handleOnChange('dob')" type="date" id="dob" v-model="dob" :max="maxDate">
                <div class="error" v-if="dobError"> {{ dobError }} </div>
            </div>    
            <!-- <div class="age">
                <h2>Enter Your Age</h2>
                <input  @change="handleOnChange('age')" type="number" placeholder="Enter Your Age" v-model="age">
                <div class="error" v-if="ageError"> {{ ageError }} </div>
            </div>  -->
                  <div class="hobbies">
            <h2>Select Hobbies</h2>
                 <div class="flex-col">
          <div class="hobby-detail">
            <input type="checkbox" @click="handleClick('Dancing')" class="hobby"   name="hobby" value="Dancing" style="margin-right: 5px;">
            <label for="hobby">Dancing</label>
          </div>
          <div class="hobby-detail">
            <input type="checkbox" @click="handleClick('Sports')" class="hobby"   name="hobby" value="Sports" style="margin-right: 5px;">
            <label for="hobby">Sports</label>
          </div>
          <div class="hobby-detail">
            <input type="checkbox" @click="handleClick('Singing')" class="hobby"   name="hobby" value="Singing" style="margin-right: 5px;">
            <label for="hobby">Singing</label>
          </div>
          <div class="hobby-detail">
            <input type="checkbox" @click="handleClick('Drawing')" class="hobby"   name="hobby" value="Drawing" style="margin-right: 5px;">
            <label for="hobby">Drawing</label>
          </div>
          <div class="hobby-detail">
            <input type="checkbox" @click="handleClick('Other')" class="hobby"   name="hobby" value="Other" style="margin-right: 5px;">
            <label for="hobby">Other</label>
          </div>
          <div class="error" v-if="hobbyError"> {{ hobbyError }}</div>
        </div>
         </div>
       
            <div class="gender">
                 <h2>Select Gender</h2>   
                 <span> 
                 <input @click="handleGender('Male')" value="Male" name="gender"  type="radio" class="gender" id="male" :checked="checkGender">
                 <label for="male">Male</label>
                 </span>
                 <span>
                 <input @click="handleGender('Female')" value="Female" name="gender"  type="radio" class="gender" id="female">
                 <label for="female">Female</label>
                 </span>
                 <div class="error" v-if="genderError"> {{ genderError }}</div>
            </div>   
                <div class="address">
              <div>
                <h2>Country</h2>
                <select v-model="country" @change="changeCountry(country)">
                    <option  value="" disabled selected>Select Country</option>
                    <option v-for="countri in Object.keys(store.allCountry)" :key="countri" :value="countri" > {{ countri }} </option>
                </select>
              </div>
              <div>
                <h2>State</h2>
                <select v-model="statiy" @change="changeState(statiy)"> 
                     <option  value="" disabled selected>Select State</option>
                     <template v-if="states.length">
                    <option   v-for="State in states" :key="State"  :value="State"> {{ State }} </option>
                     </template>
                </select>
              </div>
              <div>
                <h2>City</h2>
               <select v-model="city" @change="changeCity()">
                    <option  value="" disabled selected>Select City</option>
                    <template v-if="validateCity">
                    <option  v-for="cit in allCity" :key="cit"  :value="cit" > {{ cit }} </option>
                    </template>
                </select>
              </div>
              <div class="error addError" v-if="addressError "> {{ addressError }}</div>
            </div>
         
     </div>
     
     <button class="btn" type="submit" style="margin-right: 15px;">Submit</button>
  <button class="btn reset" type="button" @click="resetForm">Reset</button>
  </form>
 
 <TableVue @editUser="editUser"  />
</template>

<script>
import { computed, ref } from 'vue';
import checkForm from '../composables/checkForm.js'

import { useCounterStore } from '@/stores/counter.js';
import TableVue from './Table.vue';
export default {
components:{  TableVue },
 setup(){
   const store = useCounterStore();
   
   const {fname, lname, handleOnChange, fnameError, lnameError, emailError, email, dob, dobError,  validate, handleClick, hobby, hobbyError} = checkForm();
   
   const validateCity = ref(false)
   const validforEdit = ref(false)
   const country = ref('');
   const states = ref([]);
   const statiy = ref('');
   const showAdd = ref(true);
   const city = ref('');
   const allCity = ref([]);
   const gender = ref('Male');
   const genderError = ref('');
   const addressError = ref('');
   const index = ref();
   const emailArr = ref([]);
   const id = ref(store.allDetails.length + 1)
  const checkGender = ()=>{
     Array.from(document.querySelectorAll('.gender')).forEach((elem)=>{
     if(elem.value === "Male"){
        elem.checked = true;
     }
    })
  }
  checkGender()
   const editUser = (user)=>{
    index.value = user.id;
    emailArr.value = store.allDetails.filter((elem)=>{return elem.email !== user.email});
    console.log(index)
    validforEdit.value = true;
    fname.value = user.fname;
    lname.value = user.lname;
    gender.value = user.gender;
    Array.from(document.querySelectorAll('.gender')).forEach((elem)=>{
        if(elem.value === gender.value){
            elem.checked = true;
        }
    })
    handleGender(gender.value)
    dob.value = user.dob;
    country.value = user.country;
    changeCountry(country.value)
    statiy.value = user.state;
    changeState(statiy.value)
    city.value = user.city;
    email.value = user.email;
    hobby.value = user.hobby;
      Array.from(document.querySelectorAll('.hobby')).forEach((elem)=>{
        if(hobby.value.find((ele)=>ele === elem.value)){
            elem.checked = true;
        }
        else{
            elem.checked = false;
        }
    })
   }
   const resetForm = ()=>{
    fname.value = "";
    lname.value = "";
    email.value = "";
    dob.value = "";
    statiy.value = '';
    states.value = [];
    city.value = '';
    allCity.value = [];
    
    country.value = "";
    fnameError.value = ""; lnameError.value = ""; emailError.value = "";addressError.value = "";hobbyError.value = "";
   checkGender();
     Array.from(document.querySelectorAll('.hobby')).forEach((elem)=>{
        elem.checked = false;
     })
    gender.value = "Male";
    hobby.value = [];
    validforEdit.value = false;
   }
   const handleGender = (value)=>{
    Array.from(document.querySelectorAll('.gender')).forEach((elem)=>{
        if(elem.checked){
            gender.value = elem.value;
            console.log(gender.value)
            genderError.value = '';
        }
        
    })
   }
  const handleSubmit = ()=>{
    console.log(!gender.value)
      if(!fname.value){
        fnameError.value = "Enter Value On First Name"
      }
     else if(!lname.value){
        lnameError.value = "Enter Value On Last Name";
      }
    else if(!email.value){
      emailError.value = "Enter Value On Email"
      }
    else if(!dob.value){
        dobError.value = "Enter Value on DOB";
      }
    else if(fname.value === lname.value){
        store.msg = "First Name and Last Name are not be same!";
        store.alert = true;
        setTimeout(() => {
            store.alert = false;

        }, 1500);
    }
    else if(!gender.value){
        genderError.value = "Please Enter Your Gender"
    }
    else if(!country.value){
        addressError.value = "Please Enter Your Country"
    }
    else if(!statiy.value){
        addressError.value = "Please Enter Your State"
    }
    else if(!city.value){
        addressError.value = "Please Enter Your City"
    }
    else if(hobby.value.length === 0){
        hobbyError.value = "Enter Minimum one Hobby!";
    }
    else if(fnameError.value || lnameError.value || emailError.value || dobError.value || genderError.value || addressError.value || hobbyError.value){
        // store.msg = "Invalid Credentials!";
        //  store.alert = true;
        // setTimeout(() => {
        //     store.alert = false;

        // }, 1500);
    }
    else if(store.allDetails.map((elem)=>elem.email).some((ele)=>{return ele === email.value}) && !validforEdit.value){
        store.msg ="Email already on the list!";
        store.alert = true;
        setTimeout(() => {
            store.alert = false;

        }, 1500);
    }
    else if(!validforEdit.value){
        store.handleForm({fname: fname.value, lname: lname.value, email: email.value, dob: dob.value, country: country.value, state: statiy.value, city: city.value, hobby: hobby.value, gender: gender.value, id: id.value})
        id.value += 1;
        store.msg ="Successfully Submited!";
        store.alert = true;
        store.isGreen = true;
        setTimeout(() => {
            store.alert = false;
            store.isGreen = false;
        }, 1500);
        resetForm()
    }
    else{
        if(emailArr.value.map((elem)=>elem.email).some((ele)=>{return ele === email.value})){
            store.msg ="Email already on the list!";
        store.alert = true;
        setTimeout(() => {
            store.alert = false;

        }, 1500);
        }
        else{
            store.editDetail({fname: fname.value, lname: lname.value, email: email.value, dob: dob.value, country: country.value, state: statiy.value, city: city.value, hobby: hobby.value, gender: gender.value,id: index.value});
            
            resetForm()
         }
    }

  }
   const changeCountry = (desh)=>{
    
       states.value =  Object.keys(store.allCountry[desh]["states"]);

       validateCity.value = false;
       addressError.value = "";
       statiy.value = '';
       city.value = '';
   }
   const changeState = (state)=>{
       
       allCity.value =  store.allCountry[country.value]["states"][state];
       validateCity.value = true;
       addressError.value = "";
       city.value = '';
   }
   const changeCity = ()=>{
    if(city.value){
        addressError.value = "";
    }
   }
   const maxDate = computed(()=>{
           let today = new Date().toISOString().split('T')[0];
           return today
   })
   
 
   return {fname, lname, handleOnChange, fnameError, lnameError, emailError, email, dob, dobError, maxDate,  store, country, showAdd, changeCountry, states, statiy, allCity, city, changeState, handleSubmit, handleGender, genderError, addressError, changeCity, validateCity, handleClick, hobby, hobbyError, editUser, resetForm, checkGender}
 }
}
</script>

<style>
.btn{
    padding: 12px 16px;
    margin-top: 15px;
     background: #007bff;
     cursor: pointer;
    color: white;
    font-size: 1.1rem;
    border-radius: 8px;
}
.grid-form{
    display: grid;
    grid-template-columns: repeat(2, 50%);
    /* gap: 10px; */
}
/* .names{
    display: flex;
} */
.names input{
    width: 80%;
    padding: 14px 12px;
    font-size: 1.1rem;
    margin-top: 5px;
}
.age input{
    width: 30%;
    padding: 14px 12px;
    font-size: 1.1rem;
    margin-top: 5px;
}
.names, .gender, .address{
    margin-top: 15px;
}
.address{
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    position: relative;
}
.addError{
    position: absolute;
    left: 0%;
    bottom: -22%;
}
.address div{
    width: 33%;
    margin-right: 20px;
    
}
.address select{
     padding: 12px 18px;
    font-size: 1.2rem;
    width: 100%;
}
.gender h2{
    margin-bottom: 12px;
}
.gender span{
    margin-top: 20px;
    margin-right: 15px;
}
.gender label{
    font-size: 1.2rem;
}
.gender input{
    margin: 0px 5px
}
.age{
    margin-top: 15px;
}
.error{
    color: red;
}

</style>