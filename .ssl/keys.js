import { generateKeyPair } from 'node:crypto';
import { writeFile } from 'node:fs';

const curve = "secp256k1";

generateKeyPair('ec', {
        namedCurve: curve,
        publicKeyEncoding: {type: 'spki', format: 'pem'},
        privateKeyEncoding: {type: 'pkcs8', format: 'pem'},
    }, (err, publicKey, privateKey) => {
        if (!err) {
            console.log("Private key:\n", privateKey.toString('base64'));
            console.log("Public key:\n", publicKey.toString('base64'));

            writeFile("ecdsa.pri", privateKey.toString('base64'), (err) => {
                if(err) {
                    console.log("err écriture clé privée")
                }
                else{
                    console.log("ecriture clé privée ok")
                }
            })

            writeFile("ecdsa.pub", publicKey.toString('base64'), (err) => {
                if(err) {
                    console.log("err ecriture clé publique")
                }
                else{
                    console.log("ecriture clé publique ok")
                }
            })

        }
    }
)