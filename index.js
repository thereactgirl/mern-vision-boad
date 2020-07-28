const express = require('express'); 
const app = express();
app.set('view engine', 'pug')
app.use(express.static('public'))
require('dotenv').config();
const bodyParser = require('body-parser'); // allows express to read data sent from the from in index.html
const MongoClient = require('mongodb').MongoClient
const port = 8000

MongoClient.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.18zol.mongodb.net/visiondb?retryWrites=true&w=majority`, {
    useUnifiedTopology: true
})
    .then((client) => {
        console.log('Connected to Database')
        const db = client.db('visiondb')
        const visionCollection = db.collection('visions')
        // app.use('/', router)
        app.get('/', (req, res) => {
            // res.sendFile(__dirname + '/index.html')
            db.collection('visions').find().toArray()
            .then(results => {
                // console.log(results)
                res.render('index', { visions: results})
            })
            .catch(err => {
                console.log(err)
            })
            // res.render('index', {})
        })
        
        app.post('/visions', (req, res) => {
            console.log(req.body)
            visionCollection.insertOne(req.body)
            .then(result => {
                // console.log(res)
                res.redirect('/')
            })
        })
        
    })
    .catch((err) =>{
        console.error(err)
    })

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`listening on ${port}`)
})
