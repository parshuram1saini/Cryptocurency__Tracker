"use strict";
const search = document.getElementById("searchbar");
const cryptoname = document.getElementById("cryptodata");
// console.log(cryptoname);

// this section is for display the whole data in tabular form ........

const change = function (e) {
  var cryptocontent = "";
  e.forEach((element, index) => {
    let updown = element.price_change_percentage_24h > 0 ? "👍" : "👎";
    let img = document.createElement("img");
    img.src = element.image;
    cryptocontent += `<tr id=id${index}>`;
    cryptocontent += `<td class='serial'>${index + 1}</td>`;
    cryptocontent += `<td class='name'><img src=${img.src}/>${element.name}</td>`;
    cryptocontent += `<td>${element.symbol.toUpperCase()}</td>`;
    cryptocontent += `<td>$${element.current_price.toLocaleString(
      "en-US"
    )}</td>`;
    cryptocontent += `<td>$${element.total_volume.toLocaleString(
      "en-US"
    )}</td>`;
    cryptocontent += `<td class='makecolor' style = "color:${
      element.price_change_percentage_24h > 0 ? "green" : "red"
    }";>${updown}${Math.abs(
      element.price_change_percentage_24h.toFixed(2)
    )}%  </td>`;
    cryptocontent += `<td>$${element.market_cap.toLocaleString("en-US")}</td>`;
    ("</tr>");
  });
  cryptoname.innerHTML = cryptocontent;
};

//this section is for fetch api ....................
const cryptocurrency = async function () {
  const data =
    await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=m
arket_cap_desc&per_page=100&page=1&sparkline=false`);
  var res = await data.json();
  change(res);

  // functionality of change order of given cryptocurrency data ........

  const searchorder = document.getElementById("change-order");
  var array = [...res];
  searchorder.addEventListener("click", function () {
    console.log(array);
    change(array.reverse());
  });
};
cryptocurrency();

// functionality on search button for seacrhing the cryptocurrency ...............

const searchdata = () => {
  let filter = search.value;
  let sr = document.querySelectorAll(".serial");
  let tablerow = document.querySelectorAll(".name");
  for (let i = 0; i < tablerow.length; i++) {
    if (tablerow[i].textContent.toLowerCase().includes(filter.toLowerCase())) {
      document.getElementById(`id${i}`).style.display = "";
    } else if (String(sr[i].textContent) == filter) {
      document.getElementById(`id${i}`).style.display = "";
    } else document.getElementById(`id${i}`).style.display = "none";
  }
};
