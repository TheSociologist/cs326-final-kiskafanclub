//save event listener
//if the form gets saved, alter the profile to whatever was entere dinto the field
let inputName = document.getElementById('nameInput');
let inputUni = document.getElementById('uniInput');
let inputYOG = document.getElementById('yogInput');
let inputAboutMe = document.getElementById('aboutMeInput');
let inputMajor = document.getElementById('majorInput');
let saveButton = document.getElementById('saveButton');

let profile = {};


function setProfileElements() {
    // go through each profile element and set their value to the corresponding value in the profile object
    document.getElementById('user-name').innerText = profile.name
    document.getElementById('school-name').innerText = profile.university;
    document.getElementById('yogStudent').innerText = profile.gradYear;
    document.getElementById('studentMajor').innerText = profile.major;
    document.getElementById('aboutMePara').innerText = profile.aboutMe;
}

function setFormData() {
    // go through each profile element and set their value to the corresponding value in the profile object
    inputName.value = profile.name
    inputUni.value = profile.university;
    inputYOG.value = profile.gradYear;
    inputMajor.value = profile.major;
    inputAboutMe.value = profile.aboutMe;
    
}

saveButton.addEventListener('click', () => {
    profile.name = inputName.value;
    profile.university = inputUni.value;
    profile.gradYear = inputYOG.value;
    profile.aboutMe = inputAboutMe.value;
    profile.major = inputMajor.value;
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

document.getElementById('exit').addEventListener('click', () => {
    setFormData()
})

async function getUserData() {
    const response = await fetch('/profile/read');
    profile = await response.json();
    setProfileElements();
    setFormData();
}


getUserData()