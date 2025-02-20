const { useState, useEffect, useRef } = React
const { Link, NavLink } = ReactRouterDOM

import { utilService } from "../services/util.service.js"

export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    let isClosable = useRef(false)
    const elNav = useRef(null)

    function toggleMenu() {
        if (!isMenuOpen) {
            isClosable.current = false
            
            setTimeout(() => {
                isClosable.current = true
            }, 1500);
        }

        setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen)
    }

    // Handle animation open/close navigation
    useEffect(() => {
        if (!isMenuOpen || !elNav.current || window.innerWidth > 768) return

        utilService.animateCSS(elNav.current, 'fadeInTopRight', true)

        function handleClickOutside({ target }) {
            // Check if the click was outside the open navigation and menu-toggle button
            if (!target.closest('.nav-links') && !target.closest('.menu-toggle') && isClosable.current) {
                utilService.animateCSS(elNav.current, 'fadeOutTopRight', true)
                    .then(() => setIsMenuOpen(false))
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [isMenuOpen])

    return (
        <header className="app-header main-layout">
            <h1 className="logo">Miss Books</h1>

            <button className="menu-toggle" onClick={toggleMenu}>☰</button>

            <nav ref={elNav} className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/book" >Books</NavLink>
                <NavLink to="/about" >About</NavLink>
            </nav>
        </header>
    )
}