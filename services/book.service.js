import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { books as defaultBooks } from '../assets/data/books.js'

const BOOK_KEY = 'bookDB'

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (!Array.isArray(books) || !books.length) {
                console.log('Loading books from file...')
                books = [...defaultBooks]
                utilService.saveToStorage(BOOK_KEY, books)
            }
            return _filterBooks(books, filterBy)
        })
}

function _filterBooks(books, filterBy) {
    if (filterBy.title) {
        const regExp = new RegExp(filterBy.title, 'i')
        books = books.filter(book => regExp.test(book.title))
    }
    if (filterBy.amount) {
        books = books.filter(book => book.listPrice.amount >= filterBy.amount)
    }
    return books
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', amount = '') {
    return { title, amount }
}

function getDefaultFilter() {
    return { title: '', amount: '' }
}

function getEmptyBook(title = '', amount = 0) {
    return { title, amount }
}