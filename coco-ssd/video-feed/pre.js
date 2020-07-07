function download() {
    var download = document.getElementById("download");
    var image = document.getElementById("canvas").toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
    //download.setAttribute("download","archive.png");
    }