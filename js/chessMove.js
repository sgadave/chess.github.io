

//Ids for chess pieces of both black and white side
let whiteChessPiecesId = ["whtrookl", "whtknightl", "whtbishopl", "whtqueen", "whtking", "whtbishopr", "whtknightr", "whtrookr", "whtpwan1", "whtpwan2", "whtpwan3", "whtpwan4", "whtpwan5", "whtpwan6", "whtpwan7", "whtpwan8"]//
let blackChessPiecesId = ["blkrookl", "blkknightl", "blkbishopl", "blkqueen", "blkking", "blkbishopr", "blkknightr", "blkrookr", "blkpwan1", "blkpwan2", "blkpwan3", "blkpwan4", "blkpwan5", "blkpwan6", "blkpwan7", "blkpwan8"]// 

//Declaring a Global variable for storing Id of Selected Piece
let selectedPieceId;

//Declaring a Global variable for storing State of selected piece and default value false
let selectedPieceState = false;

//Declaring a Global variable for storing array of valid block Ids for the path of selected piece
let pathBlockIds = [];

//Declaring a Global Variable to store data related which side is playing at moment by default white player starts
let player = "white"

//Restart Game
function restartGame() {
    window.location.reload();
}

//Selecting Player and setting OnClick event
function selectPlayer() {

    console.log("--------In select Player Function---------");
    if (player == "white") {//if---1
        console.log("White Side Player Selected");
        //Setting OnClick event to white side pieces for selection
        for (var piece of whiteChessPiecesId) {
            //piece is the ids of chess pieces in whiteChessPiecesId array
            console.log("White Piece selected -----" + piece);
            //setting function to Onclick event for capturing Id of Piece and selecting it
            var str = `selectChessPiece(${piece})`;
            document.getElementById(piece).setAttribute("onclick", `${str}`);
        }
        //Removing OnClick event of black side pieces
        for (var piece of blackChessPiecesId) {
            //piece is the ids of chess pieces in whiteChessPiecesId array
            console.log("Black Piece selected -----" + piece);
            //setting function to Onclick event for capturing Id of Piece and selecting it
            var str = `selectChessPiece(${piece})`;
            document.getElementById(piece).removeAttribute("onclick", `${str}`);
        }
    } else {//else ----for if--1
        console.log("Black Side Player Selected");
        //Setting OnClick event to Black side pieces for selection
        for (var piece of blackChessPiecesId) {
            //piece is the ids of chess pieces in whiteChessPiecesId array
            console.log("Black Piece selected -----" + piece);
            //setting function to Onclick event for capturing Id of Piece and selecting it
            var str = `selectChessPiece(${piece})`;
            document.getElementById(piece).setAttribute("onclick", `${str}`);
        }
        //Removing OnClick event of black side pieces
        for (var piece of whiteChessPiecesId) {
            //piece is the ids of chess pieces in whiteChessPiecesId array
            console.log("White Piece selected -----" + piece);
            //setting function to Onclick event for capturing Id of Piece and selecting it
            var str = `selectChessPiece(${piece})`;
            document.getElementById(piece).removeAttribute("onclick", `${str}`);
        }
    }//if--else---1 ended here
    console.log("Setting Input Value to Player----" + player.toUpperCase())
    document.getElementById("playerPlaying").value = player.toUpperCase();
}//function ended here



//Selecting a piece for chess piece move
function selectChessPiece(pieceId) {
    console.log("---------In select Piece---------");
    console.log("Piece Id recieved from Event : ----" + pieceId.id);
    //checking if any piece is selected or not
    if (selectedPieceId == undefined && !selectedPieceState) {
        if (whiteChessPiecesId.includes(pieceId.id) || blackChessPiecesId.includes(pieceId.id)) {
            console.log("Selected Piece is NOT DEFINED");
            //setting global variable for selected piece id
            selectedPieceId = pieceId.id;
            console.log("Selected Piece Id:------" + selectedPieceId);
            selectedPieceState = true;
            console.log("Select Piece State : -----" + selectedPieceState);
            document.getElementById(pieceId.id).classList.add("selectedPiece")
        }//checking if the piece is defeated or not
    }//if ended here

    console.log("----Piece Selected-----" + selectedPieceId);
    if (selectedPieceId != undefined) {
        //set onclick to pass Move button
        document.getElementById("switch").setAttribute("onclick", "switchPlayer('1')");
        //generate path block Ids
        generatePathBlockIds();
        //Highlighting valid path for the selected piece
        highlightValidPath();
    }

}//function ended here


//highlighting Valid path and setting OnClick Event for moving the piece
function highlightValidPath() {
    console.log("-------In Highlight Path Function-------");
    console.log("Below are the valid blocks for the path:");
    console.log(pathBlockIds);
    //declaring a variable to store data related to parent of the block
    let blockParent;
    //Checking which player is playing the game at moment
    console.log("Player Playing : ------" + player);
    for (var block of pathBlockIds) {
        console.log("Block Id : -----" + block);
        //saving parent of block in the variable
        blockParent = document.getElementById(block).parentElement;
        console.log("Block Parent Element Id :-----" + blockParent.id);
        //setting CSS "highlightedPath" to the parent Element
        blockParent.classList.add("highlightedPath");
        //setting Onclick Event to the specified block
        str = `moveChessPiece(${blockParent.id})`;
        document.getElementById(blockParent.id).setAttribute("onclick", `${str}`);
    }
}//function ended here



