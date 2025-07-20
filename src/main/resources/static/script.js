// script.js ATUALIZADO COM EDIÇÃO

// 1. FUNÇÃO PARA BUSCAR DADOS DA API
async function fetchData(endpoint) {
    try {
        const response = await fetch(`http://localhost:8080/${endpoint}`);
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Erro ao buscar dados de ${endpoint}:`, error);
        return [];
    }
}

// 2. FUNÇÃO PARA RENDERIZAR OS CARDS
function renderCards(items, category) {
    const container = document.getElementById(`${category}-cards`);
    container.innerHTML = '';

    if (items.length === 0) {
        container.innerHTML = '<div class="loading">Nenhum item encontrado nesta categoria.</div>';
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <h3 class="card-title">${item.name || 'Nome Indisponível'}</h3>
            <p class="card-type">Tipo: ${item.tp || 'N/A'}</p>
            <p class="card-units">Unidades: ${item.units !== undefined ? item.units : 'N/A'}</p>
            <p class="card-meters">Metros: ${item.meters !== undefined ? item.meters : 'N/A'}</p>
            <p class="card-size">Tamanho (cm): ${item.sizeCm !== undefined ? item.sizeCm : 'N/A'}</p>
            <p class="card-size">Tamanho (mm): ${item.sizeMm !== undefined ? item.sizeMm : 'N/A'}</p>
            <button class="edit-button" onclick="editItem(${item.id}, '${category}')">Editar</button>
            <button class="delete-button" onclick="deleteItem(${item.id}, '${category}')">Excluir</button>
        `;
        container.appendChild(card);
    });
}

// 3. FUNÇÃO PARA TROCAR AS ABAS
async function switchTab(tabName) {
    // Remove 'active' de todos os botões e seções
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));

    // Ativa o botão e seção clicados
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-section`).classList.add('active');

    // Mostra loading
    const cardsGrid = document.getElementById(`${tabName}-cards`);
    cardsGrid.innerHTML = '<div class="loading">🔄 Carregando itens...</div>';

    // Busca dados e renderiza
    const data = await fetchData(tabName);
    renderCards(data, tabName);
}

// 4. EVENTOS E CARREGAMENTO INICIAL
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            switchTab(button.getAttribute('data-tab'));
        });
    });
    switchTab('aluminium');
});

// 5. FUNÇÕES PARA MODAL DE ADIÇÃO
function openAddModal() {
    document.getElementById('add-modal').style.display = 'block';
}

function closeAddModal() {
    document.getElementById('add-modal').style.display = 'none';
    document.getElementById('add-form').reset();
}

// 6. ADICIONAR ITEM
async function addItem(event) {
    event.preventDefault();

    const category = document.getElementById('category').value;
    const name = document.getElementById('name').value;
    const tp = document.getElementById('tp').value;
    const units = document.getElementById('units').value;
    const meters = document.getElementById('meters').value;
    const sizeCm = document.getElementById('sizeCm').value;
    const sizeMm = document.getElementById('sizeMm').value;

    const newItem = {
        name,
        tp,
        units: parseInt(units),
        meters: meters ? parseFloat(meters) : null,
        sizeCm: sizeCm ? parseFloat(sizeCm) : null,
        sizeMm: sizeMm ? parseFloat(sizeMm) : null
    };

    try {
        const response = await fetch(`http://localhost:8080/${category}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newItem)
        });

        if (!response.ok) throw new Error(`Erro: ${response.status} - ${response.statusText}`);

        await response.json();
        alert('Item adicionado com sucesso!');
        closeAddModal();
        switchTab(category);
    } catch (error) {
        console.error('Erro ao adicionar item:', error);
        alert('Erro ao adicionar item. Verifique o console.');
    }
}

// 7. EXCLUIR ITEM
async function deleteItem(itemId, category) {
    if (!confirm('Tem certeza que deseja excluir este item?')) return;

    try {
        const response = await fetch(`http://localhost:8080/${category}/${itemId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error(`Erro: ${response.status} - ${response.statusText}`);

        alert('Item excluído com sucesso!');
        switchTab(category);
    } catch (error) {
        console.error('Erro ao excluir item:', error);
        alert('Erro ao excluir item. Verifique o console.');
    }
}

// =================== NOVAS FUNÇÕES PARA EDIÇÃO =================== //

// 8. ABRIR E FECHAR MODAL DE EDIÇÃO
function openEditModal() {
    document.getElementById('edit-modal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

// 9. PREENCHER FORMULÁRIO DE EDIÇÃO
async function editItem(itemId, category) {
    try {
        // Buscar dados do item
        const response = await fetch(`http://localhost:8080/${category}/${itemId}`);
        if (!response.ok) throw new Error(`Erro: ${response.status}`);

        const itemData = await response.json();

        // Preencher formulário
        document.getElementById('edit-id').value = itemId;
        document.getElementById('edit-category').value = category;
        document.getElementById('edit-name').value = itemData.name;
        document.getElementById('edit-tp').value = itemData.tp;
        document.getElementById('edit-units').value = itemData.units;
        document.getElementById('edit-meters').value = itemData.meters || '';
        document.getElementById('edit-sizeCm').value = itemData.sizeCm || '';
        document.getElementById('edit-sizeMm').value = itemData.sizeMm || '';

        // Abrir modal
        openEditModal();
    } catch (error) {
        console.error('Erro ao carregar dados para edição:', error);
        alert('Erro ao carregar dados. Verifique o console.');
    }
}

// 10. ATUALIZAR ITEM
async function updateItem(event) {
    event.preventDefault();

    const id = document.getElementById('edit-id').value;
    const category = document.getElementById('edit-category').value;
    const name = document.getElementById('edit-name').value;
    const tp = document.getElementById('edit-tp').value;
    const units = document.getElementById('edit-units').value;
    const meters = document.getElementById('edit-meters').value;
    const sizeCm = document.getElementById('edit-sizeCm').value;
    const sizeMm = document.getElementById('edit-sizeMm').value;

    const updatedItem = {
        name,
        tp,
        units: parseInt(units),
        meters: meters ? parseFloat(meters) : null,
        sizeCm: sizeCm ? parseFloat(sizeCm) : null,
        sizeMm: sizeMm ? parseFloat(sizeMm) : null
    };

    try {
        const response = await fetch(`http://localhost:8080/${category}/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedItem)
        });

        if (!response.ok) throw new Error(`Erro: ${response.status} - ${response.statusText}`);

        alert('Item atualizado com sucesso!');
        closeEditModal();

        // Recarregar a aba atual
        const activeTab = document.querySelector('.tab-button.active').getAttribute('data-tab');
        switchTab(activeTab);
    } catch (error) {
        console.error('Erro ao atualizar item:', error);
        alert('Erro ao atualizar item. Verifique o console.');
    }
}

// 11. FECHAR MODAIS CLICANDO FORA
window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('add-modal')) closeAddModal();
    if (event.target === document.getElementById('edit-modal')) closeEditModal();
});