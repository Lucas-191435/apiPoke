import cors from 'cors'
import express, { json, Request, Response, urlencoded } from 'express'
import { join } from 'path'

// import CronService from './modules/cron/cron.service'
import routes from './routes'

const app = express()

// const cronService = new CronService()

// cronService.initialize()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))

app.use('/avatars', express.static(join(__dirname, 'tmp', 'avatars')))
app.use(
  '/avatarsBanners',
  express.static(join(__dirname, 'tmp', 'avatarsBanners')),
)
app.use('/eventoImage', express.static(join(__dirname, 'tmp', 'eventoImage')))
app.use('/mapLocal', express.static(join(__dirname, 'tmp', 'mapLocal')))

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    name: 'PersonalDancer API',
    version: process.env.npm_package_version,
    env: process.env.ENVIRONMENT
  })
})

app.use('/', routes)

export default app
