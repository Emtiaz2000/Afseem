
window.addEventListener('DOMContentLoaded',()=>{
  const QatarCities = [
  "Abu Dhalouf",
  "Abu Hamour",
  "Abu Samra",
  "Ain Khaled",
  "Ain Sinan",
  "Al Aziziya",
  "Baaya",
  "Bani Hajer",
  "Barahat Al Jufairi",
  "Bu Fasseela",
  "Bu Samra",
  "Bu Sidra",
  "Al Bidda",
  "Dahl Al Hamam",
  "Doha International Airport",
  "Doha Port",
  "Duhail",
  "Dukhan",
  "Al Daayen",
  "Al Dafna",
  "Ad Dawhah al Jadidah",
  "Al Ebb",
  "Al Egla",
  "Fuwayrit",
  "Fereej Abdel Aziz",
  "Fereej Bin Durham",
  "Fereej Bin Mahmoud",
  "Fereej Bin Omran",
  "Fereej Kulaib",
  "Fereej Mohammed Bin Jassim",
  "Fereej Al Amir",
  "Fereej Al Asiri",
  "Fereej Al Asmakh",
  "Fereej Al Murra",
  "Fereej Al Manaseer",
  "Fereej Al Nasr",
  "Fereej Al Soudan",
  "Fereej Al Zaeem",
  "Gharrafat Al Rayyan",
  "Al Gharrafa",
  "Al Ghuwariyah",
  "Hamad Medical City",
  "Hazm Al Markhiya",
  "Al Hilal",
  "Industrial Area",
  "Izghawa (Al Rayyan)",
  "Izghawa (Umm Salal)",
  "Jabal Thuaileb",
  "Jelaiah",
  "Jeryan Jenaihat",
  "Jeryan Nejaima",
  "Al Jasrah",
  "Al Jeryan",
  "Khor Al Adaid",
  "Al Karaana",
  "Al Kharrara",
  "Al Kharaitiyat",
  "Al Kharayej",
  "Al Kheesa",
  "Al Khor",
  "Al Khulaifat",
  "Leabaib",
  "Lebday",
  "Lejbailat",
  "Lekhwair",
  "Leqtaifiya (West Bay Lagoon)",
  "Lijmiliya",
  "Luaib",
  "Lusail",
  "Al Luqta",
  "Madinat ash Shamal",
  "Madinat Al Kaaban",
  "Madinat Khalifa North",
  "Madinat Khalifa South",
  "Mebaireek",
  "Mehairja",
  "Mesaieed",
  "Mesaieed Industrial Area",
  "Mesaimeer",
  "Al Messila",
  "Muaither",
  "Muraikh",
  "Mushayrib",
  "Al Mamoura",
  "Al Mansoura",
  "Al Markhiyah",
  "Al Mashaf",
  "Al Masrouhiya",
  "Al Mearad",
  "Al Mirqab",
  "Najma",
  "New Al Hitmi",
  "New Al Mirqab",
  "New Al Rayyan",
  "New Salata",
  "New Fereej Al Ghanim",
  "New Fereej Al Khulaifat",
  "Nu`ayjah",
  "Al Najada",
  "Al Nasraniya",
  "Old Airport",
  "Old Al Ghanim",
  "Old Al Hitmi",
  "Old Al Rayyan",
  "Onaiza",
  "The Pearl",
  "Al Qassar",
  "Ras Abu Aboud",
  "Ras Lafan",
  "Rawdat Al Hamama",
  "Rawdat Al Khail",
  "Rawdat Egdaim",
  "Rawdat Rashed",
  "Rumeilah",
  "Ar Ru'ays",
  "Al Rufaa",
  "Sawda Natheel",
  "Shagra",
  "Simaisma",
  "Al Sadd",
  "As Salatah",
  "Al Sailiya",
  "Al Sakhama",
  "Al Shagub",
  "Al-Shahaniya",
  "Al Souq",
  "Al Seej",
  "Al Tarfa",
  "Al Thakhira",
  "Al Themaid",
  "Al Thumama (Doha)",
  "Al Thumama (Al Wakrah)",
  "Umm Bab",
  "Umm Birka",
  "Umm Ghuwailina",
  "Umm Lekhba",
  "Umm Qarn",
  "Umm Salal Ali",
  "Umm Salal Mohammed",
  "Al Utouriya",
  "Wadi Al Banat",
  "Wadi Al Sail",
  "Wadi Al Wasaah",
  "Wadi Lusail",
  "Al Waab",
  "Al Wajba",
  "Al Wakrah",
  "Al Wukair",
  "Al Zubarah"
];
const kuwaitPlaces = [
  "Abdulla Al-Salem",
  "Adailiya",
  "Al-Sour Gardens",
  "Bnaid Al-Qar",
  "Daiya",
  "Dasma",
  "Doha",
  "Doha Port",
  "Faiha",
  "Failaka Island",
  "Granada",
  "Jibla",
  "Kaifan",
  "Khaldiya",
  "Mansouriya",
  "Mirqab",
  "Nahdha",
  "North West Sulaibikhat",
  "Nuzha",
  "Qadsiya",
  "Qortuba",
  "Rawda",
  "Shamiya",
  "Sharq",
  "Shuwaikh",
  "Shuwaikh Industrial Area",
  "Shuwaikh Port",
  "Sulaibikhat",
  "Qairawan",
  "Surra",
  "Ouha Island",
  "Mischan Island",
  "Umm an Namil Island",
  "Yarmouk",
  "Bayan",
  "Jabriya",
  "Rumaithiya",
  "Salam",
  "Salwa",
  "Al- Bida'a",
  "Anjafa",
  "Hawalli",
  "Hitteen",
  "Mishrif",
  "Mubarak Al-Abdullah",
  "Salmiya",
  "Shaab",
  "Shuhada",
  "Al-Siddiq",
  "Ministries Area",
  "Zahra",
  "Abu Al Hasaniya",
  "Abu Ftaira",
  "Al-Adan",
  "Al Qurain",
  "Al-Qusour",
  "Al-Fnaitees",
  "Messila",
  "Al-Masayel",
  "Mubarak Al-Kabeer",
  "Sabah Al-Salem",
  "Subhan Industrial",
  "Wista",
  "West Abu Ftaira Herafiya",
  "Abu Halifa",
  "Mina Abdulla",
  "Ahmadi",
  "Ali Sabah Al-Salem",
  "Egaila",
  "Bar Al-Ahmadi",
  "Bnaider",
  "Dhaher",
  "Fahaheel",
  "Fahad Al-Ahmad",
  "Hadiya",
  "Jaber Al-Ali",
  "Al-Julaia'a",
  "Khairan",
  "Mahboula",
  "Mangaf",
  "Magwa",
  "Wafra Residential",
  "Al-Nuwaiseeb",
  "Riqqa",
  "Sabah Al Ahmad",
  "Sabah Al Ahmad Sea City",
  "Sabahiya",
  "Shuaiba Industrial",
  "South Sabahiya",
  "Wafra",
  "Zoor",
  "Fintas",
  "Al Shadadiya Industrial",
  "Abdullah Al-Mubarak",
  "Airport District",
  "Andalus",
  "Ardiya",
  "Ardiya Herafiya",
  "Ishbiliya",
  "Al-Dajeej",
  "Farwaniya",
  "Ferdous",
  "Jleeb Al-Shuyoukh",
  "Khaitan",
  "Omariya",
  "Rabiya",
  "Al-Rai",
  "Al-Riggai",
  "Rehab",
  "Sabah Al-Nasser",
  "Sabah Al-Salem University",
  "West Abdullah Al-Mubarak",
  "South Abdullah Al-Mubarak",
  "Sulaibiya Industrial",
  "Abdali",
  "Al-Mutlaa",
  "Kazma",
  "Bahra",
  "Kabd",
  "Al-Sheqaya",
  "Al-Nahda",
  "Amghara Industrial",
  "Bar Al-Jahra",
  "Jahra",
  "Jahra Industrial Herafiya",
  "Naeem",
  "Nasseem",
  "Oyoun",
  "Qasr",
  "Jaber Al-Ahmad",
  "Saad Al Abdullah",
  "Salmi",
  "Subiya",
  "Sulaibiya",
  "Sulaibiya Agricultural Area",
  "Sulaibiya Residential",
  "Taima",
  "Waha",
  "Bubiyan Island",
  "Warbah Island"
];

const bahrainPlaces = [
  "Manama",
  "Muharraq",
  "Hamad Town",
  "Riffa",
  "A'ali",
  "Sitra",
  "Jidhafs",
  "Isa Town",
  "Budaiya",
  "Diraz",
  "Jid Ali",
  "Sanabis",
  "Tubli",
  "Durrat Al Bahrain",
  "Gudaibiya",
  "Salmabad",
  "Jurdab",
  "Diyar Al Muharraq",
  "Amwaj Islands",
  "Al Hidd",
  "Arad",
  "Busaiteen",
  "Samaheej",
  "Al Dair",
  "Zinj",
  "A'ali",
  "Abu Saiba",
  "Al Hajar",
  "Al Lawzi",
  "Al Markh",
  "Al Qadam",
  "Al Qala",
  "Al Safiria",
  "Barbar",
  "Boori",
  "Budaiya",
  "Buquwa",
  "Dar Kulaib",
  "Diraz",
  "Dumistan",
  "Hamad Town",
  "Hamala",
  "Hillat Abdul Saleh",
  "Jablat Habshi",
  "Janabiya",
  "Jannusan",
  "Jasra",
  "Jid Al-Haj",
  "Jidda Island",
  "Karrana",
  "Karzakan",
  "Malikiya",
  "Sanabis",
  "Muqaba",
  "North Sehla",
  "Northern City",
  "Nurana Islands",
  "Qurayya",
  "Saar",
  "Sadad",
  "Salmabad",
  "Shahrakan",
  "Shakhura",
  "Umm an Nasan",
  "Umm as Sabaan",
  "Zayed City"
];
const omanPlaces = [
  "Nizwa",
  "Bahla",
  "Samail",
  "Izki",
  "Bidbid",
  "Adam",
  "Al Hamra",
  "Manah",
  "Jebel Akhdar",
  "Basic Statute",
  "Monarchy",
  "Cabinet",
  "Council",
  "Ibri",
  "Yanqul",
  "Dhank",
  "Sohar",
  "Suwayq",
  "Saham",
  "Al Khaburah",
  "Shinas",
  "Liwa",
  "Barka",
  "Rustaq",
  "Al Musanaah",
  "Nakhal",
  "Wadi Al Maawil",
  "Al Awabi",
  "Al Buraimi",
  "Mahdah",
  "As Sunaynah",
  "Duqm",
  "Mahout",
  "Haima",
  "Al Jazer",
  "Al-Mudhaibi",
  "Ibra",
  "Bidiya",
  "Sinaw",
  "Dema Wa Thaieen",
  "Al-Qabil",
  "Wadi Bani Khaled",
  "Sur",
  "Jalan Bani Bu Ali",
  "Jalan Bani Bu Hassan",
  "Al Kamil Wal Wafi",
  "Masirah",
  "Salalah",
  "Taqah",
  "Mirbat",
  "Thumrait",
  "Sadah",
  "Rakhyut",
  "Dhalkut",
  "Muqshin",
  "Shalim and the Hallaniyat Islands",
  "Al-Mazyona",
  "Muscat",
  "Muttrah",
  "Bawshar",
  "Seeb",
  "Al Amarat",
  "Qurayyat",
  "Khasab",
  "Dibba",
  "Bukha",
  "Madha"
];
const uaePlaces = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Al Ain",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Umm Al Quwain",
  "Kalba",
  "Dibba Al-Fujairah",
  "Madinat Zayed",
  "Khor Fakkan",
  "Al Dhannah",
  "Ghayathi",
  "Dhaid",
  "Jebel Ali",
  "Liwa Oasis",
  "Hatta",
  "Ar-Rams",
  "Dibba Al-Hisn",
  "Al Jazirah Al Hamra",
  "Abu al Abyad",
  "Adhen",
  "Al Ajban",
  "Al Aryam",
  "Al Awir",
  "Al Badiyah",
  "Al Bataeh",
  "Al Bithnah",
  "Al Faqa",
  "Al Halah",
  "Al Hamraniyah",
  "Al Hamriyah",
  "Al Jeer",
  "Al Khawaneej",
  "Al Lisaili",
  "Al Madam",
  "Al Manama",
  "Al Mirfa",
  "Al Qusaidat",
  "Al Qor",
  "Al Salamah",
  "Al Shuwaib",
  "Al Rafaah",
  "Al Rashidya",
  "Al Ruwayyah",
  "Al Yahar",
  "Asimah",
  "Dalma",
  "Dadna",
  "Digdaga",
  "Falaj Al Mualla",
  "Ghalilah",
  "Ghayl",
  "Ghub",
  "Habshan",
  "Huwaylat",
  "Khatt",
  "Khor Khwair",
  "Lahbab",
  "Manama",
  "Marawah",
  "Masafi",
  "Masfut",
  "Mirbah",
  "Mleiha",
  "Nahil",
  "Qidfa",
  "Sha'am",
  "Sila",
  "Sweihan",
  "Wadi Shah",
  "Zubarah"
];
const saudiPlaces = [
  "Riyadh",
  "Jeddah",
  "Dammam",
  "Mecca",
  "Medina",
  "Abha",
  "Ad-Dilam",
  "Al-Abwa",
  "Al Artaweeiyah",
  "Al Bukayriyah",
  "Badr",
  "Baljurashi",
  "Bisha",
  "Bareq",
  "Buraydah",
  "Al Bahah",
  "Arar",
  "Dammam",
  "Dhahran",
  "Dhurma",
  "Dahaban",
  "Diriyah",
  "Duba",
  "Dumat Al-Jandal",
  "Dawadmi",
  "Farasan",
  "Gatgat",
  "Gerrha",
  "Ghawiyah",
  "Al-Gwei'iyyah",
  "Hautat Sudair",
  "Habaala",
  "Hajrah",
  "Haql",
  "Al-Hareeq",
  "Harmah",
  "Ha'il",
  "Hotat Bani Tamim",
  "Hofuf-Al-Mubarraz",
  "Huraymila",
  "Hafr Al-Batin",
  "Jabal Umm al Ru'us",
  "Jalajil",
  "Jeddah",
  "Jizan",
  "Jazan Economic City",
  "Jubail",
  "Al Jafr",
  "Irqah",
  "Khafji",
  "Khaybar",
  "King Abdullah Economic City",
  "Khamis Mushait",
  "King Khalid Military City",
  "Al-Saih",
  "Knowledge Economic City, Medina",
  "Khobar",
  "Al-Khutt",
  "Layla",
  "Lihyan",
  "Al Lith",
  "Al Majma'ah",
  "Mastoorah",
  "Al Mikhwah",
  "Al Mawain",
  "Medina",
  "Mecca",
  "Muzahmiyya",
  "Najran",
  "Al-Namas",
  "Neom",
  "Umluj",
  "Al-Omran",
  "Al-Oyoon",
  "Qadeimah",
  "Qatif",
  "Qaisumah",
  "Al Qadeeh",
  "Al Qunfudhah",
  "Qurayyat",
  "Rabigh",
  "Rafha",
  "Ar Rass",
  "Ras Tanura",
  "Rumah",
  "Raghbah",
  "Ranyah",
  "Riyadh",
  "Riyadh Al-Khabra",
  "Rumailah",
  "Sabt Al Alaya",
  "Sabya",
  "Sarat Abidah",
  "Saihat",
  "Safwa city",
  "Sakakah",
  "Sharurah",
  "Shaqra",
  "Shaybah",
  "As Sulayyil",
  "Taif",
  "Tabuk",
  "Tanomah",
  "Tarout",
  "Tayma",
  "Thadiq",
  "Thuwal",
  "Thuqbah",
  "Turaif",
  "Tabarjal",
  "Udhailiyah",
  "Al-'Ula",
  "Um Al-Sahek",
  "Unaizah",
  "Uqair",
  "Uyayna",
  "Uyun AlJiwa",
  "Wadi Al-Dawasir",
  "Al Wajh",
  "Yanbu",
  "Az Zaimah",
  "Zulfi (Al-Zulfi City)"
];




  let cities ;
  const countryisocode = document.querySelector("#countryisocode")
  const passwordField = document.querySelector('#storepassword');
  const submitBtn = document.querySelector('.submitBTN')
// Prevent Enter key from submitting form
  document.getElementById("storeForm").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });

  document.getElementById("storeForm").addEventListener("submit", function (e) {
    if (!this.reportValidity()) {
      // form is invalid → message shows
      // but you must prevent submit, otherwise it continues
      e.preventDefault();
    }
  });
  //selecting country 
  let country = document.querySelector('#country')
  const storecity= document.querySelector('#storecity')
  const dropdown = document.getElementById("dropdown");
  const maplocationselection = document.querySelector('#storelocationmap')

  country.addEventListener('change',()=>{
    storecity.value=''
  })

  storecity.addEventListener('focus',()=>{
    if(country.value=='Qatar'){
      countryisocode.value='QA'
      cities=[...QatarCities]
    }else if(country.value=='Kuwait'){
      countryisocode.value='KW'
      cities=[...kuwaitPlaces]
    }else if(country.value=='Bahrain'){
      countryisocode.value='BH'
      cities=[...bahrainPlaces]
    }else if(country.value=='Oman'){
      countryisocode.value='OM'
      cities=[...omanPlaces]
    }else if(country.value=='Saudi Arabia'){
      countryisocode.value='SA'
      cities=[...saudiPlaces] 
    }else{
      cities=[...uaePlaces]
      countryisocode.value='AE'
    }
    showDropdown(cities)
  
  })
  storecity.addEventListener('keyup',()=>{
    if(country.value=='Qatar'){
      countryisocode.value='QA'
      cities=[...QatarCities]
    }else if(country.value=='Kuwait'){
      countryisocode.value='KW'
      cities=[...kuwaitPlaces]
    }else if(country.value=='Bahrain'){
      countryisocode.value='BH'
      cities=[...bahrainPlaces]
    }else if(country.value=='Oman'){
      countryisocode.value='OM'
      cities=[...omanPlaces]
    }else if(country.value=='Saudi Arabia'){
      countryisocode.value='SA'
      cities=[...saudiPlaces] 
    }else{
      cities=[...uaePlaces]
      countryisocode.value='AE'
    }
    const value = storecity.value.toLowerCase();
        dropdown.innerHTML = "";
        if (value) {
            const filtered = cities.filter(option => option.toLowerCase().includes(value));
            if (filtered.length) {
                dropdown.style.display = "block";
                filtered.forEach(option => {
                    const div = document.createElement("div");
                    div.textContent = option;
                    div.addEventListener("click", function () {
                        storecity.value = option;
                        dropdown.style.display = "none";
                    });
                    dropdown.appendChild(div);
                });
            } else {
                dropdown.innerHTML = "No Category Found with this name";
            }
        } else{
            showDropdown(cities)
        }
    
  })

  // Hide dropdown when clicking outside
    document.addEventListener("click", function (e) {
        if (!e.target.closest(".dropdown-subcategory")) {
            dropdown.style.display = "none";
        }
    });

   //showing dropdown
    function showDropdown(cityarr){
        dropdown.innerHTML = "";
        dropdown.style.display = "block";
        cityarr.forEach(option => {
            const div = document.createElement("div");
            div.textContent = option;
            div.addEventListener("click", function () {
                storecity.value = option;
                dropdown.style.display = "none";
            });
            dropdown.appendChild(div);
        });
    }

  const passwordEye = document.querySelector('.eyespass');
  
  let passCondition = document.querySelector('.passCondition')
  let showPass= false
  if(passwordEye){
     passwordEye.addEventListener("click", function () {
      if(!showPass){
        passwordField.type='text';
        showPass=true;
      }else{
        passwordField.type='password';
        showPass=false;
      }
  });
  }
 if(passwordField){
  passwordField.addEventListener('keyup',()=>{
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if(passwordRegex.test(passwordField.value)){
      passCondition.style.display="none";
      submitBtn.disabled=false
    }else{
      passCondition.style.display="block"
      submitBtn.disabled=true
    }
  })
 }

 let inputs = document.querySelectorAll('input[type="number"]')
        inputs.forEach((input)=>{
        input.addEventListener('input',(e)=>{
            let value = parseInt(e.target.value)
            if(value<0){
                alert('Please Enter Valid Number!')
                e.target.value=''
            }
        })
    })

