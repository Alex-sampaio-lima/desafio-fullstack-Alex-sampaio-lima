import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"

export const ClientContext = createContext({});

export const ClientProvider = ({ children }) => {

    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("@TOKEN");


    // const clientRegister = async (formData) => {
    //     try {
    //         setLoading(true);
    //         const { data } = await api.post("/client", formData)
    //         setClient(data)
    //         console.log("Reistro Realizado com sucesso!")
    //     } catch (error) {
    //         console.log(error)
    //         if (error.response?.data == "Name already exists, try another one") {
    //             alert("Usuario já cadastrado!")
    //         }
    //         console.log("Erro ao realizar o Registro")
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // const clientLogin = async (formData) => {
    //     try {
    //         const { data } = await api.post("/login", formData);
    //         localStorage.setItem("@TOKEN", data.token);
    //         setClient(data.user);
    //         console.log("Login Realizado com Sucesso!")
    //         // navigate("/dashboard")
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

    const getClient = async () => {
        try {
            const { data } = await api.get("/client", { headers: { Authorization: `Bearer ${token}` } })
            setClient(data[0]);
            // console.log("Data =", data)
        } catch (error) {
            if (error.response?.data.message === "insufficient permissions") {
                toast.error("Você não tem permissão")
            }
            console.error(error)
        }
    }

    const clientLogout = () => {
        setClient(null)
        navigate("/")
        localStorage.removeItem("@TOKEN")
        localStorage.removeItem("@USERID")
    }

    useEffect(() => {
        getClient()
    }, [])


    return (
        <ClientContext.Provider value={{ client, getClient, setClient, clientLogout }}>
            {children}
        </ClientContext.Provider>

    )

}