//Function to remove piece from current block and add it to the selected block
function moveChessPiece(parentBlockId) {
    console.log("-------In Move Chess Piece Function-------");
    console.log("Selected block to move Piece:------" + parentBlockId.id);
    console.log("Id of Selected piece:-----" + selectedPieceId);
    //declaring variable to store if the chess piece is moved or not
    let movedPiece = false;
    //declaring a constant type node
    const node = document.getElementById(selectedPieceId);
    //check if the block containg a piece or not
    //Here parent block is "td" and it contains div which is child to it so we need to find if div has any child or not
    let blockChild = document.getElementById(parentBlockId.id).children[0].children[0];
    console.log("Block Child:------" + blockChild);
    //check if child is present or not in the block and if opposing played piece is present or not
    if (blockChild == undefined || blockChild.id != selectedPieceId) {
        if (blockChild != undefined && whiteChessPiecesId.includes(blockChild.id) && player == "black") {//main if starts
            //calling function to remove opposing piece
            defeatOpposingPiece(parentBlockId.id);
            //after removing opposing chess piece move the chess piece
            document.getElementById(parentBlockId.id).children[0].appendChild(node);
            movedPiece = true;
        } else if (blockChild != undefined && blackChessPiecesId.includes(blockChild.id) && player == "white") {
            //calling function to remove opposing piece
            defeatOpposingPiece(parentBlockId.id);
            //after removing opposing chess piece move the chess piece
            document.getElementById(parentBlockId.id).children[0].appendChild(node);
            movedPiece = true;
        } else {
            //if there is no child in block then move the piece
            document.getElementById(parentBlockId.id).children[0].appendChild(node);
            movedPiece = true;
        }//main if ends here
    }
    //Reseting the selection and switching the player
    console.log("movedPiece-------------" + movedPiece);
    if (movedPiece) {
        //clear data related to selected chess piece
        clearSelectionData();
        console.log("-----After Clearing selection Data------");
        console.log("Selected Piece Id:-----" + selectedPieceId);
        console.log("Selected Piece State:-----" + selectedPieceState);
        console.log("Below id Path Block Ids Array :");
        console.log(pathBlockIds);
        //calling function to switch player
        switchPlayer();
    }
}//function Ends Here


//function to clear data related to piece selection
function clearSelectionData() {
    console.log("-------In Clear Selection Data function-------")
    let parentElementRef;
    for (var block of pathBlockIds) {
        parentElementRef = document.getElementById(block).parentElement;
        parentElementRef.classList.remove("highlightedPath");
        document.getElementById(parentElementRef.id).removeAttribute("onclick")
    }
    document.getElementById(selectedPieceId).classList.remove("selectedPiece")
    //remove onclick to pass Move button
    document.getElementById("switch").removeAttribute("onclick");
    pathBlockIds = [];
    selectedPieceId = undefined;
    selectedPieceState = false;
}//function ends here

//declaring a glogal variable to generate id of defated table block
let blackPieceKilled = 1;
let whitePieceKilled = 1;
//Function to remove defeated piece 
function defeatOpposingPiece(parentBlockId) {
    console.log("-------In Defeat Opposing Piece Function------")
    console.log("demo id----" + parentBlockId);
    console.log("demo id2----" + parentBlockId);
    const node = document.getElementById(parentBlockId).children[0].children[0];
    if (blackPieceKilled <= 16 && whitePieceKilled <= 16) {//main If start
        if (player == "white") {//sub if start
            blockIdStr = "blackDeadBlock" + blackPieceKilled;
            blackPieceKilled++;
        } else {
            blockIdStr = "whiteDeadBlock" + whitePieceKilled;
            whitePieceKilled++;
        }//sub if end
        console.log("Chess Piece Killed Id:-----" + node.id);
        document.getElementById(node.id).removeAttribute("onclick");
        document.getElementById(blockIdStr).appendChild(node);
    }//main If end

    if (player == "white") {
        let index = blackChessPiecesId.indexOf(node.id);
        if (index !== -1) {
            blackChessPiecesId.splice(index, 1);
        }
        defeatedBlackPiecesId.push(node.id);
        console.log("Array White After removing Chess Piece");
        console.log(blackChessPiecesId)
    } else {
        let index = whiteChessPiecesId.indexOf(node.id);
        if (index !== -1) {
            whiteChessPiecesId.splice(index, 1);
        }
        defeatedWhitePiecesId.push(node.id);
        console.log("Array Black After removing Chess Piece");
        console.log(whiteChessPiecesId)
    }
    endGame();
}//function ends here



//declaring an array to store defeated pieces Id
let defeatedWhitePiecesId=[]
let defeatedBlackPiecesId=[]

function endGame(){
    if(player=="white"){
       if(defeatedBlackPiecesId.includes("blkking")){
        console.log("Whitewins");
        window.open('../whiteSideWins.html',"_self");
       }
    }else{
        if(defeatedWhitePiecesId.includes("whtking")){
            console.log("Blackwins");
            window.open('../blackSideWins.html',"_self");
        }

    }//if ends here

}//function Ends here


function tryAgain(){
    window.open('../chessboard.html',"_self");
}








//function to switch player after a move is done
function switchPlayer(ev) {
    console.log("-------In Switch Player Function------");
    if (player == "white") {//main if start
        player = "black";
    } else {
        player = "white";
    }//main if end
    console.log("New Player to play:-----" + player);
    selectPlayer();
    if (ev == '1') {
        clearSelectionData();
        pawnFirstMove.pop();
    }
}//function ends here


