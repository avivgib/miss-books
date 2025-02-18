export function GoogleBooksList({ bookList, onSave }) {   
    return (
        <ul className="google-search-list">
            {bookList.map(book =>
                <li key={book.id}>
                    <span>{book.title}</span>
                    <button 
                        onClick={() => onSave(book)}>+</button>
                </li>)}
        </ul>
    )
}