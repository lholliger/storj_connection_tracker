// I wrote code that works but doesn't necessairly look good, please clean it up if you would like
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
var uploads = {}
var downloads = {}

var upload_success = 0
var upload_fail = 0
var download_success = 0
var download_fail = 0;

function percent(a, b) { // to stop 0/0 errors nicely
  if (a == 0) {
    return 0.00
  } else {
    return (a/b*100).toFixed(2)
  }
}
function update() { // show screen data
  console.log('\u001B[2J\u001B[0;0f');
  console.log("\n\n\tNode Connection Tracker\n\n\n");
  upload_number = Object.keys(uploads).length
  download_number = Object.keys(downloads).length
  console.log("\tUploads:   " + upload_number);
  console.log("\tDownloads: " + download_number)
  console.log("\tTotal:     " + (upload_number + download_number) + "\n")
  console.log("\tUpload Sucess Rate:   " + upload_success + " / " + (upload_success+upload_fail) + " (" + percent(upload_success, upload_success+upload_fail)+ "%)")
  console.log("\tDownload Sucess Rate: " + download_success + " / " + (download_success+download_fail) + " (" + percent(download_success, download_success+download_fail) + "%)")
  console.log("\n\n");
  upload_array = []
  download_array = []
  for (key in uploads) {
    upload_array.push(key + (" (" + uploads[key] + ")").padEnd(5))
  }
  for (key in downloads) {
    download_array.push(key + (" (" + downloads[key] + ")").padEnd(5))
  }
higher = [upload_number, download_number].sort(function(a, b){return b-a})[0];
console.log("Uploads: " + " ".repeat(52) + "Downloads: ")
  for (i = 0; i < higher; i++) {
    if (upload_array[i] == undefined) {
      upload_array[i] = " ".repeat(57)
    }
    if (download_array[i] == undefined) {
      download_array[i] = ""
    }
    console.log(upload_array[i] + " ".repeat(4) + download_array[i])
  }
  
}

rl.on('line', function(line){
  line = line.split("\t").join("").split("{")
  line2 = line[0]
  line = line[1]
  if (line == undefined) {
  } else {
  line = "{" + line
  line = JSON.parse(line);
  line2 = line2.split("Z")[1].split("piecestore")
  if (line2[1] == "upload started") {
    uploads[line["Piece ID"]] = 0
  }
  if (line2[1] == "uploaded") {
    delete uploads[line["Piece ID"]]
    upload_success++
  }
  if (line2[1] == "download started") {
    downloads[line["Piece ID"]] = 0
  }
  if (line2[1] == "downloaded") {
    delete downloads[line["Piece ID"]]
    download_success++
  }
  if (line2[1] == "upload failed") {
    delete uploads[line["Piece ID"]]
    upload_fail++
  }
  if (line2[1] == "download failed") {
    delete downloads[line["Piece ID"]]
    download_fail++
  }
  update()
}
})

setInterval(() => { // update times
  for (key in uploads) {
    uploads[key]++
  }
  for (key in downloads) {
    downloads[key]++
  }
  update()
}, 1000);