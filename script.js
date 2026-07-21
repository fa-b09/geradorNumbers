// Função auxiliar para manter o objeto fixo e incrementar apenas o final (ex: 323/4282-01, 323/4282-02...)
function incrementarSufixoLmc(lmcBase, passo) {
    const partes = lmcBase.split('/');
    if (partes.length !== 2) return lmcBase;
    
    const prefixo = partes[0]; // Ex: "323"
    const subPartes = partes[1].split('-');
    
    if (subPartes.length !== 2) return lmcBase;
    
    const numeroObjeto = subPartes[0]; // Ex: "4282" (fica fixo)
    const sufixoInicial = parseInt(subPartes[1], 10); // Ex: "01"
    
    const novoSufixo = sufixoInicial + passo;
    // Garante que fique com 2 dígitos (ex: 1 vira "01", 10 vira "10")
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