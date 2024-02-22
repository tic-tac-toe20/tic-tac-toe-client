import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Login(){

    const navigate = useNavigate()

    const [user, setUser] = useState({
        name:"",
    })

    
    
    const loginHandler = (event) =>{
        const {name, value} = event.target
        setUser({
            ...user,
            [name]:value
        })
    }

    async function goLogin(event){
        event.preventDefault()
        try {
            // const login = await axios({
            //     method: "post",
            //     url: "http://localhost:3000/login",
            //     data: user,
            // })
            localStorage.setItem("username", user.username)

            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div>
            <div style={{ objectFit:"cover", backgroundRepeat:"no-repeat", position:"relative"}}>
            <img src="/senjahhhh.gif" style={{width:"100vw", height:"100vh", position:"absolute"}}/>
                <div className="container" >
                    <div style={{paddingTop:"120px"}}>
                    <div className="card opacity-75" style={{width:"400px", height:"100px", paddingBottom:"30vw", margin:"auto", textAlign:"center", backgroundColor:"#8E7AB5"}}>
                    <form style={{margin:"auto", textAlign:"center", paddingTop:"7vw"}} onSubmit={goLogin}>
                        <h4 style={{fontFamily:"calibri", fontSize:"48px", color:"white", fontWeight:"bold"}}> TIC - TAC - TOE </h4> <br />
                        <div className="mb-3" style={{margin:"auto" ,textAlign:"center", width:"25vw"}}>
                            <label htmlFor="exampleFormControlInput1" className="form-label"> <h5> Username </h5> </label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="username" onChange={loginHandler}/>
                        </div>
                        <button type="submit" className="btn btn-danger"> Lets Play </button>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
