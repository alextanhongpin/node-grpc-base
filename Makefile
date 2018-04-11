PROTO_DIR := proto
PROTO_NAME := echo
PROTO_DIST := static/{client,server}

# Performs the necessary installation of the tools required for node grpc, requires node to be installed
setup:
	@npm install -g grpc-tools

# From the root directory
# --js_out: set the js output file to be the same as that of the current proto file
# --grpc_out: set the grpc output file to be the same as that of the current proto file
# proto/echo.proto: the path of the proto file, relative to the root directory
compile:
	grpc_tools_node_protoc \
		--js_out=import_style=commonjs,binary:${PROTO_DIST} \
		--grpc_out=${PROTO_DIST} \
		--plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` ${PROTO_DIR}/${PROTO_NAME}.proto

up:
	@docker-compose up -d

down:
	@docker-compose down