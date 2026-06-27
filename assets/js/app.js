const defaultPosts = [];
let posts = [];

function normalizePost(post) {
    return {
        id: post.id || Date.now().toString(),
        usuario: post.usuario || post.author || post.name || 'Usuário',
        descricao: post.descricao || post.text || '',
        imagem: post.imagem || post.image || post.img || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200&auto=format&fit=crop',
        tipo: post.tipo || 'perdido',
        raca: post.raca || '',
        cor: post.cor || '',
        porte: post.porte || '',
        animal: post.animal || '',
        contato: post.contato || '',
        localizacao: post.localizacao || '',
        data: post.data || new Date().toISOString(),
    };
}

function formatPostTime(dateValue) {
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return 'Postado recentemente';

    const diffMinutes = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60000));
    if (diffMinutes < 1) return 'Postado agora';
    if (diffMinutes < 60) return `Postado há ${diffMinutes} min`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `Postado há ${diffHours} hora${diffHours > 1 ? 's' : ''}`;

    const diffDays = Math.floor(diffHours / 24);
    return `Postado há ${diffDays} dia${diffDays > 1 ? 's' : ''}`;
}

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[char]));
}

function formatTipo(tipo) {
    const typeLabels = {
        perdido: 'Perdido',
        achado: 'Achado',
        encontrado: 'Achado',
        adocao: 'Adoção'
    };

    return typeLabels[tipo] || tipo || 'Perdido';
}

function buildPostTags(post) {
    const tags = [
        { className: 'tag-type', text: formatTipo(post.tipo) },
        { className: 'tag-animal', text: post.animal },
        { className: 'tag-breed', text: post.raca },
        { className: 'tag-color', text: post.cor },
        { className: 'tag-size', text: post.porte },
        { className: 'tag-location', text: post.localizacao },
        { className: 'tag-contact', text: post.contato }
    ];

    return tags
        .map(tag => `<span class="post-tag ${tag.className}">${escapeHtml(tag.text || 'Não informado')}</span>`)
        .join('');
}

function renderPosts(basePath) {
    const feedPosts = document.getElementById('feedPosts');
   if (!feedPosts) return;

    feedPosts.innerHTML = posts.map((post, idx) => {
        // Se o post for do usuário logado, exibe a lixeira, senão fica vazio
        const btnExcluir = (window.currentUser && post.usuario_id == window.currentUser.id)
            ? `<button class="btn-deletar-post ms-auto" onclick="deletarPost(${post.id})">🗑️</button>`
            : '';

        return `
        <article class="post-card">
            <div class="post-header d-flex align-items-center">
                <img src="${basePath}assets/img/user-icon.svg" width="36" alt="">
                <div><strong>${escapeHtml(post.usuario)}</strong><br><small>${formatPostTime(post.data)}</small></div>
                ${btnExcluir}
            </div>
            <p class="post-description mt-2 mb-2">${escapeHtml(post.descricao)}</p>
            <img class="post-image" src="${escapeHtml(post.imagem)}" alt="">
            <div class="post-tags">${buildPostTags(post)}</div>
        </article>
        `;
    }).join('');
}

function initApp() {
    const basePath = window.appBasePath || './';
    const menuItems = [
        { icon: '❗', label: 'Feed', href: 'index.php' },
        { icon: '🦠', label: 'Zoonoses', href: 'zoonoses.html' },
        { icon: '💉', label: 'Vacinação', href: 'vacinacao.html' },
        { icon: '💗', label: 'Sobre adoção', href: 'adocao.html' },
        { icon: '🐶', label: 'Castração', href: 'pages/castracao.html' },
        { icon: '🫂', label: 'Suporte emocional', href: 'suporte-emocional.html' }
    ];
    const resolvePath = href => href === '#' ? href : `${basePath}${href}`;

    document.querySelectorAll('.side-menu').forEach(menu => { menu.innerHTML = menuItems.map(i => `<a class="menu-link" href="${resolvePath(i.href)}"><span class="menu-icon">${i.icon}</span><span class="menu-text">${i.label}</span></a>`).join('') });

    fetch('get_posts.php')
    .then(response => response.json())
    .then(data => {
        posts = data;
        renderPosts(basePath);
    })
    .catch(error => console.error('Erro ao buscar posts do banco:', error));

const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) { profileBtn.addEventListener('click', () => new bootstrap.Modal(document.getElementById('profileModal')).show()); }
        
    const modalNome = document.getElementById('modal-user-nome');
    const modalInfo = document.getElementById('modal-user-info');
    const btnLogout = document.querySelector('.btn-logout');

    if (window.currentUser) {
        if (modalNome) modalNome.textContent = window.currentUser.nome;
        if (modalInfo) modalInfo.innerHTML = `Email: ${window.currentUser.email}<br>Membro desde: ${window.currentUser.membroDesde}`;
    } else {
        if (modalNome) modalNome.textContent = "Modo Visitante";
        if (modalInfo) modalInfo.innerHTML = "Faça login ou cadastre-se para conseguir publicar e gerenciar postagens de pets.";
        if (btnLogout) {
            btnLogout.textContent = "Fazer Login";
            btnLogout.setAttribute("onclick", "location.href='login.html'");
            btnLogout.style.backgroundColor = "var(--accent)"; 
            btnLogout.style.color = "#fff";
            btnLogout.style.border = "none";
        }
    }
    initImageCrop();
}

