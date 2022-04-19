const search = async () => {
    const params = (new URL(document.location)).searchParams;
    const query = params.get('query')
    document.getElementById('search-title').innerText = `Searching for: "${query}"`
    const response = await fetch('/search?' + new URLSearchParams({query}))
    const colleges = await response.json()
    
    const list = document.getElementById('search-results')
    colleges.forEach(({id, name, description, banner}) => {
        const item = document.createElement('div')
        item.innerHTML = `
            <div class="search-result">
                <img
                    src="${banner}"
                />
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${description.slice(0, 75)}</p>
                    <a href="/college.html?${new URLSearchParams({id})}" class="btn btn-primary">View</a>
                </div>
                </div>
            </div>
        `
        list.appendChild(item)
    })


}

search()