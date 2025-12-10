// /src/modules/Business/Business.service.js
import { VacancyRepository } from './vacancy.repository.js';

export class VacancyService {
    
    async create(data) {
        // Exemplo de LÓGICA DE NEGÓCIO: validação antes de salvar
        if (!data.position || data.position.length < 3) {
            throw new Error('O título da vaga deve ter pelo menos 3 caracteres.');
        }
        
        // Chamada à Camada de Dados (Repository)
        return VacancyRepository.create(data);
    }

    async findById(id) {
        const vacancy = await VacancyRepository.findById(id);
        // Exemplo de lógica: se não encontrar, lança erro
        if (!vacancy) {
            throw new Error(`Vaga com ID ${id} não encontrada.`);
        }
        return vacancy;
    }
    
    async findAll() {
        // Simplesmente retorna todas, sem lógica adicional por enquanto
        return VacancyRepository.findAll();
    }



    // ... outros métodos do serviço ...
}