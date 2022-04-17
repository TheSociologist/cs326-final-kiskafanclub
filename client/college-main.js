import { College } from './college.js'
import { renderPostList } from './post.js'

const getId = () => {
    const params = (new URL(document.location)).searchParams;
    return params.get('id')
}

const getTab = () => {
    const params = (new URL(document.location)).searchParams;
    return params.get('tab')
}

const tabs = ['questions', 'about', 'tutors']
const currTab = getTab()
tabs.forEach(tab => {
    const tabElem = document.getElementById(`${tab}-tab`)
    tabElem.href = '/college.html?' + new URLSearchParams({id: getId(), tab})
    currTab === tab ? tabElem.classList.add('active') : tabElem.classList.remove('active')
})

const displayCollege = async () => {
    const id = getId()
    const response = await fetch('/college?' + new URLSearchParams({id}))
    let college = await response.json()
    college = new College(college)

    const main = document.getElementById('main-val')
    college.render(main)
}

const renderQuestions = async (feed) => {
    const id = getId()
    const response = await fetch('/college/posts?' + new URLSearchParams({id}))
    const posts = await response.json()
    renderPostList(feed, posts)
}

const renderAbout = async (feed) => {
    
}

const renderTutors = async (feed) => {
    
}

const render = () => {
    const feed = document.getElementById('feed')
    feed.innerHTML = ''

    switch(currTab) {
        case 'questions':
            renderQuestions(feed)
            break;
        case 'about':
            renderAbout(feed)
            break;
        case 'tutors':
            renderTutors(feed)
            break;
    }
}

displayCollege()
render()
