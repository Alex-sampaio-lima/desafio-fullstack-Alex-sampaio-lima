import { useContext } from "react"
import style from "./style.module.scss"
import { ClientContext } from "../../providers/client.provider"

export const Footer = ({ children }) => {
    const { client } = useContext(ClientContext)

    return (
        <footer className={`${style.containerFooter}`}>
            <p className="headline">Direitos reservado para - Autor Desconhecido </p>
        </footer>
    )
}