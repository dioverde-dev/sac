<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import axios from 'axios';
import pinia from '@/store/store.js';

export default {
  created() {
    this.consultarAPI();
  },
  methods: {
    consultarAPI() {
      const url = `${process.env.VUE_APP_API_URL}/WSAutenticacao.rule`;
      const params = {
        sys: 'MK0',
        token: `${process.env.VUE_APP_API_TOKEN}`,
        password: `${process.env.VUE_APP_API_PASSWORD}`,
        cd_servico: '9999'
      };

      axios.get(url, { params })
        .then(response => {
          pinia.state.dadosAPI = response.data;
          console.log('Dados da API armazenados no Pinia:', response.data);

          if (response.data.ServicosAutorizados.includes(4)) {
            // Redirecionar para a tela de login
            this.$router.push('/login');
          } else {
            
            // Outra lógica ou redirecionamento, se necessário
          }
        })
        .catch(error => {
          console.error('Erro ao fazer a consulta à API:', error);
        });
    }
  }
}
</script>

<style>
/* Estilos da aplicação aqui */
</style>
