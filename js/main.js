let currentLoadedCharacter = 'imra';

const cursorDot = document.getElementById('custom-cursor-dot');
const cursorGlow = document.getElementById('custom-cursor-glow');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let rafAgendado = false;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!rafAgendado) {
        requestAnimationFrame(() => {
            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
            cursorGlow.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

            if(!document.getElementById('profile-screen').classList.contains('show-profile')) {
                const px = (window.innerWidth / 2 - mouseX) / 90;
                const py = (window.innerHeight / 2 - mouseY) / 90;
                document.querySelector('.forest-container').style.transform = `translate3d(${px}px, ${py}px, 0)`;
                document.getElementById('stars-container').style.transform = `translate3d(${px*2}px, ${py*2}px, 0)`;
            }

            rafAgendado = false;
        });
        rafAgendado = true;
    }
});

document.addEventListener('mouseover', (e) => {
    if (e.target.closest('button, .split-panel, .insp-item, .tooltip-word, .glitch-text, #dyn-avatar, .lightbox-img, .art-item')) {
        document.body.classList.add('cursor-hover');
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('button, .split-panel, .insp-item, .tooltip-word, .glitch-text, #dyn-avatar, .lightbox-img, .art-item')) {
        document.body.classList.remove('cursor-hover');
    }
});

const starsContainer = document.getElementById('stars-container');
for (let i = 0; i < 40; i++) {
    let star = document.createElement('div');
    star.className = 'bg-star';
    let size = Math.random() * 4 + 1; 
    star.style.width = size + 'px'; star.style.height = size + 'px'; 
    star.style.left = Math.random() * 100 + 'vw'; star.style.top = Math.random() * 100 + 'vh'; 
    star.style.animationDelay = Math.random() * 5 + 's'; star.style.animationDuration = (Math.random() * 3 + 2) + 's'; 
    starsContainer.appendChild(star);
}

function gerarParticulas() {
    const container = document.getElementById('particles-bg');
    container.innerHTML = ''; 
    for (let i = 0; i < 15; i++) {
        let p = document.createElement('div');
        p.className = 'magic-particle';
        let size = Math.random() * 6 + 2; 
        p.style.width = size + 'px'; p.style.height = size + 'px'; 
        p.style.left = Math.random() * 100 + 'vw';
        p.style.setProperty('--duration', (Math.random() * 10 + 5) + 's');
        p.style.animationDelay = Math.random() * 10 + 's'; 
        container.appendChild(p);
    }
}

let avatarClickCount = 0;
let avatarClickTimer;
document.getElementById('dyn-avatar').addEventListener('click', () => {
    avatarClickCount++;
    clearTimeout(avatarClickTimer);
    
    if (avatarClickCount >= 3) {
        const toast = document.getElementById('easter-egg');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4000);
        avatarClickCount = 0;
    } else {
        avatarClickTimer = setTimeout(() => { avatarClickCount = 0; }, 1000);
    }
});

const btn = document.getElementById('start-btn');
const blueStar = document.getElementById('star-blue'); 
const pinkStar = document.getElementById('star-pink');
const introDiv = document.getElementById('intro');
const panelLeft = document.getElementById('panel-left');
const panelRight = document.getElementById('panel-right');

btn.addEventListener('click', () => {
    btn.style.opacity = '0'; btn.style.pointerEvents = 'none'; btn.style.transform = 'scale(0.8)';
    setTimeout(() => {
        blueStar.classList.add('fall'); pinkStar.classList.add('fall');
        document.getElementById('wave-blue').classList.add('impact-wave'); 
        document.getElementById('wave-pink').classList.add('impact-wave');
        document.getElementById('c-blue').classList.add('form-crater'); 
        document.getElementById('c-pink').classList.add('form-crater');
        
        setTimeout(() => {
            document.body.classList.add('screen-shake');
            setTimeout(() => document.body.classList.remove('screen-shake'), 500);
        }, 1200); 

        setTimeout(() => {
            blueStar.classList.add('morph-active'); pinkStar.classList.add('morph-active');
            document.getElementById('text-blue').classList.add('show-text'); 
            document.getElementById('text-pink').classList.add('show-text');
            setTimeout(() => introDiv.classList.add('selection-active'), 2000); 
        }, 1000);
    }, 300);
});

