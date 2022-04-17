import { renderCollegeList } from './college.js'

const renderColleges = async () => {
    const response = await fetch('/schools')
    const colleges = await response.json()
    renderCollegeList(document.getElementById('all-colleges'), colleges)
}

renderColleges()