//generating path block ids
function generatePathBlockIds() {
    console.log("------In Generate Path Block Ids------");
    let selectedPieceParent = document.getElementById(selectedPieceId).parentNode;
    console.log("Selected Piece Parent:-----" + selectedPieceParent.id);
    if (selectedPieceId == "blkrookl" || selectedPieceId == "blkrookr" || selectedPieceId == "whtrookr" || selectedPieceId == "whtrookl") {//main if starts
        console.log("---In Rooks Path Id Generator----");
        rookPathIdGenerator(selectedPieceParent.id);
    } else if (selectedPieceId == "blkknightl" || selectedPieceId == "blkknightr" || selectedPieceId == "whtknightr" || selectedPieceId == "whtknightl") {
        console.log("----In Knight Path Id Generator----");
        knightPathIdGenerator(selectedPieceParent.id);
    } else if (selectedPieceId == "blkbishopl" || selectedPieceId == "blkbishopr" || selectedPieceId == "whtbishopr" || selectedPieceId == "whtbishopl") {
        console.log("----In Bishops Path Id Generator----");
        bishopPathIdGenerator(selectedPieceParent.id);
    } else if (selectedPieceId == "blkqueen" || selectedPieceId == "whtqueen") {
        console.log("----In Queen Path Id Generator----");
        queenPathIdGenerator(selectedPieceParent.id);
    } else if (selectedPieceId == "blkking" || selectedPieceId == "whtking") {
        console.log("----In King Path Id Generator----");
        kingPathIdGenerator(selectedPieceParent.id);
    } else if (selectedPieceId == "blkpwan1" || selectedPieceId == "blkpwan2" ||
        selectedPieceId == "blkpwan3" || selectedPieceId == "blkpwan4" ||
        selectedPieceId == "blkpwan5" || selectedPieceId == "blkpwan6" ||
        selectedPieceId == "blkpwan7" || selectedPieceId == "blkpwan8" ||
        selectedPieceId == "whtpwan1" || selectedPieceId == "whtpwan2" ||
        selectedPieceId == "whtpwan3" || selectedPieceId == "whtpwan4" ||
        selectedPieceId == "whtpwan5" || selectedPieceId == "whtpwan6" ||
        selectedPieceId == "whtpwan7" || selectedPieceId == "whtpwan8") {
        console.log("----In Pawn Path Id Generator----");
        pawnPathIdGenerator(selectedPieceParent.id);
    }//main if ends here
}//function ends here


//Rooks Path Block generator
function rookPathIdGenerator(blockId) {
    console.log("-----In Rooks Path Generator-----");
    let pieceBlockIdnum = blockId.substr(blockId.length - 1, 1);
    console.log("Integer Part of Block Id:----" + pieceBlockIdnum);
    let pieceBlockIdchar = blockId.substr(blockId.length - 2, 1);
    console.log("Character Part of Block Id:----" + pieceBlockIdchar);

    //getting Ascii value of the character part of ID
    let charAscii = pieceBlockIdchar.charCodeAt(0);
    console.log("Character Ascii :-----" + charAscii);

    //parsing the string type num to integer type
    let intId = parseInt(pieceBlockIdnum);

    let flag = true;
    let genIdStr;
    let genIdElement;

    //Ids for forward side 
    console.log("----Generating Ids for forward movement----")
    while (flag) {
        if (charAscii >= 65 && charAscii <= 72) {
            if (intId > 0 && intId <= 8) {
                genIdStr = "block" + String.fromCharCode(charAscii) + intId;
                console.log("Concat id :----" + genIdStr);
                if (genIdStr != blockId) {
                    genIdElement = document.getElementById(genIdStr);
                    if (genIdElement.childElementCount != 0) {
                        //if block contains child then check if the child is from opposing side or not
                        if (player == "white") {
                            if (blackChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                            }
                        } else {
                            if (whiteChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                            }
                        }
                        flag = false;
                    } else {
                        if (!pathBlockIds.includes(genIdStr)) {
                            pathBlockIds.push(genIdStr);
                        }
                    }
                }//sub if ends here
                intId = intId + 1;
            } else {
                flag = false;
            }//intId if ends here
        } else {
            flag = false;
        }//charAscii if ends here
    }//while loop ends here

    flag = true;
    charAscii = pieceBlockIdchar.charCodeAt(0);
    intId = parseInt(pieceBlockIdnum);

    //Ids for right side 
    console.log("----Generating Ids for Right Side movement----")
    while (flag) {
        if (charAscii >= 65 && charAscii <= 72) {
            if (intId > 0 && intId <= 8) {
                genIdStr = "block" + String.fromCharCode(charAscii) + intId;
                console.log("Concat id :----" + genIdStr);
                if (genIdStr != blockId) {
                    genIdElement = document.getElementById(genIdStr);
                    if (genIdElement.childElementCount != 0) {
                        //if block contains child then check if the child is from opposing side or not
                        if (player == "white") {
                            if (blackChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                            }
                        } else {
                            if (whiteChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                            }
                        }
                        flag = false;
                    } else {
                        if (!pathBlockIds.includes(genIdStr)) {
                            pathBlockIds.push(genIdStr);
                        }
                    }
                }//sub if ends here
                charAscii = charAscii + 1;
            } else {
                flag = false;
            }//intId if ends here
        } else {
            flag = false;
        }//charAscii if ends here
    }//while loop ends here


    flag = true;
    charAscii = pieceBlockIdchar.charCodeAt(0);
    intId = parseInt(pieceBlockIdnum);

    //Ids for Back side 
    console.log("----Generating Ids for Backward movement----")
    while (flag) {
        if (charAscii >= 65 && charAscii <= 72) {
            if (intId > 0 && intId <= 8) {
                genIdStr = "block" + String.fromCharCode(charAscii) + intId;
                console.log("Concat id :----" + genIdStr);
                if (genIdStr != blockId) {
                    genIdElement = document.getElementById(genIdStr);
                    if (genIdElement.childElementCount != 0) {
                        //if block contains child then check if the child is from opposing side or not
                        if (player == "white") {
                            if (blackChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                            }
                        } else {
                            if (whiteChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                            }
                        }
                        flag = false;
                    } else {
                        if (!pathBlockIds.includes(genIdStr)) {
                            pathBlockIds.push(genIdStr);
                        }
                    }
                }//sub if ends here
                intId = intId - 1;
            } else {
                flag = false;
            }//intId if ends here
        } else {
            flag = false;
        }//charAscii if ends here
    }//while loop ends here

    flag = true;
    charAscii = pieceBlockIdchar.charCodeAt(0);
    intId = parseInt(pieceBlockIdnum);

    //Ids for left side 
    console.log("----Generating Ids for left side movement----")
    while (flag) {
        if (charAscii >= 65 && charAscii <= 72) {
            if (intId > 0 && intId <= 8) {
                genIdStr = "block" + String.fromCharCode(charAscii) + intId;
                console.log("Concat id :----" + genIdStr);
                if (genIdStr != blockId) {
                    genIdElement = document.getElementById(genIdStr);
                    if (genIdElement.childElementCount != 0) {
                        //if block contains child then check if the child is from opposing side or not
                        if (player == "white") {
                            if (blackChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                            }
                        } else {
                            if (whiteChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                            }
                        }
                        flag = false;
                    } else {
                        if (!pathBlockIds.includes(genIdStr)) {
                            pathBlockIds.push(genIdStr);
                        }
                    }
                }//sub if ends here
                charAscii = charAscii - 1;
            } else {
                flag = false;
            }//intId if ends here
        } else {
            flag = false;
        }//charAscii if ends here
    }//while loop ends here

    console.log("Below is the path array : ");
    console.log(pathBlockIds);

}//function ends here




