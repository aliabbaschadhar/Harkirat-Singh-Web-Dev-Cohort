import { selector } from "recoil";
import { jobsAtom, messagingAtom, networkAtom, notificationsAtom } from "../atoms/atoms";

export const totalNotificationSelector = selector({
    key: "totalNotificationSelector",
    get: ({ get }) => {
        const networkAtomCount = get(networkAtom);
        const jobsAtomCount = get(jobsAtom);
        const notificationsAtomCount = get(notificationsAtom);
        const messagingAtomCount = get(messagingAtom);

        return networkAtomCount + jobsAtomCount + notificationsAtomCount + messagingAtomCount;
    }
})