// import { useRecoilValue, useRecoilState, RecoilRoot, useSetRecoilState } from 'recoil'
// import { jobsAtom, messagingAtom, networkAtom, notificationAtom } from './atoms'

// function App(){
//   return <RecoilRoot>
//     <MainApp />
//   </RecoilRoot>
// }

// function MainApp() {
//   const networkNotificationCount = useRecoilValue(networkAtom)
//   const jobsAtomCount = useRecoilValue(jobsAtom)
//   const notificationAtomCount = useRecoilValue(notificationAtom)
//   //const [messagingAtomCount, setMessagingAtomCount] = useRecoilState(messagingAtom)
//   const messagingAtomCount = useRecoilValue(messagingAtom)

//   return (
//     <>
//       <button>Home</button>
//       <button>My Network({networkNotificationCount >= 100 ? "99+" : networkNotificationCount})</button>
//       <button>Jobs ({jobsAtomCount})</button>
//       <button>Messaging ({messagingAtomCount})</button>
//       <button>Notification ({notificationAtomCount} )</button>
//       {/* <button onClick={()=>{
//         setMessagingAtomCount(messagingAtomCount + 1);
//       }}>Me</button> */}

//       <ButtonUpdater />

//     </>
//   )
// }

// function ButtonUpdater(){
//   const setMessagingAtomCount = useSetRecoilState(messagingAtom);
//   return <button onClick={()=>{
//     setMessagingAtomCount(c=>c+1);
//   }}>Me</button>
// }

// export default App



// selector 


// import { useRecoilValue, useRecoilState, RecoilRoot, useSetRecoilState } from 'recoil'
// import { jobsAtom, messagingAtom, networkAtom, notificationAtom, notifications, totalNotificationSelector } from './atoms'

// function App(){
//   return <RecoilRoot>
//     <MainApp />
//   </RecoilRoot>
// }

// function MainApp() {
//   const networkNotificationCount = useRecoilValue(networkAtom)
//   const jobsAtomCount = useRecoilValue(jobsAtom)
//   const notificationAtomCount = useRecoilValue(notificationAtom)
//   const messagingAtomCount = useRecoilValue(messagingAtom)

//   // const totalNotificationCount = useMemo(()=>{
//   //   return networkNotificationCount + jobsAtomCount + notificationAtomCount + messagingAtomCount;
//   // }, [networkNotificationCount, jobsAtomCount, notificationAtomCount, messagingAtomCount])

//   // we will calculate the totalNotificationCount only if any of [networkNotificationCount, jobsAtomCount, notificationAtomCount, messagingAtomCount] changes, similar thing we can do with selectors in recoil

//   const totalNotificationCount = useRecoilValue(totalNotificationSelector); 

//   return (
//     <>
//       <button>Home</button>
//       <button>My Network({networkNotificationCount >= 100 ? "99+" : networkNotificationCount})</button>
//       <button>Jobs ({jobsAtomCount})</button>
//       <button>Messaging ({messagingAtomCount})</button>
//       <button>Notification ({notificationAtomCount} )</button>
//       <button>Me({totalNotificationCount})</button>
//     </>
//   )
// }


// export default App



//  Asynchronous Data Query



import { useRecoilValue, useRecoilState, RecoilRoot, useSetRecoilState } from 'recoil'
import { notifications, totalNotificationSelector } from './atoms'
// import { useEffect } from 'react';

function App(){
  return <RecoilRoot>
    <MainApp />
  </RecoilRoot>
}

function MainApp() {

  const [networkCount, setNetworkCount] = useRecoilState(notifications)
  const totalNotificationCount = useRecoilValue(totalNotificationSelector); 

  // useEffect(()=>{
  //   //fetch
  //   fetch("http://localhost:4000/notifications")
  //   .then(res => res.json())
  //   .then(data => {
  //     setNetworkCount(data)
    
  //   // axios.get("http://localhost:4000/notifications")
  //   // .then(res =>{
  //   //   setNetworkCount(res.data)
  //   // })
  // })
// })

  return (
    <>
      <button>Home</button>
      <button>My Network({networkCount.network >= 100 ? "99+" : networkCount.network})</button>
      <button>Jobs ({networkCount.jobs})</button>
      <button>Messaging ({networkCount.messaging})</button>
      <button>Notification ({networkCount.notifications} )</button>
      <button>Me({totalNotificationCount})</button>
    </>
  )
}


export default App
