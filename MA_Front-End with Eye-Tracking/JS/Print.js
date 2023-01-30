//Open new Window and initializing browser integrated print comand of the page
function PrintElem(elem)
{
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="./CSS/print.css"><title>Wochenplan</title>');
    mywindow.document.write('</head><body>');
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write('<script src="./JS/PrinterContent.js"></script></body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10

    setTimeout(()=>{
      mywindow.print();
      mywindow.close();
    },1000)

    return true;
}