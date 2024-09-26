import { useState } from "react";
import { IoIosNotificationsOutline, IoMdNotifications } from "react-icons/io";
import { UseVisible } from "../../hooks/UseVisible";
import { notifiactions } from "../../mocks/notification-mock";

export const Notificaiton: React.FC = () => {
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const { ref } = UseVisible(() => setShowNotification(false));
    const setShowNotificationHandler = () =>
        setShowNotification(!showNotification);

    return (
        <div className="relative" ref={ref}>
            <button type="button" onClick={setShowNotificationHandler}>
                {showNotification ? (
                    <IoMdNotifications size={24} />
                ) : (
                    <IoIosNotificationsOutline size={24} />
                )}
            </button>

            {showNotification && (
                <div className="absolute z-10 right-0 top-12 w-[320px] transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm   dark:bg-gray-800 dark:border-gray-600">
                    <div className="p-4">
                        <h2 className="text-md font-bold">Notificaitons</h2>
                        <div className="mt-2 mb-2">
                            {notifiactions.length ? null : (
                                <p className="text-sm text-center text-gray-400">
                                    No notifications
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
