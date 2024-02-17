import express from "express";
import httpServer from "http";
import { Server } from "socket.io";
import cors from "cors";
import { Client } from "@elastic/elasticsearch";
import { v4 as uuidv4 } from "uuid";
import nlp from "compromise";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

const http = httpServer.createServer(app);

// app.use(routes);

http.listen(8000, () => {
  console.log("listening on *:8000");
});

const client = new Client({ node: "http://localhost:9200" });

async function createMessage(body) {
  try {
    await client.index({
      index: "messages",
      body,
    });
  } catch (error) {
    console.error("Error indexing document:", error);
  }
}

async function createUser(body) {
  try {
    const response = await client.index({
      index: "users",
      body,
    });
    console.log("Document indexed:", response);
  } catch (error) {
    console.error("Error indexing document:", error);
  }
}

async function getReplies(messageId) {
  try {
    const response = await client.search({
      index: "messages",
      body: {
        query: {
          match: {
            parentId: messageId,
          },
        },
      },
    });

    return response.hits.hits;
  } catch (error) {
    console.error(error);
  }
}

async function getSuggestionResults(message) {
  try {
    const response = await client.search({
      index: "messages",
      body: {
        query: {
          match: {
            message, // Search text
          },
        },
      },
    });

    const messageIds = response.hits.hits.map((hit) => hit._source.id);

    const promises = messageIds.map((id) =>
      client.search({
        index: "messages", // Specify your Elasticsearch index name
        body: {
          query: {
            match: {
              parentId: id,
            },
          },
        },
      })
    );

    const relatedMessagesResponse = await Promise.allSettled(promises);

    const results = relatedMessagesResponse
      .flatMap((response) => response.value.hits.hits)
      .filter(Boolean);

    return results;
  } catch (error) {
    console.error(error);
  }
}

async function getMessages(index) {
  try {
    const response = await client.search({
      index,
      body: {
        query: {
          bool: {
            must_not: {
              exists: {
                field: "parentId",
              },
            },
          },
        },
      },
    });

    return response.hits.hits;
  } catch (error) {
    console.error("Error searching documents:", error);
  }
}

const io = new Server(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const isQuestion = (text) => {
  const doc = nlp(text);

  return doc.questions().out("array").length > 0;
};

app.post("/message/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { message, parentId } = req.body;

  const body = {
    id: uuidv4(),
    message: message,
    owner: userId,
    timestamp: new Date(),
    parentId: !!parentId ? parentId : null,
    isQuestion: isQuestion(message),
  };

  await createMessage(body);

  // io.to(userId).emit('message', message);
  res.send(body);
});

app.get("/messages", async (req, res) => {
  const result = await getMessages("messages");
  res.send(result);
});

app.get("/message/:messageId/replies", async (req, res) => {
  const messageId = req.params.messageId;

  const result = await getReplies(messageId);
  res.send(result);
});

app.post("user/:userName", async (req, res) => {
  const userName = req.params.userName;
  const body = {
    id: uuidv4(),
    userName: userName,
  };

  await createUser(body);

  res.send(userName);
});

app.get("/index", (req, res) => {
  indexDocument();
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  console.log("A user connected");
  // io.emit("new connection", "new connection");
  socket.on("chat message", async (msg) => {
    console.log("Message from client:", msg);

    const body = {
      id: uuidv4(),
      message: msg.message,
      userName: msg.userName,
      userId: msg.userId,
      timestamp: new Date(),
      parentId: !!msg.parentId ? msg.parentId : null,
      isQuestion: isQuestion(msg.message),
    };

    await createMessage(body);

    if (body.isQuestion) {
      const suggestionsMessage = await getSuggestionResults(body.message);
      const normalizedMessages = suggestionsMessage?.map(
        (messageDetails) => messageDetails._source
      );

      io.emit("chat message", { ...body, suggestions: normalizedMessages });
    }

    // Broadcast the message to all connected clients
    io.emit("chat message", body);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
