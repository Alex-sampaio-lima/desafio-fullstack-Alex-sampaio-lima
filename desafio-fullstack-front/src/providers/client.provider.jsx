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

    const getClient = async () => {
        try {
            const { data } = await api.get("/client", { headers: { Authorization: `Bearer ${token}` } })
            setClient(data[0]);
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








