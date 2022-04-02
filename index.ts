import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import bodypaser from 'body-parser'
import { PrismaClient } from "@prisma/client"
dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(bodypaser.json())
// app.use(express.json())
const prisma = new PrismaClient()

app.post("/", async (req: Request, res: Response) => {
    const { username, password } = req.body
    const user = await prisma.user.create({
        data: {
            username: username,
            password: password,
        }
    })
    res.json(user)
})

app.post("/createManyUsers", async (req: Request, res: Response) => {
    const { userList } = req.body
    const user = await prisma.user.createMany({
      data: userList
    })
    res.json(user)
})

app.post("/createManyCars", async (req: Request, res: Response) => {
    const { carList } = req.body
    const cars = await prisma.car.createMany({
      data: carList
    })
    res.json(cars)
})

app.get("/", async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        include:{cars:true},
    })
    res.json(users)
})


app.get("/byId/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    const users = await prisma.user.findUnique({
        where:{
            id:Number(id),
        }
    })
    res.json(users)
})

app.put("/", async (req: Request, res: Response) => {
    const { id, username, password } = req.body
    const updatedUser = await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            username: username,
            password: password
        },
    })
    res.json(updatedUser)
})

app.delete("/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    const deletedUser = await prisma.user.delete({
        where: {
            id: Number(id),
        },
    })
    res.json(deletedUser)
})

// app.get('/', (req: Request, res: Response) => {
//     res.send('Express + TypeScript Server')
// })

// app.get('/about', (req: Request, res: Response) => {
//     res.send('Route about called')
// })

// app.post('/about', (req: Request, res: Response) => {
//     console.log(req.body)

//     const temp: {
//         username: string,
//         array: number[],
//         persons?: {
//             age: string,
//         }[]
//     } = req.body
//     res.send((temp.persons?.[0].age) ?? "Not found")

// })



app.listen(port, () => {
    console.log(`[server] is running at https://localhost:${port}`)
})