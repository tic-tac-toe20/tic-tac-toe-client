import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

const router = createBrowserRouter([
    {path:'/', element:<Home/>,
        loader:()=>{
            if(!localStorage.username){
                return redirect('/login')
            }
            return null
        }
    },
    {path:'/login', element:<Login/>,
        loader:()=>{
            if(localStorage.username){
                return redirect('/')
            }
            return null
        }
    }
])

export default router