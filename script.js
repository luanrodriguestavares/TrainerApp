//PassarPagina//
document.getElementById('nextPage1').addEventListener('click', function() {
    hideSection('section1');
    showSection('section2');
});

document.getElementById('nextPage2').addEventListener('click', function() {
    hideSection('section2');
    showSection('section3');
});

document.getElementById('nextPage3').addEventListener('click', function() {
    hideSection('section3');
    showSection('section4');
});


function hideSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('animate__animated', 'animate__fadeOut', 'animate__faster');
        setTimeout(() => {
            section.classList.add('hidden');
            section.classList.remove('animate__fadeOut', 'animate__faster');
        }, 500);
    }
}

function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.remove('hidden');
        section.classList.add('animate__animated', 'animate__fadeIn', 'animate__faster');
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
            section.classList.remove('animate__fadeIn', 'animate__faster');
        }, 500);
    }
}
//PassarPagina//





//TrocarCadastro&Login//
function toggleForm() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const toggleButton = document.getElementById('toggleFormButton');

    if (loginForm && signupForm && toggleButton) {
        if (loginForm.classList.contains('hidden')) {
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
            toggleButton.textContent = 'Não possui conta? Cadastre-se';
        } else {
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
            toggleButton.textContent = 'Já possui uma conta? Entre';
        }
    }
}
//TrocarCadastro&Login//





//ColetaNome//
document.getElementById('nextPage2').addEventListener('click', function () {
    const nomeUsuario = document.getElementById('nome').value;

    const nomeUsuarioResultado = document.getElementById('nomeUsuarioResultado');
    if (nomeUsuarioResultado) {
        nomeUsuarioResultado.textContent = nomeUsuario;
    }
});
//ColetaNome//





//Formatações de Inputs//
function formatarAltura(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
}


function formatarPeso(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
    const valorKg = input.value;
    input.value = valorKg;
}
//Formatações de Inputs//





//Calculos de IMC - TMB//
document.getElementById('nextPage4').addEventListener('click', function() {
    hideSection('section4');
    showSection('section5');
    exibirLoading();
    setTimeout(function() {
        calcularInformacoes();
        ocultarLoading();
    }, 1000);
});

function exibirLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

function ocultarLoading() {
    const loadingElement = document.getElementById('loading');
    loadingElement.classList.add('hidden');
    loadingElement.style.display = 'none';
}

function calcularInformacoes() {
    const idade = parseInt(document.getElementById('idade').value);
    const genero = document.getElementById('genero').value;
    const altura = parseFloat(document.getElementById('altura').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const nivelAtividade = parseInt(document.getElementById('activity-range-input').value);

    const imc = calcularIMC(peso, altura);
    const tmb = calcularTMB(idade, genero, peso, altura, nivelAtividade);
    const categoriaPeso = determinarCategoriaPeso(imc);

    exibirResultados(imc, tmb, categoriaPeso);
}

function calcularAtividadeFisicaNivel(nivel) {
    return 1.2 + (nivel / 10);
}

function calcularIMC(peso, altura) {
    const alturaEmMetros = altura / 100;
    return peso / Math.pow(alturaEmMetros, 2);
}

function calcularTMB(idade, genero, peso, altura, nivelAtividade) {
    const atividadeFisicaNivel = calcularAtividadeFisicaNivel(nivelAtividade);
    let tmb;

    if (genero === 'Masculino') {
        tmb = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade);
    } else {
        tmb = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade);
    }

    return atividadeFisicaNivel * tmb;
}

function determinarCategoriaPeso(imc) {
    if (imc < 18.5) {
        return 'Abaixo do Peso';
    } else if (imc < 24.9) {
        return 'Peso Normal';
    } else if (imc < 29.9) {
        return 'Sobrepeso';
    } else if (imc < 34.9) {
        return 'Obesidade Grau 1';
    } else if (imc < 39.9) {
        return 'Obesidade Grau 2';
    } else {
        return 'Obesidade Grau 3';
    }
}

function exibirResultados(imc, tmb, categoriaPeso) {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = `
        <div class="mt-4">
            <div class="mb-6">
                <label for="imc-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">IMC<span class="mt-1 text-sm font-normal text-gray-200 dark:text-gray-400"> (Índice de massa corporal)</span></label>
                <input type="text" id="imc-input" value="${imc.toFixed(2)}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly>
            </div>
            <div class="mb-6">
                <label for="tmb-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">TMB<span class="mt-1 text-sm font-normal text-gray-200 dark:text-gray-400"> (Taxa de Metabolismo Basal)</span></label>
                <input type="text" id="tmb-input" value="${tmb.toFixed(2)}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly>
            </div>
            <div class="mb-6">
                <label for="categoria-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoria de Peso</label>
                <input type="text" id="categoria-input" value="${categoriaPeso}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly>
            </div>
            <br>
            <div id="toast-success" class="mt-3 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 animate__animated animate__fadeInUp" role="alert">
                <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>
                    <span class="sr-only">Check icon</span>
                </div>
                <p class="ml-3 text-justify">Lembre-se, é uma estimativa. Consulte um profissional de saúde para uma avaliação mais detalhada.</p>
            </div>
        </div>
        <div class="fixed bottom-0 right-0">
            <button id="nextPage3" class="w-[4rem] h-[4rem] mr-2 mb-2 rounded-full bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 text-white font-bold text-center py-2">
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;

    setTimeout(() => {
        const toastSuccess = document.getElementById('toast-success');
        toastSuccess.classList.remove('hidden');
    }, 1500);
}
//Calculos de IMC - TMB//