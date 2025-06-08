import axios from "axios";

const url = import.meta.env.VITE_API_URL;

const buscarTodas = () => {
  return axios.get(url)
    .then(response => ({ sucesso: true, dados: response.data }))
    .catch(() => ({ sucesso: false, mensagem: "Ocorreu um erro!" }));
};

const buscarPorId = (id) => {
  return axios.get(`${url}/${id}`)
    .then(response => ({ sucesso: true, dados: response.data }))
    .catch(() => ({ sucesso: false, mensagem: "Ocorreu um erro!" }));
};

const adicionar = (tarefa) => {
  return axios.post(url, tarefa)
    .then(response => ({ sucesso: true, dados: response.data }))
    .catch(() => ({ sucesso: false, mensagem: "Ocorreu um erro!" }));
};

const modificar = (id, tarefa) => {
  return axios.put(`${url}/${id}`, tarefa)
    .then(response => ({ sucesso: true, dados: response.data }))
    .catch(() => ({ sucesso: false, mensagem: "Ocorreu um erro!" }));
};

const remover = (id) => {
  return axios.delete(`${url}/${id}`)
    .then(response => ({ sucesso: true, dados: response.data }))
    .catch(() => ({ sucesso: false, mensagem: "Ocorreu um erro!" }));
};

export { buscarTodas, buscarPorId, adicionar, modificar, remover };
