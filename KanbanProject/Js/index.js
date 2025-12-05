// index.js totalmente funcional - KanbanTasks

document.addEventListener("DOMContentLoaded", () => {

    // =====================
    // Função: encontrar duplicata (TEMPLATE)
    // =====================
    function getTemplate(container) {
        return container.querySelector(".task");
    }

    // =====================
    // Função: próxima coluna
    // =====================
    function getNextColumn(container) {
        if (container.classList.contains("MainContainer1"))
            return document.querySelector(".MainContainer2");
        if (container.classList.contains("MainContainer2"))
            return document.querySelector(".MainContainer3");
        return null; // Em concluído não avança
    }

    // =====================
    // Criar nova tarefa
    // =====================
    document.querySelectorAll(".MainContainer1, .MainContainer2, .MainContainer3").forEach(container => {

        const addBtn = container.querySelector("a img");
        const template = getTemplate(container);

        addBtn.addEventListener("click", e => {
            e.preventDefault();

            const clone = template.cloneNode(true);

            // Zerar campos do clone
            clone.querySelector(".todoTituloInput").value = "";
            clone.querySelector(".todoDescriptionInput").innerText = "";
            clone.querySelector("input[type='date']").value = "";
            clone.querySelector(".todoFlag").src = "./Imgs/whiteFlag.png";

            container.appendChild(clone);
        });
    });

    // =====================
    // Delegação de eventos
    // =====================
    document.addEventListener("click", e => {

        // --------------------- TROCAR BANDEIRA
        if (e.target.matches(".flags img")) {
            const flagDiv = e.target.closest(".todoFlagDiv");
            const mainFlag = flagDiv.querySelector(".todoFlag");
            mainFlag.src = e.target.src;
        }

        // --------------------- APAGAR TAREFA
        if (e.target.classList.contains("trash")) {
            e.target.closest(".task").remove();
        }

        // --------------------- AVANÇAR TAREFA
        if (e.target.classList.contains("next")) {

            const task = e.target.closest(".task");
            const currentColumn = task.closest(".MainContainer1, .MainContainer2, .MainContainer3");

            const nextColumn = getNextColumn(currentColumn);
            if (nextColumn) {
                nextColumn.appendChild(task);
            }
        }
    });

});
