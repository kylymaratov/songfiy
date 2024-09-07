import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Helemt } from "../Helmet/Helmet";
import { UseVisible } from "../../hooks/UseVisible";
import { setOpenFloatMenu } from "../../store/slices/app-slice";
import { IoMdClose } from "react-icons/io";

export const FloatMenu: React.FC = () => {
    /* Dispatch */
    const dispatch = useAppDispatch();
    /* Selectors */

    const { openFloatMenu } = useAppSelector((state) => state.app);
    const { ref } = UseVisible(() => dispatch(setOpenFloatMenu(false)));

    const leftMenuHandler = () => dispatch(setOpenFloatMenu(!openFloatMenu));

    return (
        <>
            {openFloatMenu && <Helemt />}
            <div
                ref={ref}
                className={`absolute shadow-slate-800 top-0 p-4 dark:bg-slate-950 h-full shadow-md w-[400px] transition-all duration-300 z-20 ${
                    openFloatMenu ? "right-0" : "right-[-400px]"
                }`}
            >
                <div className="flex items-center justify-start">
                    <button type="button" onClick={leftMenuHandler}>
                        <IoMdClose size={26} />
                    </button>
                </div>
            </div>
        </>
    );
};
