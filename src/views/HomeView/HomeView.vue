<template>
  <div class="home-view">
    <img
      src="@/assets/system-in-construction.svg"
      alt="Logo"
      width="600"
      height="600"
    />
    <span class="label-title-24-bold" style="text-align: center"
      >Ops! Parece que esta página está vazia.<br />
      Estamos trabalhando nisso!<br />
      Enquanto isso, que tal explorar outras partes do site?</span
    >
  </div>
</template>

<script>
import { Component, Vue } from "vue-facing-decorator";

@Component({
  components: {},
})
export default class HomeView extends Vue {}
</script>

<style scoped>
.home-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
}
</style>
