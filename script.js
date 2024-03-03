let arr;

const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

// Fetch data using .then
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch(error => console.error('Error fetching data:', error));

// // Fetch data using async/await
async function fetchDataAsync() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    arr = data;
    renderTable(data);
    createSearchFunctionality(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
fetchDataAsync();

function renderTable(data) {
  // Create a new div element for the table body
  const tableBody = document.createElement('div');
  // Set the class attribute for the table body
  tableBody.setAttribute('class', 'coin-info-container');

  data.forEach(item => {
    const row = `
      <div class="coin-info">
        <div class="img-con">
          <img src="${item.image}" alt="${item.name}" />
          <span>${item.name}</span>
        </div>
        <div class="details">
          <span class="coin-name">${item.symbol}</span>
          <span class="coin-price">$${item.current_price}</span>
          <span class="volume-24hrs">$${item.total_volume}</span>
          <span class="market-change ${item.price_change_percentage_24h>0?"green":"red"}" > ${item.price_change_percentage_24h.toFixed(2)}%</span>
          <span class="market-cap">Market Cap: $${item.market_cap}</span>
        </div>
      </div>`;
    tableBody.innerHTML += row;
  });
             
  // Append the table body to the container element
  document.querySelector('.container').appendChild(tableBody);
}

// function createSearchFunctionality(data) {
//   const searchInput = document.querySelector('input[type="text"]');
//   searchInput.addEventListener('input', function() {
//     const searchTerm = this.value.toLowerCase();
//     const filteredData = data.filter(item => {
//       return (
//         item.name.toLowerCase().includes(searchTerm) ||
//         item.symbol.toLowerCase().includes(searchTerm)
//       );
//     });
//     renderTable(filteredData);
//   });
// }


let searchData = () => {
    let input = search_input.value;
    let search_output = arr.filter((ele) => {
        return ele.name.toLowerCase().includes(input) || ele.name.toLowerCase().includes(input);;
    });
    renderTable(search_output);
}

let search_input = document.getElementById("search");
search_input.addEventListener("input", searchData);


// Add event listeners for both sorting buttons
document.getElementById('sortbypercentage').addEventListener('click', function() {
    sortTableByPercentage('.market-change');
  });
  
  document.getElementById('sortbymarketcap').addEventListener('click', function() {
    sortTableByMarketCap('.market-cap');
  });
  
  let isSortedByPercentageAsc = true; // Flag to keep track of sorting order for percentage
  let isSortedByMarketCapAsc = true; // Flag to keep track of sorting order for market cap
  
  function sortTableByPercentage(classes) {
    const tableBody = document.querySelector('.coin-info-container');
    const rows = Array.from(tableBody.querySelectorAll('.coin-info'));
  
    rows.sort((a, b) => {
      const aValue = parseFloat(a.querySelector(classes).textContent);
      const bValue = parseFloat(b.querySelector(classes).textContent);
  
      // Toggle sorting order
      const comparison = isSortedByPercentageAsc ? aValue - bValue : bValue - aValue;
  
      return comparison;
    });
  
    tableBody.innerHTML = '';
    rows.forEach(row => {
      tableBody.appendChild(row);
    });
  
    // Toggle the sorting order flag
    isSortedByPercentageAsc = !isSortedByPercentageAsc;
  }
  
  function sortTableByMarketCap(classes) {
    const tableBody = document.querySelector('.coin-info-container');
    const rows = Array.from(tableBody.querySelectorAll('.coin-info'));
  
    rows.sort((a, b) => {
      const aValue = parseFloat(a.querySelector(classes).textContent.split(':')[1].replace(/[^0-9.-]+/g, ""));
      const bValue = parseFloat(b.querySelector(classes).textContent.split(':')[1].replace(/[^0-9.-]+/g, ""));
  
      // Toggle sorting order
      const comparison = isSortedByMarketCapAsc ? aValue - bValue : bValue - aValue;
  
      return comparison;
    });
  
    tableBody.innerHTML = '';
    rows.forEach(row => {
      tableBody.appendChild(row);
    });
  
    // Toggle the sorting order flag
    isSortedByMarketCapAsc = !isSortedByMarketCapAsc;
  }
  