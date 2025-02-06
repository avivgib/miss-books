import { AppHeader } from "../cmps/AppHeader"

export function Home({ onSetPage }) {
    return (
        <section className="home-page">
            <div className="glass-card">
                <h2>📚 Welcome to Miss Books</h2>
                <p>Organize and explore your personal library with ease.</p>
                <button className="explore-btn" onClick={() => onSetPage('Books')}>
                    📖 Start Exploring
                </button>
            </div>
        </section>
    )
}