const submit = document.querySelector("#criar-tarefa");
const input = document.querySelector("#nome-tarefa");
const form = document.querySelector("#form");

class ToDo {
  constructor() {
    this.lista = document.querySelector(".lista-de-tarefas");
    this.input = document.getElementById("nome-tarefa");
    this.form = document.getElementById("form");
    this.carregarTarefas();
    this.salvarTarefas();

    //previnir envio do form
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

    this.salvarTarefas();
  }

  //remover tarefa Começo
  removerTarefa(botao) {
    const tarefa = botao.closest(".tarefa");
    tarefa.remove();
  }
  //remover tarefa FIM

  //abrir Edtior Começo
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
  //Abrir editor FIM

  //confirmar edição começo
  confirmarEdicao(botao) {
    const container = botao.closest(".editar-container");
    const tarefa = botao.closest(".tarefa");

    const input = container.querySelector("input");
    const texto = tarefa.querySelector(".tarefa-p");

    const novoTexto = input.value.trim();
    if (novoTexto === "") return;

    texto.textContent = novoTexto;
    container.remove();
  }
  //confirmar edição FIM

  // Cacelar Ediçào começo
  cancelarEdicao(botao) {
    const container = botao.closest(".editar-container");
    container.remove();
  }
  //cancelar ediçào FIM

  //salvar Tarefas Começo
  salvarTarefas() {
    const tarefas = [];

    this.lista.querySelectorAll(".tarefa").forEach((tarefa) => {
      const texto = tarefa.querySelector(".tarefa-p").textContent;
      const concluida = tarefa.querySelector("input").checked;

      tarefas.push({ texto, concluida });
    });

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }
  //salvar Tarefas FIM

  //Carregar Tarefas Começo
  carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    tarefas.forEach(({ texto, concluida }) => {
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
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="remover">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

      this.lista.appendChild(tarefa);
    });
  }
  //carregar tarefas Fim

  handleClick(e) {
    //identificar botão
    const botao = e.target.closest("button");
    if (!botao) return;

    //remover
    if (botao.classList.contains("remover")) {
      this.removerTarefa(botao);
    }

    //editar
    if (botao.classList.contains("editar")) {
      this.abrirEditor(botao);
    }

    if (botao.classList.contains("confirmar")) {
      this.confirmarEdicao(botao);
    }

    if (botao.classList.contains("cancelar")) {
      this.cancelarEdicao(botao);
    }
  }
}

new ToDo();
