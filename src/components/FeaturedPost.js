import react, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { SubmitMessage, deletePost } from "../utils/api";

const FeaturedPost = ({ User,
    token,
    featuredPosts, setfeaturedPosts,
    UserData, setUserData,
    comments, setComments }) => {

    const [newComments, setNewComments] = useState('')
    const [content, setContent] = useState('');
    const history = useHistory();
    const { postsId } = useParams();

    const handleClose = (e) => {
        setfeaturedPosts(false);
        history.push("/posts")
    }

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        const data = await SubmitMessage(`/posts/${featuredPosts._id}/messages`, token, content);
        const newArray = [data.data.message, ...featuredPosts.messages]
        const updatedpost = Object.assign(featuredPosts, { messages: newArray })
        setfeaturedPosts(updatedpost)
        setContent('')

        console.log('update post', featuredPosts)
    }
    console.log(featuredPosts)

    const handleDeletePost = async (e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure?')) {
            deletePost(token, featuredPosts._id);
        }
    }

    return <>
        <article className="FeaturedPost">
            <h1>{featuredPosts.title}</h1>
            <p>{featuredPosts.description}</p>
            <p>Posted by: {featuredPosts.author.username}</p>
            <p>{featuredPosts.me}</p>
            <section>
                <h2>Comments</h2>
                <ul>

                    {featuredPosts.messages &&
                        featuredPosts.messages.map(message => {
                            return <li key={message._id}>
                                <span>{message.content} posted by: {message.fromUser.username}</span>
                            </li>

                        })
                    }
                </ul>
            </section>
            {User && token && <form onSubmit={handleSubmitComment}>
                <input
                    onChange={(e) => setContent(e.target.value)}
                    type="text" name="comment"
                    placeholder="comment" value={content} />
                <button type="submit">Submit Comment</button>
            </form>
            }
            {User && token && (featuredPosts.author._id == UserData._id) &&
                <button onClick={handleDeletePost}>Delete</button>
            }
            <button onClick={handleClose}>Close</button>
        </article>
    </>

}

export default FeaturedPost;