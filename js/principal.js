//Cuando se ha cargado el DOM
(function(){
    if(document.addEventListener){
        document.addEventListener("DOMContentLoaded", function(e){
            console.log("El DOM está listo!");
            //Mostrar mensaje de bienvenida si el usuario ya se registro
            if(localStorage.getItem("datos_login")){
                document.querySelector(".article-form-login").style.display="none";
                document.querySelector(".bienvenida").style.display = "flex";
                console.log(localStorage.getItem("datos_login"));
            }else{
                myFunction.constructor();
            }
        },false);
    }
}());

const myFunction ={
    constructor: function(){
        this.openOptions();
        this.openForm();
        this.cancelarForm();
    },
    openOptions: function(){
        let btn = document.querySelector(".OptionForm");//Boton para desplegar el form
        let contandor = 0;
        btn.addEventListener("click", function(e){
            if(contandor===0){
                //Mostrar el form
                document.querySelector(".OptionForm:hover > ul").style.display = "block";
                contandor = 1;
            }
            else{
                //Ocultar el form
                document.querySelector(".OptionForm:hover > ul").style.display = "none";
                contandor = 0;
            }
        });
    },
    openForm: function(){
        let openF = document.getElementById("abrir");
        openF.addEventListener("click", function(e){
          document.querySelector(".article-form-login").style.display="block";
          operacionesForm.iniciar();//Inicializar el objeto operaciones Form
        })
    },
    cancelarForm: function(){
        //Cerrar el formulario y limpiar los txts
        let btnCancelar = document.getElementById("btnCancelar");
        btnCancelar.addEventListener("click",  function(e){
            if(confirm("¿Estas seguro?")){
                document.getElementById("txtUser").value = "";
                document.getElementById("txtemail").value = "";
                document.getElementById("txtpassword").value = "";
                document.querySelector(".primerSpan").style.display = "none";
                document.querySelector(".segundoSpan").style.display = "none";
                document.querySelector(".tercerSpan").style.display = "none";
                document.querySelector(".article-form-login").style.display="none";
                console.log("Limpiar cajas de texto y cerrar form");
            }
        });
    }
};

