import { createContext, useContext, useEffect, useState } from "react"
import { api } from "../services/api";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { ClientContext } from "./client.provider";
import { useNavigate } from "react-router-dom";

export const ContactContext = createContext({});

export const ContactProvider = ({ children }) => {
    const [contactList, setContactList] = useState([])
    const [editingContact, setEditingContact] = useState()
    const { setLoading, loading, setClientList, clientList, getClientById, count, setCount } = useContext(ClientContext)
    const navigate = useNavigate()


    const editContact = async (id, formData) => {
        const token = localStorage.getItem("@TOKEN")
        try {
            const { data } = await api.patch(`/contact/${id}`, { "email": formData[0], "tel": formData[1] }, { headers: { Authorization: `Bearer ${token}` } })

            const newContactList = contactList.map(contact => {
                if (contact.id === id) {
                    return data
                } else {
                    return contact
                }
            })
            setContactList(newContactList)
            toast.success("Contato atualizado com sucesso!")
            navigate("/dashboard")
        } catch (error) {
            if (error.response?.data.message === "Phone number isn't valid, must be 11.") {
                toast.error("Numero invalido")
            }
            if (error.response?.data.message === "Email already exists, try another one") {
                toast.error("Email já existe")
            }
            console.error(error)
            toast.error("Falha ao atualizar o contato")
        }
    }


    const contactListCreate = async (formData) => {
        const token = localStorage.getItem("@TOKEN")
        try {
            const id = localStorage.getItem("@USERID")
            const { data } = await api.post(`/contact/${id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setContactList([...contactList, data])
            toast.success("Contato criado com sucesso!")
        } catch (error) {
            console.error(error)
            if (error.response?.data.message === "Email already exists, try another one") {
                toast.error("Email já cadastrado!")
            }
            if (error.response?.data.message === "The phone number cannot be null.") {
                toast.error("O numero de Telefone é obrigatorio!")
            }
        }
    }



    const deleteContact = async (deleteId) => {
        const token = localStorage.getItem("@TOKEN")
        try {
            await api.delete(`/contact/${deleteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const newContactList = contactList.filter(contact => contact.id !== deleteId)
            setContactList(newContactList)
            toast.success("Contato excluido!")
            setCount(!count)
        } catch (error) {
            console.error(error)
            if (error.response?.data.message === "Insufficient permissions, you don't have access to this account ") {
                toast.error("Você não tem permissão para deletar esse contato")
            }
            toast.error("Falha ao excluir contato!")
        }
    }

    const getContacts = async () => {
        const token = localStorage.getItem("@TOKEN")
        try {
            const { data } = await api.get(`/contact`, { headers: { Authorization: `Bearer ${token}` } })
            setClientList(data)
        } catch (error) {
            if (error.response?.data.message === "insufficient permissions") {
                toast.error("Você não tem permissão para listar todos os contatos")
            }
        } finally {
            (setLoading(false))
        }
    }

    useEffect(() => {
        const admin = localStorage.getItem("@ADMIN")
        if (admin == "true") {
            getContacts()
        }
    }, [count])


    return (
        <ContactContext.Provider value={{ contactList, getContacts, contactListCreate, deleteContact, editContact }}>
            {children}
        </ContactContext.Provider>
    )
}