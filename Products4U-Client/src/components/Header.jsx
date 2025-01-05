import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Link } from 'react-router-dom';

const Header = () => {
    const { user, logOut, loading, userDetails } = useContext(AuthContext);

    return (
        <div className="pb-10 bg-black p-5 text-white">
            <div className="navbar bg-black pb-5">
                <div className="flex-1">
                    <Link className="lg:text-6xl md:text-4xl text-2xl md:font-extrabold font-bold" to={'/'}>Products4U</Link>
                </div>
                <div className="flex-none w-1/4 justify-around items-center">
                    <div className="w-5/6 login flex justify-around items-center">
                        {
                            user && user?.email ?
                                <div className="px-5 text-center">
                                    <img src={user.photoURL} className='rounded-full w-10 h-10'/>
                                    <p className='font-bold'>{user.displayName}</p>
                                </div> :
                                <img src="https://i.pinimg.com/736x/3b/73/48/3b73483fa5af06e3ba35f4f71e541e7a.jpg" alt="Dummy User Picture" className="w-10 h-10 rounded-full" />
                        }
                        {user && user?.email ? (
                            <div className='flex flex-row gap-2'>
                                <Link to="/myQueries" className="btn bg-blue-700 text-white border-none rounded-full">My Queries</Link>
                                <button onClick={logOut} className="btn btn-error border-none rounded-full">Log Out</button>
                            </div>
                        ) : (
                            <Link to="/auth/login" className="btn bg-black text-white rounded-full">Login</Link>
                        )}
                    </div>
                </div>
            </div>
            <div className="menu menu-horizontal bg-black w-full flex justify-around">
                <Link className='w-1/6 hover:bg-white hover:text-black border-white hover:border-none border-2 h-10 items-center justify-center flex rounded-full lg:text-2xl md:text-xl text-l font-bold py-6' to={"/"}>Home</Link>
                <Link className='w-1/6 hover:bg-white hover:text-black h-10 hover:border-none border-white border-2 items-center justify-center flex rounded-full lg:text-2xl md:text-xl text-l font-bold py-6' to={'/queries'}>Queries</Link>

                {/* Conditional rendering for logged-in users */}
                {user && user?.email && (
                    <>
                        <Link className='w-1/6 hover:bg-white hover:text-black hover:border-none border-white border-2 h-10 items-center justify-center flex rounded-full lg:text-2xl md:text-xl text-l font-bold py-6' to={'/myQueriesRecommendations'}>Recom. For Me</Link>
                        <Link className='w-1/6 hover:bg-white hover:text-black hover:border-none border-white border-2 h-10 items-center justify-center flex rounded-full lg:text-2xl md:text-xl text-l font-bold py-6' to={'/myRecommendations'}>My Recom.</Link>
                    </>
                )}
            </div>
        </div>
    );
}
export default Header;