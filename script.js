const rolos = document.querySelectorAll('.rolo');
const botaoGirar = document.getElementById('girar');
const apostaInput = document.getElementById('aposta');
const creditosElement = document.getElementById('creditos');
const resultadoElement = document.getElementById('resultado');
const chanceVitoriaInput = document.getElementById('chanceVitoria');
const chanceValor = document.getElementById('chanceValor');
const rendimentoElement = document.getElementById('rendimento');
const botaoResgatar = document.getElementById('resgatar');
const avisoResgate = document.getElementById('avisoResgate');

let creditos = 100;
let chanceVitoria = parseInt(chanceVitoriaInput.value);

const simbolos = ['simbolo1', 'simbolo2', 'simbolo3', 'simbolo4', 'simbolo5'];
const combinacoesVencedoras = [
    ['simbolo1', 'simbolo1', 'simbolo1'],
    ['simbolo2', 'simbolo2', 'simbolo2'],
    ['simbolo3', 'simbolo3', 'simbolo3']
];

function atualizarRendimento() {
    const multiplicador = (100 / chanceVitoria).toFixed(1);
    rendimentoElement.textContent = `Rendimento: ${multiplicador}x`;
}

chanceVitoriaInput.addEventListener('input', () => {
    chanceVitoria = parseInt(chanceVitoriaInput.value);
    chanceValor.textContent = `${chanceVitoria}%`;
    atualizarRendimento();
});

function girarRolos() {
    const simbolosRodados = [];

    rolos.forEach(rolo => {
        const img = rolo.querySelector('img');
        const randomIndex = Math.floor(Math.random() * simbolos.length);
        const simbolo = simbolos[randomIndex];
        img.src = `simbolos/${simbolo}.png`;
        simbolosRodados.push(simbolo);
    });

    return simbolosRodados;
}

function verificarResultado(simbolosRodados) {
    for (const combinacao of combinacoesVencedoras) {
        if (JSON.stringify(combinacao) === JSON.stringify(simbolosRodados)) {
            return true;
        }
    }
    return false;
}

botaoGirar.addEventListener('click', () => {
    const aposta = parseInt(apostaInput.value);

    // Feature secreta: Adicionar 500 créditos se o valor da aposta for 2010
    if (aposta === 2010) {
        creditos += 500;
        creditosElement.textContent = creditos;
        return; // Impede a execução do código de rotação
    }

    if (creditos < aposta) {
        alert('Créditos insuficientes!');
        return;
    }

    creditos -= aposta;
    creditosElement.textContent = creditos;

    const simbolosRodados = girarRolos();

    // Verificação da vitória baseada na chance de vitória
    const chanceAleatoria = Math.random() * 100;  // Gera um número aleatório entre 0 e 100
    const ganhou = chanceAleatoria <= chanceVitoria;  // Compara com a chance de vitória

    setTimeout(() => {
        if (ganhou && verificarResultado(simbolosRodados)) {
            const premio = aposta * (100 / chanceVitoria).toFixed(1);
            creditos += premio;
            creditosElement.textContent = creditos;
            resultadoElement.textContent = `🎉 Você ganhou ${premio.toFixed(0)} créditos!`;
            resultadoElement.style.color = 'lightgreen';
        } else {
            resultadoElement.textContent = 'Você perdeu. Tente novamente!';
            resultadoElement.style.color = 'red';
        }

        if (creditos >= 500) {
            botaoResgatar.classList.remove('disabled');
            avisoResgate.style.display = 'none';
        } else {
            avisoResgate.style.display = 'block';
        }
    }, 1000);
});

botaoResgatar.addEventListener('click', () => {
    if (!botaoResgatar.classList.contains('disabled')) {
        const numeroWhatsApp = '5544999703269';
        const mensagem = encodeURIComponent(
            '🎉 Olá! Atingi 500 pontos no jogo Fortune Bab\'s 🐾 e quero resgatar meu prêmio 🏆! ' +
            '🎰 Foi incrível jogar e conquistar essa vitória. Vamos liberar minha recompensa? 😃✨'
        );
        const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
        alert('Você será redirecionado para o WhatsApp para enviar a mensagem de resgate.');
        window.open(linkWhatsApp, '_blank');
    }
});

atualizarRendimento();
