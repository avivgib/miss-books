export function AppHeader({ onSetPage, activePage, pages }) {
    function handlePageChange(page) {
        onSetPage(page)
    }

    return (
        <header className="app-header main-layout">
            <h1 className="logo">Miss Books</h1>
            <nav className="nav-links">
                {Object.keys(pages).map((pageName) => (
                    <a key={pageName}
                        className={activePage === pageName ? 'active' : ''}
                        onClick={() => handlePageChange(pageName)} >{pageName}</a>
                ))}
            </nav>
        </header>
    )
}