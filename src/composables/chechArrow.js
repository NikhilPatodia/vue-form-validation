

import { useCounterStore } from '@/stores/counter';
import { ref } from 'vue'

const sortingArray = ()=>{
  const store = useCounterStore()
  const showf = ref(false);
  const showl = ref(false);
  const showd = ref(false);
  const dup = ref(true);
  const fup = ref(true);
  const lup = ref(true);
  const showe = ref(false);
  const eup = ref(true)
  const sortArr = ref();
  const fsearch = ref('');
  const filterArr = ref([]);
  const filterValid = ref(false);
  const filterError = ref('')
const handleSorting = (data)=>{

if(data === "fsorting"){
  sortArr.value =store.allDetails.sort((a, b) => {
   
if ((a.fname.toLowerCase() < b.fname.toLowerCase())) {
    return -1;
}
else if (a.fname.toLowerCase() > b.fname.toLowerCase()) {
    return 1;
}
return 0;
 
});

  //z to A
 if(fup.value){
   store.allDetails = sortArr.value.reverse();
 } else{
   store.allDetails = sortArr.value;
 }
 console.log(fup.value, store.allDetails)
fup.value = !fup.value;
}
else if(data === "lsorting"){
  sortArr.value =store.allDetails.sort((a, b) => {
if (a.lname.toLowerCase() < b.lname.toLowerCase()) {
    return -1;
}
else if (a.lname.toLowerCase() > b.lname.toLowerCase()) {
    return 1;
}
return 0;
});
  //z to A
 if(lup.value){
   store.allDetails = sortArr.value.reverse();
 } else{
   store.allDetails = sortArr.value;
 }
lup.value = !lup.value;
}
else if(data === "esorting"){
    sortArr.value =store.allDetails.sort((a, b) => {
if (a.email.toLowerCase() < b.email.toLowerCase()) {
    return -1;
}
else if (a.email.toLowerCase() > b.email.toLowerCase()) {
    return 1;
}
return 0;
});
  //z to A
 if(eup.value){
   store.allDetails = sortArr.value.reverse();
 } else{
   store.allDetails = sortArr.value;
 }
eup.value = !eup.value;
}
else if(data === "dsorting"){
   sortArr.value =store.allDetails.sort((a, b) => {
if (a.dob.toLowerCase() < b.dob.toLowerCase()) {
    return -1;
}
else if (a.dob.toLowerCase() > b.dob.toLowerCase()) {
    return 1;
}
return 0;
});
  //z to A
 if(dup.value){
   store.allDetails = sortArr.value.reverse();
 } else{
   store.allDetails = sortArr.value;
 }
dup.value = !dup.value;
}
else if(data === "filtersorting"){
  if(fsearch.value !== ""){
    console.log("filterArr1")
    filterError.value = "";
  filterValid.value = true;
  sortArr.value =store.allDetails.filter((elem)=>{
    return Object.values(elem).some((val)=>{
    if(typeof val === "string"){
      return val.toLowerCase().includes(fsearch.value.toLowerCase())
       }
       
       return false;
    })
    });
  
  filterArr.value = sortArr.value;
  fsearch.value = "";
  }else{
    // filterValid.value = true;
    console.log("filterArr2")
    filterError.value = "Please Insert Value on Search";
    setTimeout(() => {
      filterError.value = "";
    }, 1400);
  }
}

}
const dobRangeSorting = (fdob, tdob)=>{
if(fdob === '' || tdob === ''){
  store.msg = "Enter DOB Value";
  store.alert = true;
  setTimeout(() => {
      store.alert = false;

  }, 1500);
 
}
else if(fdob>tdob){
  store.msg = "Enter valid ranger of dob!";
  store.alert = true;
  setTimeout(() => {
      store.alert = false;

  }, 1500);


}
else{
   sortArr.value = store.allDetails.filter((elem)=>{
   if (elem.dob > fdob && elem.dob < tdob) {
    return true;
}
return false;
 })
 filterValid.value = true;
 filterArr.value = sortArr.value;
 store.showModal = false;
 
}

}
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
  dobRangeSorting
};
    
    
  }


  export default sortingArray