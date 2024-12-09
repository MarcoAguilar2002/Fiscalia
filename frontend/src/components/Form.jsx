import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN ,REFRESH_TOKEN} from "../constants";
import "../styles/form.css"

function Form({route,method}){
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState("")
    const navigate = useNavigate()

    const name = method === "login" ? "Iniciar Sesión" : "Registrarse"
    const handleSubmit = async (e) =>{
        setLoading(true)
        e.preventDefault();

        try{
            const res = await api.post(route,{username,password})
            if(method === "login"){
                localStorage.setItem(ACCESS_TOKEN,res.data.access);
                localStorage.setItem(REFRESH_TOKEN,res.data.fresh);
                navigate("/")
            }else{
                navigate("/login")
            }
        }catch(error){
            alert(error)
        }finally{
            setLoading(false)
        }
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1 className="text-center">{name}</h1>
        <input 
            className="form-input text-center"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"

        />
        <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Contraseña"
        />

        <button className="form-button" type="submit">
            {name}
        </button>

    </form>
}

export default Form