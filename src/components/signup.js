import { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { object, string, number, date, InferType } from 'yup';
import { signUpApiCall} from "./api";
import axios from "axios"; 

let userSchema = object({
    Name: string().min(2).max(50).required(),
    Email: string().email().required(),
    NewPassword: string().min(8).max(15).required(),
  
  });
export const SignupPage=()=>{

   

    const[values, setValues]=useState({
        Name:'',
        Email:'',
        Password:'',
      
    })
    const [errors, setErrors]= useState([])

   


    const handleChange=(key, value)=>{
        setValues({
            ...values,
            [key]:value
        })
    }

    const handleClick=()=>{
        userSchema.validate(values, {abortEarly:false})
        .then((res)=>{
            
            setErrors([])
            console.log(res);
           
            signUpApiCall({
                name:values.Name,
                email:values.Email,
                password:values.Password,

            }).then((response)=>{
                if(response.data.success){
                    console.log('sucess');
                }
               
                console.log(response)

            }).catch((error)=>{
                console.log(error);
            })
        

               
            
        }).catch((err)=>{
            setErrors(err.errors)
        })
    }

    return(
        <>
    
        <div style={{ color :"black", backgroundImage:" url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB56augy4jov3V_4WDqyVQc4iavGZuz9tnOg&usqp=CAU') ", height:"100vh", width:"100vw", backgroundSize: "100%",   display:'flex', flexDirection:"column", alignItems:'center',justifyContent:'center'}}>
        
     <h1> REGISTER HERE</h1>
            <div  style={{width:300, padding:20, border:"1px solid", borderRadius:25}}>
            
                <div>
                     <label>Name</label><br></br>
                <input type="text" 
                placeholder="Name"
                value={values.Name}
                 onChange ={(event)=> handleChange('Name' ,event.target.value)}
                    />
                </div>
                <div>
                    <label>Email address</label><br></br>
                <input type="text" 
                
                 placeholder="Email address"
                 value={values.Email}
                 onChange ={(event)=> handleChange('Email' ,event.target.value)}/>
                </div>
                <div>
                    <label>New Password</label><br></br>
                <input type="Password" 
               
                placeholder=" Password"
                value={values.Password}
                onChange ={(event)=> handleChange('NewPassword' ,event.target.value)}
                />
                </div>
                
                {
                    errors.map((err, index)=>{
                        return <p key={index}>{err}</p>
                        
                    })
                }

           <br></br>
            <button style={{ color:"white",backgroundColor:"red", paddinTop:20}} onClick={handleClick}>Submit</button>
                
                </div>

                <p>Already have an account <a href="/login"> Login here</a></p>
               
            </div>
     
       

        </>
    )
}
