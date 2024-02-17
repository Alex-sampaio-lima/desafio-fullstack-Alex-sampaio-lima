import { createContext, useEffect, useState } from "react"
import { api } from "../services/api";
import { toast } from "react-toastify";

export const ContactContext = createContext({});

export const ContactProvider = ({ children }) => {
    const [contactList, setContactList] = useState([])
    const [editingContact, setEditingContact] = useState()
    const token = localStorage.getItem("@TOKEN")


    console.log(contactList)
    console.log(token)

    const editContact = async (id, formData) => {
        try {
            const response = await api.patch(`/contact/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const newContactList = contactList.map(contact => {
                if (contact.id === editingContact.id) {
                    return data;
                } else {
                    return contact
                }
            })
            console.log("Data", response.data.editingContact)
            setContactList(newContactList)
            console.log("contact", contactList)
            setEditingContact(response.data.editingContact)
            toast.success("Contato atualizado com sucesso!")
        } catch (error) {
            if (error.response?.data.message === "Phone number isn't valid, must be 11.") {
                toast.error("Numero maior que 11")
            }
            console.log(error)
            toast.error("Falha ao atualizar o contato")
        }
    }

    const contactListCreate = async (formData) => {
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

    const getContacts = async () => {
        try {
            const { data } = await api.get("/contact", { headers: { Authorization: `Bearer ${token}` } })
            setContactList(data)
        } catch (error) {
            console.error(error)
            if (error.response?.data.message === "insufficient permissions") {
                toast.error("Você não tem permissão para listar todos os contatos")
            }
        }
    }

    const deleteContact = async (deleteId) => {
        try {
            await api.delete(`/contact/${deleteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const newContactList = contactList.filter(contact => contact.id !== deleteId)
            setContactList(newContactList)
            toast.success("Contato excluido!")
        } catch (error) {
            console.log(error)
            toast.error("Falha ao excluir contato!")
        }
    }


    useEffect(() => {
        if (token) {
            getContacts();
        }
    }, [])


    return (
        <ContactContext.Provider value={{ contactList, getContacts, contactListCreate, deleteContact, editContact }}>
            {children}
        </ContactContext.Provider>

    )


}