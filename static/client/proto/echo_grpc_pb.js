// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var proto_echo_pb = require('../proto/echo_pb.js');

function serialize_echo_GreetRequest(arg) {
  if (!(arg instanceof proto_echo_pb.GreetRequest)) {
    throw new Error('Expected argument of type echo.GreetRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_echo_GreetRequest(buffer_arg) {
  return proto_echo_pb.GreetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_echo_GreetResponse(arg) {
  if (!(arg instanceof proto_echo_pb.GreetResponse)) {
    throw new Error('Expected argument of type echo.GreetResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_echo_GreetResponse(buffer_arg) {
  return proto_echo_pb.GreetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var EchoService = exports.EchoService = {
  greet: {
    path: '/echo.Echo/Greet',
    requestStream: false,
    responseStream: false,
    requestType: proto_echo_pb.GreetRequest,
    responseType: proto_echo_pb.GreetResponse,
    requestSerialize: serialize_echo_GreetRequest,
    requestDeserialize: deserialize_echo_GreetRequest,
    responseSerialize: serialize_echo_GreetResponse,
    responseDeserialize: deserialize_echo_GreetResponse,
  },
};

exports.EchoClient = grpc.makeGenericClientConstructor(EchoService);
