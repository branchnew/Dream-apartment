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
const searchInput = document.querySelector('.search-input');
const aptTbl = document.querySelector(".apt-table");
const aptTblBody = document.querySelector(".apt-body");
const rntTblBody = document.querySelector(".renter-body");
const rntTbl = document.querySelector(".renter-table");
const aptForm = document.querySelector('.apartment-form');
const rntForm = document.querySelector('.renter-form');
const body = document.querySelector('body');


let apartments = [];
let renters = [];

aptButton.onclick = async () => {
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
    const newApt = await createApt(apartment);
    apartments.push(newApt);
    updateAptCounters();

    aptNumber.value = '',
    size.value = '',
    rooms.value = '',
    rent.value = '',
    address.value = '',
    zipCode.value = '',
    city.value = '',
    description.value = '',
    kitchenSelect.value = '';
}

const aptLink = document.querySelector('.aptLink');
const renterLink = document.querySelector('.renterLink');
const addAptLink = document.querySelector('.addAptLink');
const addRntLink = document.querySelector('.addRntLink');
const homeLink =  document.querySelector('.homeLink');

aptLink.onclick = () => {
    aptTbl.classList.remove('is-hidden');
    aptTblBody.innerHTML = '';
    generateAptTbl(apartments);
    rntTbl.classList.add('is-hidden');
    rntForm.classList.add('is-hidden');
    aptForm.classList.add('is-hidden');
    searchInput.classList.add('is-hidden');
    body.style.backgroundImage = 'unset';
}

renterLink.onclick = () => {
    rntTbl.classList.remove('is-hidden');
    rntTblBody.innerHTML = '';
    generateRntTbl(renters);
    aptTbl.classList.add('is-hidden');
    rntForm.classList.add('is-hidden');
    aptForm.classList.add('is-hidden');
    searchInput.classList.add('is-hidden');
    body.style.backgroundImage = 'unset';
}

addAptLink.onclick = () => {
    aptForm.classList.remove('is-hidden');
    rntForm.classList.add('is-hidden');
    rntTbl.classList.add('is-hidden');
    aptTbl.classList.add('is-hidden');
    searchInput.classList.add('is-hidden');
    body.style.backgroundImage = 'unset';
}

addRntLink.onclick = () => {
    rntForm.classList.remove('is-hidden');
    aptForm.classList.add('is-hidden');
    rntTbl.classList.add('is-hidden');
    aptTbl.classList.add('is-hidden');
    searchInput.classList.add('is-hidden');
    body.style.backgroundImage = 'unset';
}

homeLink.onclick = () => {
    body.style.backgroundImage = 'url("images/foto1.jpg")';
    searchInput.classList.remove('is-hidden');
    rntForm.classList.add('is-hidden');
    aptForm.classList.add('is-hidden');
    rntTbl.classList.add('is-hidden');
    aptTbl.classList.add('is-hidden');
}

searchInput.onchange = () => {
    switch(searchInput.value) {
        case apatment.city:
            const aprts = apartments.filter((apartment) => {
                if (apartment.renter === null) {
                    return apartment.address.city.toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1
                }
            });
            generateAptTbl(aprts);
            break;
        case apartment.apartmentNumber:
            const aparts = apartments.filter(apartment => apartment.apartmentNumber == searchInput.value);
            generateAptTbl(aparts);
            break;


        case renter.socialSecNumber:
            const apts = renters.filter(renter => renter.socialSecNumber == searchInput.value);
            generateRntTbl(apts);
            break;
    }
    searchInput.value = '';
}



function updateAptCounters() {
    const freeAptsCount = apartments.reduce((sum, apartment) => {
        if (apartment.renter === null) {
            return sum + 1;
        } else {
            return sum;
        }
    }, 0);
    const freeApt = document.querySelector('.vacant');
    freeApt.innerHTML = freeAptsCount;
    const occuApt = document.querySelector('.occupied');
    occuApt.innerHTML = apartments.length - freeAptsCount;
}

function updateRntCounters() {
    const rents = document.querySelector('.renters');
    rents.innerHTML = renters.length;
}

