const submit = document.querySelector("#criar-tarefa");
const input = document.querySelector("#nome-tarefa");
const form = document.querySelector("#form");

class ToDo {
  constructor() {
    this.lista = document.querySelector(".lista-de-tarefas");
    this.input = document.getElementById("nome-tarefa");
    this.form = document.getElementById("form");

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.adicionarTarefa();
    });

    this.lista.addEventListener("click", (e) => {
      this.handleClick(e);
    });
  }

  adicionarTarefa() {
    const texto = this.input.value.trim();

    if (texto == "") return;

    const tarefa = document.createElement("div");
    tarefa.classList.add("tarefa");

    tarefa.innerHTML = `
          <label class="checkbox">
            <input type="checkbox" />
            <span class="checkmark"></span>
          </label>

          <p class="tarefa-p">${texto}</p>

          <div class="icons">
            <button class="editar">
              <i
                class="fa-solid fa-pen-to-square"
                style="color: rgb(33, 64, 175)"
              ></i>
            </button>
            <button class="remover">
              <i class="fa-solid fa-trash" style="color: rgb(33, 64, 175)"></i>
            </button>
          </div>`;

    this.lista.appendChild(tarefa);

    this.input.value = "";
  }

  handleClick(e) {
    const botao = e.target.closest("button");
    if (!botao) return;

    if (botao.classList.contains("remover")) {
      console.log("clicou em remover");
    }
  }
}

new ToDo();
