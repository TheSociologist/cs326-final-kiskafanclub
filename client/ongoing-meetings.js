import Meeting from './meeting.js'

const renderMeetingsList = async () => {
    const response = await fetch('/ongoing-meetings')
    const meetings = await response.json()
    console.log(meetings)

    meetings.forEach((meeting) => {
        const list = document.getElementById('meeting-list')
        const card = document.createElement('div')
        card.classList.add('col-12', 'col-md-6')
        list.appendChild(card)
        meeting = new Meeting(meeting)
        meeting.render(card)
    })
}

renderMeetingsList()