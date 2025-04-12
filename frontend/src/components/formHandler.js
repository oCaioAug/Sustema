import { buscarEnderecoPorCEP, obterCoordenadas } from "../services/geoService.js";
import { municipioBounds, map } from "../map/mapConfig.js";

let marcadorAtual = null;

export function initFormEvents() {
    const cepInput = document.getElementById('cep');
    const cepSwitch = document.getElementById('naoSeiCepSwitch');


    cepInput.addEventListener('blur', async function() {
        const cep = this.value.replace(/\D/g, '');
        if (cep.length !== 8) return;
        const endereco = await buscarEnderecoPorCEP(cep);
        if (endereco) {
            document.getElementById('estado').value = endereco.estado;
            document.getElementById('cidade').value = endereco.cidade;
            document.getElementById('bairro').value = endereco.bairro;
            document.getElementById('rua').value = endereco.rua;
        }
    });

   
    document.getElementById('btnPesquisar').addEventListener('click', async function() {
        const estado = document.getElementById('estado').value;
        const cidade = document.getElementById('cidade').value;
        const rua = document.getElementById('rua').value;
        const numero = document.getElementById('numero').value;

        // if (cidade.toLowerCase() !== 'resende') {
        //     alert("Só são permitidos endereços no município de Resende-RJ");
        //     return;
        // }

        const enderecoCompleto = `${rua}, ${numero}, ${cidade}, ${estado}, Brasil`;
        const coordenadas = await obterCoordenadas(enderecoCompleto);

        if (coordenadas) {
            // if (!municipioBounds.contains(coordenadas)) {
            //     alert("Endereço fora dos limites do município!");
            //     return;
            // }
            
            map.setView([coordenadas.lat, coordenadas.lng], 15);
            if (marcadorAtual) map.removeLayer(marcadorAtual);
            marcadorAtual = L.marker([coordenadas.lat, coordenadas.lng])
                .addTo(map)
                .bindPopup("Local pesquisado")
                .openPopup();
        } else {
            alert("Não foi possível encontrar o endereço. Verifique os dados.");
        }
    });

    function gerenciarCEP() {
        if(cepSwitch.checked) {
            cepInput.classList.remove('cep-bloqueado');
            cepInput.removeEventListener('keydown', bloquearEntrada);
            cepInput.removeEventListener('click', bloquearClique);
        } else {
            cepInput.classList.add('cep-bloqueado');
            cepInput.value = '';
            cepInput.addEventListener('keydown', bloquearEntrada);
            cepInput.addEventListener('click', bloquearClique);
        }
    }

    function bloquearEntrada(e) {
        e.preventDefault();
        return false;
    }

    function bloquearClique(e) {
        e.preventDefault();
        cepInput.blur();
        return false;
    }

    cepSwitch.addEventListener('change', gerenciarCEP);
    window.addEventListener('load', gerenciarCEP);
}
