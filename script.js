var grade = [
    "LQYNULASDMAPXJFT",
    "MICROCONTROLADOR",
    "ZYXYJJYYBZKBJCKJ",
    "WHFSYYDWHFNLPAFH",
    "YZDBGZSUYYLPZCYW",
    "YNCARYPLAZJXHHVZ",
    "SGNPTAXGLLQHJETJ",
    "PJZNUAMHVWCKNKXY",
    "VSXLRTBSGTBOSZZB",
    "VSYQYOGUHNHFRGPP",
    "FKPJXPMVSJYWLESG",
    "REGISTRADORESAPF",
    "KXGPBGPGEEPROMSN",
    "GPHZBSXPJFYNHKPH"
];

var palavras = [
    "CPU",
    "ULA",
    "REGISTRADORES",
    "RAM",
    "ROM",
    "EEPROM",
    "FLASH",
    "CACHE",
    "DMA",
    "DATABUS",
    "MICROCONTROLADOR",
    "DUALCORE"
];

var pistas = [
    "O cérebro do computador, que executa as instruções dos programas.",
    "Parte do processador que faz as contas e as operações lógicas.",
    "Pequenas memórias dentro do processador, as mais rápidas de todas.",
    "Memória principal e volátil: perde tudo quando o computador desliga.",
    "Memória só de leitura, gravada de fábrica, que não se apaga.",
    "Memória permanente que aceita regravação byte a byte, comum em placas.",
    "Memória não volátil regravável em blocos, usada em pendrives e SSDs.",
    "Memória pequena e rápida perto do processador, guarda o que é mais usado.",
    "Técnica que deixa periféricos transferirem dados sem ocupar o processador.",
    "Caminho por onde as informações viajam entre processador e memória.",
    "Chip pequeno com processador, memória e entradas e saídas num só lugar.",
    "Processador que consegue executar duas tarefas em paralelo de verdade."
];

var curiosidades = [
    "Os processadores atuais fazem bilhões de operações por segundo. Essa velocidade é medida em GHz.",
    "Até as comparações do seu código, como um if (a > b), são resolvidas pela ULA.",
    "Eles trabalham na mesma velocidade da CPU, mas cabem pouquíssimos bytes em cada um.",
    "Ela se chama de \"acesso aleatório\" porque dá para ler qualquer posição no mesmo tempo, sem seguir uma ordem.",
    "Os jogos dos cartuchos de videogame antigos vinham gravados em ROM.",
    "Muitas placas guardam suas configurações nela, e ela aguenta centenas de milhares de regravações.",
    "A memória flash surgiu como uma evolução da EEPROM, só que apagando em blocos, o que é bem mais rápido.",
    "Ela costuma ser dividida em níveis: L1, L2 e L3. A L1 é a menor e a mais rápida de todas.",
    "Graças a ele, o disco ou a placa de rede copiam dados para a RAM enquanto a CPU faz outra coisa.",
    "A \"largura\" dele, como 32 ou 64 bits, diz quantos bits passam de uma só vez.",
    "Arduinos, micro-ondas, máquinas de lavar e controles remotos funcionam com um desses.",
    "Dois núcleos não deixam tudo 2x mais rápido: o programa precisa saber dividir o trabalho."
];

var linhaInicial  = [5, 0, 11, 5, 8, 12, 9, 2, 0, 4, 1, 3];
var colunaInicial = [2, 4, 0, 4, 4, 8, 11, 13, 8, 2, 0, 6];

var cores = [
    "#e64980", "#d6336c", "#f06595", "#c2255c", "#ae3ec9", "#f783ac",
    "#be4bdb", "#e8598c", "#9c36b5", "#ff6b9d", "#cc5de8", "#a61e4d"
];

var linhas = grade.length;
var colunas = grade[0].length;

var palavraAchada = [];
var dicaUsada = [];
var corDaCasa = [];
var casaComDica = [];
var casasPreview = [];
var inicio = -1;
var acertos = 0;
var pontos = 0;
var dicasRestantes = 3;
var segundos = 0;
var cronometro;
var timerMascote;
var timerCuriosidade;

