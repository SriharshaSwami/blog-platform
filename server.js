import exp from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import { userRoute } from './APIs/UserAPI.js'
import { adminRoute } from './APIs/AdminAPI.js'
import { authorRoute } from './APIs/AuthorAPI.js'
import cookieParser from 'cookie-parser'
import { commonRoute } from './APIs/CommonAPI.js'
config() //process.env

//
export const app = exp()

//add body parser middleware
app.use(exp.json())

//add cookie parser middleware
app.use(cookieParser())

//connect APIs
app.use('/user-api', userRoute)
app.use('/author-api', authorRoute)
app.use('/admin-api', adminRoute)
app.use('/common-api',commonRoute)

//connect to DB
const connectDB = async () => {
    try{
        await connect(process.env.DB_URL)
        console.log("DB connection is successful!")
        //start http server and assign port no
        const port = process.env.PORT || 3000
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    }
    catch(err){
        console.log("DB connection error", err.message)
    }
}

connectDB()

app.post('/logout', (req,res) =>{
    //clear the cookie name 'token'
    //Must match originam settings
    res.clearCookie('token', {
        httpOnly: true,
        secure: false, 
        sameSite: 'lax'
    })

    res.status(200).json({message: "Logged out successfully"})
})

//Default err handling middleware
app.use((err, req, res, next) => {
    res.status(400).json({message: "Error", Reason: err.message})
})