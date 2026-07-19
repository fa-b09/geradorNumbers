const campoResultado = document.getElementById('resultado');
const msgStatus = document.getElementById('mensagemStatus');

function mostrarStatus(texto) {
    msgStatus.innerText = texto;
    msgStatus.style.display = "block";
    setTimeout(() => { msgStatus.style.display = "none"; }, 3000);
}

// 1. Sequencial
document.getElementById('btnGerar').addEventListener('click', () => {
    const prefixo = document.getElementById('prefixo').value;
    const qnt = parseInt(document.getElementById('qnt').value);
    let output = "";
    for (let i = 1; i <= qnt; i++) {
        output += `${prefixo}-${i.toString().padStart(2, '0')}\n`;
    }
    campoResultado.value = output;
    navigator.clipboard.writeText(output).then(() => mostrarStatus("Lista copiada!"));
});

// 2. Número Fixo
document.getElementById('btnGerarFixo').addEventListener('click', () => {
    const num = document.getElementById('numFixo').value;
    let qnt = Math.min(parseInt(document.getElementById('qntFixo').value), 20);
    let output = "";
    for (let i = 0; i < qnt; i++) {
        output += `${num}\n`;
    }
    campoResultado.value = output;
    navigator.clipboard.writeText(output).then(() => mostrarStatus("Números fixos copiados!"));
});

// 3. Pares (Sequencial de pares)
document.getElementById('btnGerarPar').addEventListener('click', () => {
    let numBase = parseInt(document.getElementById('numPar').value);
    let qnt = Math.min(parseInt(document.getElementById('qntPar').value), 20);
    let output = "";

    // O loop gera a quantidade de números que você pediu
    for (let i = 0; i < qnt; i++) {
        let proximoNum = numBase + i;
        // Adiciona o número duas vezes em linhas separadas
        output += `${proximoNum}\n${proximoNum}\n`;
    }
    
    campoResultado.value = output;
    navigator.clipboard.writeText(output).then(() => mostrarStatus("Pares sequenciais copiados!"));
});