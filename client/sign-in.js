

document.getElementById('signIn').addEventListener('click',async () => {
	const response = await fetch('/sign-in', {
		method: 'POST',
		body:JSON.stringify( {
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

