const mysql = require("../../database")
const { sendMessage } = require(`./email.controller`);

class MessageFlowController {

    create = async (req, res, next) => {

        const { template_name } = req.body;
        const { position } = req.body;

        try {
            const [result] = await mysql.execute('INSERT INTO message_flow (template_name,position) VALUES (?,?)',
                [template_name, position]);

            res.status(200).json("Mensagem criada com sucesso");

        } catch (err) {
            res.status(500).json({ message: "Algo deu errado" });
        }
    }

    update = async (req, res) => {

        const { id } = req.params;
        const { template_name } = req.body;
        const { position } = req.body;

        try {
            const [alterar] = await mysql.execute(`UPDATE message_flow
            SET template_name  = ?,
            position = ?
            WHERE id = ?`,
                [template_name, position, id]);

            res.status(200).json({ message: 'Mensagem alterado com sucesso' });

        } catch (err) {
            res.status(500).json({ message: " Algo deu errado" });
        }
    }

    list = async (req, res) => {
        try {
            const [lista] = await mysql.execute('SELECT * FROM message_flow');

            res.status(200).json(lista);
        } catch (err) {
            res.status(500).json({ message: "Algo deu errado" });
        }
    }


    get = async (req, res) => {
        const { id } = req.params;

        try {
            const [buscaId] = await mysql.execute('SELECT * FROM message_flow WHERE id = ?', [id]);

            res.status(200).json(buscaId);
        } catch (err) {
            res.status(500).json({ message: "Algo deu errado" });
        }



    }

    delete = async (req, res) => {
        const { id } = req.params;

        try {
            const [apagar] = await mysql.execute('DELETE FROM message_flow WHERE id = ?', [id])

            res.status(202).json({ mensagem: 'Mensagem removida com sucesso' });

        } catch (err) {
            res.status(500).json({
                message: "Algo deu errado"
            });
        }

    }   
}

module.exports = new MessageFlowController