//Knights Path Block Generator
function knightPathIdGenerator(blockId) {
    console.log("-----In Knight Path Generator-----");
    let pieceBlockIdnum = blockId.substr(blockId.length - 1, 1);
    console.log("Integer Part of Block Id:----" + pieceBlockIdnum);
    let pieceBlockIdchar = blockId.substr(blockId.length - 2, 1);
    console.log("Character Part of Block Id:----" + pieceBlockIdchar);

    //getting Ascii value of the character part of ID
    let charAscii = pieceBlockIdchar.charCodeAt(0);
    console.log("Character Ascii :-----" + charAscii);

    //parsing the string type num to integer type
    let intId = parseInt(pieceBlockIdnum);

    let genIdStr;
    let genIdElement;
    //forward left blocks
    intId = intId + 2;
    charAscii = charAscii - 1
    if (charAscii >= 65 && charAscii <= 72) {
        if (intId > 0 && intId <= 8) {
            genIdStr = "block" + String.fromCharCode(charAscii) + intId;
            if (genIdStr != blockId) {
                genIdElement = document.getElementById(genIdStr);
                console.log("Concat id :----" + genIdStr);
                if (genIdElement.childElementCount != 0) {
                    if (player == "white") {
                        if (blackChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                            pathBlockIds.push(genIdStr);
                        }
                    } else {
                        if (whiteChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                            pathBlockIds.push(genIdStr);
                        }
                    }
                } else {
                    if (!pathBlockIds.includes(genIdStr)) {
                        pathBlockIds.push(genIdStr);
                    }
                }
            }
        }//intId if ends here
    }//charAscii if ends here


    charAscii = pieceBlockIdchar.charCodeAt(0);
    intId = parseInt(pieceBlockIdnum);
    //forward right blocks
    intId = intId + 2;
    charAscii = charAscii + 1
    if (charAscii >= 65 && charAscii <= 72) {
        if (intId > 0 && intId <= 8) {
            genIdStr = "block" + String.fromCharCode(charAscii) + intId;
            console.log("Concat id :----" + genIdStr);
            if (genIdStr != blockId) {
                genIdElement = document.getElementById(genIdStr);
                if (genIdElement.childElementCount != 0) {
                    if (player == "white") {
                        if (blackChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                            pathBlockIds.push(genIdStr);
                        }
                    } else {
                        if (whiteChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                            pathBlockIds.push(genIdStr);
                        }
                    }
                } else {
                    if (!pathBlockIds.includes(genIdStr)) {
                        pathBlockIds.push(genIdStr);
                    }
                }
            }
        }//intId if ends here
    }//charAscii if ends here


    charAscii = pieceBlockIdchar.charCodeAt(0);
    intId = parseInt(pieceBlockIdnum);
    //right up blocks
    intId = intId + 1;
    charAscii = charAscii + 2
    if (charAscii >= 65 && charAscii <= 72) {
        if (intId > 0 && intId <= 8) {
            genIdStr = "block" + String.fromCharCode(charAscii) + intId;
            console.log("Concat id :----" + genIdStr);
            if (genIdStr != blockId) {
                genIdElement = document.getElementById(genIdStr);
                if (genIdElement.childElementCount != 0) {
                    if (player == "white") {
                        if (blackChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                            pathBlockIds.push(genIdStr);
                        }
                    } else {
                        if (whiteChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                            pathBlockIds.push(genIdStr);
                        }
                    }
                } else {
                    if (!pathBlockIds.includes(genIdStr)) {
                        pathBlockIds.push(genIdStr);
                    }
                }
            }
        }//intId if ends here
    }//charAscii if ends here



    charAscii = pieceBlockIdchar.charCodeAt(0);
    intId = parseInt(pieceBlockIdnum);
    //right down blocks
    intId = intId - 1;
    charAscii = charAscii + 2
    if (charAscii >= 65 && charAscii <= 72) {
        if (intId > 0 && intId <= 8) {
            genIdStr = "block" + String.fromCharCode(charAscii) + intId;
            console.log("Concat id :----" + genIdStr);
            if (genIdStr != blockId) {
                genIdElement = document.getElementById(genIdStr);
                if (genIdElement.childElementCount != 0) {
                    if (player == "white") {
                        if (blackChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                            pathBlockIds.push(genIdStr);
                        }
                    } else {
                        if (whiteChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                            pathBlockIds.push(genIdStr);
                        }
                    }
                } else {
                    if (!pathBlockIds.includes(genIdStr)) {
                        pathBlockIds.push(genIdStr);
                    }
                }
            }
        }//intId if ends here
    }//charAscii if ends here



    charAscii = pieceBlockIdchar.charCodeAt(0);
    intId = parseInt(pieceBlockIdnum);
    //backward right blocks
    intId = intId - 2;
    charAscii = charAscii + 1
    if (charAscii >= 65 && charAscii <= 72) {
        if (intId > 0 && intId <= 8) {
            genIdStr = "block" + String.fromCharCode(charAscii) + intId;
            console.log("Concat id :----" + genIdStr);
            if (genIdStr != blockId) {
                genIdElement = document.getElementById(genIdStr);
                if (genIdElement.childElementCount != 0) {
                    if (player == "white") {
                        if (blackChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                            pathBlockIds.push(genIdStr);
                        }
                    } else {
                        if (whiteChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                            pathBlockIds.push(genIdStr);
                        }
                    }
                } else {
                    if (!pathBlockIds.includes(genIdStr)) {
                        pathBlockIds.push(genIdStr);
                    }
                }
            }
        }//intId if ends here
    }//charAscii if ends here


    charAscii = pieceBlockIdchar.charCodeAt(0);
    intId = parseInt(pieceBlockIdnum);
    //backward left blocks
    intId = intId - 2;
    charAscii = charAscii - 1
    if (charAscii >= 65 && charAscii <= 72) {
        if (intId > 0 && intId <= 8) {
            genIdStr = "block" + String.fromCharCode(charAscii) + intId;
            console.log("Concat id :----" + genIdStr);
            if (genIdStr != blockId) {
                genIdElement = document.getElementById(genIdStr);
                if (genIdElement.childElementCount != 0) {
                    if (player == "white") {
                        if (blackChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                            pathBlockIds.push(genIdStr);
                        }
                    } else {
                        if (whiteChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                            pathBlockIds.push(genIdStr);
                        }
                    }
                } else {
                    if (!pathBlockIds.includes(genIdStr)) {
                        pathBlockIds.push(genIdStr);
                    }
                }
            }
        }//intId if ends here
    }//charAscii if ends here


    charAscii = pieceBlockIdchar.charCodeAt(0);
    intId = parseInt(pieceBlockIdnum);
    //left up blocks
    intId = intId + 1;
    charAscii = charAscii - 2
    if (charAscii >= 65 && charAscii <= 72) {
        if (intId > 0 && intId <= 8) {
            genIdStr = "block" + String.fromCharCode(charAscii) + intId;
            console.log("Concat id :----" + genIdStr);
            if (genIdStr != blockId) {
                genIdElement = document.getElementById(genIdStr);
                if (genIdElement.childElementCount != 0) {
                    if (player == "white") {
                        if (blackChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                            pathBlockIds.push(genIdStr);
                        }
                    } else {
                        if (whiteChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                            pathBlockIds.push(genIdStr);
                        }
                    }
                } else {
                    if (!pathBlockIds.includes(genIdStr)) {
                        pathBlockIds.push(genIdStr);
                    }
                }
            }
        }//intId if ends here
    }//charAscii if ends here


    charAscii = pieceBlockIdchar.charCodeAt(0);
    intId = parseInt(pieceBlockIdnum);
    //left down blocks
    intId = intId - 1;
    charAscii = charAscii - 2
    if (charAscii >= 65 && charAscii <= 72) {
        if (intId > 0 && intId <= 8) {
            genIdStr = "block" + String.fromCharCode(charAscii) + intId;
            console.log("Concat id :----" + genIdStr);
            if (genIdStr != blockId) {
                genIdElement = document.getElementById(genIdStr);
                if (genIdElement.childElementCount != 0) {
                    if (player == "white") {
                        if (blackChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                            pathBlockIds.push(genIdStr);
                        }
                    } else {
                        if (whiteChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                            pathBlockIds.push(genIdStr);
                        }
                    }
                } else {
                    if (!pathBlockIds.includes(genIdStr)) {
                        pathBlockIds.push(genIdStr);
                    }
                }
            }
        }//intId if ends here
    }//charAscii if ends here

    console.log("Below is the path array : ");
    console.log(pathBlockIds);
}//function Ends Here







