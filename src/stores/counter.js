
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    allDetails: JSON.parse(localStorage.getItem('detail')) || [],
     allCountry : {
      "Australia": {
         "states": {
           "New South Wales (NSW)": ["Sydney"],
           "Victoria": ["Melbourne"],
           "Queensland": ["Brisbane"],
           "Western Australia": ["Perth"],
           "South Australia": ["Adelaide"],
           "Tasmania": ["Hobart"],
           "Australian Capital Territory (ACT)": ["Canberra"],
           "Northern Territory": ["Darwin"]
         }
       },
       "Germany": {
         "states": {
           "Bavaria": ["Munich"],
           "North Rhine-Westphalia": ["Cologne", "Düsseldorf", "Dortmund", "Essen"],
           "Baden-Württemberg": ["Stuttgart"],
           "Lower Saxony": [],
           "Hesse": ["Frankfurt"],
           "Saxony": [],
           "Rhineland-Palatinate": [],
           "Berlin": ["Berlin"],
           "Brandenburg": []
         }
       },
       "Italy": {
         "states": {
           "Lombardy": ["Milan"],
           "Lazio": ["Rome"],
           "Campania": ["Naples"],
           "Sicily": ["Palermo"],
           "Veneto": ["Venice"],
           "Piedmont": ["Turin"],
           "Emilia-Romagna": ["Bologna"],
           "Apulia": [],
           "Tuscany": ["Florence"]
         }
       },
       "Canada": {
         "states": {
           "Ontario": ["Toronto", "Ottawa"],
           "Quebec": ["Montreal"],
           "British Columbia": ["Vancouver", "Victoria"],
           "Alberta": ["Calgary", "Edmonton"],
           "Manitoba": ["Winnipeg"],
           "Saskatchewan": [],
           "Nova Scotia": ["Halifax"],
           "New Brunswick": [],
           "Prince Edward Island": []
         }
       },
       "Greece": {
         "states": {
           "Attica": ["Athens"],
           "Central Macedonia": ["Thessaloniki"],
           "Crete": ["Heraklion", "Chania"],
           "West Greece": ["Patras"],
           "Thessaly": ["Larissa", "Volos"],
           "Peloponnese": ["Patras"],
           "North Aegean": ["Rhodes"],
           "South Aegean": []
         }
       },
       "Japan": {
         "states": {
           "Tokyo": ["Tokyo"],
           "Osaka": ["Osaka"],
           "Kanagawa": ["Yokohama"],
           "Aichi": ["Nagoya"],
           "Hokkaido": ["Sapporo"],
           "Hyogo": ["Kobe"],
           "Fukuoka": ["Fukuoka"],
           "Saitama": [],
           "Chiba": []
         }
       },
       "Spain": {
         "states": {
           "Andalusia": ["Seville", "Málaga"],
           "Catalonia": ["Barcelona"],
           "Community of Madrid": ["Madrid"],
           "Valencian Community": ["Valencia"],
           "Galicia": ["Vigo"],
           "Castile and León": ["Valladolid"],
           "Basque Country": ["Bilbao"],
           "Canary Islands": ["Las Palmas de Gran Canaria"],
           "Balearic Islands": ["Palma"]
         }
       },
       "United Kingdom": {
         "states": {
           "England": ["London", "Birmingham", "Manchester", "Liverpool", "Bristol"],
           "Scotland": ["Glasgow", "Edinburgh"],
           "Wales": ["Cardiff"],
           "Northern Ireland": ["Belfast"]
         }
       },
       "India": {
         "states": {
           "Uttar Pradesh": ["Lucknow"],
           "Maharashtra": ["Mumbai"],
           "Bihar": ["Patna"],
           "West Bengal": ["Kolkata"],
           "Madhya Pradesh": ["Indore", "Bhopal"],
           "Tamil Nadu": ["Chennai"],
           "Rajasthan": ["Jaipur"],
           "Karnataka": ["Bangalore"],
           "Gujarat": ["Ahmedabad", "Surat"]
         }
       },
       "Switzerland": {
         "states": {
           "Zurich": ["Zurich"],
           "Geneva": ["Geneva"],
           "Vaud": ["Lausanne"],
           "Bern": ["Bern"],
           "Aargau": [],
           "Lucerne": ["Lucerne"],
           "Basel-Stadt": ["Basel"],
           "St. Gallen": ["St. Gallen"],
           "Valais": ["Sion"]
         }
       },
       "Austria": {
         "states": {
           "Vienna": ["Vienna"],
           "Styria": ["Graz"],
           "Upper Austria": ["Linz"],
           "Lower Austria": ["Sankt Pölten"],
           "Tyrol": ["Innsbruck"],
           "Carinthia": ["Klagenfurt"],
           "Salzburg": ["Salzburg"],
           "Vorarlberg": ["Bregenz"],
           "Burgenland": []
         }
       },
       "Brazil": {
         "states": {
           "São Paulo": ["São Paulo"],
           "Rio de Janeiro": ["Rio de Janeiro"],
           "Minas Gerais": ["Belo Horizonte"],
           "Bahia": ["Salvador"],
           "Rio Grande do Sul": ["Porto Alegre"],
           "Paraná": ["Curitiba"],
           "Pernambuco": ["Recife"],
           "Ceará": ["Fortaleza"],
           "Amazonas": ["Manaus"]
         }
       },
       "China": {
         "states": {
           "Guangdong": ["Guangzhou", "Shenzhen"],
           "Shandong": ["Jinan", "Qingdao"],
           "Henan": ["Zhengzhou"],
           "Sichuan": ["Chengdu"],
           "Jiangsu": ["Nanjing", "Suzhou"],
           "Hebei": ["Shijiazhuang", "Tangshan"],
           "Zhejiang": ["Hangzhou"],
           "Hunan": ["Changsha"],
           "Anhui": ["Hefei"]
         }
       },
       "Cuba": {
         "states": {
           "Havana": ["Havana"],
           "Santiago de Cuba": ["Santiago de Cuba"],
           "Camagüey": ["Camagüey"],
           "Holguín": ["Holguín"],
           "Guantánamo": ["Guantánamo"],
           "Matanzas": [],
           "Pinar del Río": [],
           "Cienfuegos": [],
           "Las Tunas": ["Las Tunas"]
         }
       }
     },
     showModal:false,
     alert: false,
     msg: 'enter Valid Credentials!',
     isGreen: false,
    precount : 0,
    nextcount : 9,
    currentIndex: 1,
    checkPreDisabled : false,
    checkNextDisabled : false,
    myIndex:0,
    }),
  actions: {
    handleForm(userDetail){
     this.allDetails.push(userDetail);
     this.checkPre();
     this.checkNext()
     localStorage.setItem('detail', JSON.stringify(this.allDetails))
 },
   editDetail(user){
    this.myIndex = this.allDetails.findIndex((elem)=>{return elem.id === user.id})
    this.msg ="Successfully Submited!";
    this.alert = true;
    this.isGreen = true;
        setTimeout(() => {
          this.alert = false;
          this.isGreen = false;
        }, 1500);
    this.allDetails[this.myIndex] = user;
    localStorage.setItem('detail', JSON.stringify(this.allDetails))
   },
   deleteUser(user){
    this.msg = "Deleted Successfully!";
    this.alert = true;
    setTimeout(() => {
      this.alert = false;
      this.isGreen = false;
    }, 1500)
    this.allDetails = this.allDetails.filter((elem)=>{return elem !== user});
    localStorage.setItem('detail', JSON.stringify(this.allDetails))
   },
    checkPre(){
      if(this.precount <= 9){
        this.checkPreDisabled = true;
        }
   else if(this.precount == 0){
      this.checkPreDisabled = true;
    } 
    
     else{
        this.checkPreDisabled = false;
      }
 
 
   },
   checkNext(){
   
     if(this.allDetails.length <=this.nextcount){
         this.checkNextDisabled= true;
         
        if((this.nextcount - this.allDetails.length) === 9){
          this.currentIndex -= 1;
             this.nextcount -= 10;
             this.precount -= 10;
        }
      }
      else if(this.allDetails.length == 10 ){
        this.checkNextDisabled= true;
         this.precount= 0;
        this.nextcount= 9;
        
    }
     else if((this.nextcount + 1) === this.allDetails.length){
      this.checkNextDisabled= true;
     }
      else{
       this.checkNextDisabled= false;
      }
      console.log(this.nextcount - this.allDetails.length, this.currentIndex)
      
   },
   handleButton(type){
   if(type === "pre"){
      this.precount-= 10;
      this.nextcount-= 10;
      this.currentIndex -= 1;
       this.checkPre();
       this.checkNext();
   }
   else if(type === "next"){
      this.precount+= 10;
      this.nextcount+= 10;
      this.currentIndex+= 1;
    this.checkPre()
    this.checkNext();
   }
   else{
    this.checkPre()
    this.checkNext()
   }
  }
}
})
