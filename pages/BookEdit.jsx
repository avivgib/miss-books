const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { bookService } from "../services/book.service.js"

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const { title, listPrice } = bookToEdit
    const amount = listPrice && listPrice.amount || ''

    const navigate = useNavigate()
    const { bookId } = useParams()
    // console.log('bookId:', bookId)

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
                break;

            case 'checkbox':
                value = target.checked
                break;
        }

        setBookToEdit(prevBookToEdit => {
            const updatedListPrice = {
                ...prevBookToEdit.listPrice,
                amount: field === 'amount' ? value : (prevBookToEdit.listPrice && prevBookToEdit.listPrice.amount) || '',
                currencyCode: (prevBookToEdit.listPrice && prevBookToEdit.listPrice.currencyCode) || 'ILS',
                isOnSale: (prevBookToEdit.listPrice && prevBookToEdit.listPrice.isOnSale) || false
            }

            if (field === 'amount') {
                return { ...prevBookToEdit, listPrice: updatedListPrice }
            }

            return { ...prevBookToEdit, listPrice: updatedListPrice, [field]: value }
        })
    }

    function onSaveBook(ev) {
        ev.preventDefault()

        bookService.save(bookToEdit)
            .then(savedBook => {
                console.log('savedBook', savedBook)

                navigate('/book')
                showSuccessMsg(bookId ? 'Book Edited' : 'Book Added')
            })
            .catch(err => {
                console.log(bookId ? 'Problem edit book' : 'Problem add book', err)
                showErrorMsg(bookId ? 'Problem edit book' : 'Problem add book')
            })
    }

    return (
        <section className="book-edit">

            <h1> {bookId ? 'Edit Book' : 'Add New Book'} </h1>

            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title:</label>
                <input
                    name="title"
                    id="title"
                    type="text"
                    placeholder="Enter book title"
                    onChange={HandleEdit} // Two Way - get data from input value (by name) to state 
                    value={title || ''} // Two Way - get data from state to input value
                />

                <label htmlFor="amount">Amount:</label>
                <input
                    name="amount"
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    onChange={HandleEdit} // Two Way - get data from input value (by name) to state 
                    value={amount || ''} // Two Way - get data from state to input value
                />

                <button>Save</button>
            </form>

        </section>
    )
}