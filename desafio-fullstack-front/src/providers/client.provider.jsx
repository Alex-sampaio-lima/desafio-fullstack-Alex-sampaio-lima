import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "react-toastify";


export const ClientContext = createContext({});

export const ClientProvider = ({ children }) => {

    const [client, setClient] = useState();
    const [clientList, setClientList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(false);
    const navigate = useNavigate();



    const getClient = async () => {
        const id = localStorage.getItem("@USERID")
        const admin = localStorage.getItem("@ADMIN")
        const token = localStorage.getItem("@TOKEN");
        try {
            setLoading(true)
            const { data } = await api.get(`/client`, { headers: { Authorization: `Bearer ${token}` } })
        } catch (error) {
            console.error(error)
            if (error.response?.data.message === "insufficient permissions") {
                toast.error("Você não tem permissão para listar todos os clientes")
            }
        } finally {
            (setLoading(false))
        }
    }
    const getClientById = async () => {
        const id = localStorage.getItem("@USERID")
        const admin = localStorage.getItem("@ADMIN")
        const token = localStorage.getItem("@TOKEN");
        try {
            setLoading(true)
            const { data } = await api.get(`/client/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            setClient(data)
            if (admin == "false") {
                setClientList(data[0].contact)
            }
        } catch (error) {
            console.error(error)
            if (error.response?.data.message === "insufficient permissions") {
                toast.error("Você não tem permissão para listar todos os clientes")
            }
        } finally {
            (setLoading(false))
        }
    }

    useEffect(() => {
        const admin = localStorage.getItem("@ADMIN")
        getClientById()

    }, [count])

    const clientLogout = () => {
        setClient(null)
        navigate("/")
        localStorage.removeItem("@TOKEN")
        localStorage.removeItem("@USERID")
        localStorage.removeItem("@SUBID")
        localStorage.removeItem("@ADMIN")
    }

    return (
        <ClientContext.Provider value={{ client, getClient, setClient, clientLogout, loading, setLoading, clientList, getClientById, setClientList, setCount, count }}>
            {children}
        </ClientContext.Provider>

    )

}








