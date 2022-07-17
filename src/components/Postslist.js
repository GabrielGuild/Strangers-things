import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getPosts, SubmitPost, deletePost } from "../utils/api";


const Postslist = ({
    User,
    token,
    posts,
    setPosts,
    search,
    setSearch,
    featuredPosts,
    setfeaturedPosts, UserData, setUserData }) => {

    let history = useHistory();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [willDeliver, setWillDeliver] = useState(false)

    useEffect(() => {
        (async () => {
            const fetched = await getPosts(token);
            setPosts(fetched.data.posts)
        })()

    }, [])

    const handlePostClick = (e, posts) => {
        setfeaturedPosts(posts);
        if (User && token) {
            history.push(`/posts/${posts._id}`)
        } else {
            alert("you need to be logged in to view posts")
        }
    }

    const handleSubmitPost = async (e) => {
        e.preventDefault();
        const response = await SubmitPost(token, title, description, price, willDeliver)
        setPosts([response.data.post, ...posts])
    }

    const handleDeletePost = async (e, posts) => {
        e.stopPropagation();
        if (window.confirm('Are you sure?')) {
            const fetched = await deletePost(token, posts._id);
            setPosts(fetched.data.posts, ...posts)
        }
    }

    return <>
        <h1>Posts</h1>
        <input onChange={(e) => {
            setSearch(e.target.value);
        }}
            type="test" name="search" placeholder="search"
        />
        {token && User &&
            <form onSubmit={handleSubmitPost} className="newpostform">
                <h1>Submit a new post</h1>
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text" name="title"
                    placeholder="Title" value={title} />


                <input
                    onChange={(e) => setDescription(e.target.value)}
                    type="text" name="description"
                    placeholder="Description" value={description} />

                <input
                    onChange={(e) => setPrice(e.target.value)}
                    type="number" name="price"
                    placeholder="$Price" value={price} />
                <div>
                    <p>willDeliver?</p><input
                        onChange={(e) => setWillDeliver(true)}
                        type="radio" name="willDeliver"
                        placeholder="willDeliver" value={willDeliver} />


                </div> <button type="submit">Submit Post</button>
            </form>
        }

        <ul>
            {
                posts.filter(posts => {
                    return `${posts.location} ${posts.description}`
                        .toLowerCase()
                        .includes(search.toLowerCase())
                })
                    .map(posts => {
                        return <div onClick={(e) => handlePostClick(e, posts)} key={posts._id} className="posts">
                            <h3>{posts.title}</h3>
                            <div>{posts.description}</div>
                            <div>{posts.price}</div>
                            {token && (posts.author._id == UserData._id) &&
                                <button onClick={(e) => handleDeletePost(e, posts)}>Delete</button>
                            }
                        </div>

                    })
            }
        </ul>
    </>


}
export default Postslist;