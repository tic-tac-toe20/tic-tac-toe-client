import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
    const [input,setInput] = useState('')
    const navigate = useNavigate()

    function handlerLogin(e){
        e.preventDefault()
        localStorage.username = input
        navigate('/')
    }

    return(
        <>
        <center>
            <form style={{marginTop:'50px'}} onSubmit={handlerLogin}>
                <label htmlFor="username">Name Player</label><br />
                <input type="text" id="username" onChange={(e)=>setInput(e.target.value)}/><br /><br />

                <button type="submit">play</button>
            </form>
        </center>
        </>
    )
}