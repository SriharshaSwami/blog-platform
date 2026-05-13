import { config } from 'dotenv' // Trigger restart
config()
import exp from 'express'
import { connect } from 'mongoose'
import { userRoute } from './APIs/UserAPI.js'
import { adminRoute } from './APIs/AdminAPI.js'
import { authorRoute } from './APIs/AuthorAPI.js'
import cookieParser from 'cookie-parser'
import { commonRoute } from './APIs/CommonAPI.js'
import cors from 'cors'

//creates express app
export const app = exp()

//ues cors middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'https://blog-platform-nine-mu.vercel.app',
    'https://blog-platform-git-main-sriharshaswamy-gmailcoms-projects.vercel.app',
  ],
  credentials: true,
}))

//add body parser middleware
app.use(exp.json())

//add cookie parser middleware
app.use(cookieParser())

//connect APIs
app.use('/user-api', userRoute)
app.use('/author-api', authorRoute)
app.use('/admin-api', adminRoute)
app.use('/common-api', commonRoute)

//connect to DB
const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI || process.env.DB_URL)
    console.log("DB connection is successful!")
    //start http server and assign port no
    const port = process.env.PORT || 5000
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })
  }
  catch (err) {
    console.log("DB connection error", err.message)
  }
}
connectDB()

//invalid path handling
app.use((req, res, next) => {
  res.status(404).json({ message: `${req.url} is Invalid Path` })
})

app.post('/logout', (req, res) => {
  //clear the cookie name 'token'
  //Must match original settings
  const isProduction = process.env.NODE_ENV === 'production';
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
    path: "/"
  })

  res.status(200).json({ message: "Logged out successfully" })
})

//err handling middleware
app.use((err, req, res, next) => {

  console.log("Error name:", err.name);
  console.log("Error code:", err.code);
  console.log("Full error:", err);

  // mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // mongoose cast error
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} ${value} already exists`,
    });
  }

  // ✅ HANDLE CUSTOM ERRORS
  if (err.status) {
    return res.status(err.status).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // default server error
  res.status(500).json({
    message: "error occurred",
    error: "Server side error",
  });
});