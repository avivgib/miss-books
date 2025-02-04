import { utilService } from "../services/util.service.js"

const { useState, useEffect } = React

export function AppHeader({ onSetPage, activePage, pages }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    function handlePageChange(page) {
        onSetPage(page)
        // setIsMenuOpen(false) // Allow to remove the navigator after selecting a new page
    }

    // Handle animation open/close navigation
    useEffect(() => {
        const elNav = document.querySelector('.nav-links') //useRef
        if (elNav) {
            if (isMenuOpen) {
                utilService.animateCSS(elNav, 'fadeInTopRight')
            } else {
                utilService.animateCSS(elNav, 'fadeOutTopRight')
            }
        }
    }, [isMenuOpen])

    // Handle open/close navigation on small screen
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

            <button className="menu-toggle" onClick={() => toggleMenu()}>
                ☰
            </button>

            <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`} >
                {Object.keys(pages).map((pageName) => (
                    <a key={pageName}
                        className={activePage === pageName ? 'active' : ''}
                        onClick={() => handlePageChange(pageName)} >{pageName}</a>
                ))}
            </nav>
        </header>
    )
}