import { BookPreview } from "./BookPreview.jsx"
const { Link } = ReactRouterDOM

export function BookList({ books, onRemoveBook }) {

    return (
        <section className="book-list">
            {books.map(book =>
                <article key={book.id} className='book-card'>
                    <BookPreview book={book} />

                    <section className="book-options">
                        <button onClick={() => onRemoveBook(book.id)}>Delete</button>
                        <button><Link to={`/book/${book.id}`}>Details</Link></button>
                        <button><Link to={`/book/edit/${book.id}`}>Edit</Link></button>
                    </section>
                </article>
            )}
        </section>
    )
}