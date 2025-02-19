import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { booksService } from "../services/books.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { Loader } from "../cmps/Loader.jsx"

const { useState, useEffect } = React
const { Link } = ReactRouterDOM


export function BookIndex() {
    const [books, setBooks] = useState(null)
    // console.log('books:', books)
    const [filterBy, setFilterBy] = useState(booksService.getDefaultFilter())
    // console.log('filterBy:', filterBy)

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        booksService.query(filterBy)
            .then(books => {
                setBooks(books)
            })
    }

    function onRemoveBook(bookId) {
        booksService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
                showSuccessMsg('Book Removed')
            })
            .catch(() => showErrorMsg('Book Not Removed'))
    }


    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }

    if (!books) return <Loader />

    return (
        <section className="books-container">
            <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <button><Link to="/book/edit">Add Book</Link></button>
            <BookList books={books} onRemoveBook={onRemoveBook} />
        </section>
    )
}