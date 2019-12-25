var positions = {};

$(document).ready(function(){
    var game = new Chess();
    var board = Chessboard('myBoard');
    var isGame = false;
    $(".chessImage").each(function(idx,el){
        $("#"+this.id).css("opacity","0.2");

        $("#"+this.id).click(function(){

            $("#" + this.id).css("opacity", "1");
            let peca = this.dataset.toggle;
            let array = getArrayPelaPeca(peca);
            if(!isGame){
                for(let i =0; i<array.length; i++){
                    positions[array[i]] = peca;
                }
                board.clear();
                board.position(positions,true);
                $("#"+this.id).css("background","green");
                let contador =0;
                $(".chessImage").each(function(idx,el){

                    if(this.style.background =="green"){
                        contador ++;
                    }
                });

                if(contador == 12){
                    alert("Parabéns! Ja viste como se monta o teu primeiro tabuleiro! Exprimenta agora tu!");
                    $("#introText").text(" Clica na peça e indica onde se coloca! Faz isso até teres o tabuleiro montado!");
                    removeGreySquares();
                    board.clear();
                    isGame = true;
                }
            }else{
                $("#" + this.id).css("opacity", "1");
                $("#selectedPiece").val(peca);
                positions = {};
            }
        });
        $("#"+this.id).mouseover(function(){
            $("#" + this.id).css("opacity", "1");
            if(!isGame) {
                let peca = this.dataset.toggle;
                let array = getArrayPelaPeca(peca);

                for (let i = 0; i < array.length; i++) {
                    greySquare(array[i]);
                }
            }else{

            }
        }).mouseout(function(){
            if(!isGame){
                removeGreySquares();
            }

            $(".chessImage").each(function(idx,el) {

                if (el.dataset.toggle != $("#selectedPiece").val()) {
                    $("#" + this.id).css("opacity", "0.2");
                }else{
                    $("#" + this.id).css("opacity", "1");

                }

            });
        });

    });
    var arrayGuardarPosicao = [];
    var arrayGuardarPeca = [];
    $(".square-55d63").click(function(){

        if($("#selectedPiece").val() != ""){
            let quadrado = this.dataset.square;
            let arrayPossibilidades = getArrayPelaPeca($("#selectedPiece").val());
            let isCerto = false;

            for(let j=0; j<arrayGuardarPosicao.length; j++){
                if(arrayGuardarPosicao[j] == quadrado){
                    alert("Ups! Parace que ja introduzis-te nesse quadrado uma peça!");
                    return;
                }
            }
            for(let i=0; i < arrayPossibilidades.length; i++){
                if(arrayPossibilidades[i] == quadrado){
                    isCerto = true;
                    positions += mouseOnClickSquare(board, quadrado, $("#selectedPiece").val(), positions , arrayGuardarPosicao, arrayGuardarPeca);
                    arrayGuardarPosicao[arrayGuardarPosicao.length] = quadrado;
                    arrayGuardarPeca[arrayGuardarPeca.length] = $("#selectedPiece").val();
                    //$("#selectedPiece").val("");
                }
            }

            if(!isCerto){
                alert("Ups, tenta novamente!");
                return;
            }

            verificaWin(arrayGuardarPosicao);
        }else{
            alert("Por favor, clica primeiro numa peça!");
        }
        //mouseOnClickSquare(board, , selectedPiece, )
    });
});

function mouseOnClickSquare (board, square, peca, positions, historicoPosicoes, historicoPecas) {
    positions = {};
    positions[square] = peca;
    for(let i =0; i<historicoPosicoes.length; i++){
        positions[historicoPosicoes[i]] = historicoPecas[i];
    }
    board.position(positions,true);
    return positions;
}


function getArrayPelaPeca(peca){
    let array =[];
    let row = 0;
    if(peca == "wN"  || peca == "bN"){
        row = 1;
        if(peca == "bN"){
            row = 8;
        }else{
            row = 1;
        }
        array = ["b"+row,"g"+row];



    }else if(peca == "bP"  || peca == "wP"){
        row = 1;
        if(peca =="bP"){
            row = 7;
        }else{
            row = 2;
        }
        array = ["a"+row,"b"+row,"c"+row,"d"+row,"e"+row,"f"+row,"g"+row,"h"+row];
    }else if(peca == "wR" || peca == "bR"){
        if(peca =="wR"){
            row = 1;
        }else{
            row = 8;
        }
        array = ["a"+row, "h"+row];
    }else if(peca == "wB" || peca == "bB"){
        if(peca == "wB"){
            row = 1;
        }else{
            row = 8;
        }
        array=["c"+row, "f"+row];
    }else if(peca == "wQ" || peca =="bQ"){
        if(peca == "wQ"){
            row=1;
        }else{
            row = 8;
        }
        array = ["d"+row];
    }else if(peca == "wK" || peca == "bK"){
        if(peca == "wK"){
            row = 1;
        }else{
            row = 8;
        }
        array = ["e"+row];
    }

    return array;
}

function  verificaWin(arrayGuardadas) {
    if(arrayGuardadas.length == 32){
        alert("Parabens! Montas-te o teu primeiro tabuleiro!!!!");
        return;
    }


}


