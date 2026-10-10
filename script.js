const URL = `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`;

let input = document.querySelector("input");
let forSelection = document.querySelector("#from");
let toSelection = document.querySelector("#to");
let fromImage = document.querySelector("#fromCntry")
let toImage = document.querySelector("#toCntry");
for (let country in countryList) {
    let option1 = document.createElement("option");
    let option2 = document.createElement("option");
    option1.innerText = countryList[country];
    option1.setAttribute("From-countryCode" ,country);

    option2.innerText = countryList[country];
    option2.setAttribute("To-countryCode" ,country);

    if (country === "US"){
        option1.setAttribute("selected" ,"");
    };

    if( country === "IN"){
        option2.setAttribute("selected" ,"");
    };

    forSelection.append(option1);
    toSelection.append(option2);
}


let optionsFor = document.querySelectorAll("[From-countryCode]");
let optionsTo = document.querySelectorAll("[To-countryCode]");

let EnteredAmount = input.value;
let selectedCountry = "";
let forCountry = "";

forSelection.addEventListener("change" ,() =>{
    for ( let key of optionsFor ){
        if( key.innerText === forSelection.value ){
             selectedCountry = key.getAttribute("From-countryCode");
            fromImage.src = `https://flagsapi.com/${selectedCountry}/flat/64.png`;
            break;
        }
    }
});
toSelection.addEventListener("change" ,() =>{
    for ( let key of optionsTo ){
        if( key.innerText === toSelection.value ){
            forCountry = key.getAttribute("To-countryCode");
            toImage.src = `https://flagsapi.com/${forCountry}/flat/64.png`;
            break;
        }
    }
});

let btn = document.querySelector("#result");
let result = document.querySelector(".message");
let perExchange ="";

async function convertCurrency() {
    console.log("Converting the currency");
    let response = await fetch(`https://api.frankfurter.dev/v1/latest?base=${forSelection.value}&symbols=${toSelection.value}`);
    console.log(response);
    let data =  await response.json();
    perExchange = data.rates[toSelection.value];
};


btn.addEventListener("click" , async() =>{
    await convertCurrency();
    result.innerText = `${input.value} ${forSelection.value} = ${input.value * perExchange } ${toSelection.value}`;
})

