import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input'
import style from "./SignIn.module.css";
import { useAuth } from '../context/AuthContext'
import { useHistory } from "react-router-dom";

const SignIn = () => {
    const history = useHistory()
    const { signin, currentUser, getusermessage } = useAuth()
    const [message, setmessage] = useState("")

    const [formValue, setformValue] = useState({
        email: "",
        password: "",
        emailError: "",
        pwdError: ""
    })

    const formValueChange = (e) => {
        setformValue({
            ...formValue, [e.target.name]: e.target.value,
            emailError: e.target.name === "email" && '',
            pwdError: e.target.name === "password" && ''
        })
    }

    useEffect(() => {
        if (currentUser?.refreshToken) {
          history.push("/");
        }
      }, [currentUser, history]);

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formValue.email) {
            if (formValue.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            ) {
                if (formValue.password) {
                    try {
                        signin(formValue.email, formValue.password)
                    } catch(error) {
                        console.log(error)
                        setmessage("Can't Register Email")
                    }
                } else {
                    setformValue({ ...formValue, pwdError: "password is required" })
                }
            } else {
                setformValue({ ...formValue, emailError: "Email is Wrong" })
            }
        } else {
            setformValue({
                ...formValue, emailError: "Email is Required",
                pwdError: formValue.password ? "" : "password is required"
            })
        }
    }

    return (
        <div className={style.bg}>
            <div className={style.signupBg}>
                <div className={style.headerComment}>
                    <h4>Welcome Back</h4>
                    <span>Sign In To Your Account</span>
                </div>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className={style.formControl}>
                        <Input label="Email" type="text" error={formValue.emailError} value={formValue.email} name="email" handlechange={formValueChange} />
                        {formValue.emailError &&
                            <span className="errorText">{formValue.emailError}</span>}
                    </div>
                    <div className={style.formControl}>
                        <Input label="Password" type="password" error={formValue.pwdError} value={formValue.password} name="password" handlechange={formValueChange} />
                        {
                            formValue.pwdError &&
                            <span className="errorText">{formValue.pwdError}</span>
                        }
                    </div>
                    <Button fullWidth name="Log In" type="submit" />
                </form>
                {
                    message &&
                    <span className="errorText">{message}</span>
                }
                {
                    getusermessage &&
                    <span className="errorText">{getusermessage.message}</span>
                }
                <p className={style.gotosignup}>Don't have account? <Link to="/signup">Signup</Link></p>
            </div>
        </div>
    )
}

export default SignIn
