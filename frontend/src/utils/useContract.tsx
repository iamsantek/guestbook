import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "./constants";
import contractABI from "./WavePortal.json";
import { useMetaMaskAccount } from "../context/MetaMaskAccountProvider";

export default function useContract() {
  const { abi } = contractABI;
  const { ethereum } = useMetaMaskAccount();
  let contract;

  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  }

  return { contract };
}
