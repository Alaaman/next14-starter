"use client"
import { addPost } from "@/lib/action"
import styles from "./adminPostForm.module.css"
import {useFormState} from 'react-dom'

const AdminPostForm = () => {

    const [state, formAction] = useFormState(addPost, undefined)

    return (
        <form action={formAction}className={styles.container}>
            <h1>Add New post</h1>
            <input type="text" name="userId" placeholder="User Id" /> 
            <input type="text" name="title" placeholder="Title" />            
            <input type="text" name="slug" placeholder="slug" />
            <input type="text" name="img" placeholder="img" />
            <textarea type="text" name="desc" placeholder="desc" rows={10}/>
            <button>Add</button>
            {state && state.error}
        </form>
    )
}

export default AdminPostForm