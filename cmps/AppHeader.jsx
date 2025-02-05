import { utilService } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function AppHeader({ onSetPage, activePage, pages }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const elNav = useRef(null)

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    function handlePageChange(page) {
        onSetPage(page)
        // setIsMenuOpen(false) // Allow to remove the navigator after selecting a new page
    }

    // Handle animation open/close navigation
    useEffect(() => {
        if (!elNav.current) return

        if (window.innerWidth <= 768) {
            if (isMenuOpen) {
                setIsAnimating(true)
                utilService.animateCSS(elNav.current, 'fadeInTopRight').then(() => {
                    setIsAnimating(false)
                })
            } else {
                utilService.animateCSS(elNav.current, 'fadeOutTopRight').then(() => {
                    setIsAnimating(false)
                })
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

            <nav ref={elNav} className={`nav-links ${isMenuOpen ? 'open' : ''}`} >
                {Object.keys(pages).map((pageName) => (
                    <a key={pageName}
                        className={activePage === pageName ? 'active' : ''}
                        onClick={() => handlePageChange(pageName)} >{pageName}</a>
                ))}
            </nav>
        </header>
    )
}