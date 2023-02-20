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