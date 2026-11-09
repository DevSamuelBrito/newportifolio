//framer motion
import { AnimatePresence } from "framer-motion";

//components
import AlertDownload from "./AlertDownload";

interface DownloadNotificationProps {
    showAlert: boolean;
}
const DownloadNotification = ({ showAlert }: DownloadNotificationProps) => {

    return (
        <AnimatePresence>
            {
                showAlert && <AlertDownload />
            }
        </AnimatePresence>
    );
}

export default DownloadNotification;