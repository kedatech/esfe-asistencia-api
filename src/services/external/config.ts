require('dotenv').config();
import axios from 'axios'

export const apiesfeurl = process.env.ESFE_API

export const esfeapi = axios.create({
  baseURL: apiesfeurl
})