import { AppHeader } from "./cmps/AppHeader.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"

const { useState } = React

export function App() {
    const [page, setPage] = useState('Home')

    function onSetPage(newPage) {
        setPage(newPage)
    }

    const pages = {
        Home: <HomePage onSetPage={onSetPage}/>,
        Books: <BookIndex />,
        About: <AboutUs />
    }

    return (
        <section className="app">
            <AppHeader onSetPage={onSetPage} activePage={page} pages={pages} />

            <main className="main-layout">
                {pages[page]}
            </main>
        </section>
    )
}