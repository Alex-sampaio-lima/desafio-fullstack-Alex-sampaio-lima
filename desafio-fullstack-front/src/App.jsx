import { RoutesMain } from './routes'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import "../styles/index.scss"

function App() {

  return (
    <>    
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
      <RoutesMain />
    </>
  )
}

export default App
