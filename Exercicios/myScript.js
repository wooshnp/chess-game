
var game = new Chess();
var config = {
    draggable: true,
    onDragStart: onDragStart,
    onDrop: onDrop
}
var board = Chessboard('myBoard',config);
$(document).ready(function() {
    $("#btnExercicio").css("display","none");
    var rightMoviments = [];
    $("#exercicio").val(1);
    $(".chessImage").each(function(idx,el) {
        $("#" + this.id).css("opacity", "0.2");

        $("#" + this.id).click(function () {
            $("#sucessoAlerta").attr("hidden",true);
            $("#erroAlerta").attr("hidden",true);
            $("#" + this.id).css("opacity", "1");
            $("#selectedPiece").val(this.dataset.toggle);
            let peca = this.dataset.toggle;
            $("#selectedPiece").val(peca);
            setExercicio(peca,$("#exercicio").val());
        });



        $("#"+this.id).mouseover(function() {
            $("#" + this.id).css("opacity", "1");

        }).mouseout(function(){
            $(".chessImage").each(function(idx,el) {

                if (el.dataset.toggle != $("#selectedPiece").val()) {
                    $("#" + this.id).css("opacity", "0.2");
                }else{
                    $("#" + this.id).css("opacity", "1");

                }

            });

        });

    });

});



function onDragStart (source, piece, position, orientation) {
    if (game.game_over()) return false

    if (piece.search(/^b/) !== -1) return false
}


function onDrop (source, target) {
    let peca = $("#selectedPiece").val();
    let ex = $("#exercicio").val();
    let origin =    $("#source").val();
    let arrayPossibilidade = [];
    if(peca == "wP"){

        if(ex == 1){
            arrayPossibilidade = ["e4"];
            $("#jogada").val(0);
            $("#exercicio").val(1);
        }else if(ex == 2){
            arrayPossibilidade = ["c4"];
            $("#jogada").val(0);
            $("#exercicio").val(2);
        }else if(ex == 3){
            arrayPossibilidade = ["e4"];
            $("#jogada").val(0);
            $("#exercicio").val(3);
        }
    }else if(peca == "wN"){
        if(ex == 1){
            arrayPossibilidade = ["g8"];
            $("#jogada").val(0);
            $("#exercicio").val(1);

        }else if(ex == 2){
            arrayPossibilidade = ["e4"];
            $("#jogada").val(0);
            $("#exercicio").val(2);

        }else if(ex == 3){
            arrayPossibilidade = ["e4"];
            $("#jogada").val(0);
            $("#exercicio").val(3);
        }
    }else if(peca == "wB"){
        if(ex == 1){ /****************** estipular jogadas validas do bispo!******/
        arrayPossibilidade = ["h8"];
            $("#jogada").val(0);
            $("#exercicio").val(ex);

        }else if(ex == 2){
            arrayPossibilidade = ["g2"];
            $("#jogada").val(0);
            $("#exercicio").val(ex);

        }else if(ex == 3){
            arrayPossibilidade = ["g8"];
            $("#jogada").val(0);
            $("#exercicio").val(ex);

        }
    }else if(peca == "wR"){
        if(ex == 1){
            arrayPossibilidade = ["g8"];
            $("#jogada").val(0);
            $("#exercicio").val(ex);

        }else if(ex == 2){
            arrayPossibilidade = ["h7"];
            $("#jogada").val(0);
            $("#exercicio").val(ex);

        }else if(ex == 3){
            arrayPossibilidade = ["h8"];
            $("#jogada").val(0);
            $("#exercicio").val(ex);
        }
    }else if(peca == "wQ"){
        if(ex == 1){
            arrayPossibilidade = ["d8"];
            $("#jogada").val(0);
            $("#exercicio").val(ex);

        }else if(ex == 2){
            arrayPossibilidade = ["a8"];
            $("#jogada").val(0);
            $("#exercicio").val(ex);

        }else if(ex == 3){
            arrayPossibilidade = ["d4"];
            $("#jogada").val(0);
            $("#exercicio").val(ex);

        }else if(ex == 4){
            arrayPossibilidade = ["b7"];
            $("#jogada").val(0);
            $("#exercicio").val(ex);

        }
    }else if(peca == "wK"){
        if(ex == 1){
            arrayPossibilidade = ["a7"];
            $("#jogada").val(0);
            $("#exercicio").val(ex);

        }else if(ex == 2){
            arrayPossibilidade = ["g7"];
            $("#jogada").val(0);
            $("#exercicio").val(ex);

        }else if(ex == 3){
            arrayPossibilidade = ["h2"];
            $("#jogada").val(0);
            $("#exercicio").val(ex);

        }
    }
    let pos = parseInt($("#jogada").val() != null ? $("#jogada").val() : 0 );
    if(target != arrayPossibilidade[pos] ||  source != origin){
        if($("#sucessoAlerta").attr("hidden") == "hidden"){
            $('#erroAlerta').attr("hidden",false);
        }

        return 'snapback';
    }else{
        $('#erroAlerta').attr("hidden",true);

        $('#sucessoAlerta').attr("hidden",false);
        var move = game.move({
            from: source,
            to: target,
        });
        $("#btnExercicio").css("display","block");
    }


}

