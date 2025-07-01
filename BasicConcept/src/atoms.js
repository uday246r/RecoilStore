// import { atom, selector } from "recoil";

// export const networkAtom = atom({
//     key: "networkAtom",
//     default: 102
// });

// export const jobsAtom = atom({
//     key: "jobsAtom",
//     default: 0
// });

// export const notificationAtom = atom({
//     key: "notificationAtom",
//     default: 12
// });

// export const messagingAtom = atom({
//     key: "messagingAtom",
//     default: 0
// });

// export const totalNotificationSelector = selector({
//     key: "totalNotificationSelector",
//     get: ({get}) => {
//         const networkAtomCount = get(networkAtom);
//         const jobsAtomCount = get(jobsAtom);
//         const notificationsAtomCount = get(notificationAtom);
//         const messagingAtomCount = get(messagingAtom);
//         return networkAtomCount + jobsAtomCount + notificationsAtomCount + messagingAtomCount
//     }
// })

// // value is the function which gives acces to get object and here we define how this selector depends on other things

// Asynchronous Data Query


import { atom, selector } from "recoil";
import axios from 'axios';

export const notifications = atom({
    key: "networkAtom",
    // default: { 
    //     network:0,
    //     jobs:0,
    //     notifications:0,
    //     messaging:0
    // }
    default: selector({
        key: "networkAtomSelector",
        get: async () => {
            const res = await axios.get("http://localhost:4000/notifications")
            return res.data
        }
    })
});

export const totalNotificationSelector = selector({
    key: "totalNotificationSelector",
    get: ({get}) => {
        const allNotifications = get(notifications);
        return allNotifications.network + 
        allNotifications.jobs + 
        allNotifications.notifications + 
        allNotifications.messaging
    }
})

