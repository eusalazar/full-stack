import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'

// modules for server side rendering
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import MainRouter from './../client/MainRouter'
import { StaticRouter } from 'react-router-dom'

import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles'
import theme from './../client/theme'
//end

// mount routes
app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/', shopRoutes)
app.use('/', productRoutes)
app.use('/', orderRoutes)