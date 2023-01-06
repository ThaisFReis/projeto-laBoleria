import connection from "../database/db";

export async function clientsControllers(req, res) {
    const { name, adress, phone } = req.body;
    
    try {
        await connection.query(
            `INSERT INTO clients (name, adress, phone) VALUES ($1, $2, $3)`, 
            [name, adress, phone]
        );
        res.status(201).send("Cliente adicionado com sucesso");
    }

    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}