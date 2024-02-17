import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { clientLoginSchema } from "./clientLogin.Schema"
import { ClientContext } from "../../providers/client.provider"
import { Input } from "../../components/forms/Input"
import { LoginForm } from "../../components/forms/LoginForm"


export const LoginPage = () => {
  

    return (
        <>
            <LoginForm />
        </>
    )
}