<template>
  <div>
    <h2>Tela de Login SAC</h2>
    <form @submit="fazerLogin">
      <div>
        <label for="usuario">Usuário:</label>
        <input type="text" id="usuario" v-model="usuario">
      </div>
      <div>
        <label for="senha">Senha:</label>
        <input type="password" id="senha" v-model="senha">
      </div>
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import  pinia  from '@/store/store.js';

export default {
  data() {
    return {
      usuario: '403231ba',
      senha: '4KKhdsrl'
    };
  },
  methods: {
    fazerLogin(event) {
      event.preventDefault();

      const url = `${process.env.VUE_APP_API_URL}/WSMKUserSenhaSAC.rule`;
      const params = {
        sys: 'MK0',
        token: pinia.state.dadosAPI.Token,
        user_sac: this.usuario,
        pass_sac: this.senha
      };
      
      
      axios.get(url, { params })
  .then(response => {
    const data = response.data;
    console.log(data)

    if (data.AcessoSAC === 'Sim' && data.status === 'OK') {
      // Login bem-sucedido, atualizar o estado de autenticação
      pinia.state.auth = { isAuthenticated: true };

      // Armazenar o token no LocalStorage
      localStorage.setItem('token', data.token);
      
      // Redirecionar para a página protegida
      this.$router.push('/assinante');
    } else {
      // Login inválido, exibir uma mensagem de erro
      console.log('Login inválido');
      // Ou exibir uma mensagem de erro em algum elemento na interface
      this.errorMessage = 'Login inválido';
    }
  })
  .catch(error => {
    console.error('Erro ao fazer login:', error);
    // Lidar com o erro de forma adequada
  });
    }
  }
};

</script>

<style>
/* Estilos do componente aqui */
</style>
