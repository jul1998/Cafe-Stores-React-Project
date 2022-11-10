import React, {useContext} from "react"
import {Context} from "../store/appContext"
import {useParams } from 'react-router-dom';


function UserProfileComponent(){
    const params = useParams()
    
    console.log(params)
    return(
        <div>
            <h2>Login profile {params.userId}</h2>
        </div>
    )  
}

export {UserProfile}