import Cookies from 'js-cookie'
import ky from 'ky'

const api = ky.create({
	prefixUrl: 'http://localhost:3000/api/',
	hooks: {
		beforeRequest: [
			(request) => {
				const token = Cookies.get('access_token')
				if (token) {
					request.headers.set('Authorization', `Bearer ${token}`)
				}
			},
		],
	},
})

export { api }
