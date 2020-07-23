const express = require('express')
const bodyParser = require('body-parser')
const { dialogflow, Image, } = require('actions-on-google')

const dialogflowApp = dialogflow()

dialogflowApp.intent('Default Welcome Intent', conv => {
    conv.ask('Hi, how is it going?')
    conv.ask(`Here's a picture of a cat`)
    conv.ask(new Image({
        url: 'https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/imgs/160204193356-01-cat-500.jpg',
        alt: 'A cat',
    }))
})

dialogflowApp.intent('Goodbye', conv => {
    conv.close('See you later!')
})

dialogflowApp.intent('Default Fallback Intent', conv => {
    conv.ask(`I didn't understand. Can you tell me something else?`)
})

const expressApp = express().use(bodyParser.json())
expressApp.use(express.static('public'))
expressApp.post('/fulfillment', dialogflowApp)
expressApp.listen(3000, () => console.log(`Express app listening at http://localhost:3000`))