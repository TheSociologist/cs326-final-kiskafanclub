import { renderPostList } from './post.js'

async function checkSignedIn() {
	const response = await fetch('/signed-in')
	const { signedIn } = await response.json()
	if (!signedIn) {
		window.location.href = '/sign-in.html'
	}
}

checkSignedIn()

const renderFeed = async () => {
    const response = await fetch('/feed')
    const posts = await response.json()
    renderPostList(document.getElementById('feed'), posts)

    if (posts.length > 0) {
        document.getElementById('empty-message').innerHTML = ''
    } else {
        document.getElementById('empty-message').innerHTML = 'No Posts. Favorite some colleges to see more.'
    }
}

const renderList = (list, link, items) => {
    if (items.length > 0) {
        items.forEach(({name, id}) => {
            const item = document.createElement('a')
            item.innerText = name
            item.href = `/${link}.html?id=${id}`
            const div = document.createElement('div')
            div.appendChild(item)
            list.appendChild(div)
        })
    } else {
        list.innerHTML = "None"
    }
    
}

const renderSuggestedSchools = async () => {
    const response = await fetch('/recommended-schools')
    const schools = await response.json()
    renderList(document.getElementById('schools'), 'college', schools)
    
}

const renderSuggestedTutors = async () => {
    const response = await fetch('/recommended-tutors')
    const tutors = await response.json()
    renderList(document.getElementById('tutors'), 'profile', tutors)
}

const renderOngoingMeetings = async () => {
    const response = await fetch('/ongoing-meetings/read')
    const meetings = await response.json()
    renderList(document.getElementById('meetings'), 'meeting', meetings)
}

renderFeed()
renderSuggestedSchools()
renderSuggestedTutors()
renderOngoingMeetings()