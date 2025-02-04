const { useState, useEffect } = React

export function AppHeader({ onSetPage, activePage, pages }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    function handlePageChange(page) {
        onSetPage(page)
        setIsMenuOpen(false)
    }

    useEffect(() => {
        if (!isMenuOpen) return

        function handleClickOutside({ target }) {
            // Check if the click was outside the open navigation and menu-toggle button
            if (!target.closest('.nav-links') && !target.closest('.menu-toggle')) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => document.removeEventListener('click', handleClickOutside)
    }, [isMenuOpen])

    return (
        <header className="app-header main-layout">
            <h1 className="logo">Miss Books</h1>

            <button className="menu-toggle" onClick={(e) => {
                // Prevent the click event from propagating to parent elements
                e.stopPropagation()
                toggleMenu()
            }}>
                ☰
            </button>

            <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                {Object.keys(pages).map((pageName) => (
                    <a key={pageName}
                        className={activePage === pageName ? 'active' : ''}
                        onClick={() => handlePageChange(pageName)} >{pageName}</a>
                ))}
            </nav>
        </header>
    )
}