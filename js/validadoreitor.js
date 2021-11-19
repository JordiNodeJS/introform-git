import form from './form.js';
import msg from './msg.js';
import pattern from './pattern.js';

const nombre = () => (pattern.nombre.test(form.nombre.value) ? true : false);
const apellido = () =>
  pattern.apellido.test(form.apellido.value) ? true : false;
const telf = () => (pattern.telf.test(form.telf.value) ? true : false);
const mail = () => (pattern.email.test(form.email.value) ? true : false);
const asunto = () => (pattern.asunto.test(form.asunto.value) ? true : false);
const contenido = () =>
  pattern.contenido.test(form.contenido.value) ? true : false;
const fecha = () => (inputFecha() >= 18 ? true : false);

const validar = event => {
  let dom;
  switch (event.target.name) {
    case 'nombre':
      dom = [form.nombre, mostra_nombre];
      nombre()
        ? styling(true, msg.valido, dom)
        : styling(false, msg.apellido, dom);
      break;
    case 'apellido':
      dom = [form.apellido, mostra_apellido];
      apellido()
        ? styling(true, msg.valido, dom)
        : styling(false, msg.apellido, dom);
      break;
    case 'telf':
      dom = [form.telf, mostra_telf];
      telf() ? styling(true, msg.valido, dom) : styling(false, msg.telf, dom);
    case 'email':
      dom = [form.email, mostra_email];
      mail() ? styling(true, msg.valido, dom) : styling(false, msg.email, dom);
      break;
    case 'asunto':
      dom = [form.asunto, mostra_asunto];
      asunto()
        ? styling(true, msg.valido, dom)
        : styling(false, msg.asunto, dom);
      break;
    case 'contenido':
      dom = [form.contenido, mostra_contenido];
      contenido()
        ? styling(true, msg.valido, dom)
        : styling(false, msg.contenido, dom);
      break;
    case 'fecha':
      dom = [form.fecha, mostra_fecha];
      fecha() ? styling(true, msg.valido, dom) : styling(false, msg.fecha, dom);
      break;
  }
};

function styling(booleano, msg, [campo, mostra]) {
  if (!booleano) {
    campo.classList.add('is-invalid');
    mostra.classList.add('text-danger');
    mostra.classList.remove('text-muted');
    mostra.classList.remove('text-success');
    mostra.textContent = msg;
  } else {
    campo.classList.remove('is-invalid');
    mostra.classList.remove('text-danger');
    mostra.classList.add('text-success');
    mostra.textContent = msg;
  }
}

const listeners = [
  form.fecha,
  form.nombre,
  form.apellido,
  form.email,
  form.telf,
  form.asunto,
  form.contenido,
];
for (const listener of listeners) listener.addEventListener('keyup', validar);
listeners[0].addEventListener('click', validar);

form.formu.addEventListener('submit', event => {
  event.preventDefault();
  if (!mail() || !asunto() || !contenido())
    styling(false, msg.error.toLocaleUpperCase(), [enviando, enviando]);
  else {
    styling(true, msg.enviando.toLocaleUpperCase(), [enviando, enviando]);
    document
      .querySelector('.spinner-border')
      .classList.remove('visually-hidden');
    setTimeout(() => {
      form.formu.submit();
    }, 1000);
  }
});

reset.addEventListener('click', () => {
  const smalls = document.querySelectorAll('.text-danger');
  const inputs = document.querySelectorAll('.is-invalid');
  for (const small of smalls) small.classList.remove('text-danger');
  for (const input of inputs) {
    input.classList.remove('is-invalid');
    input.placeholder = 'Campos reseteados, prueba de nuevo';
  }
});

test.addEventListener('click', event => {
  console.log(event.target.name);

  !mail() || !asunto() || !contenido()
    ? styling(false, msg.error.toLocaleUpperCase(), [enviando, enviando])
    : styling(true, msg.valido.toLocaleUpperCase(), [enviando, enviando]);
});

function inputFecha() {
  let edad = new Date() - new Date(form.fecha.value);
  edad = edad / (1000 * 60 * 60 * 24 * 365);
  edad = Number(edad.toFixed(4));
  return edad;
}
