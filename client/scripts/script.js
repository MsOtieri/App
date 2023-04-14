const form = document.querySelector('#form')
const url = "http://localhost:5000/"

form.addEventListener('submit', async(e) => {
    e.preventDefault()

    const person_name = form.name.value
    const email = form.email.value
    const username = form.username.value
    const password = form.password.value

    const userData = { person_name, email, username, password }

  
    try {  
        const res = await fetch(`${url}signup`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const user = await res.json()
        alert(user)
        location.assign('../components/dashboard.html')

    } catch (error) {
        console.log(error.message)
    }
})

const fetchData = async() => {
    try {
        const res = await fetch(`${url}users`)
        const data = await res.json()

        console.log(data)
        // return data.length
    } catch (e) {
        console.log(e.message)
    }
}

const users = fetchData()

const h6 = document.querySelector('#users-num')
h6.innerText = users.length