$("#btnExercicio").click(function () {
    let peca = $("#selectedPiece").val();
    $("#sucessoAlerta").attr("hidden",true);
    $('#erroAlerta').attr("hidden",true);

    let ex = parseInt($("#exercicio").val() != null ? $("#exercicio").val() : 1);
    ex += 1;
    if(peca == "wP" && ex == 4){
        $("#exercicio").val(0);
        $("#jogada").val(0);

        peca = "wN";
        ex = 1;
        $("#Cavalo").click();
        $("#Peao").css("opacity", "0.2");
    }else if(peca == "wN" && ex == 4){
        $("#exercicio").val(0);
        $("#jogada").val(0);

        peca = "wB";
        ex = 1;
        $("#Bispo").click();
        $("#Cavalo").css("opacity", "0.2");

    }else if(peca == "wB" && ex == 4){
        $("#exercicio").val(0);
        $("#jogada").val(0);
        peca = "wR";
        ex = 1;
        $("#Torre").click();
        $("#Bispo").css("opacity", "0.2");
    }else if(peca == "wR" && ex == 4){
        $("#exercicio").val(0);
        $("#jogada").val(0);
        peca = "wQ";
        ex = 1;
        $("#Rainha").click();
        $("#Torre").css("opacity", "0.2");

    }else if(peca == "wQ" && ex == 5){
        $("#exercicio").val(0);
        $("#jogada").val(0);
        peca = "wK";
        ex = 1;
        $("#Rei").click();
        $("#Rainha").css("opacity", "0.2");

    }else if(peca == "wK" && ex == 4){
        $("#exercicio").val(0);
        $("#jogada").val(0);

        $("#Rei").css("opacity", "0.2");

        $("#descricao").text("PARABENS! Conseguiste resolver todos os exercicios! :) ");

        $("#btnExercicio").css("display","none");
        return;
    }
    setExercicio(peca, ex);
});

