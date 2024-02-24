//Inicialización de variables
const textoInicial = document.querySelector(".texto");
const textoEncriptado = document.querySelector(".resultado_texto");
var munieco = document.querySelector(".toy");
var contenedor = document.querySelector(".resultado_informativo");
var resultado = document.querySelector(".resultado_texto");
var botonCopiarOculta = document.querySelector(".boton_copiar");


// Expresiones regulares
const caracteresEspeciales= /\W/g; // Todo lo que no sea alfanumerico
const mayusculas= /[A-Z]/g; // Letras minusculas.
const acentos = /[á-ź]/g; // acentos



// Matriz de condiciones de encriptado
const matrizCondiciones = [
    ["e", "enter"],
    ["i", "imes"],  
    ["a", "ai"],    
    ["o", "ober"],
    ["u", "ufat"], 
];

const matrizCondiciones2 = [
    ["u", "ufat"],
    ["o", "ober"],
    ["a", "ai"],
    ["i", "imes"],
    ["e", "enter"],
];

// Función verificación de caracteres, mayusculas y acentos
function caracteres(texto){
    if (caracteresEspeciales.test(texto)){
        return true;
    }else if(mayusculas.test(texto)){
        return true;
    }else if(acentos.test(texto)){
        return true;
    }else {
        return false;
    }
}

//aumentar el tamaño automatico del textarea
function ampliarTextare(){
    resultado.style.cssText = `height: ${resultado.scrollHeight}px; overflow-y: hidden`;

    resultado.addEventListener("input", function() {
        this.style.height = "auto";
        this.style.heigth = `${this.scrollHeight}px`;
    });
}

//función para limpiar el lado derecho y ajustarlo
function ocultar(){
    resultado.style.color="#343A40";
    resultado.style.textAlign="left";
    munieco.style.display="none";
    contenedor.style.display="none";
    botonCopiarOculta.style.display="block";
}
//función para traer los objetos de vuelta
function aparecer(){
    resultado.style.color="#FFFFFF";
    munieco.style.display="flex";
    contenedor.style.display="flex";
    botonCopiarOculta.style.display="none";
}
function copiado(){
    
}


// Funcionalidad al boton encriptar
function botonEncriptar(){
    /*
    console.log(`hay carecteres especiales: ${caracteresEspeciales.test(textoInicial.value)}`);
    console.log(`hay mayusculas: ${mayusculas.test(textoInicial.value)}`);
    console.log(`hay acentos: ${acentos.test(textoInicial.value)}`);
    */
    var trueFalse = false;
    trueFalse = caracteres(textoInicial.value);
    console.log(trueFalse);
    
    if(trueFalse){
        alert("Estas ingresando mayusculas o caracteres especiales");
        var trueFalse = "";
    }else{
        const botonEncriptar = encriptar(textoInicial.value);
        textoEncriptado.value = botonEncriptar;
        ampliarTextare();
        ocultar();
        var trueFalse = "";
    };
}

// Funcionalidad al boton desencriptar
function botonDesencriptar(){
    if(caracteresEspeciales.test(textoInicial.value)){
        alert("Estas ingresando caracteres especiales");
    }else if(mayusculas.test(textoInicial.value)){
        alert("Estas ingresando mayusculas")
    }else{
        const botonDesencriptar = desencriptar(textoInicial.value);
        textoEncriptado.value = botonDesencriptar;
        ampliarTextare();
        ocultar();
    };
    /*
    console.log(caracteresEspeciales.test(textoInicial.value));
    console.log(mayusculas.test(textoInicial.value));
    */
}

// Funcionalidad al boton copiar
function botonCopiar(){
    const botonCopiar = textoEncriptado.value;
    aparecer();
    textoInicial.value = botonCopiar; //para verlo en el inicio
}
const btnCopiar = document.querySelector(".ocultar_boton-copiar").onclick = async () => {
    try {
        await navigator.clipboard.writeText(textoEncriptado.value);
        botonCopiar();
    } catch (error) {
        console.log('error');
    }
} 
/*
function copiarTexto(){
    botonCopiarOculta.addEventListener("click", copiar = () => {
    var contenido = resultado.textContent;
    navigator.clipboard.writeText(contenido);
    console.log("copiado"); 
});
}
*/

// Para encriptar el texto
function encriptar(fraseInicial){
    for (let i = 0; i < matrizCondiciones.length; i++){
        if(fraseInicial.includes(matrizCondiciones[i][0])){
            fraseInicial = fraseInicial.replaceAll(
                matrizCondiciones[i][0], 
                matrizCondiciones[i][1])
        };
    }
    return fraseInicial;
}

// Para desencriptar el texto
function desencriptar(fraseEncriptada){
    for (let i = 0; i < matrizCondiciones2.length; i++){
        if(fraseEncriptada.includes(matrizCondiciones2[i][1])){
            fraseEncriptada = fraseEncriptada.replaceAll(
                matrizCondiciones2[i][1], 
                matrizCondiciones2[i][0])
        };
    }
    return fraseEncriptada;
}
