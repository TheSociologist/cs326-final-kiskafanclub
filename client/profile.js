let profile = {};

function setProfileElements(profile) {
    // go through each profile element and set their value to the corresponding value in the profile object
    document.getElementById('user-name').innerText = profile.name ? profile.name : ''
    document.getElementById('school-name').innerText = profile.university ? profile.university : ''
    document.getElementById('yogStudent').innerText = profile.yog ? profile.yog : '';
    document.getElementById('studentMajor').innerText = profile.major ? profile.major : '';
    document.getElementById('aboutMePara').innerText = profile.description ? profile.description : '';
}

function setFormData(profile) {
    // go through each profile element and set their value to the corresponding value in the profile object

    document.getElementById('nameInput').value = profile.name
    document.getElementById('uniInput').value = profile.university;
    document.getElementById('yogInput').value = profile.yog;
    document.getElementById('majorInput').value = profile.major;
    document.getElementById('aboutMeInput').value = profile.description;
}

document.getElementById('exit').addEventListener('click', () => {
    setFormData(profile)
})

async function getUserData() {
    const response = await fetch('/profile/read');
    const profile = await response.json();
        
    setProfileElements(profile);
    setFormData(profile);
}


getUserData()