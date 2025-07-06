// script.js

// 1. FUNÇÃO PARA BUSCAR DADOS DA API
// O endpoint é o nome da categoria que corresponde à rota da sua API (ex: 'aluminium', 'iron', 'tools')
async function fetchData(endpoint) {
    try {
        const response = await fetch(`http://localhost:8080/${endpoint}`);
        if (!response.ok) {
            // Lança um erro se a resposta não for bem-sucedida (status 4xx ou 5xx)
            throw new Error(`Erro HTTP! Status: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json(); // Converte a resposta para JSON
        return data;
    } catch (error) {
        console.error(`Erro ao buscar dados de ${endpoint}:`, error);
        // Retorna um array vazio em caso de erro para evitar quebrar a renderização
        return [];
    }
}

// 2. FUNÇÃO PARA RENDERIZAR OS CARDS NA TELA
// 'items' são os dados recebidos da API
// 'category' é o nome da categoria (ex: 'aluminium', 'iron', 'tools')
function renderCards(items, category) {
    // Pega o contêiner correto para a categoria (ex: 'aluminium-cards')
    const container = document.getElementById(`${category}-cards`);
    container.innerHTML = ''; // Limpa qualquer conteúdo existente (como o "Carregando..." ou cards antigos)

    if (items.length === 0) {
        container.innerHTML = '<div class="loading">Nenhum item encontrado nesta categoria.</div>';
        return; // Sai da função se não houver itens
    }

    // Itera sobre cada item e cria um card
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card'; // Classe para estilização no CSS

        // Ajuste aqui para as propriedades EXATAS que sua API retorna.
        // Se sua API retorna 'nomeItem', use 'item.nomeItem'.
        // Use o operador || 'N/A' para lidar com propriedades que podem não existir.
        card.innerHTML = `
            <h3 class="card-title">${item.name || 'Nome Indisponível'}</h3>
            <p class="card-type">Tipo: ${item.tp || 'N/A'}</p>
            <p class="card-units">Unidades: ${item.units !== undefined ? item.units : 'N/A'}</p>
            <p class="card-meters">Metros: ${item.meters !== undefined ? item.meters : 'N/A'}</p>
            <p class="card-size">Tamanho (cm): ${item.sizeCm !== undefined ? item.sizeCm : 'N/A'}</p>
            <p class="card-size">Tamanho (mm): ${item.sizeMm !== undefined ? item.sizeMm : 'N/A'}</p>
            <button class="edit-button">Editar</button>
            <button class="delete-button">Excluir</button>
        `;
        // Adiciona atributos de dados para facilitar a manipulação posterior (edição/exclusão)
        card.dataset.itemId = item.id; // Assumindo que sua API retorna 'id'
        card.dataset.itemCategory = category;

        container.appendChild(card); // Adiciona o card ao contêiner
    });
}

// 3. FUNÇÃO PARA TROCAR AS ABAS E CARREGAR DADOS
// Agora a switchTab também é assíncrona para poder 'await' o fetchData
async function switchTab(tabName) {
    // Remove 'active' de todos os botões
    const allTabButtons = document.querySelectorAll('.tab-button');
    allTabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Remove 'active' de todas as seções de conteúdo
    const allSections = document.querySelectorAll('.content-section');
    allSections.forEach(section => {
        section.classList.remove('active');
    });

    // Adiciona 'active' no botão clicado
    const clickedButton = document.querySelector(`[data-tab="${tabName}"]`);
    clickedButton.classList.add('active');

    // Mostra a seção de conteúdo correspondente
    const targetSection = document.getElementById(`${tabName}-section`);
    targetSection.classList.add('active');

    // **NOVA LÓGICA PRINCIPAL: BUSCAR E EXIBIR DADOS DA API**
    const cardsGridId = `${tabName}-cards`; // Ex: 'aluminium-cards'
    const loadingMessageDiv = document.querySelector(`#${cardsGridId} .loading`);

    // Mostra uma mensagem de "Carregando..." enquanto os dados são buscados
    if (loadingMessageDiv) {
        loadingMessageDiv.textContent = '🔄 Carregando itens...';
    } else {
        // Se a div de loading não existir (depois da primeira carga), crie uma temporariamente
        const tempLoadingDiv = document.createElement('div');
        tempLoadingDiv.classList.add('loading');
        tempLoadingDiv.textContent = '🔄 Carregando itens...';
        document.getElementById(cardsGridId).innerHTML = ''; // Limpa antes de adicionar loading
        document.getElementById(cardsGridId).appendChild(tempLoadingDiv);
    }


    const data = await fetchData(tabName); // Chama a API para a categoria atual
    renderCards(data, tabName); // Renderiza os dados recebidos
}

// 4. ADICIONAR EVENTOS DE CLIQUE NAS ABAS E CARREGAMENTO INICIAL
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona ouvintes de evento de clique para os botões de aba
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName); // Chama a função para trocar a aba e carregar dados
        });
    });

    // Carrega a aba padrão (Alumínio) e seus dados assim que a página é carregada
    switchTab('aluminium');
});


// 5. FUNÇÕES PARA O MODAL (openAddModal, closeAddModal)
function openAddModal() {
    const modal = document.getElementById('add-modal');
    modal.style.display = 'block';
}

function closeAddModal() {
    const modal = document.getElementById('add-modal');
    modal.style.display = 'none';
    document.getElementById('add-form').reset(); // Limpa o formulário
}

// 6. FUNÇÃO PARA ADICIONAR ITEM (será conectada à API em breve)
async function addItem(event) { // Torne esta função assíncrona também
    event.preventDefault(); // Impede o recarregamento da página

    const category = document.getElementById('category').value;
    const name = document.getElementById('name').value;
    const tp = document.getElementById('tp').value;
    const units = document.getElementById('units').value;
    const meters = document.getElementById('meters').value;
    const sizeCm = document.getElementById('sizeCm').value;
    const sizeMm = document.getElementById('sizeMm').value;

    const newItem = { // Objeto com os dados do novo item
        name,
        tp,
        units: parseInt(units), // Converte para número inteiro
        meters: meters ? parseFloat(meters) : null, // Converte para número, ou null se vazio
        sizeCm: sizeCm ? parseFloat(sizeCm) : null,
        sizeMm: sizeMm ? parseFloat(sizeMm) : null
    };

    console.log('Tentando adicionar item:', newItem, 'na categoria:', category);

    try {
        // Faremos a requisição POST para a API aqui no PRÓXIMO PASSO!
        // Por enquanto, ainda apenas no console e um alerta.
        // const response = await fetch(`http://localhost:8080/${category}`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(newItem)
        // });

        // if (!response.ok) {
        //     throw new Error(`Erro ao adicionar item! Status: ${response.status}`);
        // }

        // const addedItem = await response.json();
        // console.log('Item adicionado com sucesso na API:', addedItem);

        alert('Item adicionado com sucesso! (Ainda apenas no console. A conexão com a API virá a seguir.)');

        closeAddModal();
        // Após adicionar (e quando estiver conectado à API), você vai querer recarregar os cards da categoria.
        // switchTab(category); // Descomentar isso no próximo passo.

    } catch (error) {
        console.error('Erro ao adicionar item:', error);
        alert('Erro ao adicionar item. Verifique o console.');
    }
}

// 7. FECHAR MODAL CLICANDO FORA DELE
window.addEventListener('click', function(event) {
    const modal = document.getElementById('add-modal');
    if (event.target === modal) {
        closeAddModal();
    }
});