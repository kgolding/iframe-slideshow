<script lang="ts">
  import { type Config } from "./config";

  interface Props {
    config: Config;
    onsave: (arg: Config) => void;
    oncancel?: () => void;
  }

  let { config, onsave, oncancel = () => {} }: Props = $props();
  let cfg = $state(config);

  $effect(() => {
    console.log($state.snapshot(cfg));
  });
</script>

<modal class="config">
  <div class="header">Settings</div>

  <div class="body">
    <div class="fields">
      <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>Duration</th>
            <!-- <th>Reload</th> -->
          </tr>
        </thead>
        <tbody>
          {#each cfg.frames as f, index}
            <tr>
              <td
                ><input
                  type="url"
                  bind:value={f.src}
                  title="URL"
                  placeholder="http://..."
                /></td
              >
              <td>
                <input
                  name="animation"
                  type="number"
                  min="1"
                  step="1"
                  max="9999"
                  bind:value={f.duration}
                  title="Seconds"
                /></td
              >
              <!-- <td align="center"><input type="checkbox" bind:checked={f.reload} /></td> -->
              <td><a href="#" onclick={() => cfg.frames.splice(index, 1)} title="Remove slide">&cross;</a></td>
            </tr>
          {/each}
        </tbody>
      </table>
      <a
        href="#"
        onclick={() => cfg.frames.push({ src: "", duration: 1, reload: false })}
        >&plus; Add slide</a
      >
    </div>
    &nbsp;
    <div class="field">
      <label for="animation">Animation (seconds)</label>
      <input
        name="animation"
        type="number"
        min="0.1"
        step="0.1"
        max="10"
        bind:value={cfg.animation}
        title="Seconds"
      />
    </div>
  </div>

  <div class="footer">
    <button onclick={() => oncancel()}>Cancel</button>
    <button onclick={() => onsave(cfg)} disabled={cfg.frames.length==0}>Save</button>
  </div>
</modal>

<style>
  h4 {
    margin: 0;
    padding: 0.25em 0.5em;
    border-bottom: 1px solid black;
    background-color: beige;
  }

  a {
    text-decoration: none;
  }

  input {
    box-sizing: border-box;
    padding: 0.25em;
    border: 1px solid black;
    border-radius: 0.25em;
    margin: 0.25em 0;
  }

  input[type="number"] {
    text-align: end;
  }

  button {
    padding: 0.25em 0.5em;
    margin: 0.25em 0;
  }

  .body {
    padding: 0.5em;
    box-sizing: border-box;
  }

  .field {
    display: flex;
    justify-content: flex-end;
  }

  .field > label {
    flex: 1;
    padding: 0.5em 1em 0.5em 0;
  }

  .field > input {
    flex: 1;
  }

  .header {
    font-size: 130%;
    padding: 0.5em;
    border-bottom: 1px solid black;
    background-color: beige;
  }

  .footer {
    padding: 0.5em;
    border-top: 1px solid black;
    background-color: beige;
    text-align: right;
  }

  .config {
    z-index: 9999;
    position: absolute;
    bottom: 1em;
    right: 1em;
    border: 2px black solid;
    border-radius: 0.25em;
    background-color: white;
  }
</style>
