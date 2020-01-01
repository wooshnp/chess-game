
var game = new Chess();
var config = {
    draggable: true,
    onDragStart: onDragStart,
    onDrop: onDrop
}
var board = Chessboard('myBoard',config);

$(document).ready(function () {
    $("#exercicio").val(1);
    $("#descricao").text("Olá "
        //+ doGetValue("cmi.learner_name")
        + ". Bem vindo à secção de Montar o tabuleiro! Como ja viste os movimentos das peças, agora vais poder montar o tabuleiro. Tens de arrastar as peças para o local correcto. Clica no botão para começar.");
    $("#btnStart").fadeIn("slow");
});

$("#btnStart").click(function () {
    // $("#btnStart").css("display","none");
    $("#btnStart").fadeOut();

    $("#descricao").text("Começa pela torre! Lembra-te que ela pode andar quantas casas quiser. Onde será que é a posição original dela?");

    let exe = $("#exercicio").val();
    montarTabuleiro(exe);

});

function onDragStart (source, piece, position, orientation) {
    if (game.game_over()) return false

    if (piece.search(/^b/) !== -1) return false
}


function onDrop (source, target) {
    let ex = $("#exercicio").val();
    var arrayPossibilidade = [];
    if (ex == 1) {

        arrayPossibilidade = ["a1"];

    } else if (ex == 2) {

        arrayPossibilidade = ["h1"];
    } else if (ex == 3) {

        arrayPossibilidade = ["b1"];
    } else if (ex == 4) {
        arrayPossibilidade = ["g1"];
    } else if (ex == 5) {
        arrayPossibilidade = ["c1"];
    }else if(ex == 6){
        arrayPossibilidade = ["f1"];
    }else if(ex == 7){
        arrayPossibilidade = ["d1"];
    }else if(ex == 8){
        arrayPossibilidade = ["e1"];
    }
    if (target != arrayPossibilidade[0]) {
        $('#erroAlerta').fadeIn("slow");
        return 'snapback';
    } else {
        $('#erroAlerta').fadeOut();

        let now = parseInt($("#exercicio").val());
        now += 1;
        $("#exercicio").val(now);
        var move = game.move({
            from: source,
            to: target,
        });
        montarTabuleiro(now);
    }
}
function montarTabuleiro(ex) {
    board.clear();
    if(ex == 1){
        board.position({"a3": "wR"});
    }else if(ex == 2){
        board.position({"a1": "wR", "h3": "wR"});
        $("#descricao").text("Boa! isso mesmo! Consegues fazer o mesmo para esta?");

        $("#descPercentagem").text("12.5%");
        $("#progress-bar").css("width", "12.5%");
    }else if(ex == 3){
        board.position({"a1": "wR", "h1": "wR", "a3": "wN"});
        $("#descricao").text("Agora é a vez dos cavalos! Lembra-te que andam de uma forma especial... em 'L'.");

        $("#descPercentagem").text("25%");

        $("#progress-bar").css("width", "25%");
    }else if(ex == 4){
        board.position({"a1": "wR", "h1": "wR", "b1": "wN", "h3": "wN"});
        $("#descricao").text("Correcto! Agora a mesma coisa deste lado.");

        $("#descPercentagem").text("37.5%");
        $("#progress-bar").css("width", "37.5%");
    }else if(ex == 5){
        board.position({"a1": "wR", "h1": "wR", "b1": "wN", "g1": "wN", "f4" :"wB"});
        $("#descricao").text("Agora é a vez dos bispos. Encontra a casa original deles.");

        $("#descPercentagem").text("50%");

        $("#progress-bar").css("width", "50%");
    }else if(ex == 6){
        $("#descricao").text("Boa! isso mesmo! Consegues fazer o mesmo para esta?");

        board.position({"a1": "wR", "h1": "wR", "b1": "wN", "g1": "wN", "c4": "wB"});

        $("#descPercentagem").text("62.5%");

        $("#progress-bar").css("width", "62.5%");
    }else if(ex == 7){
        board.position({"a1": "wR", "h1": "wR", "b1": "wN", "g1": "wN", "c1" :"wB", "f1": "wB", "d3" : "wQ"});
        $("#descricao").text("Chegou a vez da Rainha. Consegues encontrar a casa original?");

        $("#descPercentagem").text("75%");

        $("#progress-bar").css("width", "75%");
    }else if(ex == 8){
        board.position({"a1": "wR", "h1": "wR", "b1": "wN", "g1": "wN", "c1" :"wB", "f1": "wB", "d1" : "wQ", "e2" : "wK"});

        $("#descPercentagem").text("87.5%");
        $("#descricao").text("Por fim o Rei. Encontra a casa original do rei.");

        $("#progress-bar").css("width", "87.5%");
    }else{
        $("#descricao").text("Agora so faltavam os peões que ficam na primeira fila.");
        config = {
            position: "start",
            draggable: false
        };
        Chessboard('myBoard',config);

        // $('#sucessoAlerta').attr("hidden", false);
        $('#sucessoAlerta').fadeIn("slow");

        $("#descPercentagem").text("100%");

        $("#progress-bar").css("width", "100%");
        return;
    }
}