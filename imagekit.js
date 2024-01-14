var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey : "public_FgblUBDtniUX2IRk39+y+ORObw4=",
    privateKey : "private_4z0gbT6C2uJS02JZ6QYJNRPjYz8=",
    urlEndpoint : "https://ik.imagekit.io/sekarmadu/"
});

imagekit.getFileDetails("65a3c2a588c257da33cb95e0", function(error, result) {
    if(error) console.log(error);
    else console.log(result);
});