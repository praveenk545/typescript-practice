const http = require("node:http");
const fs = require("node:fs/promises")
class Oonishi {
  constructor() {
    this.server = http.createServer();
    /**
     * {
     * "get /"; () =>{}
     * "post /upload"; () =>{}
     * }
     * this.routes["get /"] () 
     */
    this.routes = {}
    this.middleware =[]
    this.server.on("request",(req,res)=>{
    

        //send a file back to the client
    res.sendFile = async (path,mime)=>{
        const fileHnadle = await fs.open(path,'r');
        const fileSteam = fileHnadle.createReadStream();
        res.setHeader('Content-Type', mime);
        fileSteam.pipe(res)
    };

    // Set the status code of the response
     res.status = (code)=>{
        res.statusCode = code ;
        return res;
     }
    
     // Send a json data back to the client (for small json data, less than the higewatermark)
     // highwatermark = internal buffer of the stream

     res.json = (data)=>{
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
     }

    // if the routes object does not have a key of req.method + req.url return 404

      

   // Run all the middleware function before we run the corresponding route
    // this.middleware[0](req, res, ()=>{
    //   this.middleware[1](req, res,()=>{
    //    this.middleware[2](req,res, ()=>{
    //         this.routes[req.method.toLocaleLowerCase()+req.url](req, res)
    //    })
    //   })
    // })

 // Recursion

     const runMiddleware =((req, res, middleware, index)=>{
      // Our exit point
       if(index == this.middleware.length){
            if(!this.routes[req.method.toLocaleLowerCase() + req.url]){
       return res.status(404).json({error: `Cannot ${req.method} ${req.url}`})
    }
              this.routes[req.method?.toLocaleLowerCase()+req.url](req, res);
       }else{

         middleware[index](req, res, ()=>{
          runMiddleware(req,res, middleware, index+1)
         })

       }
     })
     runMiddleware(req,res, this.middleware, 0)

      //  this.routes[req.method.toLocaleLowerCase()+req.url](req, res)
    });
  }
  route(method,path, cb){
    this.routes[method+path]=cb;
  }
beforeEach(cb){
  this.middleware.push(cb);
}

  listen(port, cb) {
    this.server.listen(port,()=>{
        cb();
    })
  };
}
module.exports = Oonishi;
