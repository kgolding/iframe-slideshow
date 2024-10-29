<script lang="ts">
  import { defaultConfig, type Config } from "./lib/config";
  import ConfigEditor from "./lib/ConfigEditor.svelte";
  import SettingsPopup from "./lib/SettingsPopup.svelte";

  let config: Config = $state(defaultConfig);
  
  try {
    const v = localStorage.getItem("slideshow.config");
    if (v) {
      const x = JSON.parse(v);
      Object.assign(config, x);
    }
  } catch (e) {}

  let activeIndex = $state(0);
  let preIndex = $state(frames.length - 1);

  let intervalTimer = 0;
  $effect(()=>{
    if (intervalTimer) {
      clearInterval(intervalTimer)
    }

    if (config.frames.length > 1) {
    intervalTimer = setInterval(() => {
      preIndex = activeIndex;
      activeIndex++;
      if (activeIndex == frames.length) {
        activeIndex = 0;
      }
    }, config.frames[activeIndex].duration * 1000);
  }
});

  const onsave = (cfg: Config) => {
    localStorage.setItem("slideshow.config", JSON.stringify(cfg));
    config = cfg
    console.log("Config =", $state.snapshot(config))
  };

</script>

{#each config.frames as f, index}
  <iframe
    class="frame"
    class:active={index == activeIndex}
    class:preactive={index == preIndex}
    class:inactive={index != activeIndex && index != preIndex}
    src={f.src}
    title={f.src}
    style="--adur: {config.animation}S"
  ></iframe>
  {/each}

<SettingsPopup >
  {#snippet content()}
  <ConfigEditor config={$state.snapshot(config)} {onsave}/>    
  {/snippet}
</SettingsPopup>

<style>
  .frame {
    position: absolute;
    height: 100vh;
    width: 100vw; 
    padding: 0;
    margin: 0;
    border: none;
  }

  @keyframes slidein {
    0% {
      margin-left: 100vw;
    }
    100% {
      margin-left: 0;
    }
  }

  @keyframes slideout {
    0% {
      margin-left: 0;
    }
    100% {
      margin-left: -100vw;
    }
  }

  .active {
    animation-name: slidein;
    animation-duration: var(--adur);
    margin-left: 0;
  }

  .preactive {
    animation-name: slideout;
    animation-duration: var(--adur);
    margin-left: -100vw;
  }

  .inactive {
    margin-left: 100vw;
  }
</style>
