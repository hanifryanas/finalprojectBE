const db = require('./db')

const createUsers = `
    CREATE TABLE users(
        id INTEGER PRIMARY KEY,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        address TEXT NOT NULL,
        phone TEXT NOT NULL,
        join_date TEXT NOT NULL
    )
`

const createProducts = `
    CREATE TABLE products(
        id INTEGER PRIMARY KEY,
        owner_ID INTEGER,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price INTEGER NOT NULL,
        image TEXT NOT NULL,
        category TEXT NOT NULL,
        bidding_range INTEGER NOT NULL,
        start_bid_date TEXT NOT NULL,
        close_bid_date TEXT NOT NULL,
        top_bidder TEXT,
        FOREIGN KEY (owner_ID) REFERENCES users(id),
        FOREIGN KEY (top_bidder) REFERENCES users(username)
        )
`

const createOrders = `
    CREATE TABLE orders(
        id INTEGER PRIMARY KEY,
        owner_ID INTEGER,
        product_ID INTEGER,
        bidder_ID INTEGER,
        price INTEGER NOT NULL,
        username_bidder TEXT NOT NULL,
        FOREIGN KEY (owner_ID) REFERENCES users(id),
        FOREIGN KEY (product_ID) REFERENCES products(id),
        FOREIGN KEY (bidder_ID) REFERENCES users(id),
        FOREIGN KEY (username_bidder) REFERENCES users(username)
    )
`

db.serialize(() => {
    // db.run(createUsers), (err) => {
    //     (err) ? console.error(err) : console.log('Users table created.')
    // }
    db.run(createProducts), (err) => {
        (err) ? console.error(err) : console.log('Products table created.')
    }
    // db.run(createOrders), (err) => {
    //     (err) ? console.error(err) : console.log('Orders table created.')
    // }
})