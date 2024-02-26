import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { ClientContext } from "../../providers/client.provider"


export const ProtectedRoutes = () => {
    const { client } = useContext(ClientContext)
    if(!client) {
        return <div>Sem</div>
    }

    return client ? <Outlet /> : <Navigate to="/" />
}