<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type IUsuario from "../interfaces/IUsuario";
  import { buscaRepositorios, buscaUsuario } from "../requisicoes";
  import montaUsuario from "../utils/montaUsuario";
  import Button from "./Button.svelte";

  let valorInput: string;

  let statusErro: null | number = null;
  const dispatch = createEventDispatcher<{
    aoAlterarUsuario: IUsuario | null;
  }>();

  async function aoSubmeter() {
    const response = await buscaUsuario(valorInput);
    const responseRepositorio = await buscaRepositorios(valorInput);
    if (response.ok) {
      const data = await response.json();
      const dataRepositorio = await responseRepositorio.json();

      dispatch("aoAlterarUsuario", montaUsuario(data, dataRepositorio));
      statusErro = null;
    } else {
      statusErro = response.status;
      dispatch("aoAlterarUsuario", null);
    }
  }
</script>

<form on:submit|preventDefault={aoSubmeter}>
  <input
    type="text"
    class="input"
    class:error-input={statusErro === 404}
    bind:value={valorInput}
    placeholder="Pesquise aqui por Usuario"
  />
  {#if statusErro === 404}
    <span class="erro">Usuario não encontrado</span>
  {/if}
  <div class="botao-container">
    <Button>Buscar</Button>
  </div>
</form>

<style>
  .input {
    padding: 15px 25px;
    width: calc(100% - 8.75em);
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #2e80fa;
    box-shadow: 0px 17px 52px rgba(222, 231, 247, 0.4);
  }

  .input::placeholder {
    font-family: "Roboto";
    font-style: italic;
    font-weight: 300;
    font-size: 19.5px;
    line-height: 26px;
    color: #6e8cba;
  }

  .error-input {
    border: 1px solid #ff003e;
  }

  .erro {
    position: absolute;
    bottom: -25px;
    left: 0;
    font-style: italic;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    z-index: -1;
    color: #ff003e;
  }
  .botao-container {
    position: absolute;
    width: 9.625rem;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
  }
</style>
