import exp from 'express'
import { register, authenticate } from '../services/AuthService.js'
import { verifyToken } from '../Middlewares/verifyToken.js'
import { checkUser } from '../Middlewares/checkUser.js'
import { ArticleModel } from '../models/ArticleModel.js'
//create mini server
export const userRoute = exp.Router()

//Register user(public)
userRoute.post('/users', async (req, res) =>{

    //get userObj from body
    let userObj = req.body

    //call register
    const newUserObj = await register({...userObj, role: "USER"})
    //send res
    res.status(201).json({message: "User created", payload: newUserObj})
})


//Read all articles(protected)
userRoute.get('/articles/:uid', verifyToken, checkUser, async(req, res) =>{
    //middleware already checks for user
    let articles = await ArticleModel.find({isArticleActive: true})

    //send res
    res.status(201).json({message: "Articles are", payload: articles})
})

//Add comment to an article(protected)
userRoute.put('/articles', verifyToken, checkUser, async (req,res) =>{
    //get commentText and articleId from req body
    let {articleId, comment: commentText} = req.body

    //find article
    let article = await ArticleModel.findById(articleId)
    if(!article){
        return res.status(401).json({message: "Article not found"})
    }

    //create userCommentObj matching userCommentSchema
    const userCommentObj = {
        user: req.userId,    // userId from verifyToken middleware
        comment: commentText   // comment text from request body
    }

    //add comment to comments array
    article.comments.push(userCommentObj)

    //save article with new comment
    await article.save()

    //send res
    res.status(200).json({message: "Commented successfully", payload: userCommentObj})
})
