<template>
  <div class="input-group" :class="{ 'has-error': showError }">
    <span class="label-title-16">{{ label }}</span>
    <el-input
      v-model="value"
      style="width: 240px"
      :type="type"
      :placeholder="placeholder"
      :show-password="type === 'password' ? true : false"
      :maxlength="type === 'phone' ? 15 : null"
      @input="handleInput"
    />
    <div v-if="showError" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { Component, Prop, Vue, Watch } from "vue-facing-decorator";

@Component({
  components: {},
  emits: ["value", "error"],
})
export default class InputLabel extends Vue {
  @Prop({ default: "Digite sua senha" })
  placeholder;

  @Prop({ default: "Digite sua senha" })
  label;

  @Prop({ default: "input" })
  type;

  @Prop({ default: false })
  required;

  value = "";
  showError = false;
  errorMessage = "";

  @Watch("value")
  valueWatcher() {
    this.$emit("value", this.value);
  }

  handleInput() {
    if (this.type === "phone") {
      this.value = this.formatPhoneNumber(this.value);
    }

    if (this.type === "name" && this.value.trim().split(" ").length !== 2) {
      this.showError = true;
      this.errorMessage = "Por favor, insira um nome e sobrenome.";
      this.$emit("error", true);
    } else if (this.required && !this.value.trim()) {
      this.showError = true;
      this.errorMessage = "Este campo é obrigatório.";
      this.$emit("error", true);
    } else if (
      this.type === "email" &&
      !this.validateEmail(this.value.trim())
    ) {
      this.showError = true;
      this.errorMessage = "Por favor, insira um endereço de e-mail válido.";
      this.$emit("error", true);
    } else if (
      this.type === "phone" &&
      !this.validatePhoneNumber(this.value.trim())
    ) {
      this.showError = true;
      this.errorMessage = "Por favor, insira um número de telefone válido.";
      this.$emit("error", true);
    } else {
      this.showError = false;
      this.$emit("error", false);
      this.errorMessage = "";
    }
  }

  formatPhoneNumber(phoneNumber) {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");

    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return phoneNumber;
  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  validatePhoneNumber(phoneNumber) {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");

    const re = /^(\d{2})(\d{4,5})(\d{4})$/;
    return re.test(cleaned);
  }
}
</script>

<style>
.input-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}

.el-input {
  width: 100% !important;
}

.el-input__inner {
  font-family: "Roboto", sans-serif;
}

.el-input__wrapper.is-focus {
  box-shadow: 0 0 0 1px #9284fa !important;
}

.has-error .el-input__wrapper {
  box-shadow: 0 0 0 1px #f56c6c !important;
}

.has-error .el-input__wrapper.is-focus {
  box-shadow: 0 0 0 1px #f56c6c !important;
}

.error-message {
  color: #f56c6c;
  font-size: 12px;
  margin-top: 58px;
  position: absolute;
}
</style>
