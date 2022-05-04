function includeHTML() {
    document.body.innerHTML = `
        <html lang="en">
            <body >
                <nav class="navbar navbar-expand-lg navbar-light bg-light" style="background-color:#658B6F;">
                    <div class="container-fluid" style="background-color:#C4CDC1;">
                        <a class="navbar-brand" href="/index.html">
                            <img
                                id="main-icon"
                                src="https://www.freeiconspng.com/thumbs/graduation-cap/high-resolution-graduation-cap-png-icon-17.png"
                            />
                            Matcher
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0 nav-buttons">
                                <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="/index.html" style="color:#2f575d">Home</a>
                                </li>
                                <li class="nav-item">
                                <a class="nav-link" href="/colleges.html" style="color:#2f575d">Colleges</a>
                                </li>
                                <li class="nav-item">
                                <a class="nav-link" href="/ongoing-meetings.html" style="color:#2f575d">Meetings</a>
                                </li>
                                <li class="nav-item dropdown" style="color:#2f575d">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Me
                                </a>
                                <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown" style="color:#2f575d">
                                    <li><a class="dropdown-item" href="/profile.html">Profile</a></li>
                                    <li><a class="dropdown-item" href="/settings.html">Settings</a></li>
                                </ul>
                                </li>
                            </ul>
                            <form class="d-flex" id="search-form">
                                <input id="query" class="form-control me-2" type="search" placeholder="Search" aria-label="Search" style="color:#2f575d">
                                <button class="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </body> 
        </html>

    ` + document.body.innerHTML
}

includeHTML()

const form = document.getElementById('search-form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const query = document.getElementById('query').value
    document.location.href = '/search.html?' + new URLSearchParams({query});
})