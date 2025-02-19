const { useNavigate } = ReactRouterDOM

export function HomePage() {
    const navigate = useNavigate()

    return (
        <section className="home-page">
            <div className="glass-card">
                <h2><i className="fa-solid fa-house"></i> Welcome to</h2>
                <h2>Miss Books</h2>

                <p>Organize and explore your personal library with ease</p>

                <button className="explore-btn" onClick={() => navigate('/book')}>
                    <i className="fa-solid fa-search"></i> Start Exploring
                </button>
            </div>
        </section>
    )
}