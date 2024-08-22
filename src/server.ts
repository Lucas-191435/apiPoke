import app from './app'
import {consoleColors} from './utils/helpers'

const port = process.env.PORT

app.listen(port, () => {
  console.log(
    consoleColors.Green,
    `Server running on: ${process.env.APP_URL}.\n`,
  )
})
