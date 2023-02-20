// implemented all the npm install, cors, dotenv, express, and openai
import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config() // so you can use the dotenv variables

// configuration implemented with the openAI key
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration) // introduce the openAI instance

const app = express()
app.use(cors()) // middleware
app.use(express.json()) // pass json to backend

app.get('/', async(req, res) => {
     res.status(200).send({
        message:'hello there',
     })
})

// payload from frontend
app.post('/', async(req, res) => {
    try{
        const prompt = req.body.prompt

        // function that takes object
        const response = await openai.createCompletion({
            // essential settings for openAI
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            stop: ["\"\"\""]
        })
    } catch(error){

    }
})