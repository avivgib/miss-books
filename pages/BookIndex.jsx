import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)
    console.log('books:', books)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    console.log('filterBy:', filterBy)

    // const [selectedBookId, setSelectedBookId] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
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

    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }

    if (!books) return <div>Loading...</div>
    return (
        <section className="books-container">
            <h1>Book List:</h1>
            
            <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <BookList books={books} onRemoveBook={onRemoveBook} />

        </section>
    )
}