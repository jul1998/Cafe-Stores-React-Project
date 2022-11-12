import React, {useContext, useEffect, useState} from "react"
import {Context} from "../store/appContext"
import {useParams, Link } from 'react-router-dom';
import "../../styles/home.css";

function UserProfileComponent({userEmail}){
    const params = useParams()
    const {store, actions} = useContext(Context)
    const [cafeStoreList, setCafeStoreList] = useState([])
    const [isClicked, setIsClicked] = useState(false)
    const [favoriteCafeList, setFavoriteCafeList] = useState([])

    
    useEffect(()=>{
        async function fetchData (){
            let response = await actions.genericFetch("cafe_list")
            setCafeStoreList(response)

        }
        fetchData()

    },[])

    function addFavorite(item){
        setFavoriteCafeList(prevList=>[...prevList,item])
    }

    console.log(favoriteCafeList)


    return(

        <div>
            {!localStorage.getItem("token")? <div>No current token</div>:
            <div>
                <h2>Login profile from {userEmail}</h2>
                <button onClick={() => setIsClicked(false)}>Hide cafe stores</button>
                <button onClick={()=>setIsClicked(true)}>Click here to see cafe stores</button>
                <div className="list_cafes">
                    {isClicked?cafeStoreList.map((item,index) =>{
            return(<li  className="list-group-item" key={item.id}>
                {item.name} 
                <i style={{color: "red", paddingLeft: "10px"}} onClick={()=>addFavorite(item.name)} className="fa-solid fa-heart"></i>
                <i  style={{paddingLeft: "10px"}}  className="fa-regular fa-x"></i>
                </li>)
        }):null}
                </div>
                
                
                
            </div>
            
            
            }
        </div>
    )  
}

export {UserProfileComponent}