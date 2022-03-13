import React from 'react';
const { getRandomBytesSync } = require("ethereum-cryptography/random");
const { scryptSync } = require("ethereum-cryptography/scrypt");
const { encrypt, decrypt } = require("ethereum-cryptography/aes");
const ethUtil = require('ethereumjs-util');
const sigUtil = require('eth-sig-util');

class AES_TEST extends React.Component {

    async componentDidMount() {
      const accounts = 
        await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
      const plainText = "EthSign";
      console.log("Plain text:", plainText);
      const AESKey = this.generateAESKey(32).toString("hex"); // Must be random for each file
      const AESIV = getRandomBytesSync(16).toString("hex"); // Must be random for each file
      console.log("Key & IV:", AESKey, AESIV);
      const encryptedText = encrypt(Buffer.from(plainText, "ascii"), Buffer.from(AESKey, "hex"), Buffer.from(AESIV, "hex"), "aes-256-cbc").toString("hex");
      console.log("Encrypted text:", encryptedText);
      const web3EncryptionPubKey = await this.getKey(accounts);
      const encryptedAESKey = ethUtil.bufferToHex(Buffer.from(JSON.stringify(sigUtil.encrypt(web3EncryptionPubKey, { data: AESKey }, 'x25519-xsalsa20-poly1305')), 'utf8'));
      const decryptedAESKey = await window.ethereum.request({ method: 'eth_decrypt', params: [encryptedAESKey, accounts[0]] });
      console.log("Key:", AESKey, decryptedAESKey);
      const decryptedText = decrypt(Buffer.from(encryptedText, "hex"), Buffer.from(decryptedAESKey, "hex"), Buffer.from(AESIV, "hex"), "aes-256-cbc").toString("ascii");
      console.log("Decrypted text:", decryptedText);
    }

    generateAESKey = (length) => {
      const randomBytesPassword = getRandomBytesSync(length);
      const randomBytesSalt = getRandomBytesSync(length);
      const encodedAESKey = scryptSync(randomBytesPassword, randomBytesSalt, 16, 1, 1, length);
      return encodedAESKey;
    }

    getKey = async (accounts) => {
      try {
        const key = (
          await window.ethereum.request({
            jsonrpc: '2.0',
            method: 'eth_getEncryptionPublicKey',
            params: [accounts[0]],
            from: accounts[0],
          })
        )
        console.log(`MetaMask public encryption key: ${key}`) // Example: g+s85upRuddCjwsSgbRAVGK2BKZDDM8/PqTxD9BGnWY=
        return key;
      } catch(err) {
        console.log(err.message)
      }
    }

    render() {
        return (
            <div></div>
        )
    }

}

export default AES_TEST;