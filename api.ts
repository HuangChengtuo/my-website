import qs from 'qs'

export default {
    get (url: string, params?: unknown) {
        let query = ''
        if (params) {
            query = '?' + qs.stringify(params)
        }
        return fetch(url + query).then(res => res.json())
    }
}
