const handleFillCountry = _.debounce((ev) => {
    // only show matched events

    const node = ev.target.parentNode.getElementsByClassName('search-box')[0]
    node.style.display = 'initial'
    node.innerHTML = ''

    let inputText = ev.target.value.toLowerCase()
    console.log(`search for ${inputText}`);

    for (let country of countryList) {
        let row = document.createElement('div')
        row.innerText = country
        row.onclick = selectCountry

        node.appendChild(row)
    }
  }, 300);



//
function validateName(event) {
    const name = event.target.value
    console.log('validate name: ' + name);

    return false
}

// Corregido:- **(2 pto)** El método `validateName` debería validar que: - El campo no está vacío - Que tiene una longitud de > 8
function validateName(event) {
    const name = event.target.value.trim();
    const isValid = name.length > 8; 

    if (isValid) {
        showElementWithClassName(event.target, 'valid-feedback');
        hideElementWithClassName(event.target, 'invalid-feedback');
    } else {
        showElementWithClassName(event.target, 'invalid-feedback');
        hideElementWithClassName(event.target, 'valid-feedback');
    }
    return isValid;
}

function validatePassword(event) {
    // password should be at least 8 of length
    // should contains at least one lower letter
    // should contains at least one capital letter
    // should contains at least one number
    // otherwise, password is invalid
    const password = event.target.value
    return false
}

// Corregida: - **(2 pto)** El método `validatePassword` debería validar que: - (0.25pto) El campo no está vacío - (0.25pto) Que tiene una longitud de > 8 - (1pto) Que cumple con el regex indicado
function validatePassword(event) {
    const password = event.target.value;
    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{9,}/; 
    const minLength = password.length > 8;
    const isLongEnoughAndMeetsRegex = passwordRegex.test(password);

    const isValid = minLength && isLongEnoughAndMeetsRegex; 

    if (isValid) {
        showElementWithClassName(event.target, 'valid-feedback');
        hideElementWithClassName(event.target, 'invalid-feedback');
    } else {
        showElementWithClassName(event.target, 'invalid-feedback');
        hideElementWithClassName(event.target, 'valid-feedback');
    }
    return isValid;
}

function validateEmail(event) {
    const email = event.target.value

    return false
}

// Corregida: - **(2 pto)** El método `validateEmail` debería validar que: - El campo no está vacío - El campo es un mail válido (* buscar regex para validar)
function validateEmail(event) {
    const email = event.target.value.trim();
    const emailRegex = /\S+@\S/; 

    const isValid = email != "" && emailRegex.test(email);

    if (isValid) {
        showElementWithClassName(event.target, 'valid-feedback');
        hideElementWithClassName(event.target, 'invalid-feedback');
    } else {
        showElementWithClassName(event.target, 'invalid-feedback');
        hideElementWithClassName(event.target, 'valid-feedback');
    }
    return isValid;
}

// general register
function register(event) {
    // check if name is fullfiled
    // check if email is fullfiled
    // check if password is fullfiled
    // check if gender is selected
    // check if checkbox with "I confirm that all data are correct" is checked


    // then, send a POST to localhost:3000/register with all the data in the body as a JSON
    fetch('http://localhost:3000/', {
        method: 'POST',
        body: JSON.stringify({
            'name': 'sample'
        }),
        headers: {
            'Content-type': 'application/json'
        },
    })
    event.preventDefault();
    return false;
}

// Corregido: - **(2 pto)** El método `register`, debe realizar el fetch al API si y sólo si: - se cumplen las validaciones anteriores (name, email y contry) 
// - el usuario ha seleccionado un gènero - el usuario ha marcado el checkbox "I confirm that all data are correct"
// function register(event) {
//     const isNameValid = validateName();
//     const isEmailValid = validateEmail();

//     const dataMarked = document.getElementById('invalidCheck').value != 0

//     if (!isNameValid || !isEmailValid ||  !dataMarked ) {
//         return;
//     } else {
//         // then, send a POST to localhost:3000/register with all the data in the body as a JSON
//         fetch('http://localhost:3000/', {
//             method: 'POST',
//             body: JSON.stringify({
//                 'name': 'sample'
//             }),
//             headers: {
//                 'Content-type': 'application/json'
//             },
//         })
//         event.preventDefault();
//         return false;
//     }
// }


// utility functions
function showElementWithClassName(node, className) {
    node.parentNode.getElementsByClassName(className)[0].style.display = 'initial'
}
function hideElementWithClassName(node, className) {
    node.parentNode.getElementsByClassName(className)[0].style.display = 'none'
}

function selectCountry(event) {
    console.log(event);
    document.forms[0].country.value = event.target.innerText

    const node = document.getElementsByClassName('search-box')[0]
    node.style.display = 'none'
    node.innerHTML = ''
}

function init() {
    let items = document.getElementsByClassName('valid-feedback')
    for (const item of items) {
        item.style.display = 'none'
    }
    items = document.getElementsByClassName('invalid-feedback')
    for (const item of items) {
        item.style.display = 'none'
    }

    document.getElementsByClassName('search-box')[0].style.display = 'none'
}

init()