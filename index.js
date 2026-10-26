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