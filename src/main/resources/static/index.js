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
const section = document.querySelector('.sec');


let apartments = [];
let renters = [];

const createApartments = () => {
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
    apartments.push(apartment);

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

aptButton.onclick = () => {
    createApartments();
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


aptLink.onclick = () => {
    aptTbl.classList.remove('is-hidden');
    aptTblBody.innerHTML = '';
    generateAptTbl(apartments);
    rntTbl.classList.add('is-hidden');
    rntForm.classList.add('is-hidden');
    aptForm.classList.add('is-hidden');
}

renterLink.onclick = () => {
    rntTbl.classList.remove('is-hidden');
    rntTblBody.innerHTML = '';
    generateRntTbl(renters);
    rntTbl.removeAttribute('tbody');
    aptTbl.classList.add('is-hidden');
    rntForm.classList.add('is-hidden');
    aptForm.classList.add('is-hidden');
}

addAptLink.onclick = () => {
    aptForm.classList.remove('is-hidden');
    rntForm.classList.add('is-hidden');
    rntTbl.classList.add('is-hidden');
    aptTbl.classList.add('is-hidden');
}

addRntLink.onclick = () => {
    rntForm.classList.remove('is-hidden');
    aptForm.classList.add('is-hidden');
    rntTbl.classList.add('is-hidden');
    aptTbl.classList.add('is-hidden');
}


searchInput.onchange = () => {
    filterByAptNumber();
    filterByCity();
    filterBySocialNumber();
    searchInput.value = '';
}

const filterByCity = () => {
    const aprts = apartments.filter((apartment) => {
        if (apartment.renter === null) {
            return apartment.address.city.toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1
        }
    })
    return generateAptTbl(aprts);
}

const filterByAptNumber = () => {
    const aparts = apartments.filter(apartment => apartment.apartmentNumber == searchInput.value);
    return generateAptTbl(aparts);
}

const filterBySocialNumber = () => {
    const apts = renters.filter(renter => renter.socialSecNumber == searchInput.value);
    return generateRntTbl(apts);
}

const generateAptTbl = (apartments) => {
    apartments.forEach(a => {
        const row = document.createElement("tr");
        row.classList.add('apt-row');
        [
            a.apartmentNumber,
            a.size,
            a.rooms,
            a.kitchentype,
            a.rent,
            `${a.address.street} ${a.address.city} ${a.address.zipCode} ${a.address.country}`,
            a.description,
            a.renter?.name || ''
        ].forEach(text => {
            const cell = document.createElement("td");
            const node = document.createTextNode(text);
            cell.appendChild(node);
            row.appendChild(cell);

        })
        const deleteAptButton = document.createElement('button');
        let assignRnt = document.createElement('button');
        const cell = document.createElement("td");
        deleteAptButton.classList.add('delete', 'is-medium', 'is-danger');
        assignRnt.classList.add('button', 'is-success');
        assignRnt.innerHTML = '+Gäst';
        cell.appendChild(deleteAptButton);
        cell.appendChild(assignRnt);
        row.appendChild(cell);
        aptTblBody.appendChild(row);

        if (a.renter != null) {
            assignRnt.classList.remove('is-success');
            assignRnt.classList.add('is-danger');
            assignRnt.innerHTML = '-Gäst';
        }

        assignRnt.onclick = () => {
            if (assignRnt.className.indexOf('is-success') >= 0 ) {
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
                            await assignAptToRnt(a.id, foundRenter.id);
                            insertRntName.classList.add('is-hidden');
                            assignRnt.classList.remove('is-hidden');
                            assignRnt.classList.add('is-danger');
                            assignRnt.innerHTML = '-Gäst';
                        } catch {
                            const message = 'the apartment has already a renter';
                            warningMessage(message);
                        }
                    }
                });
            } else if (assignRnt.className.indexOf('is-danger') >= 0 ) {
                assignRnt.classList.remove('is-danger');
                assignRnt.classList.add('is-success');
                assignRnt.innerHTML = '+Gäst';
                removeAptFromRnt(a.renter.id);
            }
        }

        deleteAptButton.onclick = () => {
            if (a.renter == null) {
                deleteApartment(a.id);
                aptTblBody.removeChild(row);
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

const generateRntTbl = (renters) => {
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
        deleteRntButton.classList.add('delete', 'is-medium', 'is-danger');
        cell.appendChild(deleteRntButton);
        row.appendChild(cell);
        rntTblBody.appendChild(row);

        deleteRntButton.onclick = async () => {
            if (r.apartment == null) {
                await deleteRenter(r.id);
                rntTblBody.removeChild(row);
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

    const params = new URLSearchParams(renter).toString();
    axios.post('/renter', params,
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
    if (invoiceAddressCheckbox.checked) {
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


async function getApartments() {
    const response = await axios({
        url: 'http://localhost:8082/apartment',
        method: "GET"
    })
    const apartments = response.data;
    return apartments;
}

async function getRenters() {
    const response = await axios({
        url: 'http://localhost:8082/renter',
        method: "GET"
    })
    const renters = response.data;
    return renters;
}

getApartments().then(result => apartments = result);
getRenters().then(result => renters = result);


const deleteApartment = async (id) => {
    const BASE_URL = '';
    try {
        const res = await axios.delete(`${BASE_URL}/apartment/${id}`);
        console.log(`Deleted apartment ID: `, id);

        return res.data;
    } catch (e) {
        console.error(e);
    }
};

const deleteRenter = async (id) => {
    const BASE_URL = '';
    try {
        const res = await axios.delete(`${BASE_URL}/renter/${id}`);
        console.log(`Deleted apartment ID: `, id);

        return res.data;
    } catch (e) {
        console.error(e);
    }
};

const assignAptToRnt = async (aptId, renterId) => {
    const params = new URLSearchParams({aptId, renterId}).toString();
    return axios.put('/renter', params, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }

    })
};

const removeAptFromRnt =  (renterId) => {
    const params = new URLSearchParams({renterId}).toString();
    return axios.put('/renter/{renterId}', params, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }

    })
};