panelLeft.addEventListener('mouseenter', () => introDiv.classList.add('hover-left'));
panelLeft.addEventListener('mouseleave', () => introDiv.classList.remove('hover-left'));
panelRight.addEventListener('mouseenter', () => introDiv.classList.add('hover-right'));
panelRight.addEventListener('mouseleave', () => introDiv.classList.remove('hover-right'));

function carregarPerfil(chavePersonagem) {
    currentLoadedCharacter = chavePersonagem;
    const dados = personagens[chavePersonagem];
    
    document.getElementById('profile-bg-layer').style.backgroundImage = `url('${dados.perfil_bg}')`;
    document.getElementById('profile-bg-layer').style.filter = dados.perfil_bg_filtros || 'brightness(0.5)';

    document.getElementById('dyn-name').innerText = dados.nome;
    document.getElementById('dyn-class').innerText = dados.classe;
    document.getElementById('dyn-avatar').style.backgroundImage = `url('${dados.avatar}')`;
    document.getElementById('dyn-bday').innerText = dados.aniversario;
    document.getElementById('dyn-height').innerText = dados.altura;
    document.getElementById('dyn-gender').innerText = dados.genero;
    document.getElementById('dyn-mbti').innerText = dados.mbti;
    document.getElementById('dyn-objective').innerText = dados.objetivo;
    document.getElementById('dyn-appearance').innerHTML = dados.aparencia;
    
    document.getElementById('dyn-sign-text-modal').innerHTML = `<p>${dados.signo_desc}</p>`;
    document.getElementById('dyn-vision-title-modal').innerText = dados.visao_titulo;
    document.getElementById('dyn-vision-text-modal').innerHTML = `<p>${dados.visao_desc}</p>`;

    const qaContainerModal = document.getElementById('dyn-qa-modal');
    qaContainerModal.innerHTML = ''; 
    dados.qa.forEach(item => {
        const div = document.createElement('div');
        div.className = 'curiosity-card'; 
        div.innerHTML = `<strong style="color: var(--theme-color); font-size: 1.1rem; text-transform: uppercase;">P: ${item.q}</strong><br><br>R: "${item.a}"`;
        qaContainerModal.appendChild(div);
    });

    document.getElementById('dyn-pers-subtitle').setAttribute('data-fulltext', dados.pers_subtitulo);

    carregarLoreDinamica(dados);

    document.getElementById('dyn-pers-title').innerText = dados.pers_titulo;
    document.getElementById('dyn-pers-text').innerHTML = dados.pers_texto;

    document.getElementById('dyn-model').src = dados.modelo3d;
    document.getElementById('dyn-spotify').src = dados.spotify;

    document.body.className = dados.tema; 
    
    gerarParticulas();

    const inspGrid = document.getElementById('dyn-inspirations');
    inspGrid.innerHTML = '';
    dados.inspiracoes.forEach(insp => {
        let imgSrc = typeof insp === 'string' ? insp : insp.src;
        let imgDesc = typeof insp === 'string' ? '' : (insp.desc || '');

        const div = document.createElement('div');
        div.className = 'insp-item';
        div.style.backgroundImage = `url('${imgSrc}')`;
        div.addEventListener('click', () => openLightbox(imgSrc, imgDesc));
        inspGrid.appendChild(div);
    });

    const artGrid = document.getElementById('dyn-art-gallery');
    artGrid.innerHTML = '';
    if (dados.artes && dados.artes.length > 0) {
        dados.artes.forEach(arte => {
            const card = document.createElement('div');
            card.className = 'art-card';
            
            const artItem = document.createElement('div');
            artItem.className = 'art-item';
            artItem.style.backgroundImage = `url('${arte.src}')`;
            
            artItem.addEventListener('click', () => openLightbox(arte.src, `Arte por @${arte.artist}`)); 

            const credit = document.createElement('div');
            credit.className = 'art-credit';
            credit.innerHTML = `Artista <span class="art-artist">@${arte.artist}</span>`;

            card.appendChild(artItem);
            card.appendChild(credit);
            artGrid.appendChild(card);
        });
    } else {
        artGrid.innerHTML = '<p style="text-align: center; color: #aaa; width: 100%; grid-column: 1 / -1;">Nenhuma arte adicionada ainda.</p>';
    }

    const curList = document.getElementById('dyn-curiosities');
    curList.innerHTML = '';
    dados.curiosidades.forEach(texto => {
        const div = document.createElement('div');
        div.className = 'curiosity-card';
        div.innerText = texto;
        curList.appendChild(div);
    });
}

