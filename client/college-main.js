import { College } from './college.js'
import { renderPostList } from './post.js'

const getId = () => {
    const params = (new URL(document.location)).searchParams;
    return params.get('id')
}

const getTab = () => {
    const params = (new URL(document.location)).searchParams;
    return params.get('tab') ? params.get('tab') : 'questions'
}

const tabs = ['questions', 'about']
const currTab = getTab()
tabs.forEach(tab => {
    const tabElem = document.getElementById(`${tab}-tab`)
    tabElem.href = '/college.html?' + new URLSearchParams({id: getId(), tab})
    currTab === tab ? tabElem.classList.add('active') : tabElem.classList.remove('active')
})

let college

const displayCollege = async () => {
    const id = getId()
    const response = await fetch('/college?' + new URLSearchParams({id}))
    college = await response.json()
    college = new College(college)

    const main = document.getElementById('main-val')
    college.render(main)
}

const renderQuestions = async () => {
    const id = getId()
    const response = await fetch('/college/posts?' + new URLSearchParams({id}))
    const posts = await response.json()
    console.log(posts)
    renderPostList(document.getElementById('feed'), posts)
}

const renderAbout = async () => {
    document.getElementById('feed').innerHTML = college.description 
}

const render = async () => {
    document.getElementById('feed').innerHTML = ''
    await displayCollege()

    switch(currTab) {
        case 'questions':
            renderQuestions()
            break;
        case 'about':
            renderAbout()
            break;
        case 'tutors':
            renderTutors()
            break;
    }
}

render()
