const { useState, useEffect } = React
import { bookService } from "../services/book.service.js"

const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes?q="

export function BookAdd() {
    const [query, setQuery] = useState('')
    const [books, setBooks] = useState([])
    const [timeoutId, setTimeoutId] = useState(null)

    useEffect(() => {
        if (!query) {
            setBooks([])
            return
        }

        if (!timeoutId) clearTimeout(timeoutId)
        const id = setTimeoutId(() => {
            fetchBooks(query)
        }, 500)
        setTimeoutId(id)
    }
        , [query])

    function fetchBooks(searchTerm) {
        fetch(GOOGLE_BOOKS_API + searchTerm)
            .then((res) => res.json())
            .then((data) => {
                if (data.items) {
                    setBooks(data.items)
                } else {
                    setBooks([])
                }
            })
            .catch((err) => console.error('Get books error:', err))
    }

    function handleAddBook(googleBook) {
        debugger
        const formattedBook = {
            id: googleBook.id,
            title: googleBook.volumeInfo.title,
            authors: googleBook.volumeInfo.authors || 'Unknown',
            thumbnail: googleBook.volumeInfo.imageLinks.smallThumbnail || '',
            listPrice: {
                amount: googleBook.saleInfo.listPrice.amount || 0,
                currencyCode: googleBook.saleInfo.listPrice.currencyCode || 'USD',
                isOnSale: googleBook.saleInfo.saleability === 'FOR_SALE'
            },
        }
        debugger
        bookService.addGoogleBook(formattedBook)
    }

    return (
        <section>
            <h2>Add Book</h2>
            <input
                type="text"
                placeholder="Add a New Book..."
                value={query}
                onChange={(ev) => setQuery(ev.target.value)} />

            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        {book.volumeInfo.title}
                        <button onClick={() => handleAddBook(book)}>+</button>
                    </li>
                ))}
            </ul>
        </section>
    )

}