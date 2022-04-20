//save event listener
//if the form gets saved, alter the profile to whatever was entere dinto the field
let inputName = document.getElementById('nameInput').value;
let inputUni = document.getElementById('uniInput').value;
let inputYOG = document.getElementById('yogInput').value;
let inputAboutMe = document.getElementById('aboutMeInput').value;
let saveButton = document.getElementById('saveButton');

let profile;

saveButton.addEventListener('click', () => {
    profile.name = inputName.value
    // do this with all other fields
    fetch('/profile/update', {
        method: 'PUT',
        body: JSON.stringify(profile),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    setProfileElements();
});


async function getUserData() {
    const response = await fetch('/profile/read')
    profile = await response.json()
    
    setProfileElements()
}

function setProfileElements() {
    // go through each profile element and set their value to the corresponding value in the profile object
    document.getElementById('user-name').value = profile.name;
}
