import LogoIcon from "../../assets/logo.png";

interface Props {
    width?: number;
    height?: number;
}

export const Logo: React.FC<Props> = ({ width, height }) => {
    return (
        <div className="flex items-center group">
            <img
                src={LogoIcon}
                alt="logo"
                width={width || 40}
                height={height || 40}
            />
            <h3 className="font-bold text-[20px] tracking-tight">
                Song
                <span className="text-blue-400 group-hover:ml-1 transition-all">
                    fiy
                </span>
            </h3>
        </div>
    );
};
