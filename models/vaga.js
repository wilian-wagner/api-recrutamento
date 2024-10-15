import { DataTypes } from "sequelize"
import sequelize from "../database.js"

const Vaga = sequelize.define('Vaga', {
    titulo: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    cargo: DataTypes.STRING,
    cidade: DataTypes.STRING,
    salario: DataTypes.FLOAT,
});

export default Vaga
