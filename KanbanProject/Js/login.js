const input = document.getElementById("inputNome");
const botao = document.getElementById("btnEntrar");

// carregar texto salvo
input.value = localStorage.getItem("textoInput") || "";

// salvar ao clicar
botao.addEventListener("click", () => {
  localStorage.setItem("textoInput", input.value);
  alert("salvo!");
});
