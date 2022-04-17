class Post {
    id
    title
    text
    numLikes
    liked
    createdAt
    editing = false

    constructor(post) {
        this.id = post.id;
        this.title = post.title;
        this.text = post.text;
        this.numLikes = post.numLikes;
        this.liked = post.liked;
        this.createdAt = post.createdAt;
    }

    async toggleVote() {
        this.numLikes = this.liked ? this.numLikes - 1 : this.numLikes + 1
        this.liked = !this.liked
        await fetch('/post/like?' + new URLSearchParams({id: this.id}), {method: 'PUT'})
    }

    async toggleEditing() {
        this.editing = !this.editing
        this.render()
    }

    async saveEdits() {
        this.title = document.getElementById(`post-card-title-${this.id}`).value
        this.text = document.getElementById(`post-card-text-${this.id}`).value

        await fetch('/post/update?' + new URLSearchParams({id: this.id, title: this.title, text: this.text}), {method: 'PATCH'})
        this.toggleEditing()
    }

    render() {
        const card = document.getElementById(`post-card-${this.id}`)
        card.innerHTML = '';
        card.classList.add('card')
        card.classList.add('post-card')

        const content = document.createElement('div')
        content.classList.add('card-body')
            card.appendChild(content)

        if (this.editing) {
            content.innerHTML = `
                <div class="form-floating mb-3">
                    <input class="form-control" id="post-card-title-${this.id}" placeholder="Title">
                    <label for="floatingInput">Title</label>
                </div>
                <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" id="post-card-text-${this.id}" style="height: 100px"></textarea>
                    <label for="floatingPassword">Body</label>
                </div>
                <div style="margin-top: 15px">
                    <button type="button" class="btn btn-outline-primary" id="post-save-${this.id}">
                        Save
                    </button>
                    <button type="button" class="btn btn-outline-danger" id="post-cancel-${this.id}">
                        Cancel
                    </button>
                </div>
          
            `

            document.getElementById(`post-card-title-${this.id}`).value = this.title
            document.getElementById(`post-card-text-${this.id}`).value = this.text

            document.getElementById(`post-cancel-${this.id}`).addEventListener('click', () => this.toggleEditing())
            document.getElementById(`post-save-${this.id}`).addEventListener('click', () => this.saveEdits())
            
        } else {
            content.innerHTML = `
                <h5 class="card-title">${this.title}</h5>
                <p class="card-text">${this.text}</p>
            `
            const upvoteButton = document.createElement('button')
            upvoteButton.innerHTML = `
                👍
                ${this.liked ? 'Liked' : 'Like'}
            `
            upvoteButton.addEventListener('click', () => {
                this.toggleVote()
                this.render()
            })
            upvoteButton.classList.add('btn')
            upvoteButton.classList.add(this.liked ? 'btn-primary' : 'btn-outline-primary')
    
            const editButton = document.createElement('button')
            editButton.addEventListener('click', () => {
                this.toggleEditing()
            })
            editButton.innerHTML = `✎`
            editButton.classList.add('btn')
            editButton.style.marginLeft = '5px'
    
            content.appendChild(upvoteButton)
            content.appendChild(editButton)
        }       
    }
}

export const renderPostList = (element, posts) => {
    posts.forEach(p => {
        const div = document.createElement('div')
        div.id = `post-card-${p.id}`
        element.appendChild(div)
        const card = new Post(p)
        card.render()
    })
}