function initImageCrop() {
    const photoInput = document.getElementById('photoInput');
    if (!photoInput) return;

    const uploadBox = document.getElementById('uploadBox');
    const previewImage = document.getElementById('previewImage');
    const uploadText = document.getElementById('uploadText');
    const cropControls = document.getElementById('cropControls');
    const zoomInput = document.getElementById('zoomInput');
    const croppedImageData = document.getElementById('croppedImageData');
    const publishBtn = document.getElementById('publishBtn');
    const cropState = {
        zoom: 1,
        offsetX: 0,
        offsetY: 0,
        dragging: false,
        dragStartX: 0,
        dragStartY: 0,
        dragOriginX: 0,
        dragOriginY: 0
    };

    document.querySelectorAll('.chip').forEach(chip => chip.addEventListener('click', () => {
        document.querySelectorAll('.chip').forEach(item => item.classList.remove('active'));
        chip.classList.add('active');
    }));

    function clampOffsets() {
        if (previewImage.hidden || !previewImage.naturalWidth || !previewImage.naturalHeight) return;

        const boxWidth = uploadBox.clientWidth;
        const boxHeight = uploadBox.clientHeight;
        const baseScale = Math.max(boxWidth / previewImage.naturalWidth, boxHeight / previewImage.naturalHeight);
        const imageWidth = previewImage.naturalWidth * baseScale * cropState.zoom;
        const imageHeight = previewImage.naturalHeight * baseScale * cropState.zoom;
        const maxX = Math.max(0, (imageWidth - boxWidth) / 2);
        const maxY = Math.max(0, (imageHeight - boxHeight) / 2);

        cropState.offsetX = Math.min(maxX, Math.max(-maxX, cropState.offsetX));
        cropState.offsetY = Math.min(maxY, Math.max(-maxY, cropState.offsetY));
    }

    function updatePreviewTransform() {
        clampOffsets();
        previewImage.style.transform = `translate(${cropState.offsetX}px, ${cropState.offsetY}px) scale(${cropState.zoom})`;
    }

    function resetCropState() {
        cropState.zoom = 1;
        cropState.offsetX = 0;
        cropState.offsetY = 0;
        zoomInput.value = '1';
        updatePreviewTransform();
    }

    function generateCroppedImage() {
        if (previewImage.hidden || !previewImage.complete || !previewImage.naturalWidth) return '';

        const boxWidth = uploadBox.clientWidth;
        const boxHeight = uploadBox.clientHeight;
        const canvasWidth = 1080;
        const canvasHeight = Math.round(canvasWidth * (boxHeight / boxWidth));
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const baseScale = Math.max(boxWidth / previewImage.naturalWidth, boxHeight / previewImage.naturalHeight);
        const outputScale = canvasWidth / boxWidth;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        context.fillStyle = '#d6d6d6';
        context.fillRect(0, 0, canvas.width, canvas.height);

        const drawWidth = previewImage.naturalWidth * baseScale * cropState.zoom * outputScale;
        const drawHeight = previewImage.naturalHeight * baseScale * cropState.zoom * outputScale;
        const drawX = (canvas.width - drawWidth) / 2 + cropState.offsetX * outputScale;
        const drawY = (canvas.height - drawHeight) / 2 + cropState.offsetY * outputScale;

        context.drawImage(previewImage, drawX, drawY, drawWidth, drawHeight);
        return canvas.toDataURL('image/jpeg', 0.92);
    }

    photoInput.addEventListener('change', e => {
        const file = e.target.files[0];

        if (photoInput.dataset.previewUrl) {
            URL.revokeObjectURL(photoInput.dataset.previewUrl);
            delete photoInput.dataset.previewUrl;
        }

        if (!file) {
            previewImage.removeAttribute('src');
            previewImage.hidden = true;
            uploadText.hidden = false;
            cropControls.hidden = true;
            croppedImageData.value = '';
            resetCropState();
            return;
        }

        const url = URL.createObjectURL(file);
        photoInput.dataset.previewUrl = url;
        previewImage.src = url;
        previewImage.hidden = false;
        uploadText.hidden = true;
        cropControls.hidden = false;
        croppedImageData.value = '';
        resetCropState();
    });

    previewImage.addEventListener('load', updatePreviewTransform);

    zoomInput.addEventListener('input', e => {
        cropState.zoom = Number(e.target.value);
        updatePreviewTransform();
    });

    uploadBox.addEventListener('pointerdown', e => {
        if (previewImage.hidden) return;
        cropState.dragging = true;
        cropState.dragStartX = e.clientX;
        cropState.dragStartY = e.clientY;
        cropState.dragOriginX = cropState.offsetX;
        cropState.dragOriginY = cropState.offsetY;
        uploadBox.setPointerCapture(e.pointerId);
    });

    uploadBox.addEventListener('pointermove', e => {
        if (!cropState.dragging) return;
        cropState.offsetX = cropState.dragOriginX + e.clientX - cropState.dragStartX;
        cropState.offsetY = cropState.dragOriginY + e.clientY - cropState.dragStartY;
        updatePreviewTransform();
    });

    uploadBox.addEventListener('pointerup', e => {
        cropState.dragging = false;
        if (uploadBox.hasPointerCapture(e.pointerId)) uploadBox.releasePointerCapture(e.pointerId);
    });

    uploadBox.addEventListener('pointercancel', () => {
        cropState.dragging = false;
    });

    window.addEventListener('resize', updatePreviewTransform);

    if (publishBtn) { publishBtn.addEventListener('click', () => {
        const image = generateCroppedImage();
        const fields = Object.fromEntries(Array.from(document.querySelectorAll('.meta-input')).map(input => [input.name, input.value]));
        const description = document.querySelector('.desc-input') ? document.querySelector('.desc-input').value : '';
        const contatoInput = document.getElementById('contatoInput');
        const localizacaoInput = document.getElementById('localizacaoInput');
        const contato = contatoInput ? contatoInput.value.trim() : '';
        const localizacao = localizacaoInput ? localizacaoInput.value.trim() : '';
        const activeChip = document.querySelector('.chip.active');
        const typeMap = {
            'Perdido': 'perdido',
            'Achado': 'encontrado',
            'Adoção': 'adocao'
        };
        const tipo = activeChip ? typeMap[activeChip.textContent.trim()] || 'perdido' : 'perdido';

        if (!contato) {
            alert('Informe um contato para publicar.');
            if (contatoInput) contatoInput.focus();
            return;
        }

        if (!localizacao) {
            alert('Informe a localização para publicar.');
            if (localizacaoInput) localizacaoInput.focus();
            return;
        }

        const postData = {
        descricao: description,
        imagem: image || '',
        tipo: tipo,
        animal: fields.animal || '',
        raca: fields.raca || '',
        porte: fields.porte || '',
        idade: fields.idade || '',
        cor: fields.cor || '',
        bairro: fields.bairro || '',
        contato: contato,
        localizacao: localizacao
    };

    croppedImageData.value = image;

    fetch('processa_post.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
    })
    .then(res => res.json())
    .then(resData => {
        if (resData.success) {
            // Post salvo no banco, redireciona para o feed
            window.location.href = 'index.php';
        } else {
            alert('Erro ao publicar postagem: ' + resData.message);
        }
    })
    .catch(err => {
        console.error('Erro na requisição:', err);
        alert('Erro de conexão ao tentar salvar a postagem.');
    });
    }); }
}

if (window.componentsLoaded) {
    initApp();
} else {
    document.addEventListener('componentsLoaded', initApp, { once: true });
}

window.deletarPost = function(postId) {
    if (confirm('Tem certeza que deseja excluir esta postagem?')) {
        fetch('deleta_post.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ post_id: postId })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                // Atualiza a página para remover o post do feed na hora
                window.location.reload();
            } else {
                alert(data.message);
            }
        })
        .catch(err => console.error('Erro ao deletar post:', err));
    }
};