




document.getElementById('signUp').addEventListener('click', async() => {
    const password = document.getElementById('password').value
    const cpassword = document.getElementById('confirm-password').value
    if(password !== cpassword){
    return
    }
    const response = await fetch('/profile/create', {
		method: 'POST',
		body:JSON.stringify( {
            name: document.getElementById('name').value,
			email: document.getElementById('email').value,
			password: document.getElementById('password').value
		}),
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
	})
	const result = await response.json()
	if(result.value === 'success'){
		document.location.href = '/dashboard.html'
	}
});
