import { motion, AnimatePresence } from 'framer-motion'

interface PopupProps {
  header: string;
  description: string;
  confirmContent: string;
  handleConfirm: any;
  handleClose: () => void;
  popup: boolean;
}

const Popup: React.FC<PopupProps> = ({
  header,
  description,
  confirmContent,
  handleConfirm,
  handleClose,
  popup
}) => {
    

  return (
    <AnimatePresence>
        {popup && (
            <motion.div
                initial={{ opacity: 0, y: 10  }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            >
            <div className="fixed left-[34%] top-[40%] z-50 flex justify-center items-center">
              <div className="w-[500px] shadow-2xl border border-black border-opacity-10 rounded-md bg-neutral-50 box-border p-10 dark:bg-neutral-900 dark:border-white dark:border-opacity-10 flex flex-col gap-10 justify-between">
                <div className="w-full flex flex-col gap-1">
                  <h1 className="text-2xl font-semibold dark:text-white">{header}</h1>
                  <p className="text-neutral-500">{description}</p>
                </div>
                <div className="w-full flex justify-end gap-2">
                  <button onClick={handleConfirm} className="h-[42px] py-1 px-2 border-2 border-red-400 rounded-md text-red-400 bg-red-200 bg-opacity-20 transition active:brightness-75 hover:brightness-90">
                    {confirmContent}
                  </button>
                  <button
                    onClick={handleClose}
                    className="h-[42px] py-1 px-2 border-black border-opacity-10 rounded-md bg-neutral-50 dark:bg-neutral-900 dark:border-white dark:border-opacity-10 dark:text-neutral-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            </motion.div>
        )}
    </AnimatePresence>
  );
};

export default Popup;
