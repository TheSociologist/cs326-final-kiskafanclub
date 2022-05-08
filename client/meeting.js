
export default class Meeting {
    id
    title
    startDate
    endDate
    link
    description
    
    constructor(meeting) {
        this.id = meeting.id;
        this.title = meeting.title;
        this.link = meeting.link;
        this.startDate = meeting.start_date ? new Date(meeting.start_date) : new Date();
        this.endDate = meeting.end_date ? new Date(meeting.end_date) : new Date();
        this.description = meeting.description
    }

    render(element) {
        element.innerHTML = `
            <div class="card-deck border-0 shadow-lg pt-1 my-4 position-relative">
                <div class="card-header bg-transparent">
                    <h4 class="card-title  text-right" >${this.title}</h4>
                </div>
                <div class="card-body">
                    <p>
                        ${this.description ? this.description : ''}
                    </p>
                </div>
                <div class="date-text">
                    ${this.startDate.toLocaleDateString('en-us')} ${this.startDate.toLocaleTimeString('en-us')} - ${this.endDate.toLocaleDateString('en-us')} ${this.endDate.toLocaleTimeString('en-us')}
                </div>
                <div class="card-footer border-0 text-center">
                    <ul class=" list-inline mb-0 mx-auto">
                        <a target="_blank" href="${this.link}" class="btn btn-primary">Join This Meeting!</a>
                    </ul>
                </div>
            </div>
        `
    }
}