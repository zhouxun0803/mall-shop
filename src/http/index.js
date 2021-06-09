import axios from "axios"


axios.defaults.baseURL = ""
function http(url, method = "POST", data = {}, params = {}) {
    return axios({
        url,
        method,
        data,
        params,
    }).then(res => {
        if (res.status >= 200 && res.status < 300 || res.status === 304) {
            return res.data
        }
    })
}
export default http