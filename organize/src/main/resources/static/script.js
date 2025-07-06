// 1. FUNÇÃO PARA TROCAR AS ABAS
function switchTab(tabName) {
    // Remove a classe 'active' de todos os botões
    const allTabButtons = document.querySelectorAll('.tab-button');
    allTabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Remove a classe 'active' de todas as seções
    const allSections = document.querySelectorAll('.content-section');
    allSections.forEach(section => {
        section.classList.remove('active');
    });

    // Adiciona 'active' no botão clicado
    const clickedButton = document.querySelector(`[data-tab="${tabName}"]`);
    clickedButton.classList.add('active');

    // Mostra a seção correspondente
    const targetSection = document.getElementById(`${tabName}-section`);
    targetSection.classList.add('active');
}

// 2. ADICIONAR EVENTOS DE CLIQUE NAS ABAS
document.addEventListener('DOMContentLoaded', function() {
    // Pega todos os botões de aba
    const tabButtons = document.querySelectorAll('.tab-button');

    // Para cada botão, adiciona um evento de clique
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Pega o nome da aba do atributo 'data-tab'
            const tabName = this.getAttribute('data-tab');
            // Chama a função para trocar a aba
            switchTab(tabName);
        });
    });
});

// 3. FUNÇÕES PARA O MODAL (já referenciadas no HTML)
function openAddModal() {
    const modal = document.getElementById('add-modal');
    modal.style.display = 'block';
}

function closeAddModal() {
    const modal = document.getElementById('add-modal');
    modal.style.display = 'none';

    // Limpa o formulário
    document.getElementById('add-form').reset();
}

// 4. FUNÇÃO TEMPORÁRIA PARA ADICIONAR ITEM (será melhorada depois)
function addItem(event) {
    event.preventDefault(); // Impede o formulário de recarregar a página

    // Pega os valores do formulário
    const category = document.getElementById('category').value;
    const name = document.getElementById('name').value;
    const type = document.getElementById('tp').value;
    const units = document.getElementById('units').value;
    const meters = document.getElementById('meters').value;
    const sizeCm = document.getElementById('sizeCm').value;
    const sizeMm = document.getElementById('sizeMm').value;

    // Por enquanto, apenas mostra no console (depois conectamos com a API)
    console.log('Item adicionado:', {
        category,
        name,
        type,
        units,
        meters,
        sizeCm,
        sizeMm
    });

    // Fecha o modal
    closeAddModal();

    // Mostra uma mensagem temporária
    alert('Item adicionado com sucesso! (Por enquanto apenas no console)');
}

// 5. FECHAR MODAL CLICANDO FORA DELE
window.addEventListener('click', function(event) {
    const modal = document.getElementById('add-modal');
    if (event.target === modal) {
        closeAddModal();
    }
});