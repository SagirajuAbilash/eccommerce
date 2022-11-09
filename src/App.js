import logo from './logo.svg';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import './App.css';
import { LoginPage } from './components/login';
import { SignupPage } from './components/signup';
import { ProductFeed } from './components/products';
import Abi from './abi'

const PublicRotue=(props)=>{
  const token=localStorage.getItem('userToken')
//
if (token){
  return<Navigate to="/productsPage"/>
} else{
return props.children
}

}

const ProtectedRotue=(props)=>{
  const token=localStorage.getItem("userToken");
  if(token){
    return props.children;

  } else {
    return <Navigate to="/login"/>
  }
}

function App() {
  return(
    <>
 

    <Routes>
    <Route path="/login" element={
        
        <PublicRotue>
        <Abi/>
        </PublicRotue>} />
        <Route path="/abi" element={
        
        <PublicRotue>
        <LoginPage/>
        </PublicRotue>} />

        <Route path="/signup" element={
        <PublicRotue>
        <SignupPage/>
        </PublicRotue>
        } />
        <Route path="/product" element={
        <ProtectedRotue>
        <ProductFeed/>
        </ProtectedRotue>}/>
      </Routes>
      <Route path='/products'></Route>
    </>
  )
  
}

export default App;