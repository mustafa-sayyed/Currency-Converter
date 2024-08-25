const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let selectElements = document.querySelectorAll("select");
let button = document.querySelector("button");
for (const select of selectElements) {
  for (const country in countryList) {
    let option = document.createElement("option");
    option.innerText = country;
    option.value = country;
    // selects[0].appendChild(option);
    // selects[1].appendChild(option.cloneNode(true));
    if (country === "USD" && select.name === "from") {
      option.setAttribute("selected", "true");
      // option.selected = "selected";
    }
    if (country === "INR" && select.name === "to") {
      option.setAttribute("selected", "true");
      // option.selected = "true";
    }
    select.appendChild(option);
  }
  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}

const updateFlag = (element) => {
  // console.log(element);
  // console.log(element.value);
  // console.log(element.previousElementSibling);
  // console.log(countryList[element.value]);
  element.previousElementSibling.src = `https://flagsapi.com/${
    countryList[element.value]
  }/flat/64.png`;
};

button.addEventListener("click", async (event) => {
  event.preventDefault();
  let amtVal = document.querySelector(".amount input").value;
  if (amtVal == "" || amtVal < 1) {
    alert("Please enter a valid amount");
    return;
  }
  let fromCurr = document.getElementById("from").value;
  let toCurr = document.getElementById("to").value;

  const URL = `${BASE_URL}/${fromCurr}.json`;
  let response = await fetch(URL.toLowerCase());
  let data = await response.json();
  let rate = data[fromCurr.toLowerCase()][toCurr.toLowerCase()];
  console.log(rate);
  let exchangeRate = amtVal * rate;
  console.log(
    `Exchange Rate is ${amtVal} ${fromCurr} = ${Math.floor(exchangeRate)} ${toCurr}`
  );

  let exchangeRateElement = document.querySelector("#exchange-rate");
  exchangeRateElement
  .innerText = `Exchange Rate: ${amtVal} ${fromCurr} = ${exchangeRate} ${toCurr}`
});