const operacionesForm = {
    iniciar: function(){
        //Mis variables
        var username = document.getElementById("txtUser");
        var email = document.getElementById("txtemail");
        var password = document.getElementById("txtpassword");
        var mensajeUsuario = document.getElementById("imgUsername");
        var mensajeCorreo = document.getElementById("imgEmail");
        var mensajePassword = document.getElementById("imgPassword");
        var rutaImg = "./media/";
        var boton = document.getElementById("btnAcceder");
        //Desabilitar el boton 
        boton.disabled = true;
        boton.style = "background:rgba(128, 125, 124, 0.7);";

        //Llamar a las funciones de validación
        operacionesForm.lister.escucharUserName(username,mensajeUsuario,rutaImg);
        operacionesForm.lister.escucharEmail(email,mensajeCorreo,rutaImg);
        operacionesForm.lister.escucharPassword(password,mensajePassword,rutaImg);
    },
    validar: {
        validarUserName: function(txtusuario,mensajeUsuario, rutaImg){
            let valor = txtusuario.value;
            let regEx = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

            if(valor.search(regEx) == 0 )
            {
                mensajeUsuario.style.display = "block";
                mensajeUsuario.src = rutaImg + "checked.png";
                return true;
            }
            else
            {
                mensajeUsuario.style.display = "block";
                mensajeUsuario.src = rutaImg + "error.png";
                txtusuario.placeholder = "Username muy incorrecto";
                return false;
            }
        },
        validarEmail: function(txtEmail, mensajeCorreo, rutaImg){
            let valor = txtemail.value;
            let regEx = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
            if(valor.search(regEx)==0)
            {
                mensajeCorreo.style.display = "block";
                mensajeCorreo.src = rutaImg + "checked.png";
                return true;
            }
            else
            {
                mensajeCorreo.style.display = "block";
                mensajeCorreo.src = rutaImg + "error.png";
                txtemail.placeholder = "Email incorrecto";
                return false;
            }
        },
        validarPassword: function(txtpassword, mensajePassword, rutaImg){
            var valor = txtpassword.value;
            var regEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;
            if(valor.search(regEx)==0)
            {
                mensajePassword.style.display = "block";
                mensajePassword.src = rutaImg + "checked.png";
                return true;
            }
            else
            {
                mensajePassword.style.display = "block";
                mensajePassword.src = rutaImg + "error.png";
                txtpassword.placeholder = "Password invalida";
                return false;
            }
        }
    },
    lister: {
        escucharUserName: function(txtUsuario, mensajeUsuario,rutaImg){
            txtUsuario.addEventListener(
                "keypress", function(e){
                    document.querySelector(".primerSpan").style.display = "block";
                    if(txtUsuario.value!==""){
                        let resultado =  operacionesForm.validar.validarUserName(txtUsuario,mensajeUsuario, rutaImg);
                            //operacionesForm.validar.validarEmail();
                        //  operacionesForm.validar.validarPassword();
                        console.log(resultado);
                        if(resultado){
                            console.log("S|ngular: usuario valido!");
                            mensajeUsuario.src = rutaImg + "checked.png";
                            operacionesForm.arrelgo.push(resultado);
                        }                        
                    }else{
                        mensajeUsuario.src = rutaImg + "error.png";
                    }
                }
            );
        },
        escucharEmail: function(txtEmail, mensajeCorreo,rutaImg){
            txtEmail.addEventListener(
                "keypress", function(e){
                   document.querySelector(".segundoSpan").style.display = "block";
                   if(txtEmail.value!==""){
                        let resultado = operacionesForm.validar.validarEmail(txtemail,mensajeCorreo,rutaImg);
                        // operacionesForm.validar.validarEmail();
                        // operacionesForm.validar.validarPassword();
                        console.log(resultado);
                        if(resultado){
                            mensajeCorreo.src = rutaImg + "checked.png";
                            console.log("S|ngular: email valido!");
                            operacionesForm.arrelgo.push(resultado);
                        }
                   }else{
                       mensajeCorreo.src = rutaImg + "error.png";
                   }
                }
            );
        },
        escucharPassword: function(txtpassword, mensajePasswordm, rutaImg){
            txtpassword.addEventListener(
                    "keypress", function(e){
                        document.querySelector(".tercerSpan").style.display = "block";
                        if(txtpassword.value!==""){
                            let resultado = operacionesForm.validar.validarPassword(txtpassword,mensajePasswordm,rutaImg);
                            console.log(resultado);
                            if(resultado){
                                mensajePasswordm.src = rutaImg + "checked.png";
                                console.log("S|ngular: password valida!");
                                operacionesForm.arrelgo.push(resultado);
                            }
                        }else{
                            mensajePasswordm.src = rutaImg + "error.png";
                        }
                        operacionesForm.acceder();
                    }
            );
        }
    },
    arrelgo: [],
    acceder: function(){
            let arr = operacionesForm.arrelgo;
            let contantador = 0;
            for(let i=0; i < arr.length;i++){
                if(arr[i]===true)
                    contantador++;                
            }
            if(contantador===3){
               //Acceder al boton
               let boton = document.querySelector("#btnAcceder");
               boton.style = "background:rgba(14, 209, 14, 0.7);"
               boton.disabled = false;
               boton.addEventListener("click", function(e){
                   if(document.querySelector("#recordarDatos").checked && typeof(Storage) !== "undefined"){
                        let datos_login = JSON.stringify({
                                usuario: document.getElementById("txtUser").value,
                                email: document.getElementById("txtemail").value,
                                password: document.getElementById("txtpassword").value
                        });
                        localStorage.setItem("datos_login",datos_login);
                    }
                    content_bienvenida.show();
               });
            }
            
    }
};

const content_bienvenida = {
    show: function(){
        let bienvenido = document.querySelector(".bienvenida");
            document.querySelector(".article-form-login").style.display="none";
            bienvenido.style.display = "flex";
    }
};