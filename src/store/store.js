import { createPinia } from 'pinia';



const pinia = createPinia();

pinia.state = () => ({
  auth: {
    isAuthenticated: false,
    token: ''
  },
  dadosAPI: {}
});

export default pinia;
