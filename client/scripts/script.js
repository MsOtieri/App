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


(async () => {
    try {
        const users = await fetchData()

        const h6 = document.querySelector('#users-num')
        h6.innerText = users.length

    } catch (e) {
        console.log(e.message)
    }
})()