import PostUser from "@/components/postUser/postUser"
import styles from "./singlePost.module.css"
import Image from "next/image"
import { Suspense } from "react"
import { getPost } from "@/lib/data"

// FETCH DATA WITH API
const getData = async (slug) => {
    const res = await fetch(`http://localhost:3000/api/blog/${slug}`, {cache: "no-store"})
    if(!res.ok){
        throw new Error("Something went wrong")
    }
    return res.json()
}



export const generateMetadata = async ({params}) => {
    const {slug} = params

    const post = await getPost(slug)
    return{
        title: post.title,
        description: post.desc,
    }
}


const SinglePostPage = async ({params}) => {

    const {slug} = params

    // FETCH DATA WITH API
    const post = await getData(slug)

    // FETCH DATA WITHOUT API
    //const post = await getPost(slug)
    
    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image src={post.img} alt="" fill className={styles.img}/>
            </div>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>{post.title}</h1>
                <div className={styles.detail}>                    
                    {post && (
                        <Suspense fallback={<div>Loanding...</div>}>  
                            <PostUser userId={post.userId}/>
                        </Suspense> 
                    )}                
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Published</span>
                        <span className={styles.detailValue}>{post.createdAt.toString().slice(4,16)}</span>
                    </div>
                </div>
                <div className={styles.content}>
                    {post.desc}
                </div>
            </div>
        </div>
    )
}

export default SinglePostPage