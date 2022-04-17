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
    }

    render(card) {
        card.id =  `college-card-${this.id}`;
        card.innerHTML = `
            <div class="card college-card" style="width: 100%;">
                <div class="card-images">
                <img 
                    src="${this.banner}"
                    class="card-img-top" 
                    alt="banner"
                    style="max-height: 200px;"
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
                        ${this.description}
                    </p>
                </div>
            </div>
        
        `;
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
