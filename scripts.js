// Inicializar cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adicionar iluminação
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// Criar cubos coloridos
const geometry = new THREE.BoxGeometry();
const materials1 = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Vermelho
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Verde
    new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Azul
    new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Amarelo
    new THREE.MeshBasicMaterial({ color: 0xff00ff }), // Rosa
    new THREE.MeshBasicMaterial({ color: 0x00ffff })  // Ciano
];

// Cubo 1
const cube1 = new THREE.Mesh(geometry, materials1);
cube1.position.set(-3, 0, 0);  // Posição inicial cubo 1
scene.add(cube1);

// Cubo 2
const cube2 = new THREE.Mesh(geometry, materials1);
cube2.position.set(3, 0, 0);  // Posição inicial cubo 2
scene.add(cube2);

// Posicionar a câmera
camera.position.z = 10;

// Variáveis de controle para o movimento de vaivém
let direction1 = 1;  // Direção do cubo 1
let direction2 = -1; // Direção do cubo 2
const speed = 0.05;  // Velocidade do movimento
const boundary = 5;  // Definir a extremidade da tela (ajustável)

// Função de animação
function animate() {
    requestAnimationFrame(animate);

    // Rotação dos cubos
    cube1.rotation.x += 0.01;
    cube1.rotation.y += 0.01;
    cube2.rotation.x += 0.01;
    cube2.rotation.y += 0.01;

    // Movimento de vaivém
    cube1.position.x += direction1 * speed;
    cube2.position.x += direction2 * speed;

    // Verificar colisão entre os cubos
    if (Math.abs(cube1.position.x - cube2.position.x) <= 1.1) {
        // Inverter a direção quando os cubos se tocarem
        direction1 *= -1;
        direction2 *= -1;
    }

    // Verificar se os cubos atingiram as extremidades da tela e inverter a direção
    if (cube1.position.x <= -boundary || cube1.position.x >= boundary) {
        direction1 *= -1;
    }
    if (cube2.position.x <= -boundary || cube2.position.x >= boundary) {
        direction2 *= -1;
    }

    renderer.render(scene, camera);
}

// Iniciar a animação
animate();

// Ajustar o tamanho do canvas ao redimensionar a janela
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
