import React, { useState } from "react";
import { loginUser, getUserData} from "../utils/api";


const Account = ({
    User, setUser, token, setToken,
    UserData, setUserData }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);


    const handleLogout = () => {
        setUser(false);
        setToken('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isRegistering) {
            const data = await loginUser(username, password, isRegistering)
            setUser(username);
            setToken(data.data.token);
        } else {
            const data = await loginUser(username, password, isRegistering)
            setUser(username);
            setToken(data.data.token);

            const response = await getUserData(data.data.token);
            setUserData(response.data)
        }
    }
    const toggleRegistration = () => {
        setIsRegistering(!isRegistering);
    }

    return <>

        {
            (token) ?
                <>
                    <h1>User profile</h1>
                    <p>{User} is logged in </p>
                    <button
                        onSubmit={handleLogout}
                        onClick={(event) => handleLogout(event.target.value)}
                    >logout</button>
                    <h2>Your Recents Sent messages</h2>
                    {UserData &&
                        UserData.messages.map((message, idx) => {
                            return <ul key={`${message._id} ${idx}`} className="posts">
                                <h3>Post: {message.post.title}</h3>
                                <div>message: {message.content}</div>
                            </ul>
                        })
                    }
                    <h2>My recived messages</h2>
                    {User && token &&
                        UserData.messages?.map((message, index) => {
                            if (message.fromUser._id !== UserData._id) {
                                return <div className="posts" key={index}>
                                    <div>Sender: {message.fromUser.username}</div>
                                    <div>Message: {message.content}</div>
                                </div>

                            }
                        })}
                </> :
                <>
                    <h1>{isRegistering ? "Registration" : "Login"}</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            onChange={(event) => setUsername(event.target.value)}
                            name="username"
                            type="text"
                            placeholder="username"
                        ></input>
                        <input
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            name="password"
                            type="password"
                            placeholder="password"
                            value={password}
                        ></input>
                        <button
                            type="submit"
                        >submit</button>
                    </form>
                    <button
                        onSubmit={toggleRegistration}
                        onClick={(event) => toggleRegistration(event.target.value)}
                    >Register/login</button>
                </>
        }
    </>
}
export default Account;