import { BookPreview } from "./BookPreview.jsx"
const { Link, useNavigate } = ReactRouterDOM

export function BookList({ books, onRemoveBook }) {
    const navigate = useNavigate()

    return (
        <section className="book-list">
            {books.map(book =>
                <article key={book.id} className='book-card'>
                    <BookPreview book={book} />

                    <section className="book-options">
                        <button onClick={() => onRemoveBook(book.id)}>Delete</button>
                        {/* <button onClick={() => navigate(`/book/:${book.id}`)}>Details</button> */}
                        <button>
                            <Link to={`/book/${book.id}`}>Details</Link>
                        </button>
                    </section>
                </article>
            )}
        </section>
    )
}