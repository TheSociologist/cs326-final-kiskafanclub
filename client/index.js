
async function checkSignedIn() {
	const response = await fetch('/signed-in')
	const { signedIn } = await response.json()
	if (signedIn) {
		window.location.href = '/dashboard.html'
	}
}

checkSignedIn()