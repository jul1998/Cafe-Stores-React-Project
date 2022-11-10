import React, {useContext} from "react"
import {Context} from "../store/appContext"

function Signup (){
    const {store, actions} = useContext(Context)

    async function signUp(e){
        e.preventDefault()
        console.log("We ar ein signup function")
        var formData = new FormData(e.target)
        let email = formData.get("email")
        let password = formData.get("password")

        let data = {
            "email":email,
            "password":password
        }
        /*
        let BACKEND_URL = process.env.BACKEND_URL
        console.log("Here")
        let response = await fetch(BACKEND_URL+"signup",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            body: JSON.stringify(data)})
            console.log(await response.json())
                */
        let response = await actions.genericFetch("signup", "POST", data)
        console.log(response)
        }

        
        


    return(

        <div className="signup-container">
            <form onSubmit={(e) => signUp(e)} action="" method="post">
                <div className="mb-3">
                    <label  for="email" className="form-label">Email address</label>
                    <input name="email" type="email" class="form-control" id="email" placeholder="name@example.com"/>
                </div>

                <div className="mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input name="password" type="text" class="form-control" id="password"/>
                </div>

                <div className="button">
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </div>
            </form>
            
        </div>

    )
}

export {Signup}