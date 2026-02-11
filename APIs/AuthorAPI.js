import exp from 'express'
import { register, authenticate} from "../services/AuthService.js"
import { UserTypeModel } from '../models/UserModel.js'
import { ArticleModel } from '../models/ArticleModel.js'
import { checkAuthor } from '../Middlewares/checkAuthor.js'
import { verifyToken } from '../Middlewares/verifyToken.js'
//create mini server
export const authorRoute = exp.Router()

//Register author(public)
authorRoute.post('/users', async (req, res) =>{

    //get userObj from body
    let userObj = req.body

    //call register
    const newUserObj = await register({...userObj, role: "AUTHOR"})
    
    //send res
    res.status(201).json({message: "Author created", payload: newUserObj})
})

// //Authenticate author(public)
// authorRoute.post("/authenticate", async(req, res) => {
//     //get user credentials obj from req body
//     let userCred = req.body
//     //call authenticate service
//     let {token, user} = await authenticate(userCred)
//     //save received token as HttpOnlyCookie
//     res.cookie("token", token,{
//         httpOnly: true,
//         sameSite: "lax",
//         secure: false
//     })
//     //send res
//     res.status(201).json({message: "Login success", payload: user})
// })

// //Create article(protected)
// authorRoute.post('/articles', verifyToken, checkAuthor, async (req, res) => {
//     //get article from body
//     let atricleObj = req.body

//     //already middleware checks author
//     let author = await UserTypeModel.findById(atricleObj.author)

//     //create article documnet
//     const articleDoc = new ArticleModel(atricleObj)

//     //save
//     let createdArticleDoc = await articleDoc.save()

//     //send res
//     res.status(201).json({message: "article published successfully", payload: createdArticleDoc})
// })

//Read articles of their own(protected)
authorRoute.get('/articles/:authorId', verifyToken, checkAuthor, async(req, res) => {
    //get author id
    let authorId = req.params.authorId

    //already middleware checks author
    let author = await UserTypeModel.findById(authorId)

    //read articles by this author
    let articles = await ArticleModel.find({author: author._id, isArticleActive: true}).populate("author", "firstName email")

    //send res
    res.status(200).json({message: "Articles", payload: articles})
})

//Edit article(protected)
authorRoute.put('/articles', verifyToken, checkAuthor, async(req, res) => {
    //get modifiedArticle author from req
    let {articleId, title, category, content, author} = req.body

    //find article with the id
    let articleOfDb = await ArticleModel.findOne({_id: articleId, author: author})
    if(!articleOfDb){
        res.status(401).json({message: "No such article from this author"})
    }

    //update the article
    let updatedArticle = await ArticleModel.findByIdAndUpdate(articleId,{
        $set: {title, category, content}
    },
        {new: true}
    )

    //send res(updated article)
    res.status(201).json({message: "Article edited", payload: updatedArticle})
})

//Delete(soft delete) article(protected)
authorRoute.put('/articles/delete', verifyToken, checkAuthor, async(req, res) =>{
    let {author, articleId} = req.body
    //find article with the articleId
    let articleOfDb = await ArticleModel.findOne({_id: articleId, author: author})
    if(!articleOfDb){
        res.status(401).json({message: "No such article from this author"})
    }

    //make it inactive i.e soft delete
    await ArticleModel.updateOne({_id: articleId}, {$set: {isArticleActive: false}})
    res.status(201).json({message: "Article deleted"})
})  