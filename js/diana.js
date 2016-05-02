var tablero, direccion;
var teclas =
{
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};
var fondo = {
    imagenURL: "imagenes/fondo.png",
    imagenOK: false
};
var mensaje = {
    mensajeURL: "imagenes/mensaje.png",
    mensajeOK: false
};
var diana = {
    frenteOK: false,
    atrasOK: false,
    derOK: false,
    izqOK: false,
    velocidad: 20,
    x: 0,
    y: 0
};
var liz = {
    imagenOK: false,
    x: 400,
    y: 200
};
function inicio()
{
    var canvas = document.getElementById("campo");
    tablero = canvas.getContext("2d");

    fondo.imagen = new Image();
    fondo.imagen.src = fondo.imagenURL;
    fondo.imagen.onload = confirmarFondo;

    mensaje.dialogo = new Image();
    mensaje.dialogo.src = mensaje.mensajeURL;
    mensaje.dialogo.onload = confirmarMensaje;

    diana.frente = new Image();
    diana.frente.src = "imagenes/diana-frente.png";
    diana.frente.onload = confirmarFrente;

    diana.atras = new Image();
    diana.atras.src = "imagenes/diana-atras.png";
    diana.atras.onload = confirmarAtras;

    diana.izq = new Image();
    diana.izq.src = "imagenes/diana-izq.png";
    diana.izq.onload = confirmarIzq;

    diana.der = new Image();
    diana.der.src = "imagenes/diana-der.png";
    diana.der.onload = confirmarDer;

    liz.imagen = new Image();
    liz.imagen.src = "imagenes/liz.png";
    liz.imagen.onload = confirmarLiz;

    document.addEventListener("keydown", teclado);

}
function teclado(evento)
{
    var codigo = evento.keyCode;
    if(codigo == teclas.UP)
    {
        diana.y -= diana.velocidad;
        if(diana.y <= 240 && diana.y >= 190 && diana.x <= 130 && diana.x >= -40 || diana.x >= 120 && diana.y <= 380 && diana.y >= 330 || diana.y <= 240 && diana.y >= -20 && diana.x >= 180 && diana.x <= 220 || diana.y <= -1)
        {
            diana.y += diana.velocidad;
        }       
    }
        if(codigo == teclas.DOWN)
    {
        diana.y += diana.velocidad;
        if(diana.y >= 160 && diana.y <= 240 && diana.x <= 130 && diana.x >= -40 ||diana.y >= 320 && diana.y <= 350 && diana.x >= 120 || diana.y >= 450)
        {
            diana.y -= diana.velocidad;
        }
    }
    if(codigo == teclas.LEFT)
    {
        diana.x -= diana.velocidad;
        if(diana.y >=160 && diana.y <= 240 && diana.x <= 130 || diana.y <= 240 && diana.y >= -40 && diana.x == 220 || diana.x <= -1)
        {
            diana.x += diana.velocidad;
        }
    }
    if(codigo == teclas.RIGHT)
    {
        diana.x += diana.velocidad;
        if(diana.x >= 180 && diana.x <= 230 && diana.y <= 240 && diana.y >= -40 || diana.x >= 120 && diana.y >= 310 && diana.y <= 390 || diana.x >= 470 && diana.y <= 380)
        {
            diana.x -= diana.velocidad;
        }
    }
    direccion = codigo;

    dibujar(codigo);
}
function confirmarFondo()
{
    fondo.imagenOK = true;
    dibujar();
}

function confirmarMensaje()
{
    mensaje.mensajeOK = true;
    dibujar();
}

function confirmarFrente()
{
    diana.frenteOK = true;
    dibujar();
}
function confirmarAtras()
{
    diana.atrasOK = true;
    dibujar();
}
function confirmarIzq()
{
    diana.izqOK = true;
    dibujar();
}
function confirmarDer()
{
    diana.derOK = true;
    dibujar();
}

function confirmarLiz()
{
    liz.imagenOK = true;
    dibujar();
}

function dibujar(direccion)
{
    if(fondo.imagenOK)
    {
        tablero.drawImage(fondo.imagen, 0, 0);    
    }

    var dianaOrientada = diana.frente;

    if(diana.frenteOK && diana.atrasOK && diana.derOK && diana.izqOK)
    {
        if(direccion == teclas.DOWN || direccion == undefined)
        {
            dianaOrientada = diana.frente;
        }
        else if(direccion == teclas.UP)
        {
            dianaOrientada = diana.atras;
        }
        else if(direccion == teclas.LEFT)
        {
            dianaOrientada = diana.izq;
        }
        else if(direccion == teclas.RIGHT)
        {
            dianaOrientada = diana.der;
        }
    tablero.drawImage(dianaOrientada, diana.x, diana.y);
    }
    
    if(liz.imagenOK)
    {
        tablero.drawImage(liz.imagen, liz.x, liz.y);
    }
    if(mensaje.mensajeOK)
    {
        if(diana.x >= 360 && diana.x <= 440 && diana.y >= 160 && diana.y <= 240)
        {
            tablero.drawImage(mensaje.dialogo, 400, 150);
        }
    }
}