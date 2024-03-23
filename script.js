const baseURL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2401-ftb-et-web-pt'


// get recipes
async function getReservations() {
    const response = await fetch(`${baseURL}/events`);
    const json = await response.json();

    if(!json.success) {
        throw new Error(json.error);
    }

  

    return json.data;
}



async function createReservation(reservation) {
    const response = await fetch(`${baseURL}/events`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reservation),
    });
    const json = await response.json();

    if(!json.success) {
        throw new Error(json.error.message);
    }

    return json.data;
}





async function deleteReservation(id) {
    const response = await fetch(`${baseURL}/events${id}`, {
        method: 'delete'
    });

    if(response.status === 204) {
        return true;
    }

    throw new Error(`unable to remove receipe with id ${id}`);
}


function addReservationsRender(r) {
    const reservationsElement = document.getElementById('reservations');
    const elem = document.createElement('div');
        elem.classList.add('resevation')

        const nameElem = document.createElement('div');
        nameElem.classList.add('name')
        nameElem.append(r.name)
        const descriptionElem = document.createElement('div');
        descriptionElem.classList.add('description')
        descriptionElem.append(r.description)
        const locationElem = document.createElement('div');
        nameElem.classList.add('location')
        nameElem.append(r.location)
        const dateElem = document.createElement('div');
        nameElem.classList.add('date')
        nameElem.append(r.date)

        elem.append(nameElem);
        elem.append(descriptionElem);
        elem.append(locationElem);
        elem.append(dateElem);

        reservationsElement.append(elem);
}
const deletebutton = document.querySelector('#deletebtn'); 
//deletebutton.addEventListener('click', deleteReservation())

document.addEventListener('DOMContentLoaded', async () => {
    const reservations = await getReservations();

    reservations.forEach(r => {
        addReservationsRender(r);
    });

    const form = document.getElementById('reservationForm');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name');
        const description = document.getElementById('description');
        const location = document.getElementById('location');
        const date = document.getElementById('date');

        const reservation = {
            name: name.value,
            description: description.value,
            location: location.value,
            date: date.value

        };

        try {
            const newReservation = await createReservation(reservation);
            // add the new recipe to the screen
            addReservationsRender(newReservation);
        } catch(err){ 
            console.error(err);
        }
    })
})