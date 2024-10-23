import { Post, User } from "./models"
import { connectToDb } from "./utils"
import { unstable_noStore } from "next/cache";



/* Get Posts */
export const getPosts = async () => {
    try{
        connectToDb()
        const posts = await Post.find()
        return posts    
    }
    catch(err){
        console.log(err)
        throw new Error("Failed to fetch posts!")
    }
};

/* Get Post by ID */
export const getPost = async (slug) => {
    try{
        connectToDb()
        const post = await Post.findOne({slug})
        return post
    
    }
    catch(err){
        console.log(err)
        throw new Error("Failed to fetch post!")
    }
}

/* Get Users */
export const getUsers = async () => {
    try{
        connectToDb()
        const users = await User.find()
        return users
    
    }
    catch(err){
        console.log(err)
        throw new Error("Failed to fetch users!")
    }
}

/* Get Users by ID */
export const getUser = async (id) => {
    unstable_noStore()
    try{
        connectToDb()
        const user = await User.findById(id)
        return user
    
    }
    catch(err){
        console.log(err)
        throw new Error("Failed to fetch user!")
    }
}
