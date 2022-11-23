import { useRef } from "react";
import "./login.css";
import { loginCall } from "../../apicalls";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

export default function Login() {

  const handleClick = (e) => {
    e.preventDefault();
    loginCall( {email: email.current.value, password: password.current.value }, dispatch)
  }
  const email = useRef()
  const password = useRef()
  const {isFetching, dispatch} = useContext(AuthContext)
  return (    
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" type="submit" onSubmit={handleClick}>
            <input placeholder="Email" type="email" className="loginInput"  required ref = {email}/>
            <input placeholder="Password" type="password" className="loginInput" required minLength="6" ref = {password} />
            <button className="loginButton" type="submit" disabled = {isFetching}>{ isFetching ? <CircularProgress size="20px"/> : "Log in"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
            { isFetching ? <CircularProgress size="20px"/> : "Create a new Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