//================google map config================
      let map;
      let marker;
      let selectedLatLng;
      let geocoder;
      
      function initMap() {
        geocoder = new google.maps.Geocoder();

        // Initialize map with temporary center
        map = new google.maps.Map(document.getElementById("map"), {
          zoom: 16,
          center: { lat: 0, lng: 0 },
        });

        // Try to get user's current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              map.setCenter(userLocation);
              placeMarker(userLocation);
            },
            () => {
              alert("Geolocation failed or permission denied.");
            }
          );
        } else {
          alert("Your browser does not support geolocation.");
        }

        // Map click to move marker
        map.addListener("click", (event) => {
          placeMarker(event.latLng);
        });

        // Search box
        const input = document.getElementById("searchBox");
        const searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        searchBox.addListener("places_changed", () => {
          const places = searchBox.getPlaces();
          if (places.length === 0) return;

          const place = places[0];
          if (!place.geometry || !place.geometry.location) return;

          map.setCenter(place.geometry.location);
          placeMarker(place.geometry.location);
        });

        document.querySelector('.picklocation').addEventListener('click',()=>{
        //console.log('ko')
        document.querySelector('.mapcontainer').style.display='block'
      })
      //display none
      }
      //calling map
      initMap()

      //place marker
      function placeMarker(location) {
        selectedLatLng = location;

        if (!marker) {
          marker = new google.maps.Marker({
            position: location,
            map: map,
          });
        } else {
          marker.setPosition(location);
        }
      }

      //confirm location btn 
      const confirmlocation = document.querySelector('.confiremmaplocation')
      confirmlocation.addEventListener('click',confirmSelection)
      
      //confirming location function
      function confirmSelection() {
        if (!selectedLatLng) {
          alert("Please select a location first!");
          return;
        }

        geocoder.geocode({ location: selectedLatLng }, (results, status) => {
          console.log(selectedLatLng.lat())
          console.log(selectedLatLng.lng())
          if (status === "OK" && results[0]) {
            maplocationselection.value =results[0].formatted_address;
            document.querySelector('.showlocationdisplay').textContent=results[0].formatted_address;
            document.querySelector('#storelocationmaplat').value=selectedLatLng.lat()
            document.querySelector('#storelocationmaplng').value=selectedLatLng.lng()
          } else {
            alert("(No address found)");
            maplocationselection.value='';
            document.querySelector('#storelocationmaplat').value=''
            document.querySelector('#storelocationmaplng').value=''
            document.querySelector('.showlocationdisplay').textContent=''
          }
          
        });

        //display none map 
        document.querySelector('.mapcontainer').style.display='none'
      }


})

  