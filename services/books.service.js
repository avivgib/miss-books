import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { books as defaultBooks } from '../assets/data/books.js'

const BOOK_KEY = 'bookDB'
const CACHE_STORAGE_KEY = 'googleSearchCache'
const gCache = utilService.loadFromStorage(CACHE_STORAGE_KEY) || {}

export const booksService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    getGoogleBooks,
    addGoogleBook,
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

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(_setNextPrevCarId)
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

function addGoogleBook(googleBook) {
    return storageService.post(BOOK_KEY, googleBook, false)
}

function getEmptyBook(title = '',authors='',  amount = '', description = '', pageCount = '', language = 'en' ) {
    return {
        title,
        authors,
        description,
        pageCount,
        thumbnail: '/assets/img/default.png',
        language,
        listPrice: { 
            amount, 
            currencyCode: 'ILS', 
            isOnSale: false 
        },
        // reviews: []
    }
}

function getDefaultFilter() {
    return { title: '', amount: '' }
}

function getGoogleBooks(bookName) {
    if (bookName === '') return Promise.resolve()
    const googleBooks = gCache[bookName]
    if (googleBooks) {
        return Promise.resolve(googleBooks)
    }

    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${bookName}`
    return axios.get(url)
        .then(res => {
            const data = res.data.items || []
            console.log(`data from network... ${data}`)
            const books = _formatGoogleBooks(data)
            gCache[bookName] = books
            utilService.saveToStorage(CACHE_STORAGE_KEY, gCache)
            return books
        })
        .catch(err => {
            console.log(`Error fetching books: ${err}`)
            return []
        })
}


// ~~~~~~~~~~~~~~~~LOCAL FUNCTIONS~~~~~~~~~~~~~~~~~~~


function _formatGoogleBooks(googleBooks) {
    return googleBooks.map(googleBook => {
        const { volumeInfo } = googleBook
        const book = {
            id: googleBook.id,
            title: volumeInfo.title,
            description: volumeInfo.description,
            pageCount: volumeInfo.pageCount,
            authors: volumeInfo.authors,
            categories: volumeInfo.categories,
            publishedDate: volumeInfo.publishedDate,
            language: volumeInfo.language,
            listPrice: {
                amount: utilService.getRandomIntInclusive(80, 500),
                currencyCode: "ILS",
                isOnSale: Math.random() > 0.7
            },
            // reviews: []
        }
        if (volumeInfo.imageLinks) book.thumbnail = volumeInfo.imageLinks.thumbnail
        // else book.thumbnail = '../assets/img/default.png'
        return book
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

function _setNextPrevCarId(book) {
    return storageService.query(BOOK_KEY).then((books) => {
        const bookIdx = books.findIndex((currentBook) => currentBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]

        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}