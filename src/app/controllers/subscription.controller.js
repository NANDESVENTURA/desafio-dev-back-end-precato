const mysql = require(`../../database`);

class SubscriptionController {
    /**
     * 
     * @param {*} req - object request from requisition
     * @param {*} res - object response from requisition 
     * @returns 
     */
    create = async (req, res, next) => {
        const { name } = req.body
        const { email } = req.body

        try {
            const [foundSubscription] =  await mysql.execute('SELECT * FROM subscriptions WHERE email = ?', [email]);
            if(foundSubscription.length) {                
                return res.status(400).send({ message: "Email ja existente" })
            }
            const newSubscription = {
                email: email,
                name: name,
                active: true,
                subscription_date: new Date(),
                last_message: 0
            }
            const [result] = await mysql.execute('INSERT INTO subscriptions (email,subscription_date,name,last_message,active) VALUES (?,?,?,?,?)',
                [newSubscription.email,  newSubscription.subscription_date, newSubscription.name, newSubscription.last_message, newSubscription.active]
            )

            res.status(200).json({message:"Inscrição criado com sucesso", data: newSubscription});

        } catch (err) {
            res.status(500).json({ message: "Algo deu errado" })
        }

    }

    update = async (req, res) => {

        const { id } = req.params;
        const { active } = req.body;

        try {
            const [alterar] = await mysql.execute(`UPDATE subscriptions
            SET active  = ?
            WHERE id = ?`,
                [active, id])

            res.status(200).json({ message: 'cadastro alterado com sucesso' })

        } catch (err) {
           
            res.status(500).json({ message: " Algo deu errado" })
        }
    }

    list = async (req, res) => {
        try {
            const [lista] = await mysql.execute('SELECT * FROM subscriptions')
                        res.status(200).json(lista);
        } catch (err) {
            
            res.status(500).json({ message: "Algo deu errado" })
        }
    }


    get = async (req, res) => {
        const { id } = req.params;

        try {
            const [buscaId] = await mysql.execute('SELECT * FROM subscriptions WHERE id = ?',
                [id])

            res.status(200).json(buscaId)
        } catch (err) {
            res.status(500).json({ message: "Algo deu errado" })
        }
    }

    delete = async (req, res) => {
        const { id } = req.params;

        try {
            const [apagar] = await mysql.execute('DELETE FROM subscriptions WHERE id = ?', [id])

            res.status(202).json({ mensagem: 'Cadastro removido com sucesso' });

        } catch (err) {
            res.status(500).json({
                message: "Algo deu errado"
            })
        }
    }
}

module.exports = new SubscriptionController();