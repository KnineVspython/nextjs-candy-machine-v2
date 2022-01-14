import { NextPage } from "next";
import Head from "next/head";
import useWalletBalance from "../context/WalletBalanceProvider";
import MintMain from "../components/mint/MintMain";
import * as anchor from "@project-serum/anchor";

const getCandyMachineId = (): anchor.web3.PublicKey | undefined => {
  try {
    const candyMachineId = new anchor.web3.PublicKey(
      process.env.NEXT_PUBLIC_CANDY_MACHINE_ID!
    );

    return candyMachineId;
  } catch (e) {
    console.log("Failed to construct CandyMachineId", e);
    return undefined;
  }
};

const candyMachineId = getCandyMachineId();
const rpcHost = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const startDate = parseInt(process.env.NEXT_PUBLIC_CANDY_START_DATE!, 10);
const txTimeout = 30000;

const About: NextPage = () => {
  const [balance] = useWalletBalance();

  return (
    <div>
      <Head>
        <title>About Update Settings</title>
      </Head>

      <main>
        <h1 className="text-3xl font-bold underline">About Update Settings</h1>
        <p>{balance}</p>
        <MintMain
          candyMachineId={candyMachineId}
          connection={connection}
          startDate={startDate}
          txTimeout={txTimeout}
          rpcHost={rpcHost}
        />
      </main>
    </div>
  );
};

export default About;