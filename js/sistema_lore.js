
function carregarLoreDinamica(dados) {
    const wrapper = document.getElementById('lore-wrapper');
    wrapper.innerHTML = ''; // Limpa os capítulos quando troca de personagem

    let totalCapitulos = 0;
    
    // 1. Conta quantos capítulos esse personagem tem no banco de dados
    while (dados[`cap${totalCapitulos + 1}_titulo`]) {
        totalCapitulos++;
    }

    // 2. Cria as telas para cada capítulo encontrado
    for (let num = 1; num <= totalCapitulos; num++) {
        const tela = document.createElement('div');
        tela.id = `cap${num}-screen`;
        tela.className = 'chapter-screen';

        // Estilos
        tela.style.setProperty('--theme-color', dados[`cap${num}_color`] || 'var(--theme-color)');
        tela.style.setProperty('--theme-glow', dados[`cap${num}_glow`] || 'var(--theme-glow)');

        // Ícone Inteligente (Imagem, Kaomoji ou Emoji)
        let iconData = dados[`cap${num}_icon`] || dados.avatar;
        let isImage = iconData.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i) || iconData.startsWith('http') || iconData.startsWith('data:image');
        let iconStyle = isImage ? `background-image: url('${iconData}');` : '';
        let iconText = isImage ? '' : iconData;
        let fontSize = isImage ? '' : (iconText.length > 2 ? 'font-size: 1.8rem;' : 'font-size: 4rem;');

        // Lógica de Botões Próximo / Anterior
        let btnAnterior = num > 1 ? `<button class="btn-curiosities btn-prev" data-target="${num - 1}" style="margin-top: 40px; width: 100%;"><span>←</span> Capítulo Anterior</button>` : '';
        let btnProximo = num < totalCapitulos ? `<button class="btn-curiosities btn-next" data-target="${num + 1}" style="margin-top: 40px; width: 100%;">Próximo Capítulo <span>→</span></button>` : '';

        // Monta o HTML da página
        tela.innerHTML = `
            <div class="extra-bg-blur" style="background-image: linear-gradient(${dados[`cap${num}_bg_color`]}, ${dados[`cap${num}_bg_color`]}), url('${dados[`cap${num}_bg_wallpaper`]}')"></div>
            <div class="extra-scroll-area">
                <button class="lore-fixed-btn btn-back-notion" onclick="fecharLore(${num})">← Voltar</button>

                <div class="notion-cover" style="background-image: url('${dados[`cap${num}_cover`]}')"></div>
                <div class="notion-container">
                    <div class="notion-icon" style="${iconStyle} ${fontSize}">${iconText}</div>
                    <h1 class="notion-title">${dados[`cap${num}_titulo`]}</h1>
                    <div class="notion-content">${dados[`cap${num}_texto`]}</div>
                    
                    ${btnProximo}
                    ${btnAnterior}
                </div>
            </div>
        `;
        wrapper.appendChild(tela);
    }

    // 3. Adiciona a função de clique nos botões que foram gerados
    wrapper.querySelectorAll('.btn-next, .btn-prev').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.currentTarget.getAttribute('data-target');
            const currentScreen = e.currentTarget.closest('.chapter-screen');
            const nextScreen = document.getElementById(`cap${targetId}-screen`);
            
            currentScreen.classList.remove('show-chapter');
            nextScreen.classList.add('show-chapter');
            nextScreen.querySelector('.extra-scroll-area').scrollTop = 0;
        });
    });
}

function abrirLore() {
    const cap1 = document.getElementById('cap1-screen');
    if (cap1) {
        cap1.classList.add('show-chapter');
        cap1.querySelector('.extra-scroll-area').scrollTop = 0;
    }
}

function fecharLore(num) {
    const tela = document.getElementById(`cap${num}-screen`);
    if (tela) {
        tela.classList.remove('show-chapter');
    }
}