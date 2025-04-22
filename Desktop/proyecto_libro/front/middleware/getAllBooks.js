const api = 'http://localhost:4000/api'

export const getAllBooks = async () => {
    try {
        const res = await fetch(`${api}/list`, {
            method: 'GET',
            'Content-Type': 'application/json'
        })

        const data = await res.json()

        console.log(data);
    } catch (error) {
       console.log(error); 
    }
}