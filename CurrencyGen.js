const BASE_URL =  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns){
    for (let currcode in countryList){
         let newOption = document.createElement("option");
         newOption.innerText = currcode;
         newOption.value = currcode;
         if (select.name === "from" && currcode=== "USD"){
            newOption.selected = "selected";
         }
         else if (select.name === "to" && currcode=== "INR"){
            newOption.selected = "selected";
         }
         select.append(newOption);

    }
    select.addEventListener("change", (evt) =>{
   updateFlag(evt.target);
})
}

const updateFlag = (element) => {
   console.log(element);
   let currcode = element.value;
   let countrycode = countryList[currcode];
   let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src= newSrc;
}



btn.addEventListener("click", async (evt) =>{
   evt.preventDefault();
   let amount = document.querySelector(".amount input");
   let amtVal = amount.value;
   console.log(amtVal);
   if(amtVal === "" || amtVal <1){
      amtVal =1;
      amount.value = "1";
   }
console.log(fromcurr.value, tocurr.value);
const from = fromcurr.value.toLowerCase();
const to = tocurr.value.toLowerCase();

const URL = `${BASE_URL}/${from}.json`;
let response = await fetch(URL);
let data = await response.json();

let rate = data[from][to];
console.log(rate);

let finalAmount = amtVal * rate;
msg.innerText = `${amtVal} ${from} = ${finalAmount} ${to}`
});