// ---------------------------
// Mostrar data escolhida
// ---------------------------
const input = document.getElementById("data");
const texto = document.getElementById("dataEscolhida");

if (input && texto) {
    input.addEventListener("change", () => {
        texto.textContent = input.value;
    });
}



// ---------------------------
// Clonar tasks
// ---------------------------

// 1. botão de adicionar
const addBtn = document.querySelector('.aFazerTask img');

// 2. template da primeira task
const template = document.querySelector('.tasksASeremFeitas');

// 3. container geral
const container = document.querySelector('.MainContainer');


addBtn.addEventListener('click', function(event) {
    event.preventDefault(); // evita reload

    // clona a task inteira
    const clone = template.cloneNode(true);

    // limpa inputs
    clone.querySelector('.todoTituloInput').value = "";
    clone.querySelector('.todoDescriptionInput').innerText = "";
    clone.querySelector('#data').value = "";

    // --- RESETAR BANDEIRA PARA BRANCA ---
    clone.querySelector('.todoFlag').src = "./Imgs/whiteFlag.png";

    // adiciona ao container
    container.appendChild(clone);
});



// ---------------------------
// Delegação de eventos das bandeiras
// ---------------------------
document.addEventListener("click", function(e) {

    // verifica se clicou numa bandeira pequena
    if (e.target.matches(".flags img")) {

        const clickedFlag = e.target;

        // sobe até o bloco da tarefa
        const flagDiv = clickedFlag.closest(".todoFlagDiv");

        // bandeira principal daquela tarefa
        const mainFlag = flagDiv.querySelector(".todoFlag");

        // troca a bandeira apenas nessa tarefa
        mainFlag.src = clickedFlag.src;
    }
});
