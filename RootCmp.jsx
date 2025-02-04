import { Home } from "./pages/Home.jsx"

export function App() {
    return (
        <section className="app">
            <header className="app-header main-layout">
                <h1>Miss Books</h1>
            </header>
            <main className="main-layout">
                <Home />
            </main>
        </section>
    )
}