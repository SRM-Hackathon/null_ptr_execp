const ipfsAPI = require('ipfs-api');
const fs = require('fs');

const ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'});


function retrieveFile(name,hash){

    console.log("Fetchin");
    ipfs.get(hash, function (err, files) {
        if(err){
            console.log(err);
        }else{
            console.log(files);
            files.forEach((file) => {
                var wstream = fs.createWriteStream(name);
                wstream.write(file.content);
                wstream.end();
                console.log('done saving');
            })
        }
    });
}

module.exports = retrieveFile;


