<template>
  <button type="button" @click="logout()" class="button-logout">Logout</button>

  <div class="home-view">
    <span class="label-title-24-bold"
      >Bem-vindo ao Smart Integrações!<br />
      Explore nossas integrações para simplificar suas tarefas diárias.<br />
      Se precisar de ajuda, estamos aqui para você!<br /><br />
      Atenciosamente,<br />
      Equipe Smart Integrações</span
    >
  </div>
</template>

<script>
import { Component, Vue } from "vue-facing-decorator";

@Component({
  components: {},
})
export default class HomeView extends Vue {
  mounted() {
    const token = sessionStorage.getItem("token");

    if (!token) {
      this.$router.push("/login");
    }
  }

  logout() {
    sessionStorage.removeItem("token");
    this.$router.push("/login");
  }
}
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

.button-logout {
  position: absolute;
  right: 0;
}
</style>
