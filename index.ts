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

const prisma = new PrismaClient()


//Get all jonal
app.get("/getallJonal", async (req: Request, res: Response) => {
    const jonalList = await prisma.content.findMany()
    res.json(jonalList)
})

//Create jonal
app.post("/createJonal", async (req: Request, res: Response) => {
    const { title, url_image } = req.body
    const jonal = await prisma.content.create({
        data: {
            title: title,
            url_image: url_image
        }
    })
    res.json(jonal)
})

//Update jonal
app.put("/updateJonal", async (req: Request, res: Response) => {
    const { id, title, url_image } = req.body
    const updateJonal = await prisma.content.update({
        where: {
            id: id
        },
        data: {
            title: title,
            url_image: url_image
        }
    })
    res.json(updateJonal)
})

//Delete jonal
app.delete("/deleteJonal/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    const deleteJonal = await prisma.content.delete({
        where: {
            id: id
        }
    })
    res.json(deleteJonal)
})


// *************
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
    const cars_all = await prisma.car.findMany()
    res.json(cars_all)
})

app.get("/getCar", async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        include: { cars: true },
    })
    res.json(users)
})


app.get("/byId/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    // const users = await prisma.$queryRaw('SELECT *FROM')
    const users = await prisma.user.findUnique({
        where: {
            id: Number(id),
        },
        select: {
            id: true
        }
    })
    const usser1 = users?.id
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