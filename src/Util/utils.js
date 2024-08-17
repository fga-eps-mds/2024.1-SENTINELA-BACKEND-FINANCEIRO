const validator = (dados) => {
    if (typeof dados.nome !== "string" || dados.nome === "") {
        return "Nome ou Razão social inválidos";
    }

    return null;
};

module.exports = {
    validator,
};
