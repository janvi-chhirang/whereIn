const countryName = new URLSearchParams(location.search).get('name')
const flagImage = document.querySelector('.country-details img')
const countryHeading = document.querySelector('.details h1')
const NativeName = document.querySelector('.native-Name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const sub_region = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const top_level_domain = document.querySelector('.top-level-domain')
const money = document.querySelector('.currency')
const language = document.querySelector('.language')
const borderCountries=document.querySelector('.border-countries')
const themeChanger=document.querySelector('.theme-changer')
const loader=document.querySelector('#preloader')

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data[0])
    flagImage.src = data[0].flags.svg
    countryHeading.innerText = data[0].name.common

    if (data[0].name.nativeName) {
      NativeName.innerText = Object.values(data[0].name.nativeName)[0].common
    } else {
      NativeName.innerText = data[0].name.common
    }

    population.innerText = data[0].population
    region.innerText = data[0].region
    top_level_domain.innerText=data[0].tld[0];


    if (data[0].subregion) {
      sub_region.innerText = data[0].subregion
    }
    if (data[0].capital) {
      capital.innerText = data[0].capital?.[0]
    }

    if (data[0].subregion) {
      sub_region.innerText = data[0].subregion
    }
    if (data[0].currencies) {
      money.innerText = Object.values(data[0].currencies)
        .map((country) => country.name)
        .join(', ')
    }

    if (data[0].languages) {
      language.innerText = Object.values(data[0].languages).join(', ')
    }
    if (data[0].borders) {
      
        data[0].borders.forEach((border) => {
          fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([borderCountry]) => {
              // console.log(borderCountry)
              const borderCountryTag = document.createElement('a')
              borderCountryTag.innerText = borderCountry.name.common
              borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
              borderCountries.append(borderCountryTag)
            })
        })
      }
  })

  themeChanger.addEventListener('click',()=>{
    document.body.classList.toggle('dark-mode');
  })

  window.addEventListener('load',()=>{
    loader.style.display="none";
  })
 
