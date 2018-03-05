const Papa = require('papaparse')

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files;
    var file = event.dataTransfer.files[0],
        reader = new FileReader();
    reader.onload = function(event) {
      handleParse(event.target.result);
    };
    Papa.parse(reader.readAsText(file));
}

function download(name, data) {
    var dlink = document.getElementById("download-transport");
    if (dlink == undefined) {
        let link = document.createElement('a');
        link.id = 'download-transport';
        link.download = name;
        document.body.appendChild(link);
        download(name, data);
        return;
    }
    dlink.href = "data:application/json;base64," + Buffer.from(data.toString()).toString('base64');
    dlink.click();
}

function handleParse(data) {
  let parsedData = Papa.parse(data).data
  jsonCSVTable(parsedData);
  download('csv.json', JSON.stringify(parsedData))

}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}

var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

function jsonCSVTable(csvJSON){


  for(var k in csvJSON){
    var val = csvJSON[k];
    var cols = document.getElementById("table-cols");
    var colHeads = "\n\r";
    for(var k in val){
      colHeads += "<td>" + k + "</td>\n\r";
    }
    cols.innerHTML = colHeads;
    break;
  }
    var b = document.getElementById("table-body");
    var rows = "\n\r";
  for(var k in csvJSON){
    var val = csvJSON[k];
    rows += "<tr>\n\r";
    for(var k in val){
      if(val[k].length > 300) {
        val[k] = val[k].substring(0,100) + ' ...'
      }
      rows += "<td>" + val[k] + "</td>\n\r";
    }
    rows += "</tr>\n\r";
  }

    b.innerHTML = rows;
}
jsonCSVTable([
]);
