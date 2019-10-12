const ipfsAPI = require('ipfs-api');
const fs = require('fs');

const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'});


function retrieveFile(name,hash){


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


retrieveFile("asdasf.txt","QmeZPbCyRotSaVXtQGt95egE9B1BuEXRPpurgoq9sGxiEr");

