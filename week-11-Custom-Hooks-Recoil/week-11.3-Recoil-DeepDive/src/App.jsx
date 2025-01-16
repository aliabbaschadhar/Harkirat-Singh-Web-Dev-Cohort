import { useRecoilState, useRecoilValue } from 'recoil'
import './App.css'
import { jobsAtom, messagingAtom, networkAtom, notificationsAtom } from './store/atoms/atoms'
import { totalNotificationSelector } from './store/selectors';

function App() {

  // const networkNotificationCount = useRecoilValue(notificationsAtom);
  const [networkNotificationCount, setNetworkNotificationCount] = useRecoilState(networkAtom);
  const jobsCount = useRecoilValue(jobsAtom);
  const notificationCount = useRecoilValue(notificationsAtom);
  const messageCount = useRecoilValue(messagingAtom);

  const totalNotifications = useRecoilValue(totalNotificationSelector);

  return (
    <>
      <button>Home </button>

      <button
        onClick={() => setNetworkNotificationCount(n => n + 1)}
      >My Network ({networkNotificationCount >= 100 ? '99+' : networkNotificationCount})</button>

      <button>Jobs ({jobsCount})</button>
      <button>Messaging ({messageCount})</button>
      <button>Notification ({notificationCount})</button>

      <button>me ({totalNotifications})</button>
    </>
  )
}

export default App
