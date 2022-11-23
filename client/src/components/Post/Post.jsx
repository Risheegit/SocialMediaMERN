import React, { useContext } from 'react'
import { MoreVert} from '@material-ui/icons'
import "./post.css"
// import { Users} from "../../DummyData"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { format} from 'timeago.js'
import { Link} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'

export default function Post({post}) {
    //Giving useState initial value of post.like
    const [ like, setLike] = useState(post.likes.length )
    const [ isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({});
    const { user: currentUser } = useContext(AuthContext)


    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
      }, [currentUser._id, post.likes]);
      
    const likeHandler = () => {
        try {
            axios.put("/posts/" + post._id + "/like", {userId: currentUser._id})
        } catch (err) {}
        setLike(isLiked ? like -1 : like + 1)
        setIsLiked(!isLiked)
    }
    
    

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const fetchUser = async () => {
            try {
          const res = await axios.get(`/users?userId=${post.userId}`)
          setUser(res.data)
            } catch (err) {
                console.log(err.response.data)
            }
        };
        fetchUser();
      }, [post.userId])
  return (
    
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`profile/${user.username}`}>
                        <img src={user.profilePicture ? PF + user.profilePicture : PF+"person/default.jpg"} alt="Not found" className="postProfileImg" />
                    </Link>
                    <span className="postUsername">{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>

                </div>
                <div className="postTopRight">
                    <MoreVert />
                </div>
            </div>

            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img src={PF+post.img} alt="Not found" className="postImg" />
            </div>

            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src={`${PF}like.png`} alt="Not found" onClick = {likeHandler} className="likeIcon" />
                    <img src={`${PF}heart.png`} alt="Not found" onClick = {likeHandler} className="likeIcon" />
                    <span className="postLikeCounter">{like} people like it! </span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}
