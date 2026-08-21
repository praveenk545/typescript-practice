const { title } = require("process");
const Oonishi = require("../oonishi");

const PORT = 9001;
const USERS = [
    { id:1, name:'test user', username:'test1', password : 'string'},
    { id:3, name:'test 2', username:'test2', password : 'string'},
    { id:4, name:'test 3', username:'test3', password : 'string'},
];
const POSTS = [{
    id:1, title: "This is post title", body:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe pariatur sapiente neque quos fugit, sint molestiae? Eveniet, sint, odio voluptates, vel aliquam nostrum libero earum qui eius aspernatur consectetur amet.',
    userId:1,
}]
const server = new Oonishi();

// ------- File Routes -------//
server.route("get",'/', (req, res)=>{
    res.sendFile("./public/index.html", "text/html");
})

server.route("get",'/api/login', (req, res)=>{
    res.sendFile("./public/login.html", "text/html");
})

server.route("get", '/styles.css',(req, res)=>{
   res.sendFile("./public/styles.css", "text/css")
})

server.route("get", '/scripts.js',(req, res)=>{
   res.sendFile("./public/scripts.js", "text/javascript")
})

 //--------------JSON Routes --------//

 // Send the lust of all the posts that we have
server.route("post", "/api/login", (req, res) => {

    let body = "";

    req.on("data", (chunk) => {
        body += chunk.toString("utf-8");
    });

    req.on("end", () => {

        try {
            body = JSON.parse(body);

            const username = body.username;
            const password = body.password;

            const user = USERS.find(
                (user) => user.username === username
            );

            if (user && user.password === password) {

                res.status(200).json({
                    message: "Logged in successfully"
                });

            } else {

                res.status(401).json({
                    error: "Invalid username or password"
                });

            }

        } catch (error) {

            res.status(400).json({
                error: "Invalid JSON"
            });

        }
    });
});


 server.route("get", "/api/user", (req ,res)=>{
    
 })


 server.route("get", '/api/posts',(req, res)=>{
    const posts = POSTS.map((post)=>({ 
       author :USERS.find((user)=>user.id===post.userId)?.name,
       ...post,
    }));
    res.status(200).json(posts);
})

server.listen(PORT, ()=>{
    console.log('Server has started on port ', `${PORT}`);
    
})