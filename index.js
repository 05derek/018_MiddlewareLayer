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

function succesResponse(res, message, data, status = 200) {
    return res.status(status).json({
        success: true,
        message,
        data,
        error: null,
    })
}

function errorResponse(res, message, error, status = null) {
    return res.status(status).json({
        success: false,
        message,
        data: null,
        error:details,
    })
}

const biodataSchema = Joi.object({
    id: Joi.number().integer().positive(),
    nama: Joi.string().trim().min(2).max(100).required(),
    nim: Joi.string().trim().min(5).max(20).required(),
    kelas: Joi.string().trim().min(1).max(20).required(),
})

const idSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
})

function validateBody(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            convert: true,
            allowUnknown: false,
        })
        if (error) {
            return errorResponse(
                res, 
                'Validasi input gagal',
                 error.details.map(item => ({
                    field: item.path.join('.'),
                    message: item.message,
                 }))
            )
        }
        next()
    }
}