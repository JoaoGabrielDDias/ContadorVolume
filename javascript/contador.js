// Função para mostrar ou esconder a sidebar
document.getElementById('menuHamburguer').addEventListener('click', () => {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('show');
  
});

// Seleção de elementos

let addBtns = document.querySelectorAll('.addBtn');
let subtractBtns = document.querySelectorAll('.subtractBtn');
let quantities = document.querySelectorAll('.quantity');
let resultContainer = document.getElementById('resultContainer');
let totalVolumesDisplay = document.getElementById('totalVolumes');
let copiedMsg = document.getElementById('copiedMsg');
let progressBarContainer = document.getElementById('progressBarContainer');
let progressBar = document.getElementById('progressBar');
let progressText = document.getElementById('progressText');

// Função para adicionar quantidade
addBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        let currentQuantity = parseInt(quantities[index].textContent);
        quantities[index].textContent = currentQuantity + 1;
    });
});

// Função para subtrair quantidade
subtractBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        let currentQuantity = parseInt(quantities[index].textContent);
        if (currentQuantity > 0) {
            quantities[index].textContent = currentQuantity - 1;
        }
    });
});

// Função para concluir e mostrar resultados
document.getElementById('concluirBtn').addEventListener('click', () => {
    // Mostrar a barra de carregamento centralizada
    mostrarCarregamento();

    // Simular carregamento com um delay
    setTimeout(() => {
        // Após o carregamento, mostrar resultados
        ocultarCarregamento();
        mostrarResultados();
    }, 4000); // Atraso de 2 segundos para simular carregamento
});

// Função para mostrar o carregamento
function mostrarCarregamento() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loadingOverlay';
    loadingOverlay.innerHTML = `
        <div class="loader"></div>
        <p>Carregando...</p>
    `;
    document.body.appendChild(loadingOverlay);
}

// Função para ocultar o carregamento
function ocultarCarregamento() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.remove();
    }
}

// Função para mostrar resultados e copiar para a área de transferência
function mostrarResultados() {
    let totalVolumes = 0;
    let clipboardData = '🎯CE254 \t📦Quantidade\n\n\n'; // Adicionando cabeçalho

    quantities.forEach((quantity, index) => {
        totalVolumes += parseInt(quantity.textContent);
        let itemName = document.querySelectorAll('.item')[index].textContent;
        clipboardData += `${itemName}: \t*${quantity.textContent}*\n`;
    });

    clipboardData += `\nTotal de volumes:\t*${totalVolumes}*`;

    // Usando SweetAlert2 para mostrar os resultados
    Swal.fire({
        title: 'Prontinho',
        text: '✨ Dados copiados com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK',
    });

    // Copiar dados para a área de transferência
    navigator.clipboard.writeText(clipboardData)
        .then(() => {
            console.log('Dados copiados para a área de transferência.');
        })
        .catch(err => {
            console.error('Erro ao copiar dados: ', err);
            alert('Erro ao copiar dados para a área de transferência. Por favor, copie manualmente.');
        });
}