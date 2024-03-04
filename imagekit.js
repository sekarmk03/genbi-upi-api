var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey : "public_FgblUBDtniUX2IRk39+y+ORObw4=",
    privateKey : "private_4z0gbT6C2uJS02JZ6QYJNRPjYz8=",
    urlEndpoint : "https://ik.imagekit.io/sekarmadu/"
});

imagekit.getFileDetails("65a9f61388c257da3372455b", function(error, result) {
    if(error) console.log(error);
    else console.log(result);
});

/*

{
  type: 'file',
  name: 'marketing.png',
  createdAt: '2024-01-19T04:09:55.537Z',
  updatedAt: '2024-01-19T04:09:56.278Z',
  fileId: '65a9f61388c257da3372455b',
  tags: null,
  AITags: null,
  versionInfo: { id: '65a9f61388c257da3372455b', name: 'Version 1' },
  embeddedMetadata: {
    DateCreated: '2024-01-19T04:09:56.273Z',
    ImageWidth: 482,
    ImageHeight: 200,
    DateTimeCreated: '2024-01-19T04:09:56.278Z'
  },
  customCoordinates: null,
  customMetadata: {},
  isPrivateFile: false,
  url: 'https://ik.imagekit.io/sekarmadu/genbi_upi/marketing.png',
  thumbnail: 'https://ik.imagekit.io/sekarmadu/tr:n-ik_ml_thumbnail/genbi_upi/marketing.png',
  fileType: 'image',
  filePath: '/genbi_upi/marketing.png',
  height: 200,
  width: 482,
  size: 150584,
  hasAlpha: true,
  mime: 'image/png'
}

*/