import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import bodypaser from 'body-parser'
import { PrismaClient } from "@prisma/client"
import cors from 'cors';

dotenv.config()

const app: Express = express()
const port = process.env.PORT

const allowedOrigins = ['http://localhost:3006'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(bodypaser.json())
app.use(cors(options));

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

app.get("/getallCars", async (req: Request, res: Response) => {
    const cars = await prisma.car.findMany()
    res.json(cars)
})

app.get("/getCar", async (req: Request, res: Response) => {
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




app.listen(port, () => {
    console.log(`[server] is running at https://localhost:${port}`)
})