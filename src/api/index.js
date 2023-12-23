import axios from "axios"

const instance=axios.create({
    baseURL:"https://655ef5e2879575426b443c29.mockapi.io/api",
    timeout:(10000)
})


export default instance