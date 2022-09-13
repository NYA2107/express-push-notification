const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const webpush = require('web-push')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Save Subscription Section
const dummyDb = {subscribtion: null}

const saveToDatabase = async (subscribtion) =>{
  dummyDb.subscribtion = subscribtion
}

app.post('/save-subscription', async (req, res) => {
  const subscription = req.body
  await saveToDatabase(subscription)
  res.json({ message:'success' })
})

// web push config section

const vapidKeys = {
  publicKey:'BMDLwT2U28PsQyZI30drgpA_0t-RU_XQjlr34vE9GDMfvqHHwl6ZhJPr9SNiuMFezbeJcQHdAInZlizJj7mjaqM',
  privateKey:'XvPseqmSBI1IjGL-ubstCC4-BI6884GfkjEAQ68CFxc'
}

webpush.setVapidDetails(
  'mailto:imamnajibulloh.in@gmail.com', 
  vapidKeys.publicKey, 
  vapidKeys.privateKey
)

const sendNotification = (subscription, dataToSend) => {
  webpush.sendNotification(subscription, dataToSend)
}

app.get('/send-notification', (req, res) => {
  const subscribtion = dummyDb.subscribtion
  const message = req.query.msg
  sendNotification(subscribtion, message)
  res.json({ message: 'message sent' })
})

const port = 4000
app.listen(port, () => {
  console.log(`Listening to Port ${port}`)
})