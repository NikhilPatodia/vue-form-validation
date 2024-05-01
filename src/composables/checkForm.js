import moment from 'moment'
import { ref } from 'vue'
const checkForm = ()=>{
    
    const fname = ref('')
    const lname = ref('')
    const email = ref('');
    const dob = ref('');
    const hobby = ref([]);
    const validate = ref(false)
    const fnameError = ref('');
    const lnameError = ref('');
    const emailError = ref('');
    const dobError = ref('');
    const hobbyError = ref('');
    const hasNumber = ref(/\d/);
    const hasDOB = ref(/^(194[0-9]|195[0-9]|196[0-9]|197[0-9] | 198[0-9]|199[0-9]|200[0-9]|201[0-9]|202[0-4])-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/)
    const hasEmail = ref(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    
    const handleOnChange = (value)=>{
       
        if(value === 'fname'){
         if(fname.value.length < 3){
           fnameError.value = "Enter Must Be Atleast 3 Characters";

           validate.value = true;
         }
        else if(fname.value.length > 10){
           fnameError.value = "Enter Must Be Less Than 10 Characters";
           validate.value = true;
         }
         else if(fname.value.includes(' ')){
             fnameError.value = "Text Contains Space.";
             validate.value = true;
         }
         else if(hasNumber.value.test(fname.value)){
            fnameError.value = "Text Contains Number.";
            validate.value = true;
         }
         else{
        fnameError.value = '';
        console.log("error validate")
        validate.value = false;
         }
      }
      else if(value === 'lname'){
         if(lname.value.length < 3){
           lnameError.value = "Enter Must Be Atleast 3 Characters"
           validate.value = true;
         }
         else if(lname.value.length > 10){
           lnameError.value = "Enter Must Be Less Than 10 Characters";
           validate.value = true;
         }
         else if(lname.value.includes(' ')){
             lnameError.value = "Text Contains Space."
             validate.value = true;
         }
         else if(hasNumber.value.test(lname.value)){
            lnameError.value = "Text Contains Number."
            validate.value = true;
         }
         else{
        lnameError.value = '';
        console.log("error validate")
        validate.value = false;
         }
      }
      else if(value === 'email'){
        if(email.value.includes(' ')){
          emailError.value = "Your Email is contains space.";
          validate.value = true;
       }
        else if(!(hasEmail.value.test(email.value))){
            emailError.value = "Your Email is Not Valid.";
            validate.value = true;
         }
         else{
            emailError.value = '';
            console.log("error validate")
            validate.value = false;
         }
      }
      else if(value === 'dob'){
        
        if(!(hasDOB.value.test(dob.value))){
            dobError.value = "Your DOB is Not Valid.";
            validate.value = true;
        }else{
          console.log((new Date(dob.value).getFullYear() - new Date().getFullYear()) < -18)
           if(!((new Date(dob.value).getFullYear() - new Date().getFullYear()) < -18)){
            validate.value = true;
            console.log("run")
            dobError.value = "Your DOB is Must Greater than 18.";
           }else{
             dobError.value = "";
             console.log("error validate")
             validate.value = false;

           }
        }
      }
     
    }
    const handleClick = (value)=>{
      Array.from(document.querySelectorAll('.hobby')).forEach((elem)=>{
           if(!elem.checked && hobby.value.some((ele)=> {return ele === value})){
            
            hobby.value = hobby.value.filter((ele)=>{return ele !== elem.value})
            if(hobby.value.length === 0){
              hobbyError.value = "Enter Minimum one Hobby!"
            }else{
              hobbyError.value = "";
            }
          }
          else if(elem.checked && !(hobby.value.some((ele)=> {return ele === elem.value}))){
            hobby.value.push(value);
            hobbyError.value = "";
          }
     })
     }
   
    return {fname, lname, handleOnChange, fnameError, lnameError, emailError, email, dob, dobError,  validate, handleClick, hobby, hobbyError}
}

export default checkForm