const url = "https://api-chama.onrender.com/"

const loginForm = document.querySelector('#login')
loginForm.addEventListener('submit', async(e) => {
    e.preventDefault()

    const username = loginForm.username.value
    const password = loginForm.password.value

    try {
        const res = await fetch(`${url}signin`, {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        })     
        
        if (res.status === 200){
            location.assign('./components/dashboard.html')
        }
        else {
            const error = await (res.json())
            console.log(error.message)
        }

    } catch (error) {
        console.log(error.message);
        
    }

    loginForm.reset()
})