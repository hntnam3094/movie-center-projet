const passport = require('passport')
const Book = require('../models/book')
require('../config/passport')(passport)

async function createBook(req, res) {
    const token = getToken(req.headers)
    if(token) {
        const newBook = new Book({
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            publisher: req.body.publisher
        })

        try {   
            const isSaved = await newBook.save()
            if(isSaved) {
                return res.json({
                    success: true,
                    message: 'Successful created new book'
                })
            }
        } catch(err) {
            return res.json({
                success: false,
                message: 'Save book failed'
            })
        }
    } else {
        return res.status(403).send({
            success: false,
            message: 'Unauthorized'
        })
    }
}

async function getBook(req, res) {
    const token = getToken(req.headers)
    if(token) {
        try {
            const books = await Book.find()
            if(books) {
                res.json({
                    success: true,
                    data: books
                })
            }
        } catch (err) {
            throw err
        } 
    } else {
        return res.status(403).send({
            success: false,
            message: 'Unauthorized'
        })
    }
}
function getToken(headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
        return parted[1];
        } else {
        return null;
        }
    } else {
        return null;
    }
};
module.exports = {
    createBook,
    getBook
}