import { VacancyModel } from "./vacancy.model.js";

export class VacancyRepository {
  // Método para criar uma nova Empresa
  static async create(vacancyData) {
    const newVacancy = new VacancyModel(vacancyData);
    return newVacancy.save();
  }

  // Método para buscar uma Empresa por ID
  static async findById(id) {
    return VacancyModel.findById(id).exec();
  }

  // Método para buscar todas as Empresas
  static async findAll() {
    return VacancyModel.find().exec();
  }

  // Método para buscar Empresas por nome ou cidade (exemplo)
  static async findByBusinessId(businessId) {
    return VacancyModel.find({businessId}).exec();
  }

  static async deleteByBusinessId(businessId) {
    return VacancyModel.deleteMany({ businessId }).exec();
  }

  static async update(id, vacancyData) {
    return VacancyModel.findByIdAndUpdate(id, vacancyData, {
      new: true,
    }).exec();
  }
  static async delete(id) {
    return VacancyModel.findByIdAndDelete(id).exec();
  }
  static async findByWhere(where = {}) {
  return VacancyModel.find(where).exec();
}

}
