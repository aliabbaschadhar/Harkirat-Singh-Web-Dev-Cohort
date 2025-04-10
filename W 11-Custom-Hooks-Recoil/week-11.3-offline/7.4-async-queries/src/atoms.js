import axios from "axios";
import { atom, selector } from "recoil";

export const notifications = atom({
    key: "networkAtom",
    default: selector({
        //This is how we do asynchronous data queries in recoil
        // By making selector in an atom.
        key: "networkAtomSelector",
        get: async () => {
            const res = await axios.get("/https://sum-server.100xdevs.com/notifications")
            return res.data;
        }
    })
});

export const totalNotificationSelector = selector({
    key: "totalNotificationSelector",
    get: ({ get }) => {
        const allNotifications = get(notifications);
        return allNotifications.network +
            allNotifications.jobs +
            allNotifications.notifications +
            allNotifications.messaging
    }
})