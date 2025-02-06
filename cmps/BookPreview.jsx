export function BookPreview({ book }) {
    return (
        <section className="preview-book">
            <h3>{book.title}</h3>
            <img src={book.thumbnail} alt={book.title} />
            <p>{book.publishedDate}</p>
        </section>
    )
}