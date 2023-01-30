import { useRouteError } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

function ErrorPage() {
    const error = useRouteError()
    return (
        <>
            <Header />
            <main id="error-content">
                <div className="error">
                    <h1>Not found. An error occured!!</h1>
                    <p>{error.message}</p>
                </div>
                <Footer />
            </main>
        </>
    )
}

export default ErrorPage
