import { booksService } from "../services/books.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { AddGoogleBook } from "../cmps/AddGoogleBook.jsx"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(booksService.getEmptyBook())

    const navigate = useNavigate()
    const params = useParams()
    const [isManual, setIsManual] = useState(true)

    useEffect(() => {
        if (!params.bookId) return

        loadBook()
    }, [])

    function loadBook() {
        booksService.get(params.bookId)
            .then(setBookToEdit)
            .catch(err => console.log('err', err))
    }

    function onSaveBook(ev) {
        ev.preventDefault()

        booksService.save(bookToEdit)
            .then(() => showSuccessMsg(bookId ? 'Book Edited' : 'Book Added'))
            .catch(() => showErrorMsg(bookId ? 'Problem editing book' : 'Problem adding book'))
            .finally(() => navigate('/book'))
    }

    function handleChange({ target }) {
        const { type, name: prop } = target
        let { value } = target

        if (prop === 'authors') {
            value = value.split(',').map(author => author.trim())            
        }

        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break
            case 'checkbox':
                value = target.checked
                break
        }

        setBookToEdit(prevBookToEdit => ({ ...prevBookToEdit, [prop]: value }))
    }

    function handleChangeListPrice({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }

        setBookToEdit(prevBookToEdit => ({
            ...prevBookToEdit,
            listPrice: { ...prevBookToEdit.listPrice, [prop]: value }
        }))
    }

    const {
        title,
        authors,
        listPrice,
        description,
        pageCount
    } = bookToEdit

    return (
        <section className="book-edit">
            <h1>{params.bookId ? 'Edit' : 'Add New'} Book</h1>

            {!params.bookId && (
                <div className="mode-toggle">
                    <button onClick={() => setIsManual(prevIsManual => !prevIsManual)}>
                        {!isManual ? 'Add Manually' : 'Search on Google'}
                    </button>
                </div>
            )}

            {params.bookId || isManual ? (
                <form onSubmit={onSaveBook}>
                    <label htmlFor="title">Title:</label>
                    <input onChange={handleChange} value={title || ''} name="title" id="title" type="text" />

                    <label htmlFor="authors">Authors: </label>
                    <input onChange={handleChange} value={authors} id='authors' type="text" name='authors' />

                    <label htmlFor="description">Description: </label>
                    <input onChange={handleChange} value={description} id='description' type="text" name='description' />

                    <label htmlFor="pages">Number of pages: </label>
                    <input onChange={handleChange} value={pageCount} id='pages' type="number" name='pageCount' />

                    <label htmlFor="price">Price: </label>
                    <input onChange={handleChangeListPrice} value={listPrice.amount} id='price' type="number" name='amount' />

                    <label htmlFor="isOnSale">On Sale: </label>
                    <input onChange={handleChangeListPrice} checked={listPrice.isOnSale} id='isOnSale' type="checkbox" name='isOnSale' />

                    <button>Save</button>
                </form>
            ) : (
                <AddGoogleBook />
            )}
        </section>
    )
}
