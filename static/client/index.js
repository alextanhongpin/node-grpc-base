const messages = require('./proto/echo_pb')
const services = require('./proto/echo_grpc_pb')

const grpc = require('grpc')
const os = require('os')
const port = process.env.PORT || '0.0.0.0:50051'
const hostname = os.hostname()

function main() {
	const client = new services.EchoClient(port, grpc.credentials.createInsecure())
	const request = new messages.GreetRequest()
	const metadata = new grpc.Metadata();
	metadata.add('authorization', 'secret')

	// If the field name in proto is `text`, then a `setText` method will be exposed
	request.setText('John Doe')

	client.greet(request, metadata, (err, res) => {
		console.log(`greeting from ${res.getText()}`)
	})
}

main()