//Bishops Path Block Generator
function bishopPathIdGenerator(blockId) {
    console.log("-----In Bishop Path Generator-----");
    let pieceBlockIdnum = blockId.substr(blockId.length - 1, 1);
    console.log("Integer Part of Block Id:----" + pieceBlockIdnum);
    let pieceBlockIdchar = blockId.substr(blockId.length - 2, 1);
    console.log("Character Part of Block Id:----" + pieceBlockIdchar);

    //getting Ascii value of the character part of ID
    let charAscii = pieceBlockIdchar.charCodeAt(0);
    console.log("Character Ascii :-----" + charAscii);

    //parsing the string type num to integer type
    let intId = parseInt(pieceBlockIdnum);
    let flag = true;
    let genIdStr;
    let genIdElement;

    //Front Left Side Block Ids
    while (flag) {
        console.log("-----In Bishop Front Left Side Block Ids-------");
        if (charAscii >= 65 && charAscii <= 72) {
            if (intId > 0 && intId <= 8) {
                genIdStr = "block" + String.fromCharCode(charAscii) + intId;
                console.log("Concat id :----" + genIdStr);
                if (genIdStr != blockId) {
                    genIdElement = document.getElementById(genIdStr);
                    if (genIdElement.childElementCount != 0) {
                        if (player == "white") {
                            if (blackChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                                flag = false;
                            } else {
                                flag = false;
                            }
                        } else {
                            if (whiteChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                                flag = false;
                            } else {
                                flag = false;
                            }
                        }
                    } else {
                        if (!pathBlockIds.includes(genIdStr)) {
                            pathBlockIds.push(genIdStr);
                        }//No child Element if Ends here
                    }
                }//genIdStr if ends here
                charAscii = charAscii - 1;
                intId = intId + 1;
            } else {
                flag = false;
            }//IntId if ends here
        } else {
            flag = false;
        }//charAscii if endh here
    }//while ends here

    charAscii = pieceBlockIdchar.charCodeAt(0);
    intId = parseInt(pieceBlockIdnum);
    flag = true;

    //front Right Side Block IDs
    while (flag) {
        console.log("-----In Bishop Front Right Side Block Ids-------")
        if (charAscii >= 65 && charAscii <= 72) {
            if (intId > 0 && intId <= 8) {
                genIdStr = "block" + String.fromCharCode(charAscii) + intId;
                console.log("Concat id :----" + genIdStr);
                if (genIdStr != blockId) {
                    genIdElement = document.getElementById(genIdStr);
                    if (genIdElement.childElementCount != 0) {
                        if (player == "white") {
                            if (blackChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                                flag = false;
                            } else {
                                flag = false;
                            }
                        } else {
                            if (whiteChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                                flag = false;
                            } else {
                                flag = false;
                            }
                        }
                    } else {
                        if (!pathBlockIds.includes(genIdStr)) {
                            pathBlockIds.push(genIdStr);
                        }//No child Element if Ends here
                    }
                }//genIdStr if ends here
                charAscii = charAscii + 1;
                intId = intId + 1;
            } else {
                flag = false;
            }//IntId if ends here
        } else {
            flag = false;
        }//charAscii if endh here
    }//while ends here


    charAscii = pieceBlockIdchar.charCodeAt(0);
    intId = parseInt(pieceBlockIdnum);
    flag = true;

    //Back left Side Block IDs
    while (flag) {
        console.log("-----In Bishop Back Left Side Block Ids-------")
        if (charAscii >= 65 && charAscii <= 72) {
            if (intId > 0 && intId <= 8) {
                genIdStr = "block" + String.fromCharCode(charAscii) + intId;
                console.log("Concat id :----" + genIdStr);
                if (genIdStr != blockId) {
                    genIdElement = document.getElementById(genIdStr);
                    if (genIdElement.childElementCount != 0) {
                        if (player == "white") {
                            if (blackChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                                flag = false;
                            } else {
                                flag = false;
                            }
                        } else {
                            if (whiteChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                                flag = false;
                            } else {
                                flag = false;
                            }
                        }
                    } else {
                        if (!pathBlockIds.includes(genIdStr)) {
                            pathBlockIds.push(genIdStr);
                        }//No child Element if Ends here
                    }
                }//genIdStr if ends here
                charAscii = charAscii - 1;
                intId = intId - 1;
            } else {
                flag = false;
            }//IntId if ends here
        } else {
            flag = false;
        }//charAscii if endh here
    }//while ends here

    charAscii = pieceBlockIdchar.charCodeAt(0);
    intId = parseInt(pieceBlockIdnum);
    flag = true;

    //Back right Side Block IDs
    while (flag) {
        console.log("-----In Bishop Back right Side Block Ids-------")
        if (charAscii >= 65 && charAscii <= 72) {
            if (intId > 0 && intId <= 8) {
                genIdStr = "block" + String.fromCharCode(charAscii) + intId;
                console.log("Concat id :----" + genIdStr);
                if (genIdStr != blockId) {
                    genIdElement = document.getElementById(genIdStr);
                    if (genIdElement.childElementCount != 0) {
                        if (player == "white") {
                            if (blackChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                                flag = false;
                            } else {
                                flag = false;
                            }
                        } else {
                            if (whiteChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                                flag = false;
                            } else {
                                flag = false;
                            }
                        }
                    } else {
                        if (!pathBlockIds.includes(genIdStr)) {
                            pathBlockIds.push(genIdStr);
                        }//No child Element if Ends here
                    }
                }//genIdStr if ends here
                charAscii = charAscii + 1;
                intId = intId - 1;
            } else {
                flag = false;
            }//IntId if ends here
        } else {
            flag = false;
        }//charAscii if endh here
    }//while ends here

    console.log("Below is the path array : ");
    console.log(pathBlockIds);

}//function ends here

