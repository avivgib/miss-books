import { bookService } from "../services/book.service.js"

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

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(selectedBookId)
            .then(book => setBook(book))
    }

    if (!book) return 'Loading...'

    return (
        <section className="book-details">
            <button className="back-btn" onClick={() => onSetSelectedBookId(null)}>⬅ Back</button>

            <div className="book-card">
                <img src={book.thumbnail} alt={book.title} className="book-img" />

                <div className="book-info">
                    <h1 className="book-title">{book.title}</h1>
                    <h3 className="book-subtitle">{book.subtitle}</h3>

                    <p><strong>Authors:</strong> {book.authors.join(", ") || "Unknown"}</p>
                    <p><strong>Published:</strong> {book.publishedDate} - {getBookLifeStatus(book.publishedDate)}</p>
                    <p><strong>Page Count:</strong> {book.pageCount} - {getReadingCategory(book.pageCount)}</p> 
                    <p><strong>Categories:</strong> {book.categories.join(", ") || "None"}</p>
                    <p><strong>Language:</strong> {book.language.toUpperCase()}</p>

                    <p><strong>Price:</strong>
                        {book.listPrice.amount.toLocaleString(undefined, { style: 'currency', currency: book.listPrice.currencyCode })}
                    </p>

                    {book.listPrice.isOnSale && <p className="sale-price">🔥 On Sale!</p>}

                    <p className="book-description"><strong>Description:</strong> {book.description}</p>
                </div>
            </div>
        </section>
    )
}