"use server"
import { revalidatePath } from "next/cache"
import { Post, User } from "./models"
import { connectToDb } from "./utils"
import { signIn, signOut } from "./auth"
import bcrypt from "bcryptjs"
import { sign } from "crypto"

//Add post
export const addPost = async (prevState, formData) => {

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
        revalidatePath("/admin")
    }
    catch(err){
        console.log(err)
        return { error: "Something went wrong!" }
    }
    
}

//Add user
export const addUser = async (prevState, formData) => {
 
     const { username, email, isAdmin, password, img } = Object.fromEntries(formData)
 
     try{
         connectToDb()
         const newUser = new User({
            username,
            email,
            isAdmin,
            password,
            img
         })
         await newUser.save()
         console.log("Saved to db")
         revalidatePath("/blog")
         revalidatePath("/admin")
     }
     catch(err){
         console.log(err)
         return { error: "Something went wrong!" }
     }
     
 }

//DELETE post
export const deletePost = async (formData) => {

    console.log(formData);
    
    const { id } = Object.fromEntries(formData)

    try{
        connectToDb()
        
        await Post.findByIdAndDelete(id)
        console.log("Deleted from db")
        revalidatePath("/blog")        
        revalidatePath("/admin")
    }
    catch(err){
        console.log(err)
        return { error: "Something went wrong!" }
    }
    
}

//DELETE user
export const deleteUser = async (formData) => {

    const { id } = Object.fromEntries(formData)

    try{
        connectToDb()
        
        await User.findByIdAndDelete(id)
        console.log("Deleted from db")
        revalidatePath("/")
        revalidatePath("/admin")
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

//Logout METHOD
export const handleLogout = async () => {
    "use server";
    await signOut();
}



//REGISTER METHOD
export const register = async (prevState, formData) => {
    const { username, email, password, img, passwordRepeat } = Object.fromEntries(formData)

    if(password !== passwordRepeat){
        return { error: "Passwords do not match"}
    }

    try{
        connectToDb()

        const user = await User.findOne({username})

        if(user){
            return { error: "Username already exists"}
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
        return {success: true}        
    
    }
    catch(err){
        console.log(err)
        return { error: "Something went wrong!"}
    }

}


//LOGIN WITH CREDENTIALS METHOD
export const login = async (prevState, formData) => {
    const { username, password } = Object.fromEntries(formData)

    try{

        await signIn("credentials", {username, password})
    }
    catch(err){
        console.log(err)
                
        if(err.message.includes("credentialssignin")){
            return { error: "Invalid username or password" }
        }
        throw err
    }

}

