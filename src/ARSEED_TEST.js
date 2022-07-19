import React from "react";
import { genAPI } from "arseeding-js";

class ARSEED_TEST extends React.Component {
  async componentDidMount() {
    await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const instance = await genAPI(window.ethereum);
    const arseedUrl = "https://arseed.web3infura.io/";
    const data = Buffer.from("Testing Arseed", "utf-8");
    const payCurrency = "usdc";
    const ops = {
      tags: [{ name: "Content-Type", value: "data type" }],
    };
    const res = await instance.sendAndPay(arseedUrl, data, payCurrency, ops);
    console.log("res", res);
  }

  render() {
    return <div></div>;
  }
}

export default ARSEED_TEST;
