import React from "react";
import "ethers";
import { ethers } from "ethers";

class SIGN_TEST extends React.Component {
  async componentDidMount() {
    const UPLOAD_SIGNATURE_STATEMENT =
        "EthSign is requesting your signature to validate the data being uploaded. This action does not incur any gas fees.",
      SIGNATURE_VERSION = "4.0.3";

    const DATA = { data: "Test data" };

    await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messagePayload = {
      address: address,
      timestamp: new Date().toISOString(),
      version: SIGNATURE_VERSION,
      hash: ethers.utils.hashMessage(JSON.stringify(DATA)),
    };
    const message = `${UPLOAD_SIGNATURE_STATEMENT}\n\n~\n\n${JSON.stringify(
      messagePayload,
      null,
      2
    )}`;
    const signature = await signer.signMessage(message);
    console.log(signature);
    console.log(JSON.stringify(message));
    console.log(JSON.stringify(DATA)); // needs to be stringified before sending
  }

  render() {
    return <div></div>;
  }
}

export default SIGN_TEST;
