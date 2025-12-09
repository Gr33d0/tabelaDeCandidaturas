import { BusinessModel } from './business.model.js';

export class BusinessRepository {
    
    // Método para criar uma nova Empresa
    static async create(businessData) {
        const newBusiness = new BusinessModel(businessData);
        return newBusiness.save();
    }

    // Método para buscar uma Empresa por ID
    static async findById(id) {
        return BusinessModel.findById(id).exec();
    }

    // Método para buscar todas as Empresas
    static async findAll() {
        return BusinessModel.find().exec();
    }

    // Método para buscar Empresas por nome ou cidade (exemplo)
    static async findByQuery(query) {
        return BusinessModel.find(query).exec();
    }
    
    // ... métodos para update e delete ...
}