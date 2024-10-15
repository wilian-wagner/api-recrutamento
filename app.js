import express from 'express';
import sequelize from './database.js';
import { vagaRoutes,routes } from './routes/vagaRoutes.js';  // Importa as rotas definidas

const app = express();
app.use(express.json());

try {
    await sequelize.sync();
} catch (erro) {
    console.log(erro);
}
// Usa as rotas de vaga
app.use('/vagas', vagaRoutes);
app.use(routes)
app.listen(3000, () => {
    console.log('API rodando na porta 3000');
});
