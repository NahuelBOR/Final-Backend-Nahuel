import { Router } from "express";
import passport from "passport";
import { isAuthenticated } from "../utils/middleware/auth.js";


const githubRouter = Router()

githubRouter.get('/github', passport.authenticate("github", {}) ,(req, res) => {})
githubRouter.get('/callbackGithub', passport.authenticate("github", {}) ,(req, res) => {

    req.session.user = req.user

    res.setHeader('Content-Type', 'application/json')
    return res.status(200).json({payload:req.user})
})

githubRouter.get('/current', isAuthenticated,(req, res) => {
    return res.status(200).json({payload: req.session})
})

export default githubRouter