var linhasBoot = [
    "Ligando o coração do computador...",
    "Contando os bits.............. <span class='ok'>OK ♥</span>",
    "Aquecendo os circuitos........ <span class='ok'>OK ♥</span>",
    "Escondendo 12 palavras........ <span class='ok'>OK ♥</span>",
    "Espalhando corações........... <span class='ok'>OK ♥</span>",
    "Acordando o Chipinho.......... <span class='ok'>OK ♥</span>",
    "Sistema pronto para jogar!"
];
var linhaAtual = 0;

function comecarBoot() {
    linhaAtual = 0;
    bootTexto.innerHTML = "";
    setTimeout(mostrarLinhaBoot, 500);
}

function mostrarLinhaBoot() {
    bootTexto.innerHTML += "<p>" + linhasBoot[linhaAtual] + "</p>";
    linhaAtual++;

    if (linhaAtual < linhasBoot.length) {
        setTimeout(mostrarLinhaBoot, 450);
    } else {
        botaoLigar.style.display = "block";
    }
}

function ligar() {
    boot.style.opacity = "0";
    setTimeout(esconderBoot, 600);
    iniciarJogo();
}

function esconderBoot() {
    boot.style.display = "none";
}

function reagir(tipo) {
    clearTimeout(timerMascote);

    if (tipo == "feliz") {
        mascote.innerHTML = "^‿^";
        mascote.className = "mascote feliz";
    } else if (tipo == "triste") {
        mascote.innerHTML = "╥﹏╥";
        mascote.className = "mascote triste";
    } else if (tipo == "pensando") {
        mascote.innerHTML = "•ᴗ•?";
        mascote.className = "mascote pensando";
    } else if (tipo == "apaixonado") {
        mascote.innerHTML = "♥‿♥";
        mascote.className = "mascote feliz";
        return;
    }

    timerMascote = setTimeout(mascoteNormal, 1800);
}

function mascoteNormal() {
    mascote.innerHTML = "◕‿◕";
    mascote.className = "mascote";
}

function mostrarCuriosidade(p) {
    clearTimeout(timerCuriosidade);
    curiosidadeTitulo.innerHTML = "Você sabia? (" + palavras[p] + ")";
    curiosidadeTexto.innerHTML = curiosidades[p];

    vocesabia.style.display = "none";
    setTimeout(abrirCuriosidade, 20);

    timerCuriosidade = setTimeout(fecharCuriosidade, 7000);
}

function abrirCuriosidade() {
    vocesabia.style.display = "block";
}

function fecharCuriosidade() {
    vocesabia.style.display = "none";
}

function iniciarJogo() {
    palavraAchada = [];
    dicaUsada = [];
    for (var p = 0; p < palavras.length; p++) {
        palavraAchada.push(false);
        dicaUsada.push(false);
    }

    corDaCasa = [];
    casaComDica = [];
    for (var i = 0; i < linhas * colunas; i++) {
        corDaCasa.push(-1);
        casaComDica.push(false);
    }

    casasPreview = [];
    inicio = -1;
    acertos = 0;
    pontos = 0;
    dicasRestantes = 3;
    segundos = 0;

    montarTabuleiro();
    montarPistas();
    atualizarPlacar();
    fecharCuriosidade();
    clearTimeout(timerMascote);
    mascoteNormal();
    mensagem.innerHTML = "oi! eu sou o Chipinho 💗 clique na primeira e na última letra de cada palavra";

    clearInterval(cronometro);
    tempo.innerHTML = "00:00";
    cronometro = setInterval(contarTempo, 1000);
}

function contarTempo() {
    segundos++;
    tempo.innerHTML = formatarTempo(segundos);
}

function formatarTempo(totalSegundos) {
    var min = Math.floor(totalSegundos / 60);
    var seg = totalSegundos % 60;
    if (min < 10) { min = "0" + min; }
    if (seg < 10) { seg = "0" + seg; }
    return min + ":" + seg;
}

function montarTabuleiro() {
    var html = "";
    for (var i = 0; i < linhas * colunas; i++) {
        var linha = Math.floor(i / colunas);
        var coluna = i % colunas;
        html += "<div id='casa" + i + "' class='casa'" +
                " onclick='clicarCasa(" + i + ")'" +
                " onmouseover='passarMouse(" + i + ")'>" +
                grade[linha][coluna] + "</div>";
    }
    tabuleiro.innerHTML = html;
}

