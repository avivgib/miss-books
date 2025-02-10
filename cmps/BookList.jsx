import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books, onRemoveBook, onSetSelectedBookId }) {

    return (
        <section className="book-list">
            {books.map(book =>
                <article key={book.id}>
                    <BookPreview book={book} />

                    <section>
                        <hr />
                        <button onClick={() => onRemoveBook(book.id)}>Delete</button>
                        <button onClick={() => onSetSelectedBookId(book.id)}>Details</button>
                    </section>
                </article>
            )}
        </section>
    )
}