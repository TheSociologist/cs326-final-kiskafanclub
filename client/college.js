import { renderPostList } from './post.js'

export class College {
    name
    id
    banner
    description
    icon

    constructor(college) {
        this.name = college.name
        this.id = college.id
        this.banner = college.banner
        this.description = college.description 
        this.icon = college.icon
        this.member = !!college.school_id
    }

    render(card) {
        card.id =  `college-card-${this.id}`;
        card.innerHTML = `
            <div class="card college-card" >
                <div class="card-images">
                <img 
                    src="${this.banner}"
                    class="card-img-top college-card-banner" 
                    alt="banner"
                    
                >
                <img
                    src="${this.icon}"
                    class="college-card-icon"
                    alt="icon"
                />
                </div>
                <div class="card-body college-card-body">
                    <a href="/college.html?id=${this.id}">
                        <h5 class="card-title">${this.name}</h5>
                    </a>
                    <p class="card-text">
                        ${this.description ? this.description : ''}
                    </p>
                    <button class="btn btn-secondary" id="join-space-${this.id}">
                        
                    </button>
                </div>
            </div>

        `;

        const joinButton = document.getElementById(`join-space-${this.id}`)
        if (this.member) {
            joinButton.innerHTML = 'Leave'
        } else {
            joinButton.innerHTML = 'Join'
        }
        joinButton.addEventListener('click', async () => {
            await fetch(`/college/favorite?id=${this.id}`, {method: 'POST'})
            this.member = !this.member;
            this.render(document.getElementById(`college-card-${this.id}`))
        })
    }
}

export const renderCollegeList = (element, colleges) => {
    colleges.forEach(c => {
        const div = document.createElement('div')
        element.appendChild(div)
        const card = new College(c)
        card.render(div)
    })
}
