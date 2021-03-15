import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from 'pusher';
import cors from 'cors';

const app = express();

const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1171828",
    key: "7ff2bba66766b30b22ed",
    secret: "dc7f2875e25e900abf12",
    cluster: "eu",
    useTLS: true,
  });


app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "•");
//     res.setHeader("Access-Control-Allow-Headers", "•");
//     next();
// });

const connection_url = "mongodb+srv://admin:0202122@cluster0.vyjny.mongodb.net/chatapp?retryWrites=true&w=majority"

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open',() => {
    console.log("db connected");

    const msgCollection = db.collection('messagecontents');
const changeStream = msgCollection.watch();

changeStream.on('change', (change) => {
    console.log(change);

    if (change.operationType === 'insert') {
        const messageDetails = change.fullDocument;
        pusher.trigger('messages', 'inserted', 
        {
            name: messageDetails.name,
            message: messageDetails.message,
            timestamp: messageDetails.timestamp,
            received: messageDetails.received,
        }
        );
    } else {
        console.log('Error triggering')
    }
});
});



app.get('/', (req, res) => res.status(200).send('hellloooo'))

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})

app.listen(port, () => console.log(`Listening on localhost:${port}`))

// DH1EQW57Z86IDvtp