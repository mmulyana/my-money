import ky from 'ky'

const api = ky.create({
	prefixUrl: 'http://localhost:3000/api/',
	hooks: {
		beforeRequest: [
			(request) => {
				request.headers.set('Authorization', 'Bearer aaa')
			},
		],
	},
})

export { api }
