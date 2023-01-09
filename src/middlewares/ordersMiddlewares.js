export async function postOrdersMiddlewares(req, res, next) {
    // Check if exists a client with the id
    const { client_id } = req.body;
    const client = await connection.query('SELECT * FROM clients WHERE id = $1', [client_id]);
    if (client.rowCount === 0) {
        return res.sendStatus(404);
    }

    // Check if exists a cake with the id
    const { cake_id } = req.body;
    const cake = await connection.query('SELECT * FROM cakes WHERE id = $1', [cake_id]);
    if (cake.rowCount === 0) {
        return res.sendStatus(404);
    }

    // Check if the quantity is a number
    const { quantity } = req.body;
    if (isNaN(quantity) || quantity <= 0) {
        return res.sendStatus(400);
    }

    // The quantity must be greater than 0 and smaller than 5
    if (quantity <= 0 || quantity > 5) {
        return res.status(400).send("Quantidade deve ser maior que 0 e menor que 5");
    }
    next();
}