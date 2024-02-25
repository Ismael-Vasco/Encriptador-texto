//Inicialización de variables
const textoInicial = document.querySelector(".texto");
const textoEncriptado = document.querySelector(".resultado_texto");
var munieco = document.querySelector(".toy");
var contenedor = document.querySelector(".resultado_informativo");
var resultado = document.querySelector(".resultado_texto");
var botonCopiarOculta = document.querySelector(".boton_copiar");


// Expresiones regulares
const caracteresEspeciales= /[^ A-Za-z0-9_]/; // Todo lo que no sea alfanumerico
const mayusculas= /[A-Zá-ź]/g; // Letras minusculas.
const acentos = /[á-ź]/g; // acentos
const espacios =/\s/g; // espacios en blanco



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
    var valor = "";
    if (caracteresEspeciales.test(texto)){
        valor=true;
        console.log(`hay carecteres especiales: ${valor}`);
        
    }else if(mayusculas.test(texto)){
        valor=true;
        console.log(`hay mayusculas: ${valor}`);

    }else if(acentos.test(texto)){
        valor=true;
        console.log(`hay acentos: ${valor}`);

    }else if(espacios.test(texto)){
        valor=false;
        console.log(`hay espacios en blanco: ${valor}`);

    }
    
    return valor;
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
    //document.querySelector(".texto").value="";
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
    console.log(caracteres(textoInicial.value));
    
    if (caracteres(textoInicial.value)==true){
        Swal.fire({
          title: "Corrige!",
          text: "Puede haber acentos, mayusculas o caracteres especiales en el texto que ingresaste!",
          icon: "error"
        });
        
        //alert("hay acentos, matusculas o caract especial");
    }
    else if (caracteres(textoInicial.value)==false){
        //console.log("dentro del segundo if de bton encriptar");
        const botonEncriptar = encriptar(textoInicial.value);
        textoEncriptado.value = botonEncriptar;
        ampliarTextare();
        ocultar();
    }
    

 
}

// Funcionalidad al boton desencriptar
function botonDesencriptar(){
    console.log(caracteres(textoInicial.value));
    if(caracteres(textoInicial.value)==true){
        Swal.fire({
          title: "Corrige!",
          text: "Puede haber acentos, mayusculas o caracteres especiales en el texto que ingresaste!",
          icon: "error"
        });
        //alert("hay acentos, matusculas o caract especial");
    }
    else if(caracteres(textoInicial.value)==false){
        const botonDesencriptar = desencriptar(textoInicial.value);
        textoEncriptado.value = botonDesencriptar;
        ampliarTextare();
        ocultar();
    }
        
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
