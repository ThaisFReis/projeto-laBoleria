import connection from "../database/db.js";

export async function clientsControllers(req, res) {
    const { name, address, phone } = req.body;
    
    // Check if the request is a POST
    if (req.method === "POST") {

        try {
            // Insert the client into the database
            await connection.query(` INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3)`, [name, address, phone]);

                return res.status(201);
    
        } 
        
        catch (error) {
            res.status(500).send(error.message);
        }
    }

    // Check if the request is a GET
    if (req.method === "GET"){

        try {
            // Get all clients from the database
            const clients = await connection.query(` SELECT * FROM clients`);

            return res.status(200).send(clients.rows);

        } 
        
        catch (error) {
            res.status(500).send(error.message);
        }
    }
}