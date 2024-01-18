var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey : "public_FgblUBDtniUX2IRk39+y+ORObw4=",
    privateKey : "private_4z0gbT6C2uJS02JZ6QYJNRPjYz8=",
    urlEndpoint : "https://ik.imagekit.io/sekarmadu/"
});

imagekit.getFileDetails("65a8c70788c257da337c9545", function(error, result) {
    if(error) console.log(error);
    else console.log(result);
});