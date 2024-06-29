import React, { useState} from "react";
import type { GetStaticPropsContext, GetStaticPropsResult } from "next";
import Layout from "../../components/Layout";

type PageParams = {
    id: String
}

type ContentPageProps = {
    post: Post  
}

type Post = {
    _id: string
    title: string
    content: string
}

type ResponseFromServer = {
    _id: string
    title: string
    content: string
}

export async function getStaticProps({
    params,
}: GetStaticPropsContext<PageParams>): Promise<GetStaticPropsResult<ContentPageProps>> {
    try {
        let response = await fetch(`http://localhost:3000/api/getPost?id=${params?.id}`);
        let responseFromServer: ResponseFromServer = await response.json();
        // let post = await response.json();
        return {
            props: { 
                post: {
                    _id: responseFromServer._id,
                    title: responseFromServer.title,
                    content: responseFromServer.content,
                } 
            }
        };
    } catch (e) {
        console.error(e);
        return { 
            props: { 
                post: {
                    _id: '',
                    title: '',
                    content: ''
                } 
            } 
        };
    }
}
export async function getStaticPaths() {
    let posts = await fetch("http://localhost:3000/api/getPosts");
    let postFromServer: [Post] = await posts.json();

    return {
        paths: postFromServer.map((post) => ({
            params: { id: post._id } 
        })),
        fallback: false
    }
}

export default function EditPost({
    post: { _id, title, content },
}: ContentPageProps) {

    const [postTitle, setPostTitle] = useState(title);
    const [postContent, setPostContent] = useState(content);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (postTitle && postContent) {
            try {
                let response = await fetch("http://localhost:3000/api/editPost?id=" + _id , {
                    method: "POST",
                    headers: {
                        "Accept": "application/json, text/plain, */*",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: _id,
                        title: postTitle,
                        content: postContent
                    }),
                })
                response = await response.json();
                setPostTitle('');
                setPostContent('');
                setError('');
                setMessage('post successfuly edited');
                
            } catch (errorMessage: any) {
                setError(errorMessage);
            }
        } else {
            return setError('All fields are required');
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
                        onChange={(e) => setPostTitle(e.target.value)}
                        value={postTitle ? postTitle : ''}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        name='content'
                        placeholder="content post"
                        rows={8}
                        cols={20}
                        onChange={(e) => setPostContent(e.target.value)}
                        value={postContent ? postContent : ''}
                    />
                </div>
                <div className="form-group">
                    <button type='submit' className="btn-submit">
                        update
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