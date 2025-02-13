export function BookPreview({ book }) {
    const { title, thumbnail, listPrice } = book
    // console.log('book-preview', book)

    return (
        <section className="book-preview">
            <h3>{title}</h3>

            <img
                src={thumbnail || "../assets/img/default.png"}
                alt={title}
            />

            <div><strong>Price: </strong>
                <span className={'price'}>
                    {listPrice.amount.toLocaleString(undefined, { style: 'currency', currency: listPrice.currencyCode })}
                </span>
            </div>

        </section>
    )
}