function montarPistas() {
    var html = "";
    for (var p = 0; p < pistas.length; p++) {
        html += "<li id='pista" + p + "'>" +
                "<span class='texto'>" + pistas[p] + "</span>" +
                "<button id='botaoDica" + p + "' class='botao-dica' onclick='usarDica(" + p + ")'>💡 dica</button>" +
                " <span id='extra" + p + "'></span>" +
                "</li>";
    }
    listaPistas.innerHTML = html;
}

function atualizarPlacar() {
    contador.innerHTML = acertos;
    placarPontos.innerHTML = pontos;

    var coracoes = "";
    for (var d = 0; d < 3; d++) {
        if (d < dicasRestantes) {
            coracoes += "♥";
        } else {
            coracoes += "♡";
        }
    }
    dicas.innerHTML = coracoes;

    var porcento = Math.round(acertos / palavras.length * 100);
    progresso.style.width = porcento + "%";
    porcentagem.innerHTML = porcento + "%";
}

function pintarCasa(i) {
    var casa = document.getElementById("casa" + i);
    if (corDaCasa[i] != -1) {
        casa.className = "casa achada";
        casa.style.background = cores[corDaCasa[i]];
    } else if (casaComDica[i]) {
        casa.className = "casa dica";
        casa.style.background = "";
    } else {
        casa.className = "casa";
        casa.style.background = "";
    }
}

function usarDica(p) {
    if (palavraAchada[p] || dicaUsada[p]) {
        return;
    }
    if (dicasRestantes == 0) {
        mensagem.innerHTML = "acabaram as suas dicas 🥺";
        reagir("triste");
        return;
    }

    dicaUsada[p] = true;
    dicasRestantes--;
    pontos = pontos - 30;

    document.getElementById("extra" + p).innerHTML =
        "<span class='tamanho'>[" + palavras[p].length + " letras]</span>";
    document.getElementById("botaoDica" + p).style.display = "none";

    var casa = linhaInicial[p] * colunas + colunaInicial[p];
    casaComDica[casa] = true;
    pintarCasa(casa);

    atualizarPlacar();
    mensagem.innerHTML = "psiu... a letra amarela é o começo da palavra 💛";
    reagir("pensando");
}

function calcularLinha(casaInicio, casaFim) {
    var linha1 = Math.floor(casaInicio / colunas);
    var coluna1 = casaInicio % colunas;
    var linha2 = Math.floor(casaFim / colunas);
    var coluna2 = casaFim % colunas;

    var distLinha = Math.abs(linha2 - linha1);
    var distColuna = Math.abs(coluna2 - coluna1);

    if (linha1 != linha2 && coluna1 != coluna2 && distLinha != distColuna) {
        return [];
    }

    var passoLinha = 0;
    if (linha2 > linha1) { passoLinha = 1; }
    if (linha2 < linha1) { passoLinha = -1; }

    var passoColuna = 0;
    if (coluna2 > coluna1) { passoColuna = 1; }
    if (coluna2 < coluna1) { passoColuna = -1; }

    var tamanho = Math.max(distLinha, distColuna) + 1;
    var casas = [];
    for (var k = 0; k < tamanho; k++) {
        var l = linha1 + passoLinha * k;
        var c = coluna1 + passoColuna * k;
        casas.push(l * colunas + c);
    }
    return casas;
}

function limparPreview() {
    for (var k = 0; k < casasPreview.length; k++) {
        if (casasPreview[k] != inicio) {
            pintarCasa(casasPreview[k]);
        }
    }
    casasPreview = [];
}

function passarMouse(i) {
    if (inicio == -1) {
        return;
    }
    limparPreview();
    casasPreview = calcularLinha(inicio, i);
    for (var k = 0; k < casasPreview.length; k++) {
        var casa = document.getElementById("casa" + casasPreview[k]);
        if (casasPreview[k] != inicio) {
            casa.className = casa.className + " preview";
        }
    }
}