function setExercicio(peca, ex) {

    if(peca == "wP"){
        if(ex == 1){
            board.clear();
            board.position({"e2": "wP"});
            $("#exercicio").val(1);
            $("#jogada").val(0);
            $("#descricao").text("O peão das Brancas pode andar uma ou duas casas na sua primeira jogada. Faz a jogada que coloca o peão no centro do tabuleiro.");
            $("#source").val("e2");
        }else if(ex == 2){
            board.clear();
            board.position({"c2": "wP", "e3":"wP"});
            $("#jogada").val(0);
            $("#exercicio").val(2);
            $("#descricao").text("As Brancas têm dois peões, mas apenas um dos peões pode andar duas casa na jogada seguinte - qual deles?");
            $("#source").val("c2");
        }else if(ex == 3){
            board.clear();
            board.position({"a2": "wP", "e3": "wP", "d5": "bR", "f5": "bR"});
            $("#jogada").val(0);
            $("#exercicio").val(3);
            $("#descricao").text("As Brancas têm dois peões, mas apenas um é uma boa jogada - Qual deles?");
            $("#source").val("e3");
        }

    }else  if(peca == "wN"){
        if(ex == 1){
            board.clear();
            board.position({"h6": "wN"});
            $("#exercicio").val(1);
            $("#jogada").val(0);
            $("#descricao").text("Move o cavalo para estar no topo do tabuleiro em apenas 1 jogada!");
            $("#source").val("h6");
        }else if(ex == 2){
            board.clear();
            board.position({"b3" : "wR", "c4" : "wB" , "f3" : "wK", "d2" : "wN"});
            $("#exercicio").val(2);
            $("#jogada").val(0);
            $("#descricao").text("Faz a única jogada com o cavalo em frente que leva o cavalo para o centro.");
            $("#source").val("d2");
        }else if(ex == 3){
            board.clear();
            board.position({"c5" : "bQ", "d6" : "bR" , "f6" : "bR", "f2" : "wN", "g5": "bK"});
            $("#exercicio").val(3);
            $("#jogada").val(0);
            $("#descricao").text("Faz o única jogada com o cavalo de forma a atingir todas as peças do tabuleiro!");
            $("#source").val("f2");
        }
    }else if(peca == "wB"){
        if(ex == 1){
            board.clear();
            board.position({"a1": "wB"});
            $("#exercicio").val(1);
            $("#jogada").val(0);
            $("#descricao").text("O Bispo quer chegar ao outro lado do tabuleiro! Consegues la chegar em apenas uma jogada?");
            $("#source").val("a1");
        }else if(ex == 2){
            board.clear();
            board.position({"f1": "wB"});
            $("#exercicio").val(2);
            $("#jogada").val(0);
            $("#descricao").text("O Bispo sonha em visitar o canto superior esquerdo do tabuleiro. Consegues achar o trajeto para o levar lá em apenas 2 jogadas?");
            $("#source").val("f1");
        }else if(ex == 3){
            board.clear();
            board.position({"c4": "wB", "g1": "wK", "g8" : "bQ" , "b7" :"bK", "h6" : "wP"});
            $("#exercicio").val(3);
            $("#jogada").val(0);
            $("#source").val("c4");
            $("#descricao").text("O Rei está em cheque! Consegues defendê-lo com o bispo? Encontra a melhor jogada!");

        }
    }else if(peca == "wR"){
        if(ex == 1){
            board.clear();
            board.position({"g1": "wR"});
            $("#exercicio").val(1);
            $("#jogada").val(0);
            $("#source").val("g1");
            $("#descricao").text("A Torre quer viajar de um lado do tabuleiro até ao outro lado! Como pode fazer isso em apenas uma jogada?");
        }else if(ex == 2){
            board.clear();
            board.position({"a7": "wR", "b3": "wK", "h7" : "bQ" , "h4" : "bK" , "h1" : "bR", "b4" : "wP"});
            $("#exercicio").val(2);
            $("#jogada").val(0);
            $("#source").val("a7");
            $("#descricao").text("É a vez das brancas! Qual é a melhor jogada?");

        }else if(ex == 3){
            board.clear();
            board.position({"h2" : "wR" , "b6" : "wK" , "b8" : "bK"});
            $("#exercicio").val(3);
            $("#jogada").val(0);
            $("#source").val("h2");
            $("#descricao").text("É a vez das brancas! Uma jogada para Xeque-mate! Consegues resolver?");

        }
    }else if(peca == "wQ"){
        if(ex == 1){
            board.clear();
            board.position({ "d1" : "wQ"});
            $("#exercicio").val(1);
            $("#jogada").val(0);
            $("#source").val("d1");
            $("#descricao").text("É a vez das brancas! A rainha é uma peça muito poderosa! Consegues chegar ao topo do tabuleiro em 1 jogada?");

        }else if(ex == 2){
            board.clear();
            board.position({"h1" : "wQ"});
            $("#exercicio").val(2);
            $("#jogada").val(0);
            $("#source").val("h1");
            $("#descricao").text("É a vez das brancas! Consegues chegar ao canto esquerdo do tabuleiro?");

        }else if(ex == 3){
            board.clear();
            board.position({"d1" : "wQ" , "h8" : "bK" , "a7" : "bR" , "f2" : "wK"});
            $("#exercicio").val(3);
            $("#jogada").val(0);
            $("#source").val("d1");
            $("#descricao").text("É a vez das brancas! Mostra o poder de ataque da rainha. Consegures fazer uma jogada para capturar a Torre? Captura a torre em 2 jogadas! Lembra-te do poder de alcance da Rainha.... Boa sorte.");

        }else if(ex == 4){
            board.clear();
            board.position({"g7" : "wQ" , "c6" : "wK" , "a8" : "bK"});
            $("#exercicio").val(4);
            $("#jogada").val(0);
            $("#source").val("g7");
            $("#descricao").text("É a vez das brancas! Uma jogada para Xeque-mate! Consegues resolver?");

        }
    }else if(peca == "wK"){
        if(ex == 1){
            board.clear();
            board.position({"a6" : "wK"});
            $("#exercicio").val(1);
            $("#jogada").val(0);
            $("#source").val("a6");
            $("#descricao").text("É a vez das brancas! O Rei quer ir para o canto superior esquerdo, consegues fazer a jogada que faz com que ele fique mais perto?");

        }else if(ex == 2){
            board.clear();
            board.position({"f6" : "wK"});
            $("#exercicio").val(2);
            $("#jogada").val(0);
            $("#source").val("f6");
            $("#descricao").text("É a vez das brancas! O Rei quer ir para o canto superior direito, consegues fazer a jogada que faz com que ele fique mais perto?");

        }else if(ex == 3){

            board.clear();
            board.position({"g2" : "wK" , "b2" : "wR" , "g8" : "bK" , "h2" : "bQ"});
            $("#exercicio").val(3);
            $("#jogada").val(0);
            $("#source").val("g2");
            $("#descricao").text("É a vez das brancas! O Rei está em Xeque! Consegues resolver o problema? ");

        }
    }
    $("#btnExercicio").css("display","none");
}
