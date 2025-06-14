const sobre = document.querySelector('#about')

const formulario = document.querySelector("#formulario")

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

async function getApiGithub() {
	try {
		// Enviar uma Requisição HTTP para a API do Github
		const dadosPerfil = await fetch(
			`https://api.github.com/users/renatangr`
		)

		// Converte a Resposta HTTP para o formato JSON
		const perfil = await dadosPerfil.json()

		// Criando o conteúdo da Seção about
		let conteudo = `
            <div class="glass">
                <!-- Imagem da seção Sobre -->
                <img src="${perfil.avatar_url}" alt="Foto do perfil do Github - ${perfil.name}" />

                <!-- Texto da seção Sobre -->
                <article id="about_texto" style="text-align: center">
                    <h2 class="highlight">Sobre mim</h2>
                    <p>${perfil.bio}</p>

                    <div id="about_github" class="flex sobre_github">
                        <a href="${perfil.html_url}" target="_blank" class="hover-underline">Github</a>
                        <p>${perfil.followers} seguidores</p>
                        <p>${perfil.public_repos} repositórios</p>
                    </div>
                </article>
            </div>
            
    `
		// Adicionar o conteúdo na página index.html, na Seção about
		sobre.innerHTML += conteudo

	} catch (error) {
		console.error(error)
	}
}

formulario.addEventListener("submit", function(event){

    event.preventDefault()

    const campoNome = document.querySelector("#nome")
    const txtNome = document.querySelector("#txtNome")

    if(campoNome.value.length < 3){
        txtNome.innerHTML = "O Nome deve ter no mínimo 3 caracteres"
        campoNome.focus()
        return
    }else{
        txtNome.innerHTML = ""
    }

     const campoEmail = document.querySelector("#email")
    const txtEmail = document.querySelector("#txtEmail")

    if(!campoEmail.value.match(emailRegex)){
        txtEmail.innerHTML = "Digite um e-mail válido"
        campoEmail.focus()
        return
    }else{
        txtEmail.innerHTML = ""
    }

    const campoAssunto = document.querySelector("#assunto")
    const txtAssunto = document.querySelector("#txtAssunto")

    if(campoAssunto.value.length < 5){
        txtAssunto.innerHTML = "O Assunto deve ter no mínimo 5 caracteres"
        campoAssunto.focus()
        return
    }else{
        txtAssunto.innerHTML = ""
    }

    // Enviar o e-mail
    formulario.submit()
})

getApiGithub()

/////

'use strict';

//Opening or closing side bar

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function() {elementToggleFunc(sidebar); })

//Activating Modal-testimonial

const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
}

for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener('click', function () {
        modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
        modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
        modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
        modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;

        testimonialsModalFunc();
    })
}

//Activating close button in modal-testimonial

modalCloseBtn.addEventListener('click', testimonialsModalFunc);
overlay.addEventListener('click', testimonialsModalFunc);

//Activating Filter Select and filtering options

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

select.addEventListener('click', function () {elementToggleFunc(this); });

for(let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);

    });
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
    for(let i = 0; i < filterItems.length; i++) {
        if(selectedValue == "all") {
            filterItems[i].classList.add('active');
        } else if (selectedValue == filterItems[i].dataset.category) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

//Enabling filter button for larger screens 

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    
    filterBtn[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;

    })
}

// Enabling Contact Form

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

for(let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('input', function () {
        if(form.checkValidity()) {
            formBtn.removeAttribute('disabled');
        } else { 
            formBtn.setAttribute('disabled', '');
        }
    })
}

// Enabling Page Navigation 

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for(let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function() {
        
        for(let i = 0; i < pages.length; i++) {
            if(this.innerHTML.toLowerCase() == pages[i].dataset.page) {
                pages[i].classList.add('active');
                navigationLinks[i].classList.add('active');
                window.scrollTo(0, 0);
            } else {
                pages[i].classList.remove('active');
                navigationLinks[i]. classList.remove('active');
            }
        }
    });
}