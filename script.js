const caixaPrincipal = document.querySelector(".caixa-principal"); // Seleciona o elemento da caixa principal
const caixaPerguntas = document.querySelector(".caixa-perguntas"); // Seleciona o elemento onde a pergunta será exibida
const caixaAlternativas = document.querySelector(".caixa-alternativas"); // Seleciona o elemento onde as alternativas serão exibidas
const caixaResultado = document.querySelector(".caixa-resultado"); // Seleciona o elemento onde o resultado será exibido
const textoResultado = document.querySelector(".texto-resultado"); // Seleciona o elemento onde o texto do resultado será exibido

const perguntas = [ // Array com todas as perguntas do quiz
    {
        enunciado: "Você está se preparando para pegar a primeira onda da bateria. Qual é sua estratégia?", // Enunciado da primeira pergunta
        alternativas: [ // Alternativas para a primeira pergunta
            {
                texto: "Pegar a onda maior e mais desafiadora.", // Texto da primeira alternativa
                afirmacao: "Você pega a onda maior e realiza manobras impressionantes. Alta pontuação para você!", // Afirmação para a primeira alternativa
                pontos: 1 // Pontuação atribuída para essa alternativa
            },
            {
                texto: "Pegar uma onda menor e mais fácil.", // Texto da segunda alternativa
                afirmacao: "Você pega a onda menor e realiza manobras básicas. Pontuação moderada.", // Afirmação para a segunda alternativa
                pontos: 0 // Pontuação atribuída para essa alternativa
            }
        ]
    },
    {
        enunciado: "Você está surfando uma onda. Qual manobra você tenta?", // Enunciado da segunda pergunta
        alternativas: [
            {
                texto: "Um aéreo (manobra aérea).", // Texto da primeira alternativa
                afirmacao: "Você executa um aéreo perfeito, impressionando os juízes. Alta pontuação para você!", // Afirmação para a primeira alternativa
                pontos: 1 // Pontuação atribuída para essa alternativa
            },
            {
                texto: "Uma rasgada básica.", // Texto da segunda alternativa
                afirmacao: "A rasgada foi bem executada, mas sem grandes desafios. Pontuação moderada.", // Afirmação para a segunda alternativa
                pontos: 0 // Pontuação atribuída para essa alternativa
            }
        ]
    },
    {
        enunciado: "Você está se aproximando da seção crítica da onda. O que você faz?", // Enunciado da terceira pergunta
        alternativas: [
            {
                texto: "Tenta um tubo (entrar na parte oca da onda).", // Texto da primeira alternativa
                afirmacao: "Você entra no tubo e sai com sucesso. Alta pontuação para você!", // Afirmação para a primeira alternativa
                pontos: 1 // Pontuação atribuída para essa alternativa
            },
            {
                texto: "Realiza uma manobra segura.", // Texto da segunda alternativa
                afirmacao: "Você realiza uma manobra segura, mas sem grandes riscos. Pontuação moderada.", // Afirmação para a segunda alternativa
                pontos: 0 // Pontuação atribuída para essa alternativa
            }            
        ]
    },
    {
        enunciado: "Você vê uma série de ondas se aproximando. Qual é sua escolha?", // Enunciado da quarta pergunta
        alternativas: [
            {
                texto: "Pega a primeira onda da série.", // Texto da primeira alternativa
                afirmacao: "A primeira onda da série foi a melhor e você conseguiu realizar manobras incríveis. Alta pontuação para você!", // Afirmação para a primeira alternativa
                pontos: 1 // Pontuação atribuída para essa alternativa
            },
            {
                texto: "Espera a última onda da série.", // Texto da segunda alternativa
                afirmacao: "A última onda da série foi fraca e não permitiu manobras significativas. Pontuação baixa.", // Afirmação para a segunda alternativa
                pontos: 0 // Pontuação atribuída para essa alternativa
            }
        ]
    },
    {
        enunciado: "Você está no final da bateria e precisa de uma boa pontuação. O que você faz?", // Enunciado da quinta pergunta
        alternativas: [
            {
                texto: "Arrisca uma manobra difícil.", // Texto da primeira alternativa
                afirmacao: "A manobra difícil foi bem-sucedida e você conseguiu a pontuação necessária. Alta pontuação para você!", // Afirmação para a primeira alternativa
                pontos: 1 // Pontuação atribuída para essa alternativa
            },
            {
                texto: "Joga seguro com uma manobra básica.", // Texto da segunda alternativa
                afirmacao: "A manobra básica foi bem executada, mas não suficiente para a pontuação necessária. Pontuação moderada.", // Afirmação para a segunda alternativa
                pontos: 0 // Pontuação atribuída para essa alternativa
            }
        ]
    }
];

let atual = 0; // Controla a pergunta atual
let perguntaAtual; // Armazena a pergunta atual
let historiaFinal = ""; // Armazena a afirmação da última alternativa escolhida
let pontos = 0;  // Variável para acumular a pontuação do usuário

function mostraPergunta(){ // Função para exibir a pergunta atual
    perguntaAtual = perguntas[atual]; // Atribui a pergunta atual à variável
    caixaPerguntas.textContent = perguntaAtual.enunciado; // Exibe o enunciado da pergunta no elemento HTML
    caixaAlternativas.textContent = ""; // Limpa as alternativas anteriores
    mostraAlternativas(); // Chama a função para exibir as alternativas
}

function mostraAlternativas(){ // Função para exibir as alternativas
    for(const alternativa of perguntaAtual.alternativas){ // Itera sobre cada alternativa da pergunta atual
        const botaoAlternativas = document.createElement("button"); // Cria um botão para cada alternativa
        botaoAlternativas.textContent = alternativa.texto; // Define o texto do botão com a alternativa
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa)); // Adiciona o evento de clique para a alternativa
        caixaAlternativas.appendChild(botaoAlternativas); // Adiciona o botão de alternativa ao elemento de alternativas
    }
}

function respostaSelecionada(alternativa) { // Função chamada quando uma alternativa é selecionada
    const afirmacao = alternativa.afirmacao; // Atribui a afirmação da alternativa à variável
    historiaFinal = afirmacao; // Armazena a afirmação da alternativa selecionada
    pontos += alternativa.pontos;  // Acumula a pontuação conforme a alternativa escolhida
    atual++; // Avança para a próxima pergunta

    if (atual < perguntas.length) { // Verifica se ainda existem perguntas
        mostraPergunta();  // Mostra a próxima pergunta
    } else {
        exibeResultado();  // Exibe o resultado final quando o quiz terminar
    }
}

function exibeResultado() { // Função para exibir o resultado final após todas as perguntas
    caixaPerguntas.textContent = "Fim do Quiz!"; // Exibe a mensagem "Fim do Quiz!"
    caixaAlternativas.textContent = "";  // Limpa as alternativas da tela
    textoResultado.textContent = `Sua pontuação final é: ${pontos} pontos.`; // Exibe a pontuação final no elemento de resultado

    if (pontos === perguntas.length) { // Se o usuário acertou todas as perguntas
        textoResultado.textContent += " Parabéns! Você acertou todas as questões!"; // Parabéns por acertar tudo
    } else if (pontos > perguntas.length / 2) { // Se o usuário acertou mais da metade das perguntas
        textoResultado.textContent += " Bom trabalho, você teve um desempenho legal!"; // Mensagem de desempenho bom
    } else { // Se o usuário acertou menos da metade das perguntas
        textoResultado.textContent += " Você pode melhorar! Tente novamente!"; // Mensagem de incentivo
    }
}

mostraPergunta(); // Chama a função para exibir a primeira pergunta
