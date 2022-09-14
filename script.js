const DOM = {
  replHtml(id) {
    return `
    <div class="border-b border-dotted border-slate-300 p-3 w-full">
      <div class="flex flex-col gap-y-2">
        <div class="flex">
          <span
            class="px-4 py-1 bg-yellow-100 border border-dotted border-slate-300 bg-slate-600 rounded-l flex items-center"
          >
          ${id}
          </span>
          <textarea
            type="textarea"
            id="replInput_${id}"
            class="border py-1 px-2 border-dotted border-slate-300 bg-slate-600 rounded-r w-full"
          ></textarea>
        </div>
        <button
          onclick="Repl.handleSubmit(event, ${id})"
          type="submit"
          class="px-2 py-1 border border-slate-300 bg-green-700 text-white rounded hover:bg-green-800 w-fit"
        >
          Eval
        </button>
        <p class="text-white bg-slate-900 py-1 rounded hidden">
          <span class="border-r border-dotted border-slate-300 px-2"
            >&gt;&gt;</span
          >
          <span class="px-2" id="output_${id}"></span>
        </p>
      </div>
    </div>
    `;
  },
  createRepl(id) {
    document.querySelector("#content").innerHTML += DOM.replHtml(id);
  },
};

const Repl = {
  handleSubmit(e, id) {
    e.preventDefault();
    Repl.evaluate(id);
    if (id == App.currId) {
      DOM.createRepl(++App.currId);
    }
  },
  evaluate(id) {
    const input = document.querySelector(`#replInput_${id}`);
    let msg = "";
    try {
      msg = eval(input.value);
    } catch (e) {
      msg = e.message;
    }
    const output = document.querySelector(`#output_${id}`);
    output.innerHTML = msg;
    output.parentElement.classList.remove("hidden");
  },
};

const App = {
  currId: 1,
  init: () => {
    DOM.createRepl(App.currId);
  },
};

App.init();
