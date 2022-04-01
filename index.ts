import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import bodypaser from 'body-parser'
dotenv.config()

const app: Express = express()
const port = process.env.PORT
app.use(bodypaser.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server')
})

app.get('/about', (req: Request, res: Response) => {
    res.send('Route about called')
})

app.post('/about', (req: Request, res: Response) => {
    console.log(req.body)

    const temp: {
        username: string,
        array: number[],
        persons?: {
            age: string,
        }[]
    } = req.body
    res.send((temp.persons?.[0].age) ?? "Not found")

})

app.listen(port, () => {
    console.log(`[server] is running at https://localhost:${port}`)
})