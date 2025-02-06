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
    let books = storageService.query(BOOK_KEY)

    if (!Array.isArray(books) || !books.length) {
        console.log('Loading books from file...')
        books = [...defaultBooks]
        utilService.saveToStorage(BOOK_KEY, books)
    }

    return Promise.resolve(_filterBooks(books, filterBy))
}

function _filterBooks(books, filterBy) {
    if (filterBy.title) {
        const regExp = new RegExp(filterBy.title, 'i')
        books = books.filter(book => regExp.test(book.title))
    }
    if (filterBy.pageCount) {
        books = books.filter(book => book.pageCount >= filterBy.pageCount)
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

function getEmptyBook(title = '', pageCount = 0) {
    return { title, pageCount }
}

function getDefaultFilter() {
    return { title: '', pageCount: 0 }
}