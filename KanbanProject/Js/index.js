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

        if (e.target.matches(".flags img")) {
            const flagDiv = e.target.closest(".todoFlagDiv");
            const mainFlag = flagDiv.querySelector(".todoFlag");
            mainFlag.src = e.target.src;
        }

        if (e.target.classList.contains("trash")) {
            e.target.closest(".task").remove();
        }

        if (e.target.classList.contains("next")) {

            const task = e.target.closest(".task");
            const currentColumn = task.closest(".MainContainer1, .MainContainer2, .MainContainer3");

            const nextColumn = getNextColumn(currentColumn);
            if (nextColumn) {
                nextColumn.appendChild(task);
            }
        }
    });

    // =====================
    // CARREGAR TAREFAS
    // =====================
    const salvos = JSON.parse(localStorage.getItem("kanban_tasks")) || [];

    salvos.forEach(t => {
        const coluna =
            t.column === "todo" ? ".MainContainer1" :
            t.column === "progress" ? ".MainContainer2" :
            ".MainContainer3";

        const container = document.querySelector(coluna);
        const template = getTemplate(container);

        const clone = template.cloneNode(true);

        clone.dataset.id = t.id;
        clone.querySelector(".todoTituloInput").value = t.title;
        clone.querySelector(".todoDescriptionInput").innerText = t.description;
        clone.querySelector("input[type='date']").value = t.date;
        clone.querySelector(".todoFlag").src = t.flag;

        container.appendChild(clone);
    });

    // =====================
    // SALVAR TAREFAS
    // =====================
    let contadorID = Number(localStorage.getItem("kanban_id_counter")) || 1;

    const btnSalvar = document.getElementById("btnSalvar");

    btnSalvar.addEventListener("click", () => {

        const tasks = Array.from(document.querySelectorAll(".task"));

        const listaParaSalvar = tasks.map(task => {

            const container = task.closest(".MainContainer1, .MainContainer2, .MainContainer3");
            let coluna = "todo";

            if (container.classList.contains("MainContainer2")) coluna = "progress";
            if (container.classList.contains("MainContainer3")) coluna = "done";

            if (!task.dataset.id) {
                task.dataset.id = "task_" + contadorID;
                contadorID++;
                localStorage.setItem("kanban_id_counter", contadorID);
            }

            return {
                id: task.dataset.id,
                title: task.querySelector(".todoTituloInput")?.value || "",
                description: task.querySelector(".todoDescriptionInput")?.innerText || "",
                date: task.querySelector("input[type='date']")?.value || "",
                flag: task.querySelector(".todoFlag")?.src || "./Imgs/whiteFlag.png",
                column: coluna
            };
        });

        localStorage.setItem("kanban_tasks", JSON.stringify(listaParaSalvar));
        alert("Tarefas salvas!");
    });

});
