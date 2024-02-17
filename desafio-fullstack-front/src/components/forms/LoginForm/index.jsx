import { useContext, useState } from "react"
import { api } from "../../../services/api"
import { ClientContext } from "../../../providers/client.provider"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { clientLoginSchema } from "../../../pages/LoginPage/clientLogin.Schema"
import { Input } from "../Input"
import { toast } from "react-toastify"
import { jwtDecode } from "jwt-decode"
import style from "./style.module.scss"

export const LoginForm = () => {
    const { setClient } = useContext(ClientContext)
    const { loading } = useContext(ClientContext)
    const navigate = useNavigate()
    const token = localStorage.getItem("@TOKEN")


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(clientLoginSchema)
    });

    const clientLogin = async (formData) => {
        try {
            const { data } = await api.post("/login", formData)
            const token = jwtDecode(data.token)
            localStorage.setItem("@TOKEN", data.token)
            localStorage.setItem("@USERID", token.id)
            setClient(token.name)
            toast.success("Login realizado com sucesso!")
            navigate("/dashboard")
        } catch (error) {
            if (error.response?.data.message === "Invalid credentials") {
                toast.error("Usuario não encontrado")
            }

        }
    }

    const submit = (formData) => {
        clientLogin(formData)
    }

    return (
        <>
            <main className={`${style.containerPrincipal}`}>
                <h1 className="title1 primary">Entrar</h1>
                <form className={`${style.containerFormRegister}`} onSubmit={handleSubmit(submit)}>
                    <Input
                        label=" "
                        labelClass="headline big"
                        className="btn-tertiary login headlie blue"
                        type="text"
                        placeholder="Nome de usuario"
                        error={errors.name}
                        {...register("name")}
                        disabled={loading}
                    />
                    <Input
                        label=""
                        labelClass="headline big"
                        className="btn-tertiary login headlie blue"
                        type="text"
                        placeholder="Senha"
                        error={errors.message}
                        {...register("password")}
                        disabled={loading}
                    />
                    <div className={`${style.containerButtonLogin}`}>
                        <button className="btn-tertiary register headline blue" type="submit">Entrar</button>
                        <h3 className="headline big black ">Não tem conta ainda ?</h3>
                        <Link className="btn-tertiary register headline blue" to="/register" disabled={loading}> Inscreva-se </Link>
                    </div>
                </form>
            </main>
        </>
    )

}