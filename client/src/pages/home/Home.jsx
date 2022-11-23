import React from "react";
import "./home.css";
import Feed from "../../components/Feed/Feed";
import Navbar from "../../components/Navbar/Navbar";
import Rightbar from "../../components/Rightbar/Rightbar";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
      
    </>
  );
}
