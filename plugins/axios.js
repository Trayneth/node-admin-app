
export default function ({ $axios, redirect, app, error, store, env }) {
  $axios.onRequest((config) => {
    store.commit('setIsDataLoading', true)
    return config
  })

  $axios.onResponse((res) => {
    store.commit('setIsDataLoading', false)
    return res
  })

  $axios.onError((err) => {
    const code = parseInt(err.response && err.response.status)
    store.commit('setIsDataLoading', false)
    if (code === 403) {
      error({ statusCode: 403, message: 'No Permission.' })
    }
    if (code === 404) {
      error({ statusCode: 404, message: 'Request Not Found.' })
    }
    if (code === 400) {
      return Promise.resolve(err.response)
    }
    if (code === 504) {
      error({ statusCode: 500, message: 'Server Error' })
    }
    if (code === 401) {
      app.$cookies.remove('auth._token.cookie')
      redirect(`/${i18n.locale}/login`)
    }
  })
}
