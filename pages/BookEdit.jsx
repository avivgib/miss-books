const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { BookAdd } from "../cmps/BookAdd.jsx"

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const { title, listPrice } = bookToEdit
    const amount = listPrice.amount || ''

    const navigate = useNavigate()
    const { bookId } = useParams()
    const [isAddingManually, setIsAddingManually] = useState(false)

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(setBookToEdit)
            .catch(err => console.log('err', err))
    }

    function HandleEdit({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break
            case 'checkbox':
                value = target.checked
                break
        }

        setBookToEdit(prevBookToEdit => {
            const updatedListPrice = {
                ...prevBookToEdit.listPrice,
                amount: field === 'amount' ? value : prevBookToEdit.listPrice.amount || '',
                currencyCode: prevBookToEdit.listPrice.currencyCode || 'ILS',
                isOnSale: prevBookToEdit.listPrice.isOnSale || false
            }

            return field === 'amount'
                ? { ...prevBookToEdit, listPrice: updatedListPrice }
                : { ...prevBookToEdit, listPrice: updatedListPrice, [field]: value }
        })
    }

    function onSaveBook(ev) {
        ev.preventDefault()

        bookService.save(bookToEdit)
            .then(() => {
                navigate('/book')
                showSuccessMsg(bookId ? 'Book Edited' : 'Book Added')
            })
            .catch(() => {
                showErrorMsg(bookId ? 'Problem editing book' : 'Problem adding book')
            })
    }

    return (
        <div>
            <section className="book-edit">
                <h1>{bookId ? 'Edit Book' : 'Add New Book'}</h1>

                <form onSubmit={onSaveBook}>
                    <label htmlFor="title">Title:</label>
                    <input
                        name="title"
                        id="title"
                        type="text"
                        placeholder="Enter book title"
                        onChange={HandleEdit}
                        value={title || ''}
                        disabled={!isAddingManually && !bookId} // מבטל את הקלט אם לא מוסיפים ידנית
                    />

                    <label htmlFor="amount">Amount:</label>
                    <input
                        name="amount"
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        onChange={HandleEdit}
                        value={amount || ''}
                        disabled={!isAddingManually && !bookId}
                    />

                    <button disabled={!isAddingManually && !bookId}>Save</button>
                </form>

                {!bookId && (
                    <button onClick={() => setIsAddingManually(!isAddingManually)}>
                        {isAddingManually ? "Cancel Manual Entry" : "Add Manually"}
                    </button>
                )}
            </section>

            {!bookId && !isAddingManually && (
                <section>
                    <BookAdd />
                </section>
            )}
        </div>
    )
}