const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption'); 

function openLightbox(src, desc = '') {
    lightboxImg.src = src;
    lightboxCaption.innerHTML = desc; 
    lightboxCaption.style.display = desc ? 'block' : 'none'; 
    lightboxOverlay.classList.add('show');
}

function closeLightbox() {
    lightboxOverlay.classList.remove('show');
    setTimeout(() => { 
        lightboxImg.src = ''; 
        lightboxCaption.innerHTML = ''; 
    }, 300);
}

lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay || e.target === lightboxCaption) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxOverlay.classList.contains('show')) {
        closeLightbox();
    }
});

function diveIntoStar(clickedContainer, otherContainer, crater, otherCrater, chave) {
    panelLeft.style.pointerEvents = 'none'; panelRight.style.pointerEvents = 'none';
    introDiv.classList.remove('hover-left', 'hover-right', 'selection-active');
    
    otherContainer.classList.add('fade-out'); otherCrater.classList.add('fade-out'); crater.classList.add('fade-out'); 

    const rect = clickedContainer.getBoundingClientRect();
    clickedContainer.style.transform = 'scale(3)'; clickedContainer.style.opacity = '0'; 
    
    const auraClone = document.createElement('div');
    auraClone.style.position = 'fixed'; auraClone.style.left = rect.left + 'px'; auraClone.style.top = rect.top + 'px';
    auraClone.style.width = '45px'; auraClone.style.height = '45px'; auraClone.style.borderRadius = '50%';
    auraClone.style.zIndex = '99'; auraClone.style.pointerEvents = 'none';
    
    if (chave === 'imra') {
        auraClone.style.background = '#00008B'; auraClone.style.boxShadow = '0 0 30px 10px rgba(0, 0, 139, 0.8), inset 0 0 15px rgba(100, 150, 255, 0.8)';
    } else {
        auraClone.style.background = '#FF1493'; auraClone.style.boxShadow = '0 0 30px 10px rgba(255, 20, 147, 0.8), inset 0 0 15px rgba(255, 105, 180, 0.8)';
    }
    
    document.body.appendChild(auraClone);
    carregarPerfil(chave);

    setTimeout(() => {
        const centerX = window.innerWidth / 2; const centerY = window.innerHeight / 2;
        const startX = rect.left + 22.5; const startY = rect.top + 22.5; 
        auraClone.style.transition = 'transform 1.1s cubic-bezier(0.7, 0, 0.2, 1)';
        auraClone.style.transform = `translate(${centerX - startX}px, ${centerY - startY}px) scale(200)`;
    }, 20);

    setTimeout(() => {
        document.getElementById('profile-screen').classList.add('show-profile');
        document.getElementById('intro').style.display = 'none';
    }, 600); 
}

panelLeft.addEventListener('click', () => diveIntoStar(blueStar, pinkStar, document.getElementById('c-blue'), document.getElementById('c-pink'), 'imra'));
panelRight.addEventListener('click', () => diveIntoStar(pinkStar, blueStar, document.getElementById('c-pink'), document.getElementById('c-blue'), 'nyev'));

