import { useMemo } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { CiStreamOn } from "react-icons/ci";
import { MdOutlineHistory } from "react-icons/md";
import { CiCloudOn } from "react-icons/ci";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

interface MenuList {
    title: string;
    href: string;
    icon: IconType;
}

export const FixedMenu: React.FC = () => {
    const navigate = useNavigate();

    const { currentLocation } = useAppSelector((state) => state.app);

    const menuList: MenuList[] = useMemo(
        () => [
            {
                title: "Home",
                href: "/",
                icon: IoHomeOutline,
            },
            {
                title: "Stream",
                href: "/stream",
                icon: CiStreamOn,
            },
            {
                title: "History",
                href: "/history",
                icon: MdOutlineHistory,
            },
            {
                title: "Saved",
                href: "/saved",
                icon: CiCloudOn,
            },
        ],
        []
    );

    return (
        <div className="p-4 h-full shadow-slate-800 shadow-md w-[220px] overflow-hidden">
            <div className="pt-2 pb-2 border-b-2 border-b-slate-800">
                {menuList.map((el, key) => (
                    <div
                        onClick={() => navigate(el.href)}
                        key={key}
                        className={`first:mt-0 flex p-2 items-center hover:dark:bg-gray-800 mt-1 rounded-md cursor-pointer ${
                            currentLocation === el.href
                                ? "dark:bg-gray-800"
                                : ""
                        }`}
                    >
                        <el.icon size={21} />
                        <span className="ml-5 text-gray-300 text-sm">
                            {el.title}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
