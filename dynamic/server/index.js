const PROTO_PATH = `${__dirname}/../proto/echo.proto`

const grpc = require('grpc')
const os = require('os')
const echo_proto = grpc.load(PROTO_PATH).echo
const port = process.env.PORT || '0.0.0.0:50051'
const hostname = os.hostname()

function greet(call, callback) {
	callback(null, {
		text: `${hostname}: Hello, ${call.request.text}`
	})
}

function main() {
	const server = new grpc.Server()
	server.addService(echo_proto.Echo.service, {
		greet
	})

	server.bind(port, grpc.ServerCredentials.createInsecure())
	console.log(`${hostname} listening to ${port}. press ctrl + c to cancel.`)
	server.start()
}

main()