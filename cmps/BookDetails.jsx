import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ onSetSelectedBookId, selectedBookId }) {

    const [book, setBook] = useState(null)

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
            <button onClick={() => onSetSelectedBookId(null)}>⬅ Back</button>

            <section className="book-card">
                <img src={book.thumbnail} alt={book.title} className="book-img" />

                <section className="book-info">
                    <h1 className="book-title">{book.title}</h1>
                    <p><strong>Author:</strong> {book.authors || 'Unknown'}</p>
                    <p><strong>Published:</strong> {book.publishedDate}</p>
                    <p><strong>Price:</strong>
                        {book.listPrice.amount.toLocaleString(undefined, { style: 'currency', currency: book.listPrice.currencyCode })}
                    </p>
                    <p><strong>Description:</strong> {book.description || 'No description available.'}</p>
                </section>
            </section>
        </section>
    )
}