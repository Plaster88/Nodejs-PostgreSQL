import * as express from 'express'
import router from './routers'

const app = express()

app.listen(3000)

app.use(express.json())

app.use('/user', router)
