import cors from 'cors'
import express, { json, Request, Response, urlencoded } from 'express'
import { join } from 'path'
import routes from './routes'

const app = express()

app.use(cors({
  origin: [
    "https://digitaleazy.dev.br",
    "https://backoffice-hml.digitaleazy.dev.br",
    "https://backoffice-prod.digitaleazy.dev.br",
    "https://api-prod.digitaleazy.dev.br",
    "https://api-hml.digitaleazy.dev.br"
  ],
}))

app.use(json())
app.use(urlencoded({ extended: true }))

app.use('/avatars', express.static(join(__dirname, 'tmp', 'avatars')))

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    name: 'DigitalEazy-WebApp-API',
    version: process.env.npm_package_version,
    env: process.env.ENVIRONMENT
  })
})

app.use('/', routes) 

export default app
