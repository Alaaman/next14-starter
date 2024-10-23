import { Post } from "@/lib/models"
import { connectToDb } from "@/lib/utils"
import { NextResponse } from "next/server"

// GET POST BY ID
export const GET = async (request, {params}) => {
    const {slug} = params
    try{
        connectToDb()
        const post = await Post.findOne({slug})    
        return NextResponse.json(post)
    }
    catch(err){
        console.log(err)
        throw new Error("Failed to fetch post!")
    }
}

// DELETE POST BY ID
export const DELETE = async (request, {params}) => {
    const {slug} = params
    try{
        connectToDb()
        await Post.findByIdAndDelete({slug})    
        return NextResponse.json(`Post (${slug}) deleted!`)
    }
    catch(err){
        console.log(err)
        throw new Error(`Failed to delete post (${slug})!`)
    }
}