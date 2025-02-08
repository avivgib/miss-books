import { AppHeader } from "../cmps/AppHeader"

export function HomePage({ onSetPage }) {
    return (
        <section className="home-page">
            <div className="glass-card">
                <h2><i className="fa-solid fa-house"></i> Welcome to</h2>
                <h2>Miss Books</h2>
                <p>Organize and explore your personal library with ease</p>
                <button className="explore-btn" onClick={() => onSetPage('Books')}>
                <i className="fa-solid fa-search"></i> Start Exploring
                </button>
            </div>
        </section>
    )
}