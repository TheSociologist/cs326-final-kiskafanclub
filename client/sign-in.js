const errorText = document.getElementById('error')
const urlSearchParams = new URLSearchParams(window.location.search);
const {error} = Object.fromEntries(urlSearchParams.entries());

async function checkSignedIn() {
	const response = await fetch('/signed-in')
	const { signedIn } = await response.json()
	if (signedIn) {
		window.location.href = '/dashboard.html'
	}
}

checkSignedIn()

if (error) {
	errorText.classList.remove("error-text")
	errorText.classList.add("error-text-visible")
} else {
	errorText.classList.add("error-text")
	errorText.classList.remove("error-text-visible")
}