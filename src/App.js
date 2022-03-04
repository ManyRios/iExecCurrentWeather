import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { Web3Provider } from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { cities, flags, weathers, icons } from "./config";
import { Oval } from "react-loader-spinner";
import { Container, Card, Col, Row, ListGroup, Button } from "react-bootstrap";

import { Account } from "./components";

const App = () => {
  //We set the states for the app
  const [network, setNetwork] = useState();
  const [provider, setProvider] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [weather, setWeather] = useState();
  const [weatherImg, setWeatherImg] = useState();
  const [updating, setUpdating] = useState(false);
  //Abi and address from the deployed contract witch interacts with the iexec oracle factory
  const abi = require("./contracts/GetWeathers.abi");
  const contractAddr = "0x3694A23db25ED94865Dc861E83C8d26A109D0864";

  //load the web3modal to get the providers and owner address
  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    // Wrapper for transforming a web3 provider (like metamask)
    setProvider(new Web3Provider(provider));
    setAddress(provider.selectedAddress);
    setNetwork(provider.networkVersion);
  }, [setProvider]);
  //get the data that came from the oracle factory and its configured API

  async function handleUpdate(e) {
    setCity(e.target.innerText);
    setUpdating(true);
    const contract = await loadContract(abi, contractAddr);
    let oracle = "";
    switch (city) {
      case " Beijing":
        oracle = await contract.getOracleDataBeijing();
        break;
      case " Berlin":
        oracle = await contract.getOracleDataBerlin();
        break;
      case " London":
        oracle = await contract.getOracleDataLondon();
        break;
      case " Madrid":
        oracle = await contract.getOracleDataMadrid();
        break;
      case " Moscow":
        oracle = await contract.getOracleDataMoscow();
        break;
      case " Paris":
        oracle = await contract.getOracleDataParis();
        break;
      case " Rome":
        oracle = await contract.getOracleDataRome();
        break;
      case " Tokyo":
        oracle = await contract.getOracleDataTokyo();
        break;
      case " Washington":
        oracle = await contract.getOracleDataWashington();
        break;
      default:
        break;
    }
    setTimeout(() => {
      setUpdating(false);
      getOracle();
    }, 2000);
  }

  async function getOracle() {
    try {
      const newContract = loadContract(abi, contractAddr);
      const data = await newContract.getWeather();
      setWeather(data);
      const weth = await theCity(weather);
      setWeatherImg(weth);
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  return (
    <div>
      <Container className="">
        <Row>
          <div className="d-flex col-12 mt-3">
            <div className="mr-auto rounded-circle">
              <img
                alt=""
                src="/iexec.png"
                width="150"
                height="100"
                className=" rounded-circle shadow"
              />{" "}
            </div>
            <div className="mx-auto"></div>
            <Account
              address={address}
              provider={provider}
              web3Modal={web3Modal}
              loadWeb3Modal={loadWeb3Modal}
              logoutOfWeb3Modal={logoutOfWeb3Modal}
              className="mx-auto"
            />
          </div>
          <Col md={3}></Col>
          <Col md={9}>
            <h2 className="text-center mt-2">
              Current weather from iExec Oracles
            </h2>
          </Col>
        </Row>
        <Row className="d-flex border p-4">
          {network !== "133" && address ? (
            <Card className="bg-transparent">
              <h2>Please change your network to iExec test sidechain 133</h2>
            </Card>
          ) : (
            <Col md={3} className="">
              <Card.Body className="shadow border border-primary">
                {!address ? (
                  <h2>Please Connect your wallet</h2>
                ) : (
                  <div>
                    <h4 className="text-center">Cities: </h4>
                    <ListGroup className=" mt-2  bg-transparent items font-weight-bold">
                      {cities.map((name, i) => (
                        <Button
                          className="d-inline-block mb-2 mt-2 btn-outline-primary bg-transparent"
                          key={i}
                          name={name}
                          onClick={handleUpdate}
                        >
                          <img
                            alt=""
                            src={flags[i]}
                            width="20"
                            height="10%"
                            className="d-inline-block rounded-circle text-center mr-5 img-fluid"
                          />{" "}
                          <span className="font-weight-bold">{name}</span>
                        </Button>
                      ))}
                    </ListGroup>
                  </div>
                )}
              </Card.Body>
            </Col>
          )}

          <Col md={9} className="text-center">
            {network !== "133" || !address ? (
              <div></div>
            ) : (
              <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                {updating ? (
                  <div>
                    <Oval
                      className=""
                      color="#00BFFF"
                      height={200}
                      width={200}
                    />
                  </div>
                ) : (
                  <div className="h-100 w-100 p-5 mt-5 ">
                    {!city ? (
                      <div>
                        <img
                          alt=""
                          src="./map-image.png"
                          width=""
                          height=""
                          className="img-fluid"
                        />{" "}
                      </div>
                    ) : (
                      <div>
                        <h4>{`The current weather for ${city}`}</h4>
                        <img
                          alt=""
                          src={weatherImg}
                          width="150"
                          height="150"
                          className=""
                        />{" "}
                        <h1
                          style={{ marginTop: "5%" }}
                          className="align-middle"
                        >
                          {weather}
                        </h1>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const web3Modal = new Web3Modal({
  // Modal to connect wallets
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "9464eac6cd0d4d6a888fb8ace2f9dd0b",
      },
    },
  },
});
//logout the user and reloads the page
const logoutOfWeb3Modal = async () => {
  await web3Modal.clearCachedProvider();
  setTimeout(() => {
    window.location.reload();
  }, 1);
};
//Contract loader
function loadContract(abi, contractAddr) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(contractAddr, abi, signer);

  return contract;
}

function theCity(e) {
  for (let i = 0; i <= weathers.length; i++) {
    if (e === weathers[i]) {
      console.log(icons[i]);
      return icons[i];
    } else if (i === weathers.length) {
      return icons[weathers.length];
    }
  }
}

window.ethereum &&
  window.ethereum.on("chainChanged", (chainId) => {
    setTimeout(() => {
      window.location.reload();
    }, 1);
  });

export default App;
