import { useContext } from "react"
import style from "./style.module.scss"
import { ClientContext } from "../../providers/client.provider"

export const Footer = ({ children }) => {
    const { client } = useContext(ClientContext)

    if (!client) {
        return <div>Usuário não encontrado</div>
    }

    return (
        <footer className={`${style.containerFooter}`}>
            <p className="headline">Direitos reservado para - {client[0].name} </p>
        </footer>
    )
}