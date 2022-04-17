import { renderPostList } from './post.js'
const renderFeed = async () => {
    const response = await fetch('/feed')
    const posts = await response.json()
    renderPostList(document.getElementById('feed'), posts)
}

const renderList = (list, link, items) => {
    items.forEach(({name, id}) => {
        const item = document.createElement('a')
        item.innerText = name
        item.href = `/${link}.html?id=${id}`
        const div = document.createElement('div')
        div.appendChild(item)
        list.appendChild(div)
    })
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
    const response = await fetch('/ongoing-meetings')
    const meetings = await response.json()
    renderList(document.getElementById('meetings'), 'meeting', meetings)
}

renderFeed()
renderSuggestedSchools()
renderSuggestedTutors()
renderOngoingMeetings()