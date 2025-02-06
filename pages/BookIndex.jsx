import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookIndex() {
    const [books, setBooks] = useState([])
    console.log('books:', books)
    // const [selectedBookId, setSelectedBookId] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.query()
            .then(books => {
                console.log('books:', books)
                setBooks(books)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                console.log('Remove')
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
            })
    }

    return (
        <section className="books-container">
            <h1>Book List:</h1>

            <BookList books={books} onRemoveBook={onRemoveBook} />

        </section>
    )
}