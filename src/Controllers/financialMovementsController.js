const FinancialMovements = require("../Models/financialMovementsSchema");

const createFinancialMovements = async (req, res) => {
    try {
        const { financialMovementsData } = req.body;
        if (!financialMovementsData) {
            return res.status(400).send({ error: "No data provided" });
        }

        // Criação da movimentação financeira
        const financialMovement = new FinancialMovements(
            financialMovementsData
        );
        await financialMovement.save();

        res.status(201).send(financialMovement);
    } catch (error) {
        console.error("Error creating financial movement:", error.message);
        return res.status(400).send({ error: error.message });
    }
};

const getFinancialMovements = async (req, res) => {
    try {
        const financialMovements = await FinancialMovements.find({});
        return res.status(200).send(financialMovements);
    } catch (error) {
        return res.status(400).send(error);
    }
};

const getFinancialMovementsById = async (req, res) => {
    try {
        const financialMovement = await FinancialMovements.findById(
            req.params.id
        );
        if (!financialMovement) {
            return res
                .status(404)
                .send({ error: "Financial Movement not found" });
        }
        return res.status(200).send(financialMovement);
    } catch (error) {
        return res.status(400).send(error);
    }
};

const deleteFinancialMovementsById = async (req, res) => {
    try {
        const deletedFinancialMovement =
            await FinancialMovements.findByIdAndDelete(req.params.id);
        if (!deletedFinancialMovement) {
            return res
                .status(404)
                .send({ error: "Financial Movement not found" });
        }
        return res.status(200).send(deletedFinancialMovement);
    } catch (error) {
        return res.status(400).send(error);
    }
};

const updateFinancialMovementsById = async (req, res) => {
    try {
        const financialMovement = await FinancialMovements.findById(
            req.params.id
        );
        if (!financialMovement) {
            return res
                .status(404)
                .send({ error: "Financial Movement not found" });
        }
        Object.assign(financialMovement, req.body.financialMovementsData);
        financialMovement.updatedAt = new Date();
        await financialMovement.save();
        return res.status(200).send(financialMovement);
    } catch (error) {
        return res.status(400).send(error);
    }
};

module.exports = {
    createFinancialMovements,
    getFinancialMovements,
    getFinancialMovementsById,
    deleteFinancialMovementsById,
    updateFinancialMovementsById,
};
