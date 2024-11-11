// Função para mudar a face para aparência de rede ao clicar
function mudarParaRede(face) {
    // Adiciona a classe 'rede' à face clicada
    face.classList.toggle('rede');
}

// Seleciona todas as faces do cubo e adiciona o evento de clique
const faces = document.querySelectorAll('.face');
faces.forEach(face => {
    face.addEventListener('click', function() {
        mudarParaRede(this);
    });
});
