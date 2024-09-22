import { Logo } from '../Logo/Logo';
import { BsArrowRightShort, BsList } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setOpenFloatMenu } from '../../store/slices/app-slice';
import { MiniProfile } from '../MiniProfile/MiniProfile';
import { Notificaiton } from '../Notification/Notification';
import { userInfo } from '../../mocks/user-mock';
import { Ref, useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { apiRequest } from 'src/api/api';
import { setQuery, setSearchResult } from 'src/store/slices/search-slice';
import { Loading } from 'src/components/Loading/Loading';
import { Link, useNavigate } from 'react-router-dom';
import { TMusic } from 'src/types/music-types';
import { IoMdClose } from 'react-icons/io';

interface Props {
  upRef: Ref<HTMLDivElement>;
}

export const Navbar: React.FC<Props> = ({ upRef }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  const { query } = useAppSelector((state) => state.search);
  const { openFloatMenu } = useAppSelector((state) => state.app);
  const { isAuth } = useAppSelector((state) => state.user);

  const leftMenuHandler = () => {
    dispatch(setOpenFloatMenu(!openFloatMenu));
  };

  const goSearchPage = () => {
    navigate('/search');
  };

  const searchHandler = async () => {
    try {
      setSearchLoading(true);
      const response = await apiRequest<TMusic[]>(
        '/api/v1/music/search',
        'POST',
        {
          query,
        },
      );

      dispatch(setSearchResult(response));
    } catch (error) {
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    if (query.length) {
      const timeout = setTimeout(() => searchHandler(), 1000);

      return () => clearTimeout(timeout);
    } else {
      dispatch(setSearchResult([]));
    }
  }, [query]);

  return (
    <div ref={upRef} className="flex p-2 pl-4 pr-4 dark:bg-slate-800">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center justify-start w-[35vw]">
          <button type="button" onClick={leftMenuHandler} className="hidden">
            <BsList size={26} />
          </button>
          <Link to="/">
            <Logo width={30} />
          </Link>
        </div>
        <div className="flex justify-center rounded-lg items-center w-[28vw] dark:bg-slate-900 pl-3 pr-3">
          <span>
            <CiSearch size={22} />
          </span>
          <input
            onFocus={goSearchPage}
            onChange={(e) => dispatch(setQuery(e.target.value))}
            value={query}
            className="ml-3 text-sm outline-none border-2 border-collapse pt-2 pb-2 bg-transparent border-none w-full"
            placeholder="Search music by title, author, keywords"
          />
          {searchLoading && <Loading />}
          {query.length ? (
            <button className="ml-2" onClick={() => dispatch(setQuery(''))}>
              <IoMdClose size={22} />
            </button>
          ) : null}
        </div>
        <div className="flex items-center justify-end w-[35vw]">
          {isAuth ? (
            <>
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
