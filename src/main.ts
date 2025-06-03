import './assets/styles/index.css';
const app = document.querySelector<HTMLDivElement>('#app')!;

const params = new URLSearchParams(window.location.search);
const id = params.get('id') || 'default';





