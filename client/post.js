const commonHeaders = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }

const generateEditorHTML = (id) => {
    return `
        <div class="form-floating mb-3">
            <input class="form-control" id="post-card-title-${id}" placeholder="Title">
            <label for="floatingInput">Title</label>
        </div>
        <div class="form-floating">
            <textarea class="form-control" placeholder="Leave a comment here" id="post-card-text-${id}" ></textarea>
            <label for="floatingPassword">Body</label>
        </div>
    `
}
class Post {
    id
    title
    content
    numLikes
    liked
    createdAt
    editing = false
    showComments = false
    comments = []

    constructor(post) {
        this.id = post.id;
        this.title = post.title;
        this.content = post.content;
        this.numLikes = post.likes ? post.likes : 0;
        this.liked = post.liked;
        this.createdAt = post.createdAt;
    }

    async toggleVote() {
        this.numLikes = this.numLikes + 1
        await fetch('/post/like?' + new URLSearchParams({id: this.id}), {method: 'PUT'})
        console.log('here')
        this.render()
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
        this.content = document.getElementById(`post-card-text-${this.id}`).value

        await fetch('/post/update?' + new URLSearchParams({id: this.id}), {
            method: 'PATCH',
            body: JSON.stringify({title: this.title, content: this.content}),
            ...commonHeaders
        })
        this.toggleEditing()
    }

    async createComment() {
        const body = document.getElementById(`post-card-comment-${this.id}`).value
        const response = await fetch(`/post/comments/create?` + new URLSearchParams({id: this.id}), {
            method: 'POST',
            body: JSON.stringify({content: body, post_id: this.id}),
            ...commonHeaders
        })
        const comment = await response.json()

        this.comments.unshift(comment)
        this.render()
    }


    async deleteComment(commentId) {
        await fetch(`/post/comments/delete?` + new URLSearchParams({id: this.id, commentId}), {
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
            content.innerHTML = generateEditorHTML(this.id) + `
                <div class="post-form">
                    <button type="button" class="btn btn-outline-primary" id="post-save-${this.id}">
                        Save
                    </button>
                    <button type="button" class="btn btn-outline-danger" id="post-cancel-${this.id}">
                        Cancel
                    </button>
                </div>
            `

            document.getElementById(`post-card-title-${this.id}`).value = this.title
            document.getElementById(`post-card-text-${this.id}`).value = this.content

            document.getElementById(`post-cancel-${this.id}`).addEventListener('click', () => this.toggleEditing())
            document.getElementById(`post-save-${this.id}`).addEventListener('click', () => this.saveEdits())
            
        } else {
            content.innerHTML = `
                <h5 class="card-title">${this.title}</h5>
                <p class="card-content">${this.content}</p>
            `
            const upvoteButton = document.createElement('button')
            console.log(this.numLikes)
            upvoteButton.innerHTML = `
                👍
                ${this.numLikes ? this.numLikes : 0}
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
            commentSection.classList.add('comments-section')
            commentSection.innerHTML = `
                <div class="form-floating mb-3" class="create-comment' style="border: solid">
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
            this.comments.forEach(({content, id}) => {
                const comment = document.createElement('div')
                comment.classList.add('comment-item')
                comment.innerHTML = `
                    <p>${content}</p>
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

const urlSearchParams = new URLSearchParams(window.location.search);
const { id } = Object.fromEntries(urlSearchParams.entries());

export const renderPostList = (element, posts, includeCreator) => {
    if (includeCreator) {
        element.innerHTML = `
        <div>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#post-creator">
                Create a new post
            </button>
            <div class="modal fade" id="post-creator">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Create Your Meeting</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${generateEditorHTML('base')}
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Exit</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id='create-post-button'>Create Post</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    `

    document.getElementById(`create-post-button`).addEventListener('click', async () => {
        console.log(document.getElementById('post-card-title-base'))
        const response = await fetch(
            `/post/create`,
            {
                method: 'POST', 
                ...commonHeaders,
                body: JSON.stringify({
                    title: document.getElementById('post-card-title-base').value,
                    content: document.getElementById('post-card-text-base').value,
                    schoolId: id ? id : null
                }),
            }
        )
        const post = await response.json()
        renderPostList(element, [post, ...posts])
    })
    }
    

    posts.forEach(p => {
        const div = document.createElement('div')
        div.id = `post-card-${p.id}`
        element.appendChild(div)
        const card = new Post(p)
        card.render()
    })
}