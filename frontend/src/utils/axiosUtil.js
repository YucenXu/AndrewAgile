import axios from "axios";

const initAxiosSetting = () => {
    // axios csrf setting, use X-CSRFToken header instead of hidden form param
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken"

    // intercept all unauthorized response status, redirect to login page
    axios.interceptors.response.use(
        resp => resp,
        err => {
            if (err.response.status === 401) {
                window.location.href = "/login";
            } else {
                throw err;
            }
        });
}

export default initAxiosSetting;
