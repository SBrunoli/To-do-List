class ToDo {
  constructor() {
    this.lista = document.querySelector(".lista-de-tarefas");
    this.input = document.getElementById("nome-tarefa");
    this.form = document.getElementById("form");

    // Carregar tarefas
    this.carregarTarefas();

    // Eventos
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.adicionarTarefa();
    });

    this.lista.addEventListener("click", (e) => this.handleClick(e));

    // Filtros
    document.querySelector(".todas").addEventListener("click", () => {
      this.lista
        .querySelectorAll(".tarefa")
        .forEach((t) => (t.style.display = "flex"));
    });

    document.querySelector(".concluidas").addEventListener("click", () => {
      this.lista.querySelectorAll(".tarefa").forEach((t) => {
        const checked = t.querySelector("input").checked;
        t.style.display = checked ? "flex" : "none";
      });
    });

    document.querySelector(".pendentes").addEventListener("click", () => {
      this.lista.querySelectorAll(".tarefa").forEach((t) => {
        const checked = t.querySelector("input").checked;
        t.style.display = !checked ? "flex" : "none";
      });
    });
  }

  adicionarTarefa() {
    const texto = this.input.value.trim();
    if (!texto) return;

    this.criarTarefaDOM({ texto, concluida: false });
    this.input.value = "";
    this.salvarTarefas();
  }

  criarTarefaDOM({ texto, concluida }) {
    const tarefa = document.createElement("div");
    tarefa.classList.add("tarefa");

    tarefa.innerHTML = `
      <label class="checkbox">
        <input type="checkbox" ${concluida ? "checked" : ""} />
        <span class="checkmark"></span>
      </label>

      <p class="tarefa-p">${texto}</p>

      <div class="icons">
        <button class="editar">
          <i class="fa-solid fa-pen-to-square" style="color: rgb(33, 64, 175)"></i>
        </button>
        <button class="remover">
          <i class="fa-solid fa-trash" style="color: rgb(33, 64, 175)"></i>
        </button>
      </div>
    `;

    this.lista.appendChild(tarefa);
  }

  removerTarefa(botao) {
    const tarefa = botao.closest(".tarefa");
    tarefa.remove();
    this.salvarTarefas();
  }

  abrirEditor(botao) {
    const tarefa = botao.closest(".tarefa");
    if (tarefa.querySelector(".editar-container")) return;

    const texto = tarefa.querySelector(".tarefa-p");
    const container = document.createElement("div");
    container.classList.add("editar-container");
    container.innerHTML = `
      <input type="text" value="${texto.textContent}">
      <button class="confirmar">Salvar</button>
      <button class="cancelar">Cancelar</button>
    `;
    tarefa.appendChild(container);
    container.querySelector("input").focus();
  }

  confirmarEdicao(botao) {
    const container = botao.closest(".editar-container");
    const tarefa = botao.closest(".tarefa");
    const input = container.querySelector("input");
    const texto = tarefa.querySelector(".tarefa-p");

    const novoTexto = input.value.trim();
    if (!novoTexto) return;

    texto.textContent = novoTexto;
    container.remove();
    this.salvarTarefas();
  }

  cancelarEdicao(botao) {
    const container = botao.closest(".editar-container");
    container.remove();
  }

  salvarTarefas() {
    const tarefas = [];
    this.lista.querySelectorAll(".tarefa").forEach((tarefa) => {
      tarefas.push({
        texto: tarefa.querySelector(".tarefa-p").textContent,
        concluida: tarefa.querySelector("input").checked,
      });
    });
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }

  carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.forEach((t) => this.criarTarefaDOM(t));
  }

  handleClick(e) {
    const botao = e.target.closest("button");
    if (!botao) return;

    if (botao.classList.contains("remover")) this.removerTarefa(botao);
    if (botao.classList.contains("editar")) this.abrirEditor(botao);
    if (botao.classList.contains("confirmar")) this.confirmarEdicao(botao);
    if (botao.classList.contains("cancelar")) this.cancelarEdicao(botao);
  }
}

new ToDo();