//queen Path Block generator
function queenPathIdGenerator(blockId) {
    console.log("-----In Queen Path Generator-----");
    //moves like bishop generation
    bishopPathIdGenerator(blockId);
    //moves like Rook Generation
    rookPathIdGenerator(blockId);
}

//King Path Block Generator
function kingPathIdGenerator(blockId) {
    console.log("-----In King Path Generator-----");
    let pieceBlockIdnum = blockId.substr(blockId.length - 1, 1);
    console.log("Integer Part of Block Id:----" + pieceBlockIdnum);
    let pieceBlockIdchar = blockId.substr(blockId.length - 2, 1);
    console.log("Character Part of Block Id:----" + pieceBlockIdchar);

    //getting Ascii value of the character part of ID
    let charAscii = pieceBlockIdchar.charCodeAt(0);
    console.log("Character Ascii :-----" + charAscii);

    //parsing the string type num to integer type
    let intId = parseInt(pieceBlockIdnum);
    let KingPathcount=0
    let genIdStr;
    let genIdElement;

    
    //Forward move
    intId = intId + 1;
    charAscii = charAscii - 1;
    while (KingPathcount<3){
        if (charAscii >= 65 && charAscii <= 72) {
            if (intId > 0 && intId <= 8) {
                genIdStr = "block" + String.fromCharCode(charAscii) + intId;
                console.log("Concat id :----" + genIdStr);
                if (genIdStr != blockId) {
                    genIdElement = document.getElementById(genIdStr);
                    if (genIdElement.childElementCount != 0) {
                        if (player == "white") {
                            if (blackChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                            }
                        } else {
                            if (whiteChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                            }
                        }
                    }else{
                        if (!pathBlockIds.includes(genIdStr)) {
                            pathBlockIds.push(genIdStr);
                        }
                    }//no child if ends here
                }//id match if ends here
            }//intId if ends here
        }//charAscii if endh here
        charAscii = charAscii + 1;
        KingPathcount++;
    }//while Ends here

    //left Side moves
    charAscii = pieceBlockIdchar.charCodeAt(0);
    intId = parseInt(pieceBlockIdnum);
    KingPathcount=0;
    intId = intId - 1;
    charAscii = charAscii - 1;
    while (KingPathcount<3){
        if (charAscii >= 65 && charAscii <= 72) {
            if (intId > 0 && intId <= 8) {
                genIdStr = "block" + String.fromCharCode(charAscii) + intId;
                console.log("Concat id :----" + genIdStr);
                if (genIdStr != blockId) {
                    genIdElement = document.getElementById(genIdStr);
                    if (genIdElement.childElementCount != 0) {
                        if (player == "white") {
                            if (blackChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                            }
                        } else {
                            if (whiteChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                            }
                        }
                    }else{
                        if (!pathBlockIds.includes(genIdStr)) {
                            pathBlockIds.push(genIdStr);
                        }
                    }//no child if ends here
                }//id match if ends here
            }//intId if ends here
        }//charAscii if endh here
        intId = intId + 1;
        KingPathcount++;
    }//while Ends here


    //right Side moves
    charAscii = pieceBlockIdchar.charCodeAt(0);
    intId = parseInt(pieceBlockIdnum);
    KingPathcount=0;
    intId = intId - 1;
    charAscii = charAscii + 1;
    while (KingPathcount<3){
        if (charAscii >= 65 && charAscii <= 72) {
            if (intId > 0 && intId <= 8) {
                genIdStr = "block" + String.fromCharCode(charAscii) + intId;
                console.log("Concat id :----" + genIdStr);
                if (genIdStr != blockId) {
                    genIdElement = document.getElementById(genIdStr);
                    if (genIdElement.childElementCount != 0) {
                        if (player == "white") {
                            if (blackChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                            }
                        } else {
                            if (whiteChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                            }
                        }
                    }else{
                        if (!pathBlockIds.includes(genIdStr)) {
                            pathBlockIds.push(genIdStr);
                        }
                    }//no child if ends here
                }//id match if ends here
            }//intId if ends here
        }//charAscii if endh here
        intId = intId + 1;
        KingPathcount++;
    }//while Ends here


    //Backward move
    charAscii = pieceBlockIdchar.charCodeAt(0);
    intId = parseInt(pieceBlockIdnum);
    KingPathcount=0;
    intId = intId - 1;
    charAscii = charAscii - 1;
    while (KingPathcount<3){
        if (charAscii >= 65 && charAscii <= 72) {
            if (intId > 0 && intId <= 8) {
                genIdStr = "block" + String.fromCharCode(charAscii) + intId;
                console.log("Concat id :----" + genIdStr);
                if (genIdStr != blockId) {
                    genIdElement = document.getElementById(genIdStr);
                    if (genIdElement.childElementCount != 0) {
                        if (player == "white") {
                            if (blackChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                            }
                        } else {
                            if (whiteChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                            }
                        }
                    }else{
                        if (!pathBlockIds.includes(genIdStr)) {
                            pathBlockIds.push(genIdStr);
                        }
                    }//no child if ends here
                }//id match if ends here
            }//intId if ends here
        }//charAscii if endh here
        charAscii = charAscii + 1;
        KingPathcount++;
    }//while Ends here


}//function Ends Here


