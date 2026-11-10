//framer motion
import { AnimatePresence } from "framer-motion";

//components
import AlertDownload from "./AlertDownload";

interface DownloadNotificationProps {
  showAlert: boolean;
  fileName: string;
  /** Muda a cada clique no botão de download */
  triggerId: number;
  onClose: () => void;
}

const DownloadNotification = ({ showAlert, fileName, triggerId, onClose }: DownloadNotificationProps) => {
  return (
    <AnimatePresence>
      {showAlert && <AlertDownload fileName={fileName} triggerId={triggerId} onClose={onClose} />}
    </AnimatePresence>
  );
};

export default DownloadNotification;
