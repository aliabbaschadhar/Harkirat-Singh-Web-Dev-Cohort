import { atom } from "recoil"

const networkAtom = atom({
    key: "networkAtom",
    default: 104,
})

const jobsAtom = atom({
    key: "jobsAtom",
    default: 0,
})

const notificationsAtom = atom({
    key: "notificationsAtom",
    default: 12,
})

const messagingAtom = atom({
    key: "messageAtom",
    default: 32,
})

export { networkAtom, jobsAtom, notificationsAtom, messagingAtom }