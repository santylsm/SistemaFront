import axios from 'axios'

const shopAPI = axios.create({ baseURL: './api' })

export default shopAPI
