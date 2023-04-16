document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#form')
    const url = "https://api-chama.onrender.com/"

    const signup = async() => {
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
            const token = await res.json()
            
            document.cookie = `jwt=${token.user};path=/;`;
            location.assign('../components/dashboard.html')

        } catch (error) {
            console.log(error.message)
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        signup()

        setTimeout(() => {form.reset()}, 7000)

    })

    // end signup 

    
})