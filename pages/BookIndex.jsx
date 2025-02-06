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
            .then(books =>{
                console.log('books:', books)
                setBooks(books)
            })
    }

    return (
        <section className="books-container">
            <h1>Book List</h1>

            <section className="books-list">
            {books.map(book =>
                    <article key={book.id}>
                        {/* <bookPreview book={book} /> */}
                        <section className="preview-book">
                            <h3>{book.title}</h3>
                            <img src={book.thumbnail} alt={book.title}/>
                            <p>{book.publishedDate}</p>
<hr/>
                            <button onClick={() => onRemoveBook(book.id)}>Delete</button>
                            <button onClick={() => onSetSelectedBookId(book.id)}>Details</button>
                        </section>
                        <hr/><hr/>
                    </article>
                )}
            </section>

        </section>
    )
}