const { title } = require("process");
const Oonishi = require("../oonishi");


const PORT = 8000;
// A smaple  object in the array would look like
// {userid : 1, token 2343232}

const SESSIONS = [];

const USERS = [
  { id: 1, name: "test user", username: "test1", password: "string" },
  { id: 3, name: "test 2", username: "test2", password: "string" },
  { id: 4, name: "test 3", username: "test3", password: "string" },
];
const POSTS = [
  {
    id: 1,
    title: "This is post title",
    body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe pariatur sapiente neque quos fugit, sint molestiae? Eveniet, sint, odio voluptates, vel aliquam nostrum libero earum qui eius aspernatur consectetur amet.",
    userId: 1,
  },
];
const server = new Oonishi();
 // For authentication
 
server.beforeEach((req, res, next) => {
    const routesToAuthenticate = [
      "GET /api/user", 
      "PUT /api/user", 
      "POST /api/posts", 
      "DELETE /api/logout", 
    ]
      console.log("this is the first midleware function");
    if(routesToAuthenticate.indexOf(req.method + " "+ req.url)!==-1){
      //if we have a token cookie, then save the userId to the req object

    if(req.headers.cookie){
    const token = req.headers.cookie.split("=")[1];
  const session = SESSIONS.find((s) => s.token == token);
  if (session) {
    req.userId = session.userId;
    return next();

  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
    }

    return res.status(401).json({error:"Unauthorized"})
    }
    else{
      next();
    }

});
// server.beforeEach((req, res, next) => {
//   setTimeout(() => {
//     console.log("this is the 2 midleware function");
//     next();
//   }, 2000);
// });
// server.beforeEach((req, res, next) => {
 
//     console.log("this is the 3 midleware function");
//  next();
// });

// ------- File Routes -------//
server.route("get", "/", (req, res) => {
    console.log(' This is the / Route');
    
  res.sendFile("./public/index.html", "text/html");
});

server.route("get", "/api/login", (req, res) => {
  res.sendFile("./public/login.html", "text/html");
});

server.route("get", "/profile", (req, res) => {
  res.sendFile("./public/index.html", "text/html");
});

server.route("get", "/styles.css", (req, res) => {
  res.sendFile("./public/styles.css", "text/css");
});

server.route("get", "/scripts.js", (req, res) => {
  res.sendFile("./public/scripts.js", "text/javascript");
});

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

      const user = USERS.find((user) => user.username === username);

      if (user && user.password === password) {
        // At this point, weknow that the client is who they say they are

        const token = Math.floor(Math.random() + 1000000000)?.toString();

        // save the generated token
        SESSIONS.push({ userId: user.id, token: token });
        res.setHeader("Set-Cookie", `token=${token}; Path=/;`);

        res.status(200).json({
          message: "Logged in successfully",
        });
      } else {
        res.status(401).json({
          error: "Invalid username or password",
        });
      }
    } catch (error) {
      res.status(400).json({
        error: "Invalid JSON",
      });
    }
  });
});

// Log a user out
server.route("delete", "/api/logout", (req, res) => {});

// get user posts
server.route("get", "/api/posts", (req, res) => {});

// create a new post
server.route("post", "/api/posts", (req, res) => {});

// Send user info
server.route("get", "/api/user", (req, res) => {
          // Send the user profile info;
  const user = USERS.find((f) => f.id === req.userId);
    res.json({ username: user.username, name: user.name });
  // const token = req.headers.cookie.split("=")[1];
  // const session = SESSIONS.find((s) => s.token == token);
  // if (session) {
  //   // Send the user profile info;
  //   const user = USERS.find((f) => f.id === session.userId);
  //   res.json({ username: user.username, name: user.name });
  // } else {
  //   res.status(401).json({ error: "Unauthorized" });
  // }
  // console.log(token);
});

server.route("get", "/api/posts", (req, res) => {
  const posts = POSTS.map((post) => ({
    author: USERS.find((user) => user.id === post.userId)?.name,
    ...post,
  }));
  res.status(200).json(posts);
});

server.listen(PORT, () => {
  console.log("Server has started on port ", `${PORT}`);
});
