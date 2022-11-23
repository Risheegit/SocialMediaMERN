import React from 'react'
import "./feed.css"
import Share from '../Share/Share'
import Post from '../Post/Post'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'


function Feed({username}) {
  const [posts, setPosts] = useState([])
  const { user} = useContext(AuthContext)
  username = user.username

  //UseEffect depends on [] => runs only once
  useEffect(() => {
      const fetchPosts = async () => {
        try {
          const res = username ? await axios.get("/posts/profile/" + username) : await axios.get("/posts/timeline/" + user._id)
          setPosts(res.data.sort((p1,p2) => {
            return new Date(p2.createdAT) - new Date(p1.createdAt)
          })) } catch (err) {
            console.log(err.response.data)
        }
      };
      fetchPosts();
    }, [username, user._id])

  return (
    <div className='feed'>
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post post = {p} key = {p._id}/>))}
      </div>
    </div>
  )
}

export default Feed