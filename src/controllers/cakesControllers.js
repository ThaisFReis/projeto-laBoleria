import connection from "../database/db";

export async function cakesControllers(req, res) {
    const { name, price, image, description } = req.body;
    
    try {
        await connection.query(
            `INSERT INTO cakes (name, price, image, description) VALUES ($1, $2, $3, $4)`, 
            [name, price, image, description]
        );
        res.status(201).send("Pedido adicionado com sucesso");
    }

    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}