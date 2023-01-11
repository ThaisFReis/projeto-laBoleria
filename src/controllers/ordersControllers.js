import connection from "../database/db.js";

// Post a new order
export async function postOrders(req, res) {
    const { clientId, cakeId, quantity } = req.body;

    try {
        // Total price
        const cake = await connection.query(`SELECT * FROM cakes WHERE id = ${cakeId}`);
        const totalPrice = quantity * cake.rows[0].price;
        console.log(totalPrice);

        const date = new Date()

        const newOrder = await connection.query(`
            INSERT INTO orders ("clientId", "cakeId", quantity, "createdAt", "totalPrice") VALUES ($1, $2, $3, $4, $5)
        `, [clientId, cakeId, quantity, date, totalPrice]);

        res.status(201)

    } catch (error) {
        res.status(500).send(error.message);
    }
}


// Get all orders
export async function getOrdersByDate(req, res) {
    const date = req.query.date;

    if (date){
        // Verify if exists a order with the date
        const ordersDate = await connection.query(`SELECT * FROM orders WHERE "createdAt"::date = '${date}'`);
        if (ordersDate.rowCount === 0) {
            return res.send([]);
        }

        try {
            // Get all orders with the date
            const orders = await connection.query(
                `SELECT orders.id, orders.quantity, orders."createdAt", orders."totalPrice", orders."cakeId", orders."clientId"
                FROM orders WHERE orders."createdAt"::date = $1`,
                [date]
            );
            
            // If there is no order with the date, return an empty array
            if (orders.rowCount === 0) {
                return res.send([]);
            }

            // Get all cakes and clients infos and return an array with all orders infos
            // In this case, I used Promise.all to get all cakes and clients infos at the same time
            const ordersInfo = await Promise.all(orders.rows.map(async order => {

                // Get cake and client infos using the cakeId and clientId
                const cake = await connection.query(`SELECT * FROM cakes WHERE id = $1`, [order.cakeId]);
                const client = await connection.query(`SELECT * FROM clients WHERE id = $1`, [order.clientId]);

                return {
                    client: {
                        id: order.clientId,
                        name: client.rows[0].name,
                        address: client.rows[0].address,
                        phone: client.rows[0].phone
                    },
                    cake: {
                        id: order.cakeId,
                        name: cake.rows[0].name,
                        price: cake.rows[0].price,
                        description: cake.rows[0].description,
                        image: cake.rows[0].image
                    },
                    orderId: order.id,
                    quantity: order.quantity,
                    createdAt: order.createdAt,
                    totalPrice: order.totalPrice
                }
            }));

            res.send(ordersInfo);
            
        } 
        
        catch (error) {
            res.status(500).send(error.message);
        }
    }
    
    else {
        // If the user doesn't send a date, return all orders
        const cake = await connection.query('SELECT * FROM cakes');
        const client = await connection.query('SELECT * FROM clients');
        const orders = await connection.query('SELECT * FROM orders');

        // Get all cakes and clients infos and return an array with all orders infos
        const ordersInfo = orders.rows.map(order => {
            const cakeInfo = cake.rows.find(cake => cake.id === order.cakeId);
            const clientInfo = client.rows.find(client => client.id === order.clientId);
            
            // I used this if to avoid errors because if i don't use it, the code will try to return undefined or null
            if(clientInfo){
                return {
                    client: {
                        id: clientInfo.id,
                        name: clientInfo.name,
                        address: clientInfo.address,
                        phone: clientInfo.phone
                    },
                    cake: {
                        id: cakeInfo.id,
                        name: cakeInfo.name,
                        price: cakeInfo.price,
                        description: cakeInfo.description,
                        image: cakeInfo.image
                    },
                    orderId: order.id,
                    quantity: order.quantity,
                    createdAt: order.createdAt,
                    totalPrice: order.totalPrice
                }
            }
        });
        
        res.send(ordersInfo);
    }
}

// Get an order by id
export async function getOrdersById(req, res) {
    const { id } = req.params;

    // Verify if exists a order with the id
    const order = await connection.query(`SELECT * FROM orders WHERE id = $1`, [id]);

    // If there is no order with the id, return a empty array
    if (order.rowCount === 0) {
        return res.send([]);
    }

    // Return the requested order infos
    const client = await connection.query(`SELECT * FROM clients WHERE id = $1`, [order.rows[0].clientId]);

    const cake = await connection.query(`SELECT * FROM cakes WHERE id = $1`, [order.rows[0].cakeId]);

    const orderInfo = {
        client: {
            id: client.rows[0].id,
            name: client.rows[0].name,
            address: client.rows[0].address,
            phone: client.rows[0].phone
        },
        cake: {
            id: cake.rows[0].id,
            name: cake.rows[0].name,
            price: cake.rows[0].price,
            description: cake.rows[0].description,
            image: cake.rows[0].image
        },
        orderId: order.rows[0].id,
        quantity: order.rows[0].quantity,
        createdAt: order.rows[0].createdAt,
        totalPrice: order.rows[0].totalPrice
    }
    
    res.send(orderInfo);

}

// Get an order by client id
export async function getOrdersByClientId(req, res) {
    const id = req.params.id;
    
    // Check if the client exists
    const client = await connection.query('SELECT * FROM clients WHERE id = $1', [id]);

    // If the client doesn't exist, return a 404 status
    if (client.rowCount === 0) {
        return res.sendStatus(404);
    }

    // Get all orders from the client
    const orders = await connection.query('SELECT * FROM orders WHERE "clientId" = $1', [id]);

    // If the client doesn't have orders, return a empty array
    if (orders.rowCount === 0) {
        return res.send([]);
    }
    
    // Return all orders infos
    const ordersInfo = orders.rows.map( order => {
        return {
            orderId: order.id,
            quantity: order.quantity,
            createdAt: order.createdAt,
            totalPrice: order.totalPrice
        }
    })

    res.send(ordersInfo);

}