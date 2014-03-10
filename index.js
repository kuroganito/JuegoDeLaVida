var tam = 50;
var mundo = new Array(tam);
var cambio = new Array(tam);
var canvas;
var ciclo;

function init(){
    for (var i = 0; i < tam; i++) {
        mundo[i] = new Array(tam);
        cambio[i]= new Array(tam);
    }
    for (var i = 0; i < tam; i++) {
        for (var j = 0; j < tam; j++) {
            mundo[i][j]=0;
        }
    } 
    document.getElementById("comenzar").addEventListener("click",start,false);
    document.getElementById("reiniciar").addEventListener("click",stop,false);
    canvas = document.getElementById("canvas").getContext('2d');
    document.getElementById("canvas").addEventListener("mousedown",puntosIniciales,false);
    dibuja();
}

function puntosIniciales(e){
     var xx = Math.round( (e.clientX-20)/10-.5 );
     var yy = Math.round((e.clientY-20)/10-.5);
 if(mundo[xx][yy] == 0 ) 
         mundo[xx][yy] = 1;
    else
        mundo[xx][yy] = 0;
    dibuja();
}

function stop(){
    for (var i = 0; i < tam; i++) {
        for (var j = 0; j < tam; j++) {
            mundo[i][j]=0;
        }
    } 
    dibuja();
    clearInterval(ciclo);
}

function start() { 
    ciclo = setInterval(function(){
        dibuja();
        vive();
    },500);
}

function dibuja(){
    canvas.fillStyle='#FFFFFF';
    canvas.fillRect(0,0,10*tam,10*tam);
    canvas.fillStyle='#000000';
    for (var i = 0; i < tam; i++) {
        for (var j = 0; j < tam; j++) {
            if(mundo[i][j]==1)
                canvas.fillRect(i*10,+j*10,10,10);
        }
    }
}

function vive(){
    for (var i = 0; i < tam; i++) {
        for (var j = 0; j < tam; j++) {
            cambio[i][j]=0;
        }
    } 
    var vecinos = 0;
    for (var i = 0; i < tam; i++) {
        for (var j = 0; j < tam; j++) {
            vecinos = 0;
            for (var a = -1; a <= 1; a++) {
                for (var b = -1; b <= 1; b++) {
                    xx=i+a; yy=j+b;      
                    if( (xx>=0 && xx < tam) && (yy>=0 && yy < tam) && (a!=0 || b!=0 ) ){
                        if(mundo[xx][yy]==1){
                            vecinos++;
                        }        
                    }
                }
            }
            cambio[i][j]=vecinos;
        }
    }
     for (var i = 0; i < tam; i++) {
        for (var j = 0; j < tam; j++) {
            if(cambio[i][j]>0){ 
                console.log("x: "+i+" y: "+j+" v: " +cambio[i][j]);
            }    
            if(mundo[i][j]==0){
                if(cambio[i][j]==3 ){
                    mundo[i][j]=1;
                }
            }else{
                if( !(cambio[i][j]==2 || cambio[i][j]==3 ) )
                    mundo[i][j]=0;
            }
        }
    }
}