
const searchBtn = document.getElementById("search-btn");
const countryInp = document.getElementById("country-inp");
const result = document.getElementById("result");

// Event listener for the search button
searchBtn.addEventListener("click", () => {
  // Get the user-input country name
  let countryName = countryInp.value.trim();

  // Check if the input is empty
  if (countryName.length === 0) {
    result.innerHTML = `<h3>Kolom Input Tidak Boleh Kosong</h3>`;
    return;
  }

  // Construct the API URL for the specific country
  let searchURL = `https://restcountries.com/v3.1/name/${countryName}`;

  // Fetch data from the API
  fetch(searchURL)
    .then((res) => {
      // Check if the response is successful
      if (!res.ok) {
        throw new Error("Negara Tidak dapat ditemukan, mohon isi nama dengan valid");
      }
      return res.json();
    })
    .then((data) => {
      // Display the information for the first result
      displayCountryInfo(data[0]);
    })
    .catch((error) => {
      result.innerHTML = `<h3>${error.message}</h3>`;
    });
});

// Function to display country information
const displayCountryInfo = (country) => {
  result.innerHTML = `
    <div class="country-div">
      <img src="${country.flags.svg}" class="bendera-img">
      <h2>${country.name.common}</h2>
      <div class="kumpulan">
        <div class="data-kumpulan">
          <h4>Ibu Kota:</h4>
          <span>${country.capital[0]}</span>
        </div>
      </div>
      <div class="kumpulan">
        <div class="data-kumpulan">
          <h4>Populasi:</h4>
          <span>${country.population[0]}</span>
        </div>
      </div>
      <div class="kumpulan">
        <div class="data-kumpulan">
          <h4>Wilayah:</h4>
          <span>${country.region}</span>
        </div>
      </div>
    </div>
  `;
};

// Function to load and display a list of countries
const loadCountryAPI = () => {
  fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => displayCountries(data))
    .catch(() => {
      result.innerHTML = `<h3>Failed to fetch country list</h3>`;
    });
};

// Function to display a list of countries
const displayCountries = (countries) => {
  const container = document.getElementById('countries');
  const countriesHTML = countries.map((country) => getCountry(country));
  container.innerHTML = countriesHTML.join(' ');
};

// Function to generate HTML for a single country
const getCountry = (country) => {
  return `
    <div class="country-div">
      <img src="${country.flags.png}">
      <h2>${country.name.common}</h2>
      <hr>
      <h4>Populasi: ${country.population}</h4>
      <h4>Wilayah: ${country.region}</h4>
      <h4>Ibu Kota: ${country.capital}</h4>
    </div>
  `;
};

// Load initial country list
loadCountryAPI();

