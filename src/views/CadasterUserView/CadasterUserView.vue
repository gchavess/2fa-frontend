<template>
  <div class="cadaster-container">
    <div class="flutuant-panel">
      <span class="label-title-24-bold">Criar conta</span>
      <form class="cadaster-form">
        <input-label
          :placeholder="'Digite seu nome'"
          :label="'Nome'"
          :required="true"
          :type="'name'"
          @error="handleError('name', $event)"
          @value="userData.name = $event"
        />

        <input-label
          :placeholder="'Digite seu e-mail'"
          :label="'E-mail'"
          :type="'email'"
          :required="true"
          @error="handleError('email', $event)"
          @value="userData.email = $event"
        />

        <input-label
          :placeholder="'Digite seu telefone'"
          :label="'Telefone'"
          :type="'phone'"
          :required="true"
          @error="handleError('phone', $event)"
          @value="userData.phone = $event"
        />

        <input-label
          :placeholder="'Digite sua senha'"
          :label="'Senha'"
          :type="'password'"
          :required="true"
          @error="handleError('password', $event)"
          @value="userData.password = $event"
        />

        <button
          type="button"
          :class="{ 'button-disabled': !allFieldsValid }"
          @click="cadastrar"
        >
          Cadastrar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from "vue-facing-decorator";
import InputLabel from "@/components/InputLabel/InputLabel.vue";
import UserService from "@/services/user/UserService";
import { ElNotification } from "element-plus";

@Component({
  components: { InputLabel },
})
export default class CadasterUserView extends Vue {
  userData = {
    name: "",
    email: "",
    password: "",
    phone: "",
  };

  errorFlags = {
    name: true,
    email: true,
    phone: true,
    password: true,
  };

  get allFieldsValid() {
    return Object.values(this.errorFlags).every((flag) => !flag);
  }

  handleError(field, error) {
    this.errorFlags[field] = error;
  }

  async cadastrar() {
    try {
      await UserService.create(this.userData);

      ElNotification({
        title: "Conta criada com sucesso!🎉",
        message: "Bem-vindo ao nosso serviço.",
        type: "success",
      });

      this.$router.push("/login");
    } catch (error) {
      ElNotification({
        title: "Erro",
        message: error.response.data.message,
        type: "error",
      });
    }
  }
}
</script>

<style scoped>
.cadaster-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.flutuant-panel {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 500px;
}

.cadaster-form {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  gap: 20px;
}
</style>
