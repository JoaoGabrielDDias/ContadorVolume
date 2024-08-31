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
    // Mostrar barra de progresso e ocultar os resultados
    resultContainer.style.display = 'block';
    progressBarContainer.style.display = 'block';

    

    // Inicializar barra de progresso
    progressBar.style.width = '0%';
    progressText.textContent = '0%';

    // Simular carregamento com um delay
    let progress = 0;
    let interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            // Após o carregamento, mostrar os resultados
            setTimeout(() => {
                progressBarContainer.style.display = 'none';
                resultContainer.style.display = 'block';
                mostrarResultados();
            }, 500);
        }
    }, 100);
});

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
    totalVolumesDisplay.textContent = `✅Total de volumes: ${totalVolumes}`;
    copiedMsg.style.display = 'block'; // Exibindo mensagem de dados copiados

    // Copiar dados para a área de transferência
    navigator.clipboard.writeText(clipboardData)
        .then(() => {
            // Sucesso ao copiar
        })
        .catch(err => {
            console.error('Erro ao copiar dados: ', err);
            alert('Erro ao copiar dados para a área de transferência. Por favor, copie manualmente.');
        });
}
