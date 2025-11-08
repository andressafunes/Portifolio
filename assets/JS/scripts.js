// Selecionar a Seção About
const about = document.querySelector("#about");

// Selecionar o formulario

const formulario = document.querySelector("#formulario");

// Expressão regular para validação do e-mail

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/


//Função para buscar os dados no GitHub
async function getApiGithub() {

    try {

        // 01 - Fazer uma requisão GET para API do GitHub
        const dadosPerfil = await fetch("https://api.github.com/users/andressafunes");

        // 02 - Converter a resposta da API para JSON
        const perfilJson = await dadosPerfil.json();

        //03 - Criar i HTML/CSS com os dados do Perfil do GitHub
        let conteudo = `
        
         <!-- FOTO DO PERFIL -->
            <figure class="about_image">
                <img
                    src="${perfilJson.avatar_url}"
                    alt="Foto do perfil do GitHub - ${perfilJson.name}."
                >
            </figure>

            <!-- CONTEÚDO DO PERFIL -->
            <article class="about_content">

                <h2>Sobre mim</h2>
                <p>Sou bacharel em Ciências da Computação e tecnóloga em Jogos Digitais, uma curiosa eterna pelo poder da imaginação e da tecnologia.</p>
                <p>Minha jornada começou nos bastidores do suporte técnico, onde aprendi que resolver problemas também é uma forma de cuidar — e que até o menor detalhe 
                pode transformar uma experiência.
                Mas foi criando, com fios de amigurumi e papéis de encadernação, que percebi o quanto amo dar vida ao que só existia dentro da minha cabeça.</p>
                <p>Acredito que tecnologia é arte disfarçada de lógica. Ela pode emocionar, inspirar e conectar pessoas, assim como um bom
                 jogo — aquele que vai além da diversão e cria memórias.</p>
                <p>É por isso que mergulhei de vez na programação: para transformar ideias em mundos interativos, cheios de cor, emoção e propósito.
                Cada projeto é uma nova aventura, um pequeno universo onde coloco um pedacinho de mim e deixo a criatividade guiar o caminho.</p>

                <div class="about_stats">
                    <a href="${perfilJson.html_url}" target="_blank" class="botao">Ver GitHub</a>
                    
                    <div class="stats-wrapper">
                        <div class="stat-item">
                            <p class="stat-number">${perfilJson.followers}</p>
                            <p class="stat-label">Seguidores</p>
                        </div>
                        <div class="stat-item">
                            <p class="stat-number">${perfilJson.public_repos}</p>
                            <p class="stat-label">Repositórios</p>
                        </div>
                    </div>
                </div>
            </article>

        `

        // 04 - Adicionar o HTML dentro da Seção About

        about.innerHTML += conteudo;


    } catch (error) {
        console.error(error);
    }

}

// Função de envio e validação do formulário

formulario.addEventListener("submit", function (event) {

    //Impedir o envio automatico do formulário (sem validar os dados primeiro)
    event.preventDefault();

    // Validação do campo nome
    const campoNome = document.querySelector("#nome");
    const txtNome = document.querySelector("#txtNome");

    // Nome precisa ter no minimo 3 caracteres
    if (campoNome.value.length < 3) {
        txtNome.innerHTML = "Nome deve ter no mínimo 3 caracteres.";
        campoNome.focus();
        return;
    } else {
        txtNome.innerHTML = " ";
    }

    // Validação do campo e-mail
    const campoEmail = document.querySelector("#email");
    const txtEmail = document.querySelector("#txtEmail");

    // Verifica se o e-mail é válido
    if (!campoEmail.value.match(emailRegex)) {
        txtEmail.innerHTML = "Digite um e-mail válido";
        campoEmail.focus();
        return;
    } else {
        txtEmail.innerHTML = " ";
    }

    // Validação do campo assunto
    const campoAssunto = document.querySelector("#assunto");
    const txtAssunto = document.querySelector("#txtAssunto");

    // Assunto precisa ter no minimo 5 caracteres
    if (campoAssunto.value.length < 5) {
        txtAssunto.innerHTML = "O assunto deve ter no mínimo 5 caracteres.";
        campoAssunto.focus();
        return;
    } else {
        txtAssunto.innerHTML = " ";
    }

    // Se passou por todas as validações
    formulario.submit();
});

// Chamar a função getAPIGithub()

getApiGithub();

//  ÁUDIO DE FUNDO 
const audioAlert = document.querySelector("#audioAlert");
const musicaFundo = document.querySelector("#musicaFundo");
const btnPlay = document.querySelector("#btnPlay");
const toggleSound = document.querySelector("#toggleSound");

musicaFundo.volume = 0.1;  // Volume

// Iniciar música ao clicar em "Play"
btnPlay.addEventListener("click", () => {
  musicaFundo.play();
  audioAlert.style.display = "none";
  toggleSound.style.display = "block";
});

// Alternar som com o botão flutuante
toggleSound.addEventListener("click", () => {
  if (musicaFundo.paused) {
    musicaFundo.play();
    toggleSound.textContent = "🔊";
  } else {
    musicaFundo.pause();
    toggleSound.textContent = "🔇";
  }
});

// Ocultar botão flutuante até o play inicial
toggleSound.style.display = "none";


// GALERIA 
const cards = document.querySelectorAll(".galeria-card");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
});

cards.forEach(card => observer.observe(card));

