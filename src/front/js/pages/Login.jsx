import React, {useContext} from "react"
import {Context} from "../store/appContext"
import { useNavigate } from "react-router-dom";


function Login(){
    const {store, actions} = useContext(Context)
    const navigate = useNavigate()



    async function testToken(user_id){
        let response = await actions.genericFetchProtected("protected")
        if (response.logged_in_as){
            console.log("We did it!")
            navigate(`/user/${user_id}`)


        }else{
            console.log("Wrong username or password")
        }
        
        
    }
    async function login(e){

        console.log("We are in login function")
        e.preventDefault()
        const data = new FormData(e.target)
        let email = data.get("email")
        let password = data.get("password")

        let body = {
            "email": email,
            "password": password
        }

        let response = await actions.login("login", "POST", body)
        console.log(response.user_id)
        testToken(response.user_id)
        
    }

    return(
        <div className="signup-container">
            <div className="login-header">
                <h1>Login information</h1>
            </div>
            <form onSubmit={(e)=>login(e)} action="" method="post">
                <div className="mb-3">
                    <label  for="email" className="form-label">Email address</label>
                    <input name="email" type="email" class="form-control" id="email" placeholder="name@example.com"/>
                </div>

                <div className="mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input name="password" type="text" class="form-control" id="password"/>
                </div>

                <div className="button">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
            
        </div>
        
        
    )
}

export {Login}