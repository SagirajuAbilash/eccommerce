import { useState } from "react"

import { object, string, number, date, InferType } from 'yup';
import {loginApiCall } from "./api";



    
  

export const LoginPage=()=>{

    const [values, setValues]=useState({
        Email:'',
        Password:''

    })
     const handleChange=(key, value)=>{
        setValues({
            ...values, 
            [key]:value
        })

     }
     const [errors, setErrors]=useState([])
     const handleOnclick =async()=>{
       

        try{
            const response= await loginApiCall({
                email:values.Email,
                Password:values.Password,
            });
            localStorage.setItem("userToken", response.data.token)
            localStorage.setItem("cartId", response.data.cart-id)
            window.location.href="/product"
        }catch(error){
            alert("unable to login")
        }
      
       
        
     }




    return(
        <>
        <div style={{ color :"black",backgroundColor:"orange" , backgroundImage:"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB56augy4jov3V_4WDqyVQc4iavGZuz9tnOg&usqp=CAU')", height:"100vh", backgroundSize:"100%" ,  display:'flex', flexDirection:"column", alignItems:'center',justifyContent:'center'}}>
            <h1>LOGIN HERE</h1>
            <div style={{width:300, padding:20, border:"1px solid", borderRadius:25}}>
                <div>
                    <label>Email address</label><br></br>
                    <input type="text" placeholder="email"
                    value={values.Email}
                    onChange ={(event)=> handleChange('Email' ,event.target.value)}
                    ></input>
                    
                
                </div>
                <div>
                    <label>Password</label><br></br>
                    <input type="password" placeholder="Password"
                    value={values.Password}
                    onChange ={(event)=> handleChange('Password' ,event.target.value)}></input>
                </div><br></br>
                {
                    errors.map((err , index)=>{
                        return <p key={index}>{err}</p>
                    })
                }
                <button style={{ color:"white",backgroundColor:"red", paddinTop:20}} onClick={handleOnclick}>Submit</button>
            </div>
            <p>Dont have an account <a href="/signup"> signup here</a></p>
        </div>

        </>
    )
   
}
