import axios from 'axios'

const initAxiosSetting = () => {
  // axios csrf setting, use X-CSRFToken header instead of hidden form param
  axios.defaults.xsrfCookieName = 'csrftoken'
  axios.defaults.xsrfHeaderName = 'X-CSRFToken'
}

export default initAxiosSetting
