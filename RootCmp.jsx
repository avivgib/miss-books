import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"

const { useState } = React

export function App() {
    const [page, setPage] = useState('Home')

    function onSetPage(newPage) {
        setPage(newPage)
    }

    const pages = {
        Home: <Home />,
        About: <About />,
        Book: <BookIndex />
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