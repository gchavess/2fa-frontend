<template>
  <div class="cadaster-container">
    <div class="flutuant-panel">
      <span class="label-title-24-bold">{{ title }}</span>

      <div v-if="!enviarCodigo">
        <form class="cadaster-form">
          <input-label
            :placeholder="'Digite seu e-mail'"
            :label="'E-mail'"
            :type="'email'"
            :required="true"
            @error="handleError('email', $event, 'cadaster')"
            @value="userData.email = $event"
          />

          <input-label
            :placeholder="'Digite sua senha'"
            :label="'Senha'"
            :type="'password'"
            :required="true"
            @error="handleError('password', $event, 'cadaster')"
            @value="userData.password = $event"
          />
          <button
            type="button"
            @click="getCodeVerification"
            :class="{ 'button-disabled': !allFieldsValidCadasterForm }"
          >
            Entrar
          </button>
        </form>

        <div class="signup-section">
          <span class="label-title-16">Não tem uma conta? </span
          ><span
            class="label-title-outline-16"
            @click="this.$router.push('/cadastro')"
            >Inscrever-se na Smart Integrações
          </span>
        </div>
      </div>

      <div v-if="enviarCodigo" class="verify-form">
        <span class="label-title-16"
          >Você recebeu um número de 6 dígitos por e-mail.
        </span>
        <input-label
          :placeholder="'Código de verificação'"
          :label="'Código'"
          :type="'number'"
          :required="true"
          @error="handleError('verificationCode', $event, 'verify')"
          @value="userData.verificationCode = $event"
        />
        <button
          type="button"
          @click="login"
          :class="{ 'button-disabled': !allFieldsValidVerifyForm }"
        >
          Entrar
        </button>
      </div>
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
    email: "",
    password: "",
    verificationCode: "",
  };

  errorFlagsCadasterForm = {
    email: true,
    password: true,
  };

  errorFlagsVerifyForm = {
    verificationCode: true,
  };

  enviarCodigo = false;

  get allFieldsValidCadasterForm() {
    return Object.values(this.errorFlagsCadasterForm).every((flag) => !flag);
  }

  get allFieldsValidVerifyForm() {
    return Object.values(this.errorFlagsVerifyForm).every((flag) => !flag);
  }

  get title() {
    return this.enviarCodigo
      ? "Insira o código de verificação"
      : "Entrar na Smart Integrações";
  }

  handleError(field, error, type) {
    if (type === "cadaster") {
      this.errorFlagsCadasterForm[field] = error;
    } else {
      this.errorFlagsVerifyForm[field] = error;
    }
  }

  async getCodeVerification() {
    try {
      await UserService.verificationCode({
        email: this.userData.email,
        password: this.userData.password,
      });
      this.enviarCodigo = true;

      ElNotification({
        title: "Código de login enviado.",
        message: "Por favor, verifique seu e-mail.",
        type: "success",
      });
    } catch (error) {
      ElNotification({
        title: "Erro",
        message: error.response.data.message,
        type: "error",
      });
    }
  }

  async login() {
    try {
      await UserService.login(this.userData);

      ElNotification({
        title: "Login bem-sucedido.",
        message: "Bem-vindo de volta!",
        type: "success",
      });

      this.$router.push("/home");
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

.cadaster-form,
.verify-form {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  gap: 20px;
}

.signup-section {
  text-align: center;
  padding-top: 20px;
}
</style>
