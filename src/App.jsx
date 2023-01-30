import Routers from "./routes/Routers.jsx"
import { ToastContainer } from 'react-toastify'
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css"
import './index.scss'

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
      />
      <Routers />
    </>
  )
}

export default App
