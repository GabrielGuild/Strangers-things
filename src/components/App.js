import React, { useState } from "react";
import { NavLink, Route } from "react-router-dom";
import Home from "./Home";
import Account from "./Account";
import Postslist from "./Postslist";
import FeaturedPost from "./FeaturedPost";

// things to do 
// handle nav changes X
// create posts section and search X
// create api.js functions to handle fetch 



const App = () => {

    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [featuredPosts, setfeaturedPosts] = useState(false);
    const [comments, setComments] = useState([]);
    const [User, setUser] = useState(false);
    const [token, setToken] = useState('');
    const [UserData, setUserData] = useState(false);


    return <main>
        <div className="navbar">
            <NavLink exact to='/' className='navlink' activeClassName="active">
                Home
            </NavLink >
            <NavLink exact to='/posts' className='navlink' activeClassName="active">
                Posts
            </NavLink>
            <NavLink exact to='/login' className='navlink' activeClassName="active">
                Account
            </NavLink>
        </div>

        <Route exact path="/">
            <Home />
        </Route>

        <Route path="/posts">
            <Route path="/posts/:postsId">
                {User && token && featuredPosts &&
                    <FeaturedPost
                        User={User}
                        token={token}
                        featuredPosts={featuredPosts} setfeaturedPosts={setfeaturedPosts}
                        UserData={UserData} setUserData={setUserData}
                        comments={comments} setComments={setComments} />
                }
            </Route>
            <Postslist
                User={User}
                token={token}
                featuredPosts={featuredPosts} setfeaturedPosts={setfeaturedPosts}
                posts={posts} setPosts={setPosts}
                search={search} setSearch={setSearch}
                UserData={UserData} setUserData={setUserData} />
        </Route>

        <Route path="/login">
            <Account
                User={User} setUser={setUser}
                token={token} setToken={setToken}
                featuredPosts={featuredPosts} setfeaturedPosts={setfeaturedPosts}
                UserData={UserData} setUserData={setUserData} />
        </Route>
    </main>
}

export default App;