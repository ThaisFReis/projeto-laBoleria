import connection from "../database/db.js";

export async function cakesControllers(req, res) {
    const { name, price, image, description } = req.body;

    // Check if the request method is POST
    if (req.method === "POST") {

        try {
            // Insert the new cake in the database
            await connection.query(`
                INSERT INTO cakes (name, price, image, description)
                VALUES ($1, $2, $3, $4)
                `, [name, price, image, description]);

                return res.status(201)
    
        } 
        
        catch (error) {
            res.status(500).send(error.message);
        }
    }

    // Check if the request method is GET
    if (req.method === "GET") {

        try {
            // Get all cakes from the database
            const cakes = await connection.query(`
                SELECT * FROM cakes
                `);

                return res.status(200).send(cakes.rows);

        } 
        
        catch (error) {
            res.status(500).send(error.message);
        }
    }
}