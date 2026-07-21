// Máscara automática para o Atendimento (GAS) -> Ex: 12740-2026-159
const inputGas = document.getElementById('atendimentoGas');

inputGas.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    
    if (valor.length > 5 && valor.length <= 9) {
        valor = valor.substring(0, 5) + '-' + valor.substring(5);
    } else if (valor.length > 9) {
        valor = valor.substring(0, 5) + '-' + valor.substring(5, 9) + '-' + valor.substring(9, 12);
    }
    
    e.target.value = valor;
});

// Máscara automática para o ID do LMC -> Ex: 159/2755-01
const inputLmc = document.getElementById('idLmc');

inputLmc.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    
    if (valor.length > 3 && valor.length <= 7) {
        valor = valor.substring(0, 3) + '/' + valor.substring(3);
    } else if (valor.length > 7) {
        valor = valor.substring(0, 3) + '/' + valor.substring(3, 7) + '-' + valor.substring(7, 9);
    }
    
    e.target.value = valor;
});

// Função auxiliar para manter o objeto fixo e incrementar apenas o final
function incrementarSufixoLmc(lmcBase, passo) {
    const partes = lmcBase.split('/');
    if (partes.length !== 2) return lmcBase;
    
    const prefixo = partes[0]; 
    const subPartes = partes[1].split('-');
    
    if (subPartes.length !== 2) return lmcBase;
    
    const numeroObjeto = subPartes[0]; 
    const sufixoInicial = parseInt(subPartes[1], 10); 
    
    const novoSufixo = sufixoInicial + passo;
    const sufixoFormatado = novoSufixo.toString().padStart(2, '0');
    
    return `${prefixo}/${numeroObjeto}-${sufixoFormatado}`;
}

// 1. Gerador dos Dados Principais
document.getElementById('btnGerarExcel').addEventListener('click', () => {
    const atendimentoGas = document.getElementById('atendimentoGas').value;
    const lmcBase = document.getElementById('idLmc').value;
    const caminhao = document.getElementById('caminhao').value;
    const notaFiscal = document.getElementById('notaFiscal').value;
    
    let qnt = parseInt(document.getElementById('qntExcel').value, 10) || 1;
    qnt = Math.max(1, Math.min(qnt, 20));

    let output = "";

    for (let i = 0; i < qnt; i++) {
        const lmcAtual = incrementarSufixoLmc(lmcBase, i);
        output += `${atendimentoGas}\t${lmcAtual}\t${caminhao}\t${notaFiscal}\n`;
    }

    const campoResultado = document.getElementById('resultado');
    campoResultado.value = output;
    
    navigator.clipboard.writeText(output).then(() => {
        alert("Dados Principais copiados com sucesso!");
    }).catch(err => {
        console.error(err);
    });
});

// 2. Gerador Separado de Relatórios em Pares
document.getElementById('btnGerarRelatorio').addEventListener('click', () => {
    let relatorioBase = parseInt(document.getElementById('numRelatorio').value, 10) || 0;
    
    let qnt = parseInt(document.getElementById('qntRelatorio').value, 10) || 1;
    qnt = Math.max(1, Math.min(qnt, 20));

    let output = "";

    for (let i = 0; i < qnt; i++) {
        let relatorioAtual = relatorioBase + Math.floor(i / 2);
        output += `${relatorioAtual}\n`;
    }

    const campoResultadoRelatorio = document.getElementById('resultadoRelatorio');
    campoResultadoRelatorio.value = output;
    
    navigator.clipboard.writeText(output).then(() => {
        alert("Relatórios copiados com sucesso!");
    }).catch(err => {
        console.error(err);
    });
});