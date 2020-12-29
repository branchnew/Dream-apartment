let aptNumber = document.querySelector('#aptNumber');
let size = document.querySelector('#size');
let rooms = document.querySelector('#rooms');
let address = document.querySelector('#address');
let rent = document.querySelector('#rent');
let city = document.querySelector('#city');
let zipCode = document.querySelector('#zipCode');
let description = document.querySelector('#description');
let kitchenSelect = document.querySelector('#kitchenSelect');
const aptButton = document.querySelector('.apt-save-button');

let apartments = [];
let renters = [];

aptButton.onclick = () => {
    let apartment = {
        apartmentNumber: aptNumber.value,
        size: size.value,
        rooms: rooms.value,
        rent: rent.value,
        street: address.value,
        zipCode: zipCode.value,
        city: city.value,
        description: description.value,
        kitchentype: kitchenSelect.value,
        country: 'Sweden'
    }
    // creates the structure of the input
    const row = document.createElement('tr');
    let lghNumb = document.createElement("td")
    let lghSize = document.createElement("td")
    let lghRoom = document.createElement("td")
    let lghKitch = document.createElement("td")
    let lghRent = document.createElement("td")
    let lghAddress = document.createElement("td")
    let lghDescription = document.createElement("td")
    const list = document.getElementById("aptList")
    const removebutton = document.createElement("button")
    removebutton.innerHTML = "Delete"
    //saves the value in a varible
    let NumbInfo = document.createTextNode(aptNumber.value)
    let SizeInfo = document.createTextNode(size.value)
    let RoomInfo = document.createTextNode(rooms.value)
    let kitchInfo = document.createTextNode(kitchenSelect.value)
    let RentInfo = document.createTextNode(rent.value)
    let AddressInfo = document.createTextNode(address.value)
    let DescriptionInfo = document.createTextNode(description.value)
    //adds value to the td(column)
    lghNumb.appendChild(NumbInfo)
    lghSize.appendChild(SizeInfo)
    lghRoom.appendChild(RoomInfo)
    lghKitch.appendChild(kitchInfo)
    lghRent.appendChild(RentInfo)
    lghAddress.appendChild(AddressInfo)
    lghDescription.appendChild(DescriptionInfo)
    //adds the td(columns) to the row
    row.appendChild(lghNumb)
    row.appendChild(lghSize)
    row.appendChild(lghRoom)
    row.appendChild(lghKitch)
    row.appendChild(lghRent)
    row.appendChild(lghAddress)
    row.appendChild(lghDescription)
    row.appendChild(removebutton)
    //adds the row to the list
    list.appendChild(row)
    apartments.push(apartment);
    //function that removes the row
    removebutton.onclick = () =>{
      row.remove()
      axios.delete('/apartment/{id}',{
  headers:{ 'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },data: {
    source: apartments
      }
    })
    }

    aptNumber.value = '',
    size.value = '',
    rooms.value = '',
    rent.value = '',
    address.value = '',
    zipCode.value = '',
    city.value = '',
    description.value = '',
    kitchenSelect.value = '';

    const params = new URLSearchParams(apartment).toString();
    axios.post('/apartment', params,
        {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }).then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        });

}
async function getApartments() {
    const response = await axios ({
        url: 'http://localhost:8082/apartment',
        method: "GET"
    })

    console.log(response.data)
}
getApartments();

const searchInput = document.querySelector('.search-input');

searchInput.onchange = () => {
    getApartments();
        const result = apartments.filter(apartment => apartment.renter === null);

        console.log(result);
};

function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}

let table = document.querySelector(".apt-table");
generateTable(table, apartments);

let namn = document.querySelector('#renterName');
let socialNumber = document.querySelector('#renterSocialNumber');
let mobileNumber = document.querySelector('#renterMobileNumber');
let email = document.querySelector('#renterEmail');
let renterAddress = document.querySelector('#renterAddress');
let renterZipCode = document.querySelector('#renterZipCode');
let renterCity = document.querySelector('#renterCity');
let invoiceAddress = document.querySelector('#renterInvoiceAddress');
let invoiceZipCode = document.querySelector('#renterInvoiceZipCode');
let invoiceCity = document.querySelector('#renterInvoiceCity');
let invoiceAddressCheckbox = document.querySelector('#invoice-address');
const renterInvoiceForm = document.querySelector('.invoice');
const renterButton = document.querySelector('.renter-save-button');
const invoiceCheckbox = document.querySelector('.invoiceCheckbox');
const renterForm = document.querySelector('.renter-form');

renterButton.onclick = () => {
    let renter = {
        name: namn.value,
        socialSecNumber: socialNumber.value,
        telNumber: mobileNumber.value,
        email: email.value,
        street: renterAddress.value,
        zipCode: renterZipCode.value,
        city: renterCity.value,
        country: 'Sweden',
        invoiceStreet: invoiceAddress.value,
        invoiceZipCode: invoiceZipCode.value,
        invoiceCity: invoiceCity.value,
        invoiceCountry: 'Sweden'
    }
  // creates the structure of the input
  const newRow = document.createElement('tr');
  let rName = document.createElement("td")
  let rSecNumber = document.createElement("td")
  let rMobileNumber = document.createElement("td")
  let rEmail = document.createElement("td")
  let rAddress = document.createElement("td")
  let rInvoiceAddress = document.createElement("td")
  const list = document.getElementById("renterList")
  const removebutton = document.createElement("button")
  removebutton.innerHTML = "Delete"
  //saves the value in a varible
  let nameInfo = document.createTextNode(namn.value)
  let secNumberInfo = document.createTextNode(socialNumber.value)
  let mobileInfo = document.createTextNode(mobileNumber.value)
  let emailInfo = document.createTextNode(email.value)
  let addressInfo = document.createTextNode(renterAddress.value)
  let invoiceAddressInfo = document.createTextNode(invoiceAddress.value)
  //adds value to the td(column)
  rName.appendChild(nameInfo)
  rSecNumber.appendChild(secNumberInfo)
  rMobileNumber.appendChild(mobileInfo)
  rEmail.appendChild(emailInfo)
  rAddress.appendChild(addressInfo)
  rInvoiceAddress.appendChild(invoiceAddressInfo)
  //adds the td(columns) to the row
  newRow.appendChild(rName)
  newRow.appendChild(rSecNumber)
  newRow.appendChild(rMobileNumber)
  newRow.appendChild(rEmail)
  newRow.appendChild(rAddress)
  newRow.appendChild(rInvoiceAddress)
  newRow.appendChild(removebutton)
  //adds the row to the list
  list.appendChild(newRow)
  //function that removes the row
  removebutton.onclick = () =>{
    newRow.remove()
    axios.delete('/apartment/{id}',{
      headers:{ 'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },data: {
        source: apartments
      }
    })
  }
    renters.push(renter);

    namn.value = '',
    socialNumber.value = '',
    mobileNumber.value = '',
    email.value = '',
    renterAddress.value = '',
    renterZipCode.value = '',
    renterCity.value = '',
    invoiceAddress.value = '',
    invoiceZipCode.value = '',
    invoiceCity.value = ''

    axios.post('/renter', renter,
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(response => {
        console.log(response)
    })
        .catch(error => {
            console.log(error.response)
        });
}

const invoiceCheckingBox = () => {
    if(invoiceAddressCheckbox.checked){
        renterInvoiceForm.classList.remove('is-hidden');
        renterForm.style.height = '900px';
    } else {
        renterInvoiceForm.classList.add('is-hidden');
        renterForm.style.height = '810px';
    }
}

invoiceCheckbox.onclick = () => {
    invoiceCheckingBox();
}

invoiceCheckingBox();