function clicarCasa(i) {
    if (inicio == -1) {
        inicio = i;
        document.getElementById("casa" + i).className = "casa selecionada";
        mensagem.innerHTML = "agora clique na última letra 💕";
        return;
    }

    limparPreview();

    if (inicio == i) {
        pintarCasa(i);
        inicio = -1;
        mensagem.innerHTML = "seleção cancelada";
        return;
    }

    var casaInicio = inicio;
    inicio = -1;
    pintarCasa(casaInicio);
    conferirSelecao(casaInicio, i);
}

function conferirSelecao(casaInicio, casaFim) {
    var casas = calcularLinha(casaInicio, casaFim);

    if (casas.length == 0) {
        mensagem.innerHTML = "ops! as letras precisam estar em linha reta 💔";
        reagir("triste");
        return;
    }

    var palavra = "";
    for (var k = 0; k < casas.length; k++) {
        var l = Math.floor(casas[k] / colunas);
        var c = casas[k] % colunas;
        palavra += grade[l][c];
    }

    var invertida = "";
    for (var k = palavra.length - 1; k >= 0; k--) {
        invertida += palavra[k];
    }

    for (var p = 0; p < palavras.length; p++) {
        if (palavras[p] == palavra || palavras[p] == invertida) {
            if (palavraAchada[p]) {
                mensagem.innerHTML = "você já encontrou " + palavras[p] + " 😉";
                return;
            }
            acharPalavra(p, casas);
            return;
        }
    }

    mensagem.innerHTML = palavra + " não é uma das palavras 💔";
    reagir("triste");
}

function acharPalavra(p, casas) {
    palavraAchada[p] = true;
    acertos++;
    pontos = pontos + 100;

    for (var k = 0; k < casas.length; k++) {
        corDaCasa[casas[k]] = p;
        casaComDica[casas[k]] = false;
        pintarCasa(casas[k]);

        var casa = document.getElementById("casa" + casas[k]);
        casa.className = "casa achada pop";
        casa.style.animationDelay = (k * 0.06) + "s";
    }

    document.getElementById("pista" + p).className = "feita";
    document.getElementById("botaoDica" + p).style.display = "none";
    document.getElementById("extra" + p).innerHTML =
        "<span class='resposta' style='background:" + cores[p] + "'>" + palavras[p] + "</span>";

    atualizarPlacar();
    mensagem.innerHTML = "uhuul! achou " + palavras[p] + "! +100 pontos 💖";
    reagir("feliz");
    mostrarCuriosidade(p);

    if (acertos == palavras.length) {
        setTimeout(terminarJogo, 900);
    }
}

function chuvaDeCoracoes() {
    var simbolos = ["💖", "💗", "💕", "💓", "✦"];
    var html = "";
    for (var n = 0; n < 45; n++) {
        var esquerda = Math.random() * 100;
        var atraso = Math.random() * 2;
        var tamanho = 18 + Math.random() * 22;
        var simbolo = simbolos[n % simbolos.length];
        html += "<span style='left:" + esquerda + "%; animation-delay:" + atraso +
                "s; font-size:" + tamanho + "px'>" + simbolo + "</span>";
    }
    chuva.innerHTML = html;
}

function terminarJogo() {
    clearInterval(cronometro);
    fecharCuriosidade();
    reagir("apaixonado");
    mensagem.innerHTML = "missão cumprida, hardware lover ♥";

    var dicasUsadas = 3 - dicasRestantes;
    resultado.innerHTML = "Você achou as " + palavras.length + " palavras em <b>" +
        formatarTempo(segundos) + "</b>, usou " + dicasUsadas + " dica(s) e fez <b>" +
        pontos + " pontos</b>.";

    if (dicasUsadas == 0) {
        estrelas.innerHTML = "⭐⭐⭐";
    } else if (dicasUsadas == 1) {
        estrelas.innerHTML = "⭐⭐☆";
    } else {
        estrelas.innerHTML = "⭐☆☆";
    }

    parabens.style.display = "flex";
    chuvaDeCoracoes();
}

function reiniciar() {
    parabens.style.display = "none";
    chuva.innerHTML = "";
    iniciarJogo();
}
