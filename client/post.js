const commonHeaders = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }
class Post {
    id
    title
    text
    numLikes
    liked
    createdAt
    editing = false
    showComments = false
    comments = []

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

    toggleEditing() {
        this.editing = !this.editing
        this.render()
    }

    async toggleComments() {
        this.showComments = !this.showComments
        if (this.showComments) {
            const response = await fetch(`/post/comments?id=${this.id}`)
            this.comments = await response.json()
            this.render()
        } else {
            this.render()
        }
    }

    async saveEdits() {
        this.title = document.getElementById(`post-card-title-${this.id}`).value
        this.text = document.getElementById(`post-card-text-${this.id}`).value

        await fetch('/post/update?' + new URLSearchParams({id: this.id}), {
            method: 'PATCH',
            body: JSON.stringify({title: this.title, text: this.text}),
            ...commonHeaders
        })
        this.toggleEditing()
    }

    async createComment() {
        const body = document.getElementById(`post-card-comment-${this.id}`).value
        const response = await fetch(`/post/comments/create?` + new URLSearchParams({id: this.id}), {
            method: 'POST',
            body: JSON.stringify({text: body}),
            ...commonHeaders
        })
        const comment = await response.json()

        this.comments.unshift(comment)
        this.render()
    }


    async deleteComment(commentId) {
        await fetch(`/post/comment/delete?` + new URLSearchParams({id: this.id, commentId}), {
            method: 'DELETE',
        })

        this.comments = this.comments.filter(({id}) => id !== commentId)
        this.render()
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

            const commentButton = document.createElement('button')
            commentButton.addEventListener('click', () => {
                this.toggleComments()
            })
            commentButton.innerHTML = `💬`
            commentButton.classList.add('btn')
            commentButton.style.marginLeft = '5px'
    
            content.appendChild(upvoteButton)
            content.appendChild(editButton)
            content.appendChild(commentButton)
        }
        
        if (this.showComments) {
            const commentSection = document.createElement('div')
            commentSection.innerHTML = `
                <div class="form-floating mb-3">
                    <input class="form-control" id="post-card-comment-${this.id}" placeholder="Comment">
                    <label for="floatingInput">Comment</label>
                </div>
            `

            card.appendChild(commentSection)

            const subBtn = document.createElement('button')
            subBtn.classList.add('btn', 'btn-primary')
            subBtn.innerText = 'Submit'
            subBtn.addEventListener('click', () => this.createComment())
            
            commentSection.appendChild(subBtn)


            const commentsList = document.createElement('div')
            commentsList.id = `comments-section-${this.id}`
            this.comments.forEach(({text, id}) => {
                const comment = document.createElement('div')
                comment.innerHTML = `
                    <div class="comment-item">
                        <p>${text}</p>
                        
                    </div>
                `
                const delBtn = document.createElement('button')
                delBtn.classList.add('btn')
                delBtn.innerText = '🗑'
                delBtn.addEventListener('click', () => this.deleteComment(id))

                comment.appendChild(delBtn)
                commentsList.appendChild(comment)
            })

            commentSection.appendChild(commentsList)

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