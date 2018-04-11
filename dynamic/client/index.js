const PROTO_PATH = `${__dirname}/../proto/echo.proto`

const grpc = require('grpc')
const os = require('os')
const echo_proto = grpc.load(PROTO_PATH).echo
const port = process.env.PORT || '0.0.0.0:50051'
const hostname = os.hostname()

function main() {
	const client = new echo_proto.Echo(port, grpc.credentials.createInsecure())
	client.greet({
		text: 'John'
	}, (err, res) => {
		console.log(`greetings from ${res.text}`)
	})
}

main()