const generateAptTbl = () => {
    apartments.forEach(a => {
        const row = document.createElement("tr");
        [
            a.apartmentNumber,
            a.size,
            a.rooms,
            a.kitchentype,
            a.rent,
            a.renter?.name || '',
            a.description,
            `${a.address.street} ${a.address.city} ${a.address.zipCode} ${a.address.country}`,
        ].forEach((text, i) => {
            const cell = document.createElement("td");
            cell.setAttribute('id', i++);
            const node = document.createTextNode(text);
            cell.appendChild(node);
            row.appendChild(cell);
        })
        let assignRnt = document.createElement('button');
        const deleteAptButton = document.createElement('button');
        const btnCell = document.createElement("td");
        const cell = document.createElement("td");
        deleteAptButton.classList.add('button', 'is-outlined', 'is-danger');
        deleteAptButton.innerHTML = 'Delete';
        assignRnt.classList.add('button', 'is-success');
        assignRnt.innerHTML = '+Gäst';
        btnCell.appendChild(assignRnt);
        cell.appendChild(deleteAptButton);
        row.appendChild(btnCell);
        row.appendChild(cell);
        aptTblBody.appendChild(row);

        if (a.renter != null) {
            assignRnt.classList.remove('is-success');
            assignRnt.classList.add('is-danger');
            assignRnt.innerHTML = '-Gäst';
        }

        assignRnt.onclick = async () => {
            if (assignRnt.className.indexOf('is-success') >= 0) {
                const insertRntName = document.createElement('input');
                insertRntName.classList.add('input', 'rntInput');
                cell.appendChild(insertRntName);
                assignRnt.classList.add('is-hidden');
                insertRntName.onblur = () => {
                    assignRnt.classList.remove('is-hidden');
                    insertRntName.classList.add('is-hidden');
                }
                insertRntName.addEventListener('keyup', async (e) => {
                    if (e.key === 'Enter') {
                        try {
                            const foundRenter = renters.find(renter => renter.socialSecNumber == insertRntName.value);
                            console.log(foundRenter);
                            await assignAptToRnt(a.id, foundRenter.id);
                            insertRntName.classList.add('is-hidden');
                            assignRnt.classList.remove('is-hidden');
                            assignRnt.classList.remove('is-success');
                            assignRnt.classList.add('is-danger');
                            assignRnt.innerHTML = '-Gäst';
                            a.renter = foundRenter;
                            a.renter.name = foundRenter.name;
                            const td = document.getElementById('5');
                            td.innerHTML = a.renter.name;
                            updateAptCounters();
                        } catch {
                            const message = 'the apartment has already a renter';
                            warningMessage(message);
                        }
                    }


                });
            } else if (assignRnt.className.indexOf('is-danger') >= 0) {
                assignRnt.classList.remove('is-danger');
                assignRnt.classList.add('is-success');
                assignRnt.innerHTML = '+Gäst';
                await removeAptFromRnt(a.renter.id);
                a.renter = null;
                const td = document.getElementById('5');
                td.innerHTML = '';
                updateAptCounters();
            }
        }

        deleteAptButton.onclick = async () => {
            if (a.renter === null) {
                await deleteApartment(a.id);
                apartments = apartments.filter(y => y.id !== a.id);
                aptTblBody.removeChild(row);
                updateAptCounters();
            } else {
                const message = 'Lägenheten är upptagen, det går inte att ta bort!';
                warningMessage(message);
            }
        }
    });
    aptTbl.appendChild(aptTblBody);
}

const warningMessage = (msg) => {
    const message = document.querySelector('.msg');
    const msgwarning = document.querySelector('.msgWaring');
    msgwarning.classList.remove('is-hidden');
    message.style.color = 'red';
    message.innerHTML = msg;
    setTimeout(() => msgwarning.classList.add('is-hidden'), 3000);
}

const generateRntTbl = () => {
    renters.forEach(r => {
        const row = document.createElement("tr");
        [
            r.name,
            r.socialSecNumber,
            r.telNumber,
            r.email,
            `${r.address.street} ${r.address.city} ${r.address.zipCode} ${r.address.country}`,
            (r.address.invoiceStreet && `${r.address.invoiceStreet} ${r.address.invoiceCity} 
            ${r.address.invoiceZipCode} ${r.address.invoiceCountry}`) || ''
        ].forEach(text => {
            const cell = document.createElement("td");
            const node = document.createTextNode(text);
            cell.appendChild(node);
            row.appendChild(cell);
        })
        const deleteRntButton = document.createElement('button');
        const cell = document.createElement("td");
        deleteRntButton.classList.add('button', 'is-outlined', 'is-danger');
        deleteRntButton.innerHTML = 'Delete';
        cell.appendChild(deleteRntButton);
        row.appendChild(cell);
        rntTblBody.appendChild(row);

        deleteRntButton.onclick = async () => {
            if (r.apartment === null) {
                await deleteRenter(r.id);
                renters = renters.filter(x => x.id !== r.id);
                rntTblBody.removeChild(row);
                updateRntCounters();
            } else {
                const message = 'Hyresgästen har en lägenhet, det kan inte tas bort!';
                warningMessage(message);
            }
        }
    });
    rntTbl.appendChild(rntTblBody);
}

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

renterButton.onclick = async () => {
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
    const newRnt = await createRnt(renter);
    renters.push(newRnt);
    updateRntCounters();

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

}

const invoiceCheckingBox = () => {
    if (invoiceAddressCheckbox.checked) {
        renterInvoiceForm.classList.remove('is-hidden');
    } else {
        renterInvoiceForm.classList.add('is-hidden');
    }
}

invoiceCheckbox.onclick = () => {
    invoiceCheckingBox();
}

invoiceCheckingBox();

getApartments().then(result => {
    apartments = result;
    updateAptCounters();
});

getRenters().then(result => {
    renters = result;
    updateRntCounters();
});

const createRnt = async (renter)=> {
    const params = new URLSearchParams(renter).toString();
    const res = await axios.post('/renter', params,
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        });
    return res.data;
}

const createApt = async (apartment) => {
    const params = new URLSearchParams(apartment).toString();
    const res = await axios.post('/apartment', params,
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
    return res.data;
}

async function getApartments() {
    const response = await axios({
        url: 'http://localhost:8082/apartment',
        method: "GET"
    })
    return response.data;
}

async function getRenters() {
    const response = await axios({
        url: 'http://localhost:8082/renter',
        method: "GET"
    })
    return response.data;
}

const deleteApartment = async (id) => {
    const BASE_URL = '';
    const res = await axios.delete(`${BASE_URL}/apartment/${id}`);
    return res.data;
};

const deleteRenter = async (id) => {
    const BASE_URL = '';
    const res = await axios.delete(`${BASE_URL}/renter/${id}`);
    return res.data;
};

const assignAptToRnt = async (aptId, renterId) => {
    const params = new URLSearchParams({aptId, renterId}).toString();
    const res = axios.put('/renter', params, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
    return res.data;

};

const removeAptFromRnt = (renterId) => {
    const params = new URLSearchParams({renterId}).toString();
    const res = axios.put('/renter/{renterId}', params, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
    return res.data;
};




