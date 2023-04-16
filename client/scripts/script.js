const url = "https://api-chama.onrender.com/"

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
        console.log(users)

        if (window.location.pathname === "/client/components/dashboard.html"){
            const h6 = document.querySelector('.users-num')
            h6.innerText = users.length
        }

        // set username from db to frontend
        
        if (jwtCookie) {
            const jwtToken = jwtCookie.split('=')[1];
                                    
            user = users.filter( user => user._id === jwtToken)
            
            if (user) {
                document.querySelectorAll('.user-name').forEach( elem => elem.innerText = user[0].username)
                document.querySelector('.username').innerText = user[0].name
                document.querySelector('.useremail').innerText = user[0].email

                const form =document.getElementById('update-profile')
                form.email.placeholder = user[0].email
                form.username.placeholder = user[0].username
            }  
            
            // update user
            const form = document.getElementById('update-profile')
            
            const updateUser = async() => {
                const username = form.username.value
                const email = form.email.value
                const name = user.name
                const password = user.password

                const updateDetails = { username, email, password, name }

                try {
                    const res = await fetch(`${url}users/${jwtToken}`, {
                        method: "PUT",
                        body: JSON.stringify(updateDetails),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    const data = await res.json()
                    console.log(data)
                    location.assign('./users-profile.html')
                } catch (error) {
                    console.log(error.message)
                }
            }

            form.addEventListener('submit', (e) => {
                e.preventDefault()
                updateUser()
            })
            
        } 


    } catch (e) {
        console.log(e.message)
    }
    
})()