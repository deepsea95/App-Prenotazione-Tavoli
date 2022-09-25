let booking = {};
booking.numeroPersoneW = document.getElementById('numeroPersone-w');
booking.numeroPersone = document.getElementById('numeroPersone');
booking.tavoliW = document.getElementById('tavoli-w');
booking.tavoloSelezionato = document.getElementById('tavoloSelezionato');
booking.messageStatus = document.getElementById('MessageStatus');

// CREAZIONE DINAMICA SALA RISTORANTE 

async function sala() {
    booking.sala = await fetch('sala.json');
    booking.sala = await booking.sala.json();
    booking.tavoli = booking.sala.tavoli;
    disponiTavoli(booking.tavoli);
}
sala();

function disponiTavoli(tavoli){
    tavoli.forEach((tavolo, i) => {
        let classiTavolo = 'tavolo', tavoloDOM = document.createElement('div');
        tavoloDOM.appendChild(document.createTextNode(i+1)); // per assegnare primo tavolo (elemento 0 + 1) il numero 0 + 1.
        classiTavolo += tavolo.occupato ? ' occupato' : ' libero';
        tavoloDOM.setAttribute('class', classiTavolo);
        booking.tavoliW.appendChild(tavoloDOM);
    });
}

// GESTIONE NUMERO PERSONE/PRENOTAZIONE  

booking.numeroPersoneW.addEventListener('click', (e) => {
    e.preventDefault();
    let numeroPersone = +booking.numeroPersone.textContent;
    if(e.target.id === 'add'){
        booking.numeroPersone.textContent = numeroPersone + 1;
    }else if(e.target.id === 'sub' && numeroPersone > 1){
        booking.numeroPersone.textContent = numeroPersone - 1;
    }
});

// SELEZIONE TAVOLO 

booking.tavoliW.addEventListener('click', (e) => {
    let selezionato = +e.target.textContent;
    if (booking.tavoli[selezionato-1].occupato) {
        booking.messageStatus.textContent = `il tavolo ${selezionato} è già occupato`;
    }else{
        booking.tavoloSelezionato.textContent = selezionato;
    }
});

// GESTIONE INVIO PRENOTAZIONE 

document.forms[0].addEventListener('submit', (e) => {
    e.preventDefault();
    if (booking.tavoloSelezionato.textContent == '-') {
        booking.messageStatus.textContent = 'è necessario selezionare un tavolo';
        return;
    }
    sendBooking();
});

function sendBooking() {
    let bookingForm = new FormData();
    bookingForm.append('numero-persone', +booking.numeroPersone.textContent);
    bookingForm.append('tavolo', +booking.tavoloSelezionato.textContent);
    bookingForm.append('nome', document.forms[0].nome.value);
    bookingForm.append('email', document.forms[0].email.value);
    booking.messageStatus.textContent = 'La prenotazione è stata eseguita con successo !';
    document.forms[0].reset(); 
}