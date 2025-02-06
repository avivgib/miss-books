import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books, onRemoveBook }) {

    return (
        <section className="books-list">
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