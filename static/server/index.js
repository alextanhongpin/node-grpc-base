const messages = require('./proto/echo_pb')
const services = require('./proto/echo_grpc_pb')

const grpc = require('grpc')
const os = require('os')

const port = process.env.PORT || '0.0.0.0:50051'
const hostname = os.hostname()

// Implements the greet method
function greet (call, callback) {
	const reply = new messages.GreetResponse()
	const meta = call.metadata.get('authorization')
	console.log(`got metadata: ${meta}`, JSON.stringify(call.metadata))
	// The pattern here is set{field}, so if your proto message field is `text`, it will be `setText`
	reply.setText(`${hostname}: Hello, ${call.request.getText()}`)
	callback(null, reply)
}

// Starts a gRPC server that receives requests from the Echo service at the sample server port
function main() {
	const server = new grpc.Server()
	server.addService(services.EchoService, {
		greet
	})
	server.bind(port, grpc.ServerCredentials.createInsecure())
	console.log(`${hostname} listening to port ${port}. press ctrl + c to cancel.`)
	server.start()
}

main()
