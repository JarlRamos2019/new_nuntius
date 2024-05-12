const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const Session = require("./session.js");
const cors = require("cors");
const bodyParser = require('body-parser');

const mongoose = require("mongoose");
const app = express();
const router = express.Router();
const port = 4000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cookieParser());

const uri =
"mongodb+srv://jarl:Good54321@dev-nuntius.ksxbiwd.mongodb.net/nuntius?retryWrites=true&w=majority&appName=dev-nuntius";

const Sess = Session;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

// Create session route
app.post("/api/create-session", async (req, res) => {
  try {
      const sessID = Math.floor(Math.random() * 10000000);
      const { nickname, sessionName } = req.body;
      const avatar = 5;

      const newSession = {
          sessionID: sessID,
          sessionName: sessionName,
          messages: []
      };

      const response = await Sess.create(newSession);

      if (response) {
        console.log("Session successfully created");
        console.log("Nickname: " + nickname);
        console.log("Session ID: " + sessID);
        console.log("Session Name: " + sessionName);
        res.json({
            sessionID: sessID,
            nickname: nickname,
            avatar: avatar,
            sessionName: sessionName
        })
      } else {
        console.error("Failed to create new session");
      }
    
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
});

// Join session route
app.post("/api/join-session", async (req, res) => {
  try {
      const { sessionID, nickname } = req.body;
      const avatar = 5;

      const response = await Sess.find({sessionID: sessionID});
      //console.log("join-session: response is: " + JSON.stringify(response));
      if (!response) {
          return res.status(404).json({ message: "Session not found" });
      } else {
        res.json({
          nickname: nickname,
          avatar: avatar,
          sessionID: sessionID,
          sessionName: response[0].sessionName
        });
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
   }
});

app.post('/api/create-new-post', async (req, res) => {
  try {
    const {sessionID, nickname, avatar, content, type} = req.body;

    const msgDoc = {
      nickname: nickname,
      avatar: avatar,
      content: content,
      type: type,
      timestamp: Date.now()
    }

    console.log("Pending message is: " + JSON.stringify(msgDoc));
  
    const theSessionRoom = await Sess.find({sessionID: sessionID});
    // console.log("The Session Room is " + JSON.stringify(theSessionRoom));
    theSessionRoom[0].messages.push(msgDoc);
    await theSessionRoom[0].save();
     
    if (theSessionRoom) {
      const success = "Message successfully added";
      res.json(success);
      console.log(success);
    } else {
      const failure = "The message was not sent";
      res.json(failure);
      console.error(failure);
    }
  } catch (error) {
    console.error("There has been an error creating a new post: " + error);
    res.status(500).send("Internal server error");
  }
})

// this will take in the session ID and pull all the messages
// associated with the session ID

// Main goals: Look into socket.io an get that going
//             Rough draft of React.js code

app.post('/api/fetch-posts', async (req, res) => {
  try {
    console.log("Initiating fetch posts...");
    const {sessionID} = req.body;
    const response = await Sess.find({sessionID: sessionID});

    if (response) {
      if (response.length !== 0) {
        const fetchedPosts = response[0].messages;
        console.log("Session messages successfully retrieved for session: " + JSON.stringify(sessionID));
        res.json({messageData: fetchedPosts});
      } else {
        console.log("No messages yet");
        res.json({messageData: []});
      }
    } else {
      const failure = "Unable to retrieve messages";
      console.error(failure);
      res.json(failure);
    }

  } catch (error) {
    console.error("There has been an error retrieving posts: " + error);
    res.status(500).send("Internal server error");
  }  
})

connect();


// Delete session route
router.delete("/delete-session/:id", async (req, res) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add the router to the Express app
app.use(router);


app.listen(port, () => {
  console.log("Server started on port " + port);
});
