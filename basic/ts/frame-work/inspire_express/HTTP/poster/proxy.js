const http = require("http");

const PORT = 9000;

// These are the backend servers.
// The proxy will forward incoming requests to these servers.
const mainServers = [
    { host: "localhost", port: 9001 },
    { host: "localhost", port: 9002 },
];

// Create the proxy server
const proxy = http.createServer();


// --------------------------------------------------
// Incoming request from the client/browser
// --------------------------------------------------

proxy.on("request", (clientRequest, proxyResponse) => {

    // select a server to route the incoming request to
    // using round-robin algorithm
    //
    // First request  -> 9001
    // Second request -> 9002
    // Third request  -> 9001
    // Fourth request -> 9002

    const mainServer = mainServers.shift();

    // Put the selected server back at the end of the array.
    // This makes the next request go to the next server.
    mainServers.push(mainServer);


    // --------------------------------------------------
    // Create a request to one of our main/backend servers
    // --------------------------------------------------

    const proxyRequest = http.request({

        // Backend server hostname
        host: mainServer.host,

        // Backend server port
        port: mainServer.port,

        // Keep the same URL/path from the client
        // Example: /api/login
        path: clientRequest.url,

        // Keep the same HTTP method
        // Example: GET, POST
        method: clientRequest.method,

        // Forward the client's headers
        headers: clientRequest.headers

    });


    // --------------------------------------------------
    // Once we receive a response from our main server
    // --------------------------------------------------

    proxyRequest.on("response", (mainServerResponse) => {

        // Set the status code and headers for the response
        // that we are sending back to the client

        proxyResponse.writeHead(
            mainServerResponse.statusCode,
            mainServerResponse.headers
        );


        // Finally write the body of the main server's response
        // to the body of proxy's response
        //
        // Example:
        //
        // Backend 9001
        //      ↓
        // mainServerResponse
        //      ↓
        // proxyResponse
        //      ↓
        // Browser

        mainServerResponse.pipe(proxyResponse);

    });


    // --------------------------------------------------
    // Handle backend server connection errors
    // --------------------------------------------------

    // This is important.
    //
    // If server 9001 or 9002 is not running,
    // http.request() will produce an error.
    //
    // Without this error handler, Node.js can crash
    // because of an unhandled "error" event.

    proxyRequest.on("error", (error) => {

        console.error(
            `Could not connect to ${mainServer.host}:${mainServer.port}`
        );

        console.error(error.message);


        // Tell the browser that the proxy could not
        // communicate with the backend server.

        proxyResponse.writeHead(502, {
            "Content-Type": "application/json"
        });


        // Send a JSON error response to the browser

        proxyResponse.end(JSON.stringify({
            error: "Bad Gateway",
            message: `Backend server ${mainServer.port} is unavailable`
        }));

    });


    // --------------------------------------------------
    // Send the client's request body to the backend
    // --------------------------------------------------

    // This is especially important for POST requests.
    //
    // Example:
    //
    // Browser
    //    ↓
    // POST /api/login
    // username + password
    //    ↓
    // clientRequest
    //    ↓
    // proxyRequest
    //    ↓
    // Backend server

    clientRequest.pipe(proxyRequest);

});


// --------------------------------------------------
// Start the proxy server
// --------------------------------------------------

proxy.listen(PORT, () => {

    console.log(
        `Server is now listening on PORT ${PORT}`
    );

});