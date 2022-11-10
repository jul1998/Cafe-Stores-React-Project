import React, {useContext,useEffect, useState} from "react"
import {Context} from "../store/appContext"
import {useParams } from 'react-router-dom';


function UserProfile(){
    const params = useParams()
    const {store, actions} = useContext(Context)
    const [userEmail, setUserEmail] = useState("asd")
    console.log(params)

    useEffect(()=>{
        async function fetchData (){
            let response = await actions.genericFetch("get_users", "POST", params.userId)
            console.log(response.email)
            setUserEmail(response.email)
            
            
        }
        fetchData()
    },[])
    

    return(
        <div>
            <h2>Login profile {userEmail}</h2>
        </div>
    )  
}

export {UserProfile}