//declaring a array to store which pawn has completed its first move
let pawnFirstMove = [];

//Pawn Path Block Generator
function pawnPathIdGenerator(blockId) {
    console.log("-----In Pawn Path Generator-----");
    let pieceBlockIdnum = blockId.substr(blockId.length - 1, 1);
    console.log("Integer Part of Block Id:----" + pieceBlockIdnum);
    let pieceBlockIdchar = blockId.substr(blockId.length - 2, 1);
    console.log("Character Part of Block Id:----" + pieceBlockIdchar);

    //getting Ascii value of the character part of ID
    let charAscii = pieceBlockIdchar.charCodeAt(0);
    console.log("Character Ascii :-----" + charAscii);

    //parsing the string type num to integer type
    let intId = parseInt(pieceBlockIdnum);

    let genIdStr;
    let genIdElement;

    if (!pawnFirstMove.includes(selectedPieceId)) {
        //check if there are any opposing element to forward left side of selected pawn

        if (player == "white") {
            intId = intId + 1;
            charAscii = charAscii - 1;
        } else {
            intId = intId - 1;
            charAscii = charAscii - 1;
        }//player check

        if (charAscii >= 65 && charAscii <= 72) {
            if (intId > 0 && intId <= 8) {
                genIdStr = "block" + String.fromCharCode(charAscii) + intId;
                console.log("Concat id :----" + genIdStr);
                if (genIdStr != blockId) {
                    genIdElement = document.getElementById(genIdStr);
                    if (genIdElement.childElementCount != 0) {
                        if (player == "white") {
                            if (blackChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                            }
                        } else {
                            if (whiteChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                            }
                        }
                    }
                }
            }//intId if ends here
        }//charAscii if endh here

        charAscii = pieceBlockIdchar.charCodeAt(0);
        intId = parseInt(pieceBlockIdnum);
        //check if there are any opposing element to forward right side of selected pawn

        if (player == "white") {
            intId = intId + 1;
            charAscii = charAscii + 1;
        } else {
            intId = intId - 1;
            charAscii = charAscii + 1;
        }//player check

        if (charAscii >= 65 && charAscii <= 72) {
            if (intId > 0 && intId <= 8) {
                genIdStr = "block" + String.fromCharCode(charAscii) + intId;
                console.log("Concat id :----" + genIdStr);
                if (genIdStr != blockId) {
                    genIdElement = document.getElementById(genIdStr);
                    if (genIdElement.childElementCount != 0) {
                        if (player == "white") {
                            if (blackChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                            }
                        } else {
                            if (whiteChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                            }
                        }
                    }
                }
            }//intId if ends here
        }//charAscii if endh here

        charAscii = pieceBlockIdchar.charCodeAt(0);
        intId = parseInt(pieceBlockIdnum);
        //if there are no opposing element to forward left and right side of selected pawn then move forward
        let movecount = 0;
        while (movecount < 2) {
            if (player == "white") {
                intId = intId + 1;
            } else {
                intId = intId - 1;
            }//player check
            if (charAscii >= 65 && charAscii <= 72) {
                if (intId > 0 && intId <= 8) {
                    genIdStr = "block" + String.fromCharCode(charAscii) + intId;
                    console.log("Concat id :----" + genIdStr);
                    if (genIdStr != blockId) {
                        genIdElement = document.getElementById(genIdStr);
                        if (genIdElement.childElementCount == 0) {
                           movecount=2;
                        }else{
                            pathBlockIds.push(genIdStr);
                        }
                    }
                }//intId if ends here
            }//charAscii if endh here
            movecount++
        }
         pawnFirstMove.push(selectedPieceId);
    } else {
        //check if there are any opposing element to forward left side of selected pawn
        if (player == "white") {
            intId = intId + 1;
            charAscii = charAscii - 1;
        } else {
            intId = intId - 1;
            charAscii = charAscii - 1;
        }
        if (charAscii >= 65 && charAscii <= 72) {
            if (intId > 0 && intId <= 8) {
                genIdStr = "block" + String.fromCharCode(charAscii) + intId;
                console.log("Concat id :----" + genIdStr);
                if (genIdStr != blockId) {
                    genIdElement = document.getElementById(genIdStr);
                    if (genIdElement.childElementCount != 0) {
                        if (player == "white") {
                            if (blackChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                            }
                        } else {
                            if (whiteChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                            }
                        }
                    }
                }
            }//intId if ends here
        }//charAscii if endh here

        charAscii = pieceBlockIdchar.charCodeAt(0);
        intId = parseInt(pieceBlockIdnum);
        //check if there are any opposing element to forward right side of selected pawn
        if (player == "white") {
            intId = intId + 1;
            charAscii = charAscii + 1;
        } else {
            intId = intId - 1;
            charAscii = charAscii + 1;
        }//player check
        if (charAscii >= 65 && charAscii <= 72) {
            if (intId > 0 && intId <= 8) {
                genIdStr = "block" + String.fromCharCode(charAscii) + intId;
                console.log("Concat id :----" + genIdStr);
                if (genIdStr != blockId) {
                    genIdElement = document.getElementById(genIdStr);
                    if (genIdElement.childElementCount != 0) {
                        if (player == "white") {
                            if (blackChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                            }
                        } else {
                            if (whiteChessPiecesId.includes(document.getElementById(genIdStr).children[0].id)) {
                                pathBlockIds.push(genIdStr);
                            }
                        }
                    }
                }
            }//intId if ends here
        }//charAscii if endh here

        charAscii = pieceBlockIdchar.charCodeAt(0);
        intId = parseInt(pieceBlockIdnum);
        //if there are no opposing element to forward left and right side of selected pawn then move forward
        if (player == "white") {
            intId = intId + 1;
        } else {
            intId = intId - 1;
        }//player check
        if (charAscii >= 65 && charAscii <= 72) {
            if (intId > 0 && intId <= 8) {
                genIdStr = "block" + String.fromCharCode(charAscii) + intId;
                console.log("Concat id :----" + genIdStr);
                if (genIdStr != blockId) {
                    genIdElement = document.getElementById(genIdStr);
                    if (genIdElement.childElementCount == 0) {
                        pathBlockIds.push(genIdStr);
                        pawnFirstMove.push(selectedPieceId);
                    }
                }
            }//intId if ends here
        }//charAscii if endh here
    }//pawn check

    console.log("Below is the path array : ");
    console.log(pathBlockIds);

}//function Ends here

