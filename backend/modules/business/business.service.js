// /src/modules/Business/Business.service.js
import { BusinessRepository } from './business.repository.js';

export class BusinessService {
    
    async create(data) {
        // Exemplo de LÓGICA DE NEGÓCIO: validação antes de salvar
        if (!data.name || data.name.length < 3) {
            throw new Error('O nome da empresa deve ter pelo menos 3 caracteres.');
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

    // ... outros métodos do serviço ...
}