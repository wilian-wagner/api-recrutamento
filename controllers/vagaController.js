import Vaga from "../models/vaga.js"; // Ajuste conforme sua estrutura

// Helper function to transform strings to lowercase
const toLowerCaseStrings = (obj) => {
  const transformedObj = {};
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      transformedObj[key] = obj[key].toLowerCase();
    } else {
      transformedObj[key] = obj[key];
    }
  }
  return transformedObj;
};

// Criação de nova vaga
export const createVaga = async (req, res) => {
  try {
    // Transformar dados do corpo da requisição em letras minúsculas
    const requestData = toLowerCaseStrings(req.body);
    
    // Verificação básica de campos obrigatórios
    const { titulo, descricao, cargo, cidade } = requestData;
    if (!titulo || !descricao || !cargo || !cidade) {
      return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
    }

    // Criar vaga
    const vaga = await Vaga.create(requestData);
    res.status(201).json(vaga);
  } catch (error) {
    console.error('Erro ao criar a vaga:', error);
    res.status(500).json({ error: 'Erro ao criar a vaga' });
  }
};

// Listar todas as vagas (somente os títulos)
export const getAllVagas = async (req, res) => {
  try {
    const vagas = await Vaga.findAll({ attributes: ['titulo'] });
    res.status(200).json(vagas);
  } catch (error) {
    console.error('Erro ao listar as vagas:', error);
    res.status(500).json({ error: 'Erro ao listar as vagas' });
  }
};

// Buscar detalhes de uma vaga específica por ID
export const getVagaById = async (req, res) => {
  try {
    const vagaId = parseInt(req.params.id, 10);
    if (isNaN(vagaId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const vaga = await Vaga.findByPk(vagaId);
    if (vaga) {
      res.status(200).json(vaga);
    } else {
      res.status(404).json({ error: 'Vaga não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao buscar a vaga:', error);
    res.status(500).json({ error: 'Erro ao buscar a vaga' });
  }
};

// Atualizar uma vaga existente
export const updateVaga = async (req, res) => {
  try {
    const vagaId = parseInt(req.params.id, 10);
    if (isNaN(vagaId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const vaga = await Vaga.findByPk(vagaId);
    if (vaga) {
      // Atualizar a vaga com dados convertidos para letras minúsculas
      const updatedData = toLowerCaseStrings(req.body);
      await vaga.update(updatedData);
      res.status(200).json(vaga);
    } else {
      res.status(404).json({ error: 'Vaga não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao atualizar a vaga:', error);
    res.status(500).json({ error: 'Erro ao atualizar a vaga' });
  }
};

// Excluir uma vaga
export const deleteVaga = async (req, res) => {
  try {
    const vagaId = parseInt(req.params.id, 10);
    if (isNaN(vagaId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const vaga = await Vaga.findByPk(vagaId);
    if (vaga) {
      await vaga.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Vaga não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao deletar a vaga:', error);
    res.status(500).json({ error: 'Erro ao deletar a vaga' });
  }
};

// Filtro por cargo
export const getCargo = async (req, res) => {
  try {
    const cargo = req.params.cargo.toLowerCase();
    const vagas = await Vaga.findAll({ where: { cargo } });
    if (vagas.length > 0) {
      res.status(200).json(vagas);
    } else {
      res.status(404).json({ error: 'Nenhuma vaga encontrada para o cargo especificado' });
    }
  } catch (error) {
    console.error('Erro ao filtrar vagas por cargo:', error);
    res.status(500).json({ error: 'Erro ao filtrar vagas por cargo' });
  }
};

// Filtro por localização (cidade)
export const getLocalizacao = async (req, res) => {
  try {
    const cidade = req.params.cidade.toLowerCase();
    const vagas = await Vaga.findAll({ where: { cidade } });
    if (vagas.length > 0) {
      res.status(200).json(vagas);
    } else {
      res.status(404).json({ error: 'Nenhuma vaga encontrada para a cidade especificada' });
    }
  } catch (error) {
    console.error('Erro ao filtrar vagas por cidade:', error);
    res.status(500).json({ error: 'Erro ao filtrar vagas por cidade' });
  }
};
