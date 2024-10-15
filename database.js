import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('postgres://postgres:123@localhost:5433/testedb')

try {
    await sequelize.authenticate()
    console.log('Conectado com sucesso')
} catch (erro) {
    console.log('Erro ao conectar:', erro);
}

export default sequelize