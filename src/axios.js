import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", // Define a URL base para todas as solicitações
  headers: {
    "Content-Type": "application/json", // Define o tipo de conteúdo padrão para JSON
  },
});

export default instance;
