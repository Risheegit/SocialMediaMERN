import React, { useState, useEffect } from 'react'
import './profile.css'
import Feed from "../../components/Feed/Feed";
import Navbar from "../../components/Navbar/Navbar";
import Rightbar from "../../components/Rightbar/Rightbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from 'axios'
import { useParams} from "react-router"

function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username

  useEffect(() => {
    const fetchUser = async () => {
      try {
      const res = await axios.get(`/users?username=${username}`);
      console.log("Res data is", res.data)
      setUser(res.data);
      } catch (err) {
        console.log(err.response.data ? err.response.data : "No error.response.data here in Profile")
      }
    };
    fetchUser();
  }, [username]);
  return (
    <>
      <Navbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
            <div className="profileRightTop">
              <div className="profileCover">
                <img
                  className="profileCoverImg"
                  src={
                    user.coverPicture
                      ? PF + user.coverPicture
                      : PF + "person/noCover.png"
                  }
                  alt=""
                />
                <img
                  className="profileUserImg"
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "person/default.jpg"
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          
            <div className="profileRightBottom">
                <Feed username={username}/>
                <Rightbar user={user } />
            </div>
        </div>
      </div>
      
    </>
  )
}

export default Profile