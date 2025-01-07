// Criação da listagem de palavras e randomização

const wordsList = ['banana', 'casa', 'carro', 'cachorro', 'apartamento', 'agua', 'escola', 'paralelepipedo'];
const selectedWord = wordsList[Math.floor(Math.random() * wordsList.length)];
const modal = document.getElementById('gameModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const restartButton = document.getElementById('restartButton');
let progress = selectedWord.split("").map(() => '_');
let entrada = document.getElementById('entrada');
let envio = document.getElementById('envio');
let display = document.getElementById('word');
let tentativas = document.getElementById('tentativa');
let tentativaMax = 6;

function showModal(titulo, mensagem) {
  modalTitle.textContent = titulo;
  modalMessage.textContent = mensagem;
  modal.classList.remove('d-none');
  document.body.classList.add('modal-open');
}

restartButton.addEventListener('click', () => {
  location.reload();
});

function wordsUpdate() {
  display.textContent = progress.join('');
}

function updateTry() {
  tentativas.textContent = tentativaMax;
}

envio.addEventListener("click", () => {
  const letra = entrada.value.toLowerCase();
  entrada.value = '';
  verifyWord(letra);
}
)

function verifyWord(letra) {
  let acerto = false

  selectedWord.split("").forEach((l, i) => {
    if (l === letra) {
      progress[i] = letra
      acerto = true

      const audioWin = document.getElementById('audioWin')
      audioWin.volume = 0.3;
      audioWin.play()
    }
  })
  if (!acerto) {
    const audioErro = document.getElementById('audioErro');
    audioErro.volume = 0.3;
    audioErro.play();
    tentativaMax -= 1;
    if (tentativaMax <= 0) {
      showModal('Você perdeu.', 'Suas tentativas acabaram, tente novamente!');

    }
  } else {

  }


  if (progress.includes('_')) {
    console.log('Informação recebida.');
  } else {
    showModal('Você ganhou!', `Meus parabéns! você acertou a palavra era ${selectedWord.toUpperCase()}`);
  }

  wordsUpdate();
  updateTry();
}

wordsUpdate();
updateTry();

