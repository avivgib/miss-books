export function BookPreview({ book }) {
    return (
        <section className="book-preview">
            <h3>{book.title}</h3>

            <img src={book.thumbnail} alt={book.title} />

            <div><strong>Price: </strong>
                <span className={`price ${book.listPrice.amount}`}>
                    {book.listPrice.amount.toLocaleString(undefined, { style: 'currency', currency: book.listPrice.currencyCode })}
                </span>
            </div>

            <div className="book-authors"><strong>Authors: </strong>
                {book.authors.join(", ") || "Unknown"}
            </div>
        </section>
    )
}