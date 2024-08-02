// authServiceClient.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const path = require('path');


const PROTO_PATH = path.join(__dirname, '../../../OrderApp/AuthService/src/protos/auth.proto')
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);

// Load the package definition into gRPC
const authService = grpc.loadPackageDefinition(packageDefinition).auth;

// Create the client instance
const authClient = new authService.AuthService('localhost:50051', grpc.credentials.createInsecure());

// Export the client for use in other parts of the application
module.exports = authClient;
