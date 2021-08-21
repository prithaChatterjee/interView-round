import React, { useState,useEffect } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import style from './Signup.module.css'
import {useAuth} from '../context/AuthContext'
import { useHistory } from "react-router-dom";

const SignUp = () => {
    const { signup,currentUser } = useAuth()
    const history = useHistory()

    const [formValue, setformValue] = useState({
        fname: '',
        fnameError: '',
        lname: '',
        lnameError: '',
        email: '',
        emailError: '',
        phone: '',
        phoneError: '',
        password: '',
        pwdError: '',
        confirmpassword: '',
        confirmpwdError: '',
        country: '',
        countryError: '',
        state: '',
        StateError: '',
        city: '',
        cityError: '',
        zip: '',
        zipError: ''
    })

    useEffect(() => {
        if (currentUser?.refreshToken) {
          history.push("/");
        }
      }, [currentUser, history]);

    const [formstep, setformstep] = useState(0)

    const [message, setmessage] = useState("")

    const reset = (stepCount) => {
        setformstep(stepCount)
        setformValue({
        fname: '',
        fnameError: '',
        lname: '',
        lnameError: '',
        email: '',
        emailError: '',
        phone: '',
        phoneError: '',
        password: '',
        pwdError: '',
        confirmpassword: '',
        confirmpwdError: '',
        country: '',
        countryError: '',
        state: '',
        StateError: '',
        city: '',
        cityError: '',
        zip: '',
        zipError: ''
        })
    }

    const gonext = (stepcount) => {
        if (stepcount > formstep && formstep === 0) {
            if (formValue.fname && formValue.lname && formValue.phone && formValue.email &&
                formValue.password && formValue.password) {
                setformstep(stepcount)
            } else {
                setmessage("Fill All Forms")
            }
        }else if (stepcount > formstep && formstep === 1) {
            if (formValue.country && formValue.state && formValue.city && formValue.zip) {
                setformstep(stepcount)
            } else {
                setmessage("Fill All Forms")
            }
        }else{
            setformstep(stepcount)
        }
    }

    const formValueChange = (e) => {
        setmessage("")
        setformValue({
            ...formValue, [e.target.name]: e.target.value,
            fnameError: e.target.name === 'fname' ? '' : formValue.fnameError,
            lnameError: e.target.name === 'lname' ? '' : formValue.lnameError,
            emailError: e.target.name === 'email' ? "" : formValue.emailError,
            phoneError: e.target.name === 'phone' ? e.target.value.match(/^(0|91)?[7-9][0-9]{9}/) ?
                "" : "Phone is Wrong" : formValue.phoneError,
            pwdError: e.target.name === 'password' ?
                e.target.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/) ? "" :
                    "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" :
                formValue.pwdError,
            confirmpwdError: e.target.name === 'confirmpassword' ? e.target.value &&
                e.target.value === formValue.password ? "" : "Confirm Passwrd Should Match With Passoword"
                : formValue.confirmpwdError,
            country: e.target.name === 'country' ? e.target.value ?
                e.target.value.match(/^[A-Za-z]+$/) ? e.target.value : formValue.country
                : "" : formValue.country,
            state: e.target.name === 'state' ? e.target.value ?
                e.target.value.match(/^[A-Za-z]+$/) ? e.target.value : formValue.state
                : "" : formValue.state,
            city: e.target.name === 'city' ? e.target.value ?
                e.target.value.match(/^[A-Za-z]+$/) ? e.target.value : formValue.city
                : "" : formValue.city,
            zip: e.target.name === 'zip' ? e.target.value ?
                e.target.value.match(/^[0-9]+$/) ? e.target.value : formValue.zip
                : "" : formValue.zip,
            countryError: e.target.name === 'country' ? "" : formValue.countryError,
            StateError: e.target.name === 'state' ? "" : formValue.StateError,
            cityError: e.target.name === 'city' ? "" : formValue.cityError,
            zipError: e.target.name === 'zip' ? "" : formValue.zipError,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setformValue({
            ...formValue, fnameError: formValue.fname ?
                "" : "FirstName is Required",
            lnameError: !formValue.lname ? "LastName is Required" : '',
            emailError: formValue.email ?
                formValue.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ?
                    "" : "Email is Wrong" : "Email is Required",
            phoneError: formValue.phone ?
                formValue.phone.match(/^(0|91)?[7-9][0-9]{9}/) ?
                    "" : "Phone is Wrong" : "Phone Number is Required",
            pwdError: formValue.password ? "" : "password is required",
            confirmpwdError: formValue.confirmpassword ? "" : "confirm Password is requied"
        })
        if (formValue.fname && formValue.lname && formValue.phone && formValue.email &&
            formValue.password && formValue.password && !formValue.fnameError && !formValue.lnameError &&
            !formValue.phoneError && !formValue.emailError &&
            !formValue.pwdError && !formValue.confirmpwdError) {
                try {
                    signup(formValue.email, formValue.password)
                    setmessage("User Register SuccessFully")
                } catch{
                    setmessage("Can't Register Email")
                }
        }
    }

    const AddressSubmit = (e) => {
        e.preventDefault()
        setformValue({
            ...formValue,
            countryError: formValue.country ? "" : "Country Is Required",
            StateError: formValue.state ? "" : "State Is Required",
            cityError: formValue.city ? "" : "City Is Required",
            zipError: formValue.zip ? ""
                : "zip Is Required",

        })
        if (formValue.fname && formValue.lname && formValue.phone && formValue.email &&
            formValue.password && formValue.password && !formValue.fnameError && !formValue.lnameError &&
            !formValue.phoneError && !formValue.emailError &&
            !formValue.pwdError && !formValue.confirmpwdError) {
            console.log(formValue)

        }
    }


    return (
        <>
            <div className={style.multistep}>
                <div className={style.multistep_ripple}></div>
                <button style={{ color: formstep === 0 ? "#b11adc" : "black" }} onClick={() => gonext(0)}>
                    <div style={{ backgroundColor: formstep === 0 ? "#b11adc" : "rgba(0,0,0,.54)" }}>1</div>
                    Enter your Personal Details</button>
                <button style={{ color: formstep === 1 ? "#b11adc" : "black" }} onClick={() => gonext(1)}>
                    <div style={{ backgroundColor: formstep === 1 ? "#b11adc" : "rgba(0,0,0,.54)" }}>2</div>
                    Enter your Address</button>
                <button style={{ color: formstep === 2 ? "#b11adc" : "black" }} onClick={() => gonext(2)}>
                    <div style={{ backgroundColor: formstep === 2 ? "#b11adc" : "rgba(0,0,0,.54)" }}>3</div>Done</button>
            </div>
            {
                formstep === 0 &&
                <section>
                    <form autoComplete="off" defaultChecked="off" onSubmit={(e) => handleSubmit(e)}>
                        <div className="form_control">
                            <Input label="First Name" error={formValue.fnameError} type="text" value={formValue.fname} name="fname"
                                handlechange={formValueChange} />
                            {
                                formValue.fnameError &&
                                <span className="errorText">{formValue.fnameError}</span>
                            }
                        </div>
                        <div className="form_control">
                            <Input label="Last Name" error={formValue.lnameError} type="text" value={formValue.lname} name="lname"
                                handlechange={formValueChange} />
                            {
                                formValue.lnameError &&
                                <span className="errorText">{formValue.lnameError}</span>
                            }
                        </div>
                        <div className="form_control">
                            <Input label="Email" error={formValue.emailError} type="text" value={formValue.email} name="email"
                                handlechange={formValueChange} />
                            {
                                formValue.emailError &&
                                <span className="errorText">{formValue.emailError}</span>
                            }
                        </div>
                        <div className="form_control">
                            <Input label="Phone" type="text" error={formValue.phoneError} value={formValue.phone} name="phone"
                                handlechange={formValueChange} />
                            {
                                formValue.phoneError &&
                                <span className="errorText">{formValue.phoneError}</span>
                            }
                        </div>
                        <div className="form_control">
                            <Input label="Password" type="password" error={formValue.pwdError} value={formValue.password} name="password"
                                handlechange={formValueChange} />
                            {
                                formValue.pwdError &&
                                <span className="errorText">{formValue.pwdError}</span>
                            }
                        </div>
                        <div className="form_control">
                            <Input label="Confirm Password" type="password" error={formValue.confirmpwdError} value={formValue.confirmpassword}
                                name="confirmpassword"
                                handlechange={formValueChange} />
                            {
                                formValue.confirmpwdError &&
                                <span className="errorText">{formValue.confirmpwdError}</span>
                            }
                        </div>
                        <div className={style.buttonContainer}>
                            <Button name="Save" type="submit" />
                            <Button name="Next" value={1} type="button" clickFunction={gonext} />
                        </div>
                    </form>
                    {
                        message &&
                        <span className="errorText">{message}</span>
                    }
                </section>
            }
            {
                formstep === 1 &&
                <section>
                    <form onSubmit={(e) => AddressSubmit(e)}>
                        <div className="form_control">
                            <Input label="Country" type="text" error={formValue.countryError} value={formValue.country} name="country"
                                handlechange={formValueChange} />
                            {
                                formValue.countryError &&
                                <span className="errorText">{formValue.countryError}</span>
                            }
                        </div>
                        <div className="form_control">
                            <Input label="State" error={formValue.StateError} type="text" value={formValue.state} name="state"
                                handlechange={formValueChange} />
                            {
                                formValue.StateError &&
                                <span className="errorText">{formValue.StateError}</span>
                            }
                        </div>
                        <div className="form_control">
                            <Input label="City" type="text" error={formValue.cityError} value={formValue.city} name="city"
                                handlechange={formValueChange} />
                            {
                                formValue.cityError &&
                                <span className="errorText">{formValue.cityError}</span>
                            }
                        </div>
                        <div className="form_control">
                            <Input label="Zip" type="text" error={formValue.zipError} value={formValue.zip} name="zip"
                                handlechange={formValueChange} />
                            {
                                formValue.zipError &&
                                <span className="errorText">{formValue.zipError}</span>
                            }
                        </div>
                        <div className={style.buttonContainer}>
                            <Button name="Back" value={0} type="button" clickFunction={gonext} />
                            <Button name="Save" type="submit" />
                            <Button name="Next" value={2} type="button" clickFunction={gonext} />
                        </div>
                    </form>
                </section>
            }

            {
                formstep === 2 &&
                <div className={style.donePage}>
                    <p>Details Taken</p>
                    <div>
                        <Button name="Back" value={1} type="button" clickFunction={gonext} />
                        <Button name="Reset" value={0} type="button" clickFunction={reset} />
                        <Button name="Submit" type="submit" />
                        <Button name="Cancel" value={0} type="button" clickFunction={reset} />
                    </div>
                </div>
            }

        </>
    )
}

export default SignUp
