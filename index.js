import express from 'express'
import pg from 'pg'
impor Joi from 'joi'

const app = express()
const port = 3000
const { Pool }   = pg

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mahasiswa',
    password: 'derek123',
})

app.use((req, res, next) => {
    const start = Date.now()
    console.log({
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        duration: `${Date.now() - start}ms`
    })

    next()
})


