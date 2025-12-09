import { VacancyModel } from './vacancy.model.js';

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
    static async findByQuery(query) {
        return VacancyModel.find(query).exec();
    }
    
    // ... métodos para update e delete ...
}