const btnOpenDrawer = document.getElementById('btn-open-drawer');
const btnCloseDrawer = document.getElementById('btn-close-drawer');
const curiosityPanel = document.getElementById('curiosity-panel');
const drawerBg = document.getElementById('drawer-bg');

btnOpenDrawer.addEventListener('click', () => { curiosityPanel.classList.add('open'); drawerBg.classList.add('open'); });
btnCloseDrawer.addEventListener('click', () => { curiosityPanel.classList.remove('open'); drawerBg.classList.remove('open'); });
drawerBg.addEventListener('click', () => { curiosityPanel.classList.remove('open'); drawerBg.classList.remove('open'); });

let typeWriterInterval;
function startTypewriter(element) {
    clearInterval(typeWriterInterval);
    const fullText = element.getAttribute('data-fulltext');
    element.innerText = '';
    element.classList.add('typing-cursor');
    let i = 0;
    typeWriterInterval = setInterval(() => {
        if (i < fullText.length) {
            element.innerText += fullText.charAt(i);
            i++;
        } else {
            clearInterval(typeWriterInterval);
            element.classList.remove('typing-cursor');
        }
    }, 50);
}

function setupModal(btnId, closeId, modalId) {
    const btn = document.getElementById(btnId);
    const closeBtn = document.getElementById(closeId);
    const modal = document.getElementById(modalId);

    if (btn && closeBtn && modal) {
        btn.addEventListener('click', () => {
            modal.classList.add('open');
            const typeTarget = modal.querySelector('.typewriter-target');
            if(typeTarget) startTypewriter(typeTarget);
        });
        closeBtn.addEventListener('click', () => modal.classList.remove('open'));
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
    }
}

setupModal('btn-open-pers', 'btn-close-pers', 'pers-modal');
setupModal('btn-open-vision', 'btn-close-vision', 'vision-modal');
setupModal('btn-open-sign', 'btn-close-sign', 'sign-modal');
setupModal('btn-open-qa', 'btn-close-qa', 'qa-modal');
setupModal('btn-open-art', 'btn-close-art', 'art-modal');
setupModal('btn-help', 'btn-close-help', 'help-modal');

const btnOpenLore = document.getElementById('btn-open-lore');
if (btnOpenLore) {
    btnOpenLore.addEventListener('click', abrirLore);
}

const tooltipEl = document.createElement('div');
tooltipEl.id = 'lore-tooltip';
tooltipEl.innerHTML = `
    <img id="lore-tooltip-img" src="" alt="">
    <p id="lore-tooltip-desc"></p>
`;
document.body.appendChild(tooltipEl);

const tImg = document.getElementById('lore-tooltip-img');
const tDesc = document.getElementById('lore-tooltip-desc');

document.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('tooltip-word')) {
        const imgUrl = e.target.getAttribute('data-img');
        const descText = e.target.getAttribute('data-desc');

        if (imgUrl && imgUrl !== '') {
            tImg.src = imgUrl; tImg.style.display = 'block';
        } else {
            tImg.style.display = 'none';
        }

        tDesc.innerHTML = descText;

        requestAnimationFrame(() => {
            const rect = e.target.getBoundingClientRect(); 
            
            let topPos = rect.top - tooltipEl.offsetHeight - 15;
            let leftPos = rect.left + (rect.width / 2) - (tooltipEl.offsetWidth / 2);

            if (topPos < 10) { topPos = rect.bottom + 15; }
            if (leftPos < 10) { leftPos = 10; }
            if (leftPos + tooltipEl.offsetWidth > window.innerWidth - 10) { 
                leftPos = window.innerWidth - tooltipEl.offsetWidth - 10; 
            }

            tooltipEl.style.left = `${leftPos}px`;
            tooltipEl.style.top = `${topPos}px`;
            tooltipEl.classList.add('show');
        });
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('tooltip-word')) {
        tooltipEl.classList.remove('show');
    }
});
