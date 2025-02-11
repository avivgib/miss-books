import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"

const { useState, useEffect } = React

export function BookDetails({ onSetSelectedBookId, selectedBookId }) {

    const [book, setBook] = useState(null)

    const getReadingCategory = (pageCount) => {
        if (pageCount > 500) return 'Serious Reading'
        if (pageCount > 200) return 'Descent Reading'
        if (pageCount < 100) return 'Light Reading'
        return 'Standard Reading'
    }

    const getBookLifeStatus = (publishedDate) => {
        const currentYear = new Date().getFullYear()
        const publicationYear = new Date(publishedDate).getFullYear()
        const yearsOnAir = currentYear - publicationYear

        return yearsOnAir > 10 ? 'Vintage' : 'New'
    }

    const getBookPriceStatus = (amount) => {
        if (amount > 150) return 'expensive-price'
        if (amount < 20) return 'cheap-price'
        return ''
    }

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(selectedBookId)
            .then(book => setBook(book))
    }

    if (!book) return 'Loading...'

    function getBookLng(lng) {
        switch (lng) {
            case 'he':
                return 'Hebrew'
            case 'sp':
                return 'Spanish'
            default:
                return 'English'
        }
    }

    const {
        title,
        subtitle,
        thumbnail,
        pageCount,
        publishedDate,
        authors,
        description,
        language,
        categories,
        listPrice
    } = book

    return (
        <section className="book-details">
            <button className="back-btn" onClick={() => onSetSelectedBookId(null)}>
                <i className="fas fa-arrow-left"></i> Back
            </button>

            <div className="details-card">
                <div className="image-container">
                    <img src={thumbnail} alt={title} className="book-img" />
                    {listPrice.isOnSale && <div className="sale-badge">🔥 On Sale!</div>}
                </div>

                <div className="book-info">
                    <h1 className="book-title">{title}</h1>
                    <h3 className="book-subtitle">{subtitle}</h3>

                    <div><strong>Authors: </strong>
                        {authors.join(", ") || "Unknown"}
                    </div>

                    <div><strong>Published: </strong>
                        {publishedDate} - {getBookLifeStatus(publishedDate)}
                    </div>

                    <div><strong>Page Count: </strong>
                        {pageCount} - {getReadingCategory(pageCount)}
                    </div>

                    <div><strong>Categories: </strong>
                        {categories.join(", ") || "None"}
                    </div>

                    <div><strong>Language: </strong>
                        {getBookLng(language.toLowerCase())}
                    </div>

                    <div><strong>Price: </strong>
                        <span className={`price ${getBookPriceStatus(listPrice.amount)}`}>
                            {listPrice.amount.toLocaleString(undefined, { style: 'currency', currency: listPrice.currencyCode })}
                        </span>
                    </div>

                    {listPrice.isOnSale && <p className="sale-price">🔥 On Sale!</p>}

                    <div className="book-description">
                        <span><strong>Description: </strong></span>
                        <LongTxt text={description} />
                    </div>
                </div>
            </div>
        </section>
    )
}