let reservation = {
    startDate: null,
    endDate: null,
    guestsCount: 0,
    roomType: null,
    name: null,
    phone: null,
    email: null
};

function changeContent(className) {
    document.querySelectorAll('.custom-form').forEach(div => div.classList.add('hidden'));
    const target = document.querySelector(`.${className}`);
    if (target) target.classList.remove('hidden');
}

document.querySelector('#new-reservation').addEventListener('click', cleanData);

function cleanData(e) {
    e.preventDefault();
    changeContent('search-form-content');
    
    // Reset reservation data and inputs
    reservation = {
        startDate: null,
        endDate: null,
        guestsCount: 0,
        roomType: null,
        name: null,
        phone: null,
        email: null
    };

    document.querySelectorAll('input').forEach(input => input.value = '');
    // Add this line to remove selected-room class from all rooms
    document.querySelectorAll('.room-type').forEach(room => room.classList.remove('selected-room'));
}

document.querySelector('#search-form-button').addEventListener('click', searchFormData);

function searchFormData(e) {
    e.preventDefault();
    const data = e.target.closest('form');
    const checkIn = data.querySelector('#check-in').value;
    const checkOut = data.querySelector('#check-out').value;
    const people = data.querySelector('#people').value;

    if (checkIn && checkOut && people && new Date(checkIn) <= new Date(checkOut)) {
        reservation.startDate = checkIn;
        reservation.endDate = checkOut;
        reservation.guestsCount = people;
        console.log(reservation);
        changeContent('search-result-form-content');
    }
}

document.querySelector('#search-back-btn').addEventListener('click', fillSearchForm);

function fillSearchForm(e) {
    e.preventDefault();
    changeContent('search-form-content');
    document.querySelector('#check-in').value = reservation.startDate;
    document.querySelector('#check-out').value = reservation.endDate;
    document.querySelector('#people').value = reservation.guestsCount;
}

document.querySelectorAll('.room-type').forEach(room => {
    room.addEventListener('click', selectRoomType);
});

function selectRoomType(e) {
    e.preventDefault();
    const myTarget = e.target.closest('.room-type');
    if (!myTarget) return;

    document.querySelectorAll('.room-type').forEach(room => room.classList.remove('selected-room'));
    myTarget.classList.add('selected-room');
}

document.querySelector('#search-next-btn').addEventListener('click', findRoom);

function findRoom(e) {
    e.preventDefault();
    const roomInfo = e.target.closest('form').querySelector('.selected-room h4').textContent;
    reservation.roomType = roomInfo;
    console.log(reservation);
    changeContent('guest-details-form-content');
}

document.querySelector('#guest-details-back-btn').addEventListener('click', fillRoomForm);

function fillRoomForm(e) {
    e.preventDefault();
    changeContent('search-result-form-content');
}

document.querySelector('#guest-details-next-btn').addEventListener('click', getPersonalData);

function getPersonalData(e) {
    e.preventDefault();
    const data = e.target.closest('form');
    const name = data.querySelector('#name').value;
    const phone = data.querySelector('#phone-number').value;
    const email = data.querySelector('#email').value;

    if (name && phone && email) {
        reservation.name = name;
        reservation.phone = phone;
        reservation.email = email;
        console.log(reservation);
        changeContent('confirm-reservation-content');
        fillConfirmReservationData(reservation);
    }
}

function fillConfirmReservationData(customReservation) {
    document.querySelector('#guest-name').textContent = `Name: ${customReservation.name}`;
    document.querySelector('#guest-phone').textContent = `Phone Number: ${customReservation.phone}`;
    document.querySelector('#guest-email').textContent = `Email: ${customReservation.email}`;
    document.querySelector('#guest-room-type').textContent = `Room Type: ${customReservation.roomType}`;
    document.querySelector('#guest-data-in').textContent = `Date-in: ${customReservation.startDate}`;
    document.querySelector('#guest-data-out').textContent = `Date-out: ${customReservation.endDate}`;
}

document.querySelector('#confirm-back-btn').addEventListener('click', getBackToPersonalData);

function getBackToPersonalData(e) {
    e.preventDefault();
    changeContent('guest-details-form-content');
}

document.querySelector('#confirm-reservation').addEventListener('click', showThanksPage);

function showThanksPage(e) {
    e.preventDefault();
    changeContent('thank-you-content');
}
