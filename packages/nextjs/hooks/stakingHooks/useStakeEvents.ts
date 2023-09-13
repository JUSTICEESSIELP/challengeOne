// import { useEffect, useState } from "react";
// import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

// const useStakeEvents = async (stakerContractBalance: number | null, exampleExternalContractBalance: number | null) => {
//   const [newEvents, setNewEvents] = useState<any[] | undefined>([]);
//   const [isLoadingEvent, setLoadingEvent] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchStakeEvents = async () => {
//       try {
//         const { data: stakeEvent, isLoading } = await useScaffoldEventHistory({
//           contractName: "Staker",
//           eventName: "Stake",
//           fromBlock: 0,
//         });

//         setNewEvents(stakeEvent);
//         setLoadingEvent(isLoading);
//         return stakeEvent;
//       } catch (error) {
//         // Handle errors here
//         console.error("Error fetching stake events:", error);
//         throw error; // Rethrow the error to propagate it to the caller
//       }
//     };

//     // Wrap the fetchStakeEvents function in a Promise
//     const fetchStakeEventsPromise = () => {
//       return new Promise((resolve, reject) => {
//         fetchStakeEvents().then(resolve).catch(reject);
//       });
//     };

//     // Call the fetchStakeEventsPromise function immediately
//     fetchStakeEventsPromise()
//       .then(() => {
//         console.log("Stake events fetched successfully");
//       })
//       .catch(error => {
//         console.error("Error fetching stake events:", error);
//       });
//   }, [stakerContractBalance, exampleExternalContractBalance]);

//   return { newEvents, isLoadingEvent };
// };

// export default useStakeEvents;
