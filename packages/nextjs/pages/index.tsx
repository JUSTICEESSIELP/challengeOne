import React, { useCallback } from "react";
import { formatEther } from "ethers/lib/utils";
import humanizeDuration from "humanize-duration";
import type { NextPage } from "next";
import { Spinner } from "~~/components/Spinner";
import { Address, Balance } from "~~/components/scaffold-eth";
import {
  useAccountBalance,
  useDeployedContractInfo,
  useScaffoldContractRead,
  useScaffoldContractWrite,
  useScaffoldEventHistory,
} from "~~/hooks/scaffold-eth";

const Home: NextPage = ({}) => {
  const { data: StakerContract } = useDeployedContractInfo("Staker");
  const { data: ExampleExternalContact } = useDeployedContractInfo("ExampleExternalContract");
  const { balance: stakerContractBalance } = useAccountBalance(StakerContract?.address);
  const { balance: exampleExternalContractBalance } = useAccountBalance(ExampleExternalContact?.address);

  console.log(stakerContractBalance, "stakerContractBalance");
  console.log(exampleExternalContractBalance, "exampleExternalContractBalance: ");

  // Contract Read Actions
  const { data: withDrawTime } = useScaffoldContractRead({
    contractName: "Staker",
    functionName: "withdrawalTimeLeft",
    watch: true,
  });
  const { writeAsync: stakeETH } = useScaffoldContractWrite({
    contractName: "Staker",
    functionName: "stake",
    value: "0.5",
  });
  const { data: claim } = useScaffoldContractRead({
    contractName: "Staker",
    functionName: "claimPeriodLeft",
    watch: true,
  });
  // const { data: myStake } = useScaffoldContractRead({
  //   contractName: "Staker",
  //   functionName: "balances",
  //   args: [connectedAddress],
  //   watch: true,
  // });
  const { data: isStakingCompleted } = useScaffoldContractRead({
    contractName: "ExampleExternalContract",
    functionName: "completed",
    watch: true,
  });

  const { data: stakeEvents, isLoading } = useScaffoldEventHistory({
    contractName: "Staker",
    eventName: "Stake",
    fromBlock: 0,
  });

  // Contract Write Actions
  const { writeAsync: execute } = useScaffoldContractWrite({
    contractName: "Staker",
    functionName: "execute",
  });
  const { writeAsync: withdraw } = useScaffoldContractWrite({
    contractName: "Staker",
    functionName: "withdraw",
  });

  const handleExecuteButton = useCallback(async () => {
    try {
      await execute();
    } catch (error) {
      // Handle errors here
    }
  }, [execute]);

  const handleWithdrawButton = useCallback(async () => {
    try {
      await withdraw();
    } catch (error) {
      // Handle errors here
    }
  }, [withdraw]);

  const handleStakeButton = useCallback(async () => {
    try {
      // Call the stakeETH function with the value
      await stakeETH();

      // Handle any success actions here
    } catch (error) {
      // Handle errors here
    }
  }, [stakeETH]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <Spinner width="75" height="75" /> {/* Replace with your spinner component */}
      </div>
    );
  }

  return (
    <div className="flex flex-col item-center">
      <div className="flex flex-row justify-between border shadow-md  w-auto px-20 h-auto">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">
            StackerContract Address: <Address address={StakerContract?.address} size="lg" />{" "}
          </h2>

          <p className="mt-2">
            <Balance address={StakerContract?.address} className="font-bold" /> ETH
          </p>
        </div>
        <div className="flex flex-row gap-12 items-center">
          <div className="bg-gray p-3 shadow-md rounded border ">
            <div className=" card card-title">
              <h1>Withdrawal TimeLeft</h1>
            </div>

            <span>{withDrawTime ? `${humanizeDuration(Number(withDrawTime) * 1000)}` : 0}</span>
          </div>
          <div className="bg-gray p-3 shadow-md rounded border ">
            <div className=" card card-title ">
              <h1>Claim Deadline TimeLeft</h1>
            </div>
            <span>{claim ? `${humanizeDuration(Number(claim) * 1000)}` : 0}</span>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">
            {" "}
            ExampleExternalContract Address :<Address address={ExampleExternalContact?.address} size="lg" />
          </h2>

          <p className="mt-2">
            <Balance address={ExampleExternalContact?.address} className="font-bold" />
          </p>
        </div>
      </div>

      {/* Your JSX for the rest of the component */}
      <button className="px-4 py-2 rounded ring-0 bg-blue-200  ring-gray-500" onClick={() => handleStakeButton()}>
        Stake
      </button>
      <button className="px-4 py-2 rounded ring-0 bg-red-200  ring-gray-500" onClick={() => handleWithdrawButton()}>
        Withdraw
      </button>
      <button className="px-4 py-2 rounded ring-0 bg-green-200  ring-gray-500" onClick={() => handleExecuteButton()}>
        {" "}
        📡 Execute!
      </button>

      {/* <button
        className={`btn btn-sm btn-ghost flex flex-col font-normal items-center hover:bg-transparent `}
        onClick={onToggleBalance}
      >
        <div className="w-full flex items-center justify-center">
          {isEthBalance ? (
            <>
              <span>{formatEther("5")}</span>
              <span className="text-xs font-bold ml-1">{configuredNetwork.nativeCurrency.symbol}</span>
            </>
          ) : (
            <>
              <span className="text-xs font-bold mr-1">$</span>
              <span>{(parseFloat("5") * price).toFixed(2)}</span>
            </>
          )}
        </div>
      </button> */}

      {isStakingCompleted && (
        <div className="flex flex-col items-center gap-2 bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-6 mt-12 w-full max-w-lg">
          <p className="block m-0 font-semibold">
            {" "}
            🎉 &nbsp; Staking App triggered `ExampleExternalContract` &nbsp; 🎉{" "}
          </p>
          <div className="flex items-center">
            <p className="block m-0 text-lg -ml-1">staked !!</p>
          </div>
        </div>
      )}

      <div className="overflow-x-auto shadow-lg mx-auto mt-10">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th className="bg-primary">From</th>
              <th className="bg-primary">Value</th>
            </tr>
          </thead>
          <tbody>
            {!stakeEvents || stakeEvents.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center">
                  No events found
                </td>
              </tr>
            ) : (
              stakeEvents?.map((event: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>
                      <Address address={event.args && event.args[0]} />
                    </td>
                    <td>{event?.args?.amount && formatEther(event?.args?.amount)} ETH</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
