const url = "http://localhost:5000/"

const fetchData = async() => {
    try {
        const res = await fetch(`${url}users`)
        const data = await res.json()

        return data
        
    } catch (e) {
        console.log(e.message)
    }
}

// read cookies from browser

const cookies = document.cookie.split(';');
const jwtCookie = cookies.find(cookie => cookie.trim().startsWith('jwt='));

let user
(async () => {
    try {
        const users = await fetchData()

        // set username from db to frontend
        
        if (jwtCookie) {
            const jwtToken = jwtCookie.split('=')[1];
                                    
            user = users.filter( user => user._id === jwtToken)
            
            if (user) {
                document.querySelectorAll('.user-name').forEach( elem => elem.innerText = user[0].username)

            }  
            
        } 

        // set members number from db
        const h6 = document.querySelector('#users-num')
        h6.innerText = users.length

    } catch (e) {
        console.log(e.message)
    }

    
})()