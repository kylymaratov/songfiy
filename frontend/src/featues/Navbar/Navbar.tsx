import { Logo } from "../Logo/Logo";
import { BsArrowRightShort, BsSearch, BsList } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setOpenFloatMenu } from "../../store/slices/app-slice";
import { MiniProfile } from "../MiniProfile/MiniProfile";
import { Notificaiton } from "../Notification/Notification";
import { userInfo } from "../../mocks/user-mock";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { Ref } from "react";

interface Props {
    elementRef: Ref<HTMLDivElement>;
}

export const Navbar: React.FC<Props> = ({ elementRef }) => {
    /* Dispatch */
    const dispatch = useAppDispatch();

    /* Selectors */
    const { openFloatMenu } = useAppSelector((state) => state.app);
    const { isAuth } = useAppSelector((state) => state.user);

    const leftMenuHandler = () => {
        dispatch(setOpenFloatMenu(!openFloatMenu));
    };

    return (
        <div ref={elementRef} className="flex p-2 pl-4 pr-4 dark:bg-slate-800">
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center justify-start w-[35vw]">
                    <button type="button" onClick={leftMenuHandler}>
                        <BsList size={26} />
                    </button>
                    <a href="/" className="ml-3">
                        <Logo width={30} />
                    </a>
                </div>
                <div className="flex justify-center rounded-lg items-center w-[30vw] dark:bg-gray-900 pl-3 pr-3">
                    <span>
                        <BsSearch />
                    </span>
                    <input
                        className="ml-2 text-md outline-none border-2 border-collapse pt-2 pb-2 bg-transparent border-none w-full"
                        placeholder="Search by title, author, keywords"
                    />
                </div>
                <div className="flex items-center justify-end w-[35vw]">
                    {isAuth ? (
                        <>
                            <div className="mt-2 mr-4">
                                <button type="button">
                                    <MdOutlineFavoriteBorder size={21} />
                                </button>
                            </div>
                            <div className="mr-6 mt-2">
                                <Notificaiton />
                            </div>
                            <MiniProfile children={userInfo.firstname} />
                        </>
                    ) : (
                        <button
                            type="button"
                            className="flex text-sm items-center dark:bg-blue-600 rounded p-2 text-blue-dark"
                        >
                            Sign in
                            <span className="ml-1">
                                <BsArrowRightShort />
                            </span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
