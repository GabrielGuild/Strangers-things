const Strangers_Things_api = 'https://strangers-things.herokuapp.com/api/2204-FTB-MT-WEB-PT'


export const apiCall = async (url, method = 'GET', token, body) => {
  let data;
  try {
    const response = await fetch(
      Strangers_Things_api + url,
      getFetchOptions(method, body, token)
    );
    data = await response.json();
    if (data.error) {
      throw data.error;
    }
  } catch (e) {
    console.error(e);
  }

  return data;
}
const getFetchOptions = (method, body, token) => {
  if (token) {
    return {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`

      },
      body: JSON.stringify(body)
    }
  } else {
    return {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json'



      },
      body: JSON.stringify(body)
    }
  }
}



export const loginUser = async (username, password, isRegistering) => {
  let data;
  if (isRegistering) {
    const registeration = await apiCall('/users/register', "POST", null, {
      user: { username, password }
    })
    data = registeration;
  } else {
    const login = await apiCall('/users/login', 'POST', null, {
      user: { username, password }
    })
    data = login;
  }
  return data;
}

export const getPosts = async (token) => {
  const response = await apiCall('/posts', 'GET', token)
  return response
}

export const SubmitMessage = async (url, token, newPost) => {
  const response = await fetch(Strangers_Things_api + url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      message: {
        content: `${newPost}`
      }
    })
  })
  const data = await response.json()
  return data
}

export const SubmitPost = async (token, title, description, price, willDeliver = false) => {
  const data = await fetch(Strangers_Things_api + '/posts', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      post: {
        title: `${title}`,
        description: `${description}`,
        price: `$${price}`,
        willDeliver: `${willDeliver}`
      }
    })
  })

  const response = await data.json()
  return response
}

export const deletePost = async (token, postId) => {
  const data = await fetch(Strangers_Things_api + `/posts/${postId}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  const response = await data.json()
  console.log(response)
  return response
}

export const getUserData = async (token) => {
  const data = await fetch(Strangers_Things_api + '/users/me', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  const response = await data.json()
  return response
}