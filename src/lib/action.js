"use server"
import { revalidatePath } from "next/cache"
import { Post, User } from "./models"
import { connectToDb } from "./utils"
import { signIn, signOut } from "./auth"
import bcrypt from "bcryptjs"
import { sign } from "crypto"

//Add post
export const addPost = async (formData) => {

   /*  const title = formData.get("title")
    const desc = formData.get("desc")
    const slug = formData.get("slug")
    const userId = formData.get("userId") */

    const { title, desc, slug, userId } = Object.fromEntries(formData)

    try{
        connectToDb()
        const newPost = new Post({
            title,
            desc,
            slug,
            userId,
        })
        await newPost.save()
        console.log("Saved to db")
        revalidatePath("/blog")
    }
    catch(err){
        console.log(err)
        return { error: "Something went wrong!" }
    }
    
}

//DELETE post
export const deletePost = async (formData) => {

    const { id } = Object.fromEntries(formData)

    try{
        connectToDb()
        
        await Post.findByIdAndDelete(id)
        console.log("Deleted from db")
        revalidatePath("/blog")
    }
    catch(err){
        console.log(err)
        return { error: "Something went wrong!" }
    }
    
}

//SIGNIN WITH GITHUB METHOD
export const handleGithubLogin = async () => {
    "use server";
    await signIn("github");
}


//REGISTER METHOD
export const register = async (formData) => {
    const { username, email, password, img, passwordRepeat } = Object.fromEntries(formData)

    if(password !== passwordRepeat){
        return "Passwords do not match"
    }

    try{
        connectToDb()

        const user = await User.findOne({username})

        if(user){
            return "Username already exists"
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img
        })
        await newUser.save()
        console.log("saved to db");        
    
    }
    catch(err){
        console.log(err)
        return { error: "Something went wrong!"}
    }

}


//LOGIN WITH CREDENTIALS METHOD
export const login = async (formData) => {
    const { username, password } = Object.fromEntries(formData)

    try{

        await signIn("credentials", {username, password})
    }
    catch(err){
        console.log(err)
        return { error: "Something went wrong!"}
    }

}

