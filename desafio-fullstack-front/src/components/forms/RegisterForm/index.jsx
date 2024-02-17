import { zodResolver } from "@hookform/resolvers/zod"
import { clientRegisterSchema } from "../../../pages/RegisterPage/clientRegister.Schema"
import { api } from "../../../services/api"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "../Input"
import { Link } from "react-router-dom"
import { ClientContext } from "../../../providers/client.provider"
import { toast } from "react-toastify"

export const RegisterForm = () => {

    const { setClient } = useContext(ClientContext)
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(clientRegisterSchema)
    })


    const clientRegister = async (formData) => {
        try {
            setLoading(true);
            const { data } = await api.post("/client", formData)
            setClient(data)
            toast.success("Registro Realizado com sucesso!")
        } catch (error) {
            console.log(error)
            if (error.response?.data.message == "Name already exists, try another one") {
                toast.error("Usuario já cadastrado!")
            }
            toast("Erro ao realizar o Registro")
        } finally {
            setLoading(false)
        }
    }

    const submit = (formData) => {
        clientRegister(formData)
    }

    return (
        <>
            <header>Register Page</header>
            <h1>Página de Registro</h1>

            <section>
                <form onSubmit={handleSubmit(submit)}>
                    <Input
                        label="Nome: "
                        type="text"
                        placeholder="Digite seu nome aqui"
                        error={errors.name}
                        {...register("name")}
                        disabled={loading}
                    />
                    <Input
                        label="Senha: "
                        type="text"
                        placeholder="Digite sua senha"
                        error={errors.password}
                        {...register("password")}
                        disabled={loading}
                    />
                    <Input
                        label="Telefone: "
                        type="text"
                        placeholder="Digite seu telefone aqui"
                        error={errors.tel}
                        {...register("tel")}
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Registrando..." : "Registrar"}
                    </button>
                </form>
            </section>

            <Link to="/login">
                Aperte aqui para ir para a página de login
            </Link>

        </>
    )
}