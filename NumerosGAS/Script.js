document.getElementById('btnGerar').addEventListener('click', () => {
    const prefixo = document.getElementById('prefixo').value;
    const qnt = parseInt(document.getElementById('qnt').value);
    const campoResultado = document.getElementById('resultado');
    const msgStatus = document.getElementById('mensagemStatus');
    
    let output = "";
    for (let i = 1; i <= qnt; i++) {
        output += `${prefixo}-${i.toString().padStart(2, '0')}\n`;
    }
    
    campoResultado.value = output;
    
    // Copia para o clipboard e exibe a mensagem na div
    navigator.clipboard.writeText(output).then(() => {
        msgStatus.innerText = "Lista copiada com sucesso!";
        msgStatus.style.display = "block";
        
        // Esconde a mensagem automaticamente após 3 segundos
        setTimeout(() => {
            msgStatus.style.display = "none";
        }, 3000);
    });
});