const ipfsAPI = require('ipfs-api');
const fs = require('fs');

const ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'});
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// const toBase64 = file => new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
// });


function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    console.log(bitmap);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}


async function retrieveFile(name,hash){

    console.log("Fetchin");
    ipfs.get(hash, function (err, files) {
        if(err){
            console.log(err);
        }else{
            console.log(files);
            files.forEach((file) => {
                file.content = file.content.toString('base64');
                // var wstream = fs.createWriteStream(name);
                // wstream.write(file.content);
                // wstream.end();

                // fs.readFileSync()
                // console.log('done saving');
                // const file = document.querySelector('#myfile').files[0];
                // console.log(toBase64(file));
                // var base64str = base64_encode(name);
                // console.log(base64str);
            
                const msg = {
                    to: 'kumaraditya1999@gmail.com',
                    from: 'nimishagrawal76@gmail.com',
                    subject: 'Sending with Dapp',
                    text: 'WillStone',
                    html: '<h1>jhsajk</h1>',
                      attachments: [
                      {
                          content: file.content,
                          filename: name,
                          type: 'plain/text',
                          disposition: 'attachment',
                          contentId: 'mytext'
                      },
                    ],
                  };
                  sgMail.send(msg).then(l=>console.log("then")).catch(l=>console.log("catch",l.response.body));
            })
        }
    });
}

module.exports = retrieveFile;

retrieveFile('a.txt', 'QmZaUHTYXUbUPzzyiD99XpjxWg9ieEfHDXHpLwP3ersion');

