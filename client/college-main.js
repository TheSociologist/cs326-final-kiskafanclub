import { College } from './college.js'
import { renderPostList } from './post.js'

const displayCollege = async () => {
    const params = (new URL(document.location)).searchParams;
    const id = params.get('id')
    const response = await fetch('/college?' + new URLSearchParams({id}))
    let college = await response.json()
    college = new College(college)

    const main = document.getElementById('main-val')
    college.render(main)
}

const renderFeed = async () => {
    const params = (new URL(document.location)).searchParams;
    const id = params.get('id')
    const response = await fetch('/college/posts?' + new URLSearchParams({id}))
    const posts = await response.json()
    renderPostList(document.getElementById('feed'), posts)
}

displayCollege()
renderFeed()
