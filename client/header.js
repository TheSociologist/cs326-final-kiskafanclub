async function includeHTML() {
    const response = await fetch('/signed-in')
	const { signedIn } = await response.json()
    const homePage = signedIn ? '/dashboard.html' : '/index.html'

    document.body.innerHTML = `
        <html lang="en">
            <body>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="${homePage}">
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
                                ${
                                    signedIn ? 
                                    `
                                        <a class="nav-link" aria-current="page" href="${homePage}">Home</a>
                                    `
                                    :
                                    ''
                                }
                                </li>
                                <li class="nav-item">
                                <a class="nav-link" href="/colleges.html" >Colleges</a>
                                </li>
                                <li class="nav-item">
                                <a class="nav-link" href="/ongoing-meetings.html" >Meetings</a>
                                </li>
                                ${
                                    signedIn ? 
                                    `
                                        <li class="nav-item dropdown">

                                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Profile
                                            </a>
                                            <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                                <li><a class="dropdown-item" href="/profile.html">Profile</a></li>
                                                <li><a class="dropdown-item" href="/settings.html">Settings</a></li>
                                                <li><a class="dropdown-item" id="sign-out-btn">Sign Out</a></li>
                                            </ul>
                                        </li>
                                    `
                                    :
                                    `
                                        <li class="nav-item">
                                        <a class="nav-link" aria-current="page" href="/sign-in.html">Sign In</a>
                                        </li>
                                        <li class="nav-item">
                                        <a class="nav-link" aria-current="page" href="/sign-up.html">Sign Up</a>
                                        </li>
                                    `
                                }
                               
                               
                            </ul>
                            <form class="d-flex" id="search-form">
                                <input id="query" class="form-control me-2" type="search" placeholder="Search" aria-label="Search" >
                                <button class="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </body> 
        </html>

    ` + document.body.innerHTML


    document.getElementById('sign-out-btn')?.addEventListener('click', async () => {
        await fetch('/logout', {method: 'POST'})
        window.location.href = '/sign-in.html'
    })

    const form = document.getElementById('search-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const query = document.getElementById('query').value
        document.location.href = '/search.html?' + new URLSearchParams({query});
    })
}

includeHTML()

