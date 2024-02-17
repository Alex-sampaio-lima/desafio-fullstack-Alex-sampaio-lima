import { useContext } from "react"
import { ClientContext } from "../../providers/client.provider"

export const Header = ({title}) => {

    const { clientLogout } = useContext(ClientContext)

    return (
        <>
            <header className="title1 primary marginInputBottom">
                <div>
                    <button className="btn-tertiary" onClick={() => clientLogout()}>Sair</button>
                </div>
            </header>
        </>
    )
}