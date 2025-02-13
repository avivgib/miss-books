import { BookDetails } from "../cmps/BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { eventBusService, showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { Link } = ReactRouterDOM


export function BookIndex() {
    const [books, setBooks] = useState(null)
    // console.log('books:', books)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    // console.log('filterBy:', filterBy)

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => {
                setBooks(books)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
                showSuccessMsg('Book Removed')
            })
            .catch(err => {
                console.log('Problem removing book:', err)
                showErrorMsg('Book Not Removed')
            })
    }
    
    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }

    if (!books) return <div>Loading...</div>

    return (
        <section className="books-container">
            <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <button><Link to="/book/edit">Add Book</Link></button>
            <BookList books={books} onRemoveBook={onRemoveBook} />
        </section>
    )
}