
var config = {
    position: 'start'
};
var game = new Chess();
var board = Chessboard('myBoard');
var whiteSquareGrey = '#a9a9a9';
var blackSquareGrey = '#696969';


$(document).ready(function(){
    var int1, int2, int3 =0;
    var positions = {};
    $(".chessImage").each(function(idx,el){
        $("#"+this.id).css("opacity","0.2");

        $("#"+this.id).click(function(){
            removeGreySquares();
            $("#" + this.id).css("opacity", "1");
            $("#" + this.id).css("border-color", "GreenYellow");

            $("#selectedPiece").val(this.dataset.toggle);
            let peca = "w"+this.dataset.toggle;
            let array = getArrayPelaPeca(peca);
            positions = {};
            for(let i=0; i<array.length; i++){
                let lPeca = "w"+this.dataset.toggle;
                positions[array[i]] = lPeca;
                validaMovimentos(array[i], lPeca);

            }
            peca = "b" + this.dataset.toggle;
            let arrayBlack = getArrayPelaPeca(peca);

            for(let i=0; i<arrayBlack.length; i++){
                let lPeca = "b"+this.dataset.toggle;
                positions[arrayBlack[i]] = lPeca;


            }
            clearInterval(int1);
            clearInterval(int2);
            clearInterval(int3);
            board.clear();
            board.position(positions,true);
            if("w"+this.dataset.toggle == "wP"){
                $("#tituloPeca").text("Este é o Peão");
                $("#descPeca").text(" O Peão é uma peça de menor valor (1 - 10) no entanto muito importante no jogo de xadrez. O Peão move-se verticalmente, podendo avançar 1 ou duas casas na casa de partida, e apenas 1 casa depois do primeiro movimento. Para além disso, o peão captura outras peças na diagonal. Se conseguires chegar ao outro lado do tabuleiro, podes trocar esse peão por outra peça qualquer (Excepto o rei)");
                $("#video").attr("hidden",false);
                $("#modalVideo")[0].src="Video/Pawn.mp4";
                document.getElementById("videoDiv").load();
                int1= setInterval(function () {
                    board.move("e2-e4");

                    removeGreySquares();
                },2000);

                int2 = setInterval(function () {
                    board.move("f7-f5");
                    board.move("f2-f3");
                    removeGreySquares();
                },5000);

                int3 = setInterval(function () {
                    board.move("e4-f5");
                    removeGreySquares();
                },7000);

            }else if(this.dataset.toggle == "N"){
                $("#tituloPeca").text("Este é o Cavalo");
                $("#descPeca").text("Este é o Cavalo. É a unica peça do tabuleiro que pode saltar por cima das outras. Esta peça tem um valor de 3 pontos (3 em 10) e tem um tipo de movimento especial. O movimento desta peça é em 'L' como podes ver no exemplo. Para capturar, basta movimentar o cavalo para o destino onde existe a peça (dentro dos movimentos possiveis) e retirar a peça adversária do lugar e substituindo assim pelo cavalo.");
                $("#video").attr("hidden",false);
                $("#modalVideo")[0].src="Video/Knight.mp4";
                document.getElementById("videoDiv").load();
                int1 = setInterval(function () {
                    removeGreySquares();
                    board.move("g1-f3");
                    var arrayM = ["e5","g5", "h4", "h2", "g1", "e1", "d2", "d4"];
                    arrayGrey(arrayM);

                },5000);



            }else if(this.dataset.toggle == "B") {
                $("#tituloPeca").text("Este é o Bispo");
                $("#descPeca").text("Este é o Bispo. Esta peça tem um valor de 3 pontos (3 em 10). Esta peça move-se nas diagonais e para capturar, basta ocupar a casa onde a peça adversária está. Pode-se mover para trás e para a frente. Para perceber melhor, vê o video.");
                $("#video").attr("hidden", false);
                $("#modalVideo")[0].src="Video/Bishop.mp4";
                document.getElementById("videoDiv").load();


                int1 = setInterval(function () {
                    board.move("f1-c4");
                    let arrayB = ["a2", "b3", "d5", "e6", "f7", "g8", "a6", "b5", "d3", "e2", "f1"];
                    arrayGrey(arrayB);
                },5000);
            }else if(this.dataset.toggle == "R"){
                $("#tituloPeca").text("Esta é a Torre");
                $("#descPeca").text("A Torre tem um valor de 5 pontos (em 10) e pode-se movimentar por colunas como podemos ver no exemplo. Para saberes mais sobre a torre, vê o video sobre ela.");
                $("#video").attr("hidden", false);
                $("#modalVideo")[0].src="Video/Rook.mp4";
                document.getElementById("videoDiv").load();


                int1 = setInterval(function () {
                    board.move("h1-e1");

                },5000);

                int2 = setInterval(function () {
                    board.move("e1-e4");
                    board.move("a1-a8");

                    let arrayB = ["e1", "e2", "e3", "e5", "e6", "e7", "e8", "a4", "b4", "c4", "d4","f4", "g4", "h4"];
                    arrayGrey(arrayB);

                },6000);
            }else if(this.dataset.toggle == "Q"){
                $("#tituloPeca").text("Esta é a Rainha");
                $("#descPeca").text("A rainha é a peça mais valiosa (depois do rei) com um valor de 10 pontos (10 em 10). A Rainha pode-se movimentar para todos os lados (diagonais e Laterais). A sua moviemntação torna esta peça muito forte pois pode atacar varias peças ao mesmo tempo. Para perceberes melhor sobre a rainha, vê o video sobre ela. ");
                $("#video").attr("hidden", false);
                $("#modalVideo")[0].src="Video/Queen.mp4";
                document.getElementById("videoDiv").load();



                int1 = setInterval(function () {
                    board.move("d1-d8");
                },5000);

                int2 = setInterval(function () {

                    board.move("d8-d4");

                    let arrayQ = ["d1", "d2", "d3", "d5", "d6", "d7", "d8", "a4", "b4", "c5", "c4", "e4","f4", "g4", "h4", "a7", "b6", "d5", "e3","f2","g1" , "a1", "b2", "c3","e5","f6","g7","h8"];
                    arrayGrey(arrayQ);

                },6000);

            }else if(this.dataset.toggle == "K"){
                $("#tituloPeca").text("Este é o Rei");
                $("#descPeca").text(" Esta é a peça mais importante do jogo. Todo o jogo gira a volta do rei, pois o objetivo e capturar o rei adversário.  Durante o jogo o rei nao pode estar sob o ataque de outras peças e apenas pode movimentar-se 1 casa para todos os lados. Quando o rei esta a ser atacado por uma peça inimiga encontra-se em 'XEQUE'. Quando o rei está em cheque e não pode movimentar-se para casas em que nao estejam a ser atacadas, é declarado o XEQUE-MATE." );
                $("#video").attr("hidden", false);
                $("#modalVideo")[0].src="Video/King.mp4";
                document.getElementById("videoDiv").load();
                int2 = setInterval(function () {
                    board.move("e1-d2");
                    let arrayK = ["c1","d1","e1", "e2","e3", "d3","c3","c2"];
                    arrayGrey(arrayK);
                },2000);
            }
        });
        $("#"+this.id).mouseover(function(){
            $("#" + this.id).css("opacity", "1");
        }).mouseout(function(){
            $(".chessImage").each(function(idx,el) {
                if (el.dataset.toggle != $("#selectedPiece").val()) {
                    $("#" + this.id).css("opacity", "0.2");
                    $("#" + this.id).css("border-color", "white");
                }else{
                    $("#" + this.id).css("opacity", "1");
                    $("#" + this.id).css("border-color", "GreenYellow");
                }

            });
        });

    });

    $("#btn_verVideo").click(function () {
        $("#myVideo").modal('toggle');
    });

    $("#btn_closeModal").click(function () {
        $("#modalVideo")[0].parentNode.pause()
        $("#myVideo").find(".close").click()
    });
});


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


function removeGreySquares () {
    $('#myBoard .square-55d63').css('background', '')
}

function greySquare (square) {
    var $square = $('#myBoard .square-' + square)

    var background = whiteSquareGrey
    if ($square.hasClass('black-3c85d')) {
        background = blackSquareGrey
    }

    $square.css('background', background)
}

function validaMovimentos(square, piece){
    var moves = game.moves({
        square: square
    });

    for (var i = 0; i < moves.length; i++) {
        greySquare(moves[i].to)
    }
}

function arrayGrey(array){
    for(let i=0; i<array.length; i++){
        greySquare(array[i]);
    }
}