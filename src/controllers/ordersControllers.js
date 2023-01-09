import connection from "../database/db.js";

// Post a new order
export async function postOrdersControllers(req, res) {
    // format of the database table orders is:
    //id, clientId REFERENCES clients(id), cakeId REFERENCES cakes(id), quantity, createdAt e totalPrice

    const { client_id, cake_id, quantity } = req.body;
    const client = await connection.query('SELECT * FROM clients WHERE id = $1', [client_id]);
    const cake = await connection.query('SELECT * FROM cakes WHERE id = $1', [cake_id]);
    const totalPrice = cake.rows[0].price * quantity;
    const createdAt = new Date();
    const order = await connection.query('INSERT INTO orders ("clientId", "cakeId", quantity, "createdAt", "totalPrice") VALUES ($1, $2, $3, $4, $5) RETURNING *', [client_id, cake_id, quantity, createdAt, totalPrice]);
    res.send(order.rows[0]);
}

// Get all orders
export async function getAllOrdersControllers(req, res) {
    // Can receive a query string date with the format YYYY-MM-DD
    const date = req.query.date;
    if (date) {
        const orders = await connection.query('SELECT * FROM orders WHERE "createdAt"::date = $1', [date]);
        if (orders.rowCount === 0) {
            return res.send([]);
        }
        res.send(orders.rows);
    }
}


// Get an order by id
export async function getOrdersByIdControllers(req, res) {
    const id = req.params.id;
    const order = await connection.query('SELECT * FROM orders WHERE id = $1', [id]);
    if (order.rowCount === 0) {
        return res.sendStatus(404);
    }
    // Return the order with the client info, cake info and order info
    const client = await connection.query('SELECT * FROM clients WHERE id = $1', [order.rows[0].clientId]);
    const cake = await connection.query('SELECT * FROM cakes WHERE id = $1', [order.rows[0].cakeId]);
    const orderInfo = {
        client: {
            id: client.rows[0].id,
            name: client.rows[0].name,
            phone: client.rows[0].phone,
            address: client.rows[0].address,
        },
        cake: {
            id: cake.rows[0].id,
            name: cake.rows[0].name,
            price: cake.rows[0].price,
            flavor: cake.rows[0].flavor,
            ingredients: cake.rows[0].ingredients,
            image: cake.rows[0].image,
        },
        id: order.rows[0].id,
        createdAt: order.rows[0].createdAt,
        quantity: order.rows[0].quantity,
        totalPrice: order.rows[0].totalPrice
    }

    res.sendStatus(200).send(orderInfo);
}

// Get an order by client id
export async function getOrdersByClientIdControllers(req, res) {
    const id = req.params.id;
    
    // Check if the client exists
    const client = await connection.query('SELECT * FROM clients WHERE id = $1', [id]);
    if (client.rowCount === 0) {
        return res.sendStatus(404);
    }

    // Get all orders from the client
    const orders = await connection.query('SELECT * FROM orders WHERE "clientId" = $1', [id]);
    if (orders.rowCount === 0) {
        return res.send([]);
    }
    res.send(orders.rows);
}