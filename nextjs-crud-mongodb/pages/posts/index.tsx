import React, { useState } from 'react'
import Layout from '../../components/Layout'


export default function index() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (title && content) {
            try {
                let response = await fetch("http://localhost:3000/api/addPost", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json, text/plain, */*",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title,
                        content
                    }),
                })
                response = await response.json();
                setTitle("");
                setContent("");
                setError("");
                setMessage("post successfuly added");
                
            } catch (errorMessage: any) {
                setError(errorMessage);
            }
        } else {
            return setError("All fields are required");
        }
    }

    return (
        <Layout>
            <form className="form" onSubmit={handleSubmit}>
                { error ? <div className="alert-error">{error}</div> : null}
                { message ? <div className="alert-success">{message}</div> : null }
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        placeholder="title post"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        name='content'
                        placeholder="content post"
                        rows={8}
                        cols={20}
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                    />
                </div>
                <div className="form-group">
                    <button type='submit' className="btn-submit">
                        Add Post
                    </button>
                </div>
            </form>
            <style jsx>
                {`
                    .form{
                        width: 400px;
                        margin: 10px auto;
                    }

                    .form-group{
                        width: 100%;
                        margin-buttom: 10px;
                        display: block;
                    }

                    .form-group label{
                        display: block;
                        margin-bottom: 10px;
                    }
                    .form-group input[type="text"] .form-group textarea {
                        padding: 10px;
                        width: 100%;
                    }

                    .alert-error{
                        color: red;
                        witght: 100%;
                        margin-bottom: 10px;
                    }
                    .alert-message{
                        color: red;
                        witght: 100%;
                        margin-bottom: 10px;
                    }
                `}

            </style>
        </Layout>
    )
}
    
  