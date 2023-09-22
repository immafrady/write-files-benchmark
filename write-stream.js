const axios = require('axios');
const fs = require('fs');

const fileUrl = 'https://mirror-statics.xinshuibao1.com/17047412964331028490.zip?filename=%E6%88%91%E6%A0%B9%E6%9C%AC%E4%B8%8D%E6%83%B3%E5%90%AC202308%E5%AE%8C%E7%A8%8E%E5%87%AD%E8%AF%81.zip'; // 替换为文件的URL
const outputFile = 'outputfile.zip'; // 替换为要保存到的本地文件名

axios({
  method: 'get',
  url: fileUrl,
  responseType: 'stream', // 指定响应类型为流
})
  .then(function (response) {
    const writer = fs.createWriteStream(outputFile);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  })
  .then(function () {
    console.log('文件下载完成');
  })
  .catch(function (error) {
    console.error('下载失败', error);
  });
