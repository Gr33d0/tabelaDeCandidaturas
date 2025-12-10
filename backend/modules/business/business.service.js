// /src/modules/Business/Business.service.js
import { BusinessRepository } from "./business.repository.js";
import { VacancyRepository } from "../vacancy/vacancy.repository.js";

export class BusinessService {
  async create(data) {
    // Exemplo de LÓGICA DE NEGÓCIO: validação antes de salvar
    if (!data.name || data.name.length < 3) {
      throw new Error("O nome da empresa deve ter pelo menos 3 caracteres.");
    }

    // Chamada à Camada de Dados (Repository)
    return BusinessRepository.create(data);
  }

  async findById(id) {
    const business = await BusinessRepository.findById(id);
    // Exemplo de lógica: se não encontrar, lança erro
    if (!business) {
      throw new Error(`Empresa com ID ${id} não encontrada.`);
    }
    return business;
  }

  async findAll() {
    // Simplesmente retorna todas, sem lógica adicional por enquanto
    return BusinessRepository.findAll();
  }

  async update(id, updateData) {
    // Exemplo de LÓGICA DE NEGÓCIO: validação antes de atualizar
    if (updateData.name && updateData.name.length < 3) {
      throw new Error("O nome da empresa deve ter pelo menos 3 caracteres.");
    }
    const updatedBusiness = await BusinessRepository.update(id, updateData);
    if (!updatedBusiness) {
      throw new Error(`Empresa com ID ${id} não encontrada para atualização.`);
    }
    return updatedBusiness;
  }

  async delete(id) {
    await VacancyRepository.deleteByBusinessId(id);
    const business = await BusinessRepository.findById(id);
    if (!business) {
      throw new Error("Empresa não encontrada.");
    }

    const deleted = await BusinessRepository.delete(id);

    if (!deleted) {
      throw new Error("Falha ao deletar empresa.");
    }

    return "Business deleted";
  }

}
