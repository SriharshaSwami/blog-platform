import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { navbarClass, navContainerClass, navBrandClass, navLinksClass, navLinkClass, navLinkActiveClass, primaryBtn } from '../styles/common'
import { useAuth } from '../store/authStore'
import { toast } from 'react-hot-toast'
import { useState } from 'react'

function Header() {
    const { currentUser, isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const onLogout = async () => {
        try {
            await logout()
            toast.success('Logged out successfully!')
            setIsMenuOpen(false)
            navigate('/login')
        } catch (err) {
            toast.error('Logout failed!')
        }
    }

    const closeMenu = () => setIsMenuOpen(false)

    return (
        <div className={navbarClass}>
            <div className={navContainerClass}>
                <span className={navBrandClass}>
                    <img className='w-10 rounded-full inline-block mr-2 align-middle' src={logo} alt='Blog App' />
                    Blog App
                </span>
                
                {/* Hamburger Button */}
                <button 
                    className='sm:hidden text-[#1d1d1f] p-2' 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    )}
                </button>

                {/* Desktop Nav */}
                <nav className='hidden sm:flex items-center gap-7'>
                    <ul className={navLinksClass}>
                        <li>
                            <NavLink to='/' className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}>Home</NavLink>
                        </li>
                        {!isAuthenticated && (
                            <>
                                <li>
                                    <NavLink to='register' className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}>Register</NavLink>
                                </li>
                                <li>
                                    <NavLink to='login' className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}>Login</NavLink>
                                </li>
                            </>
                        )}
                        {isAuthenticated && (
                            <>
                                <li>
                                    <NavLink to='userdashboard' className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}>UserProfile</NavLink>
                                </li>
                                <li>
                                    <NavLink to='authordashboard' className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}>AuthorProfile</NavLink>
                                </li>
                                <li>
                                    <NavLink to='admindashboard' className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}>AdminProfile</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                    {isAuthenticated && (
                        <div className='flex items-center gap-3 border-l border-[#e8e8ed] pl-7 ml-0'>
                            {(currentUser?.profileImageUrl || currentUser?.profileImage) && (
                                <img
                                    className='rounded-full w-8 h-8 object-cover border border-[#d2d2d7]'
                                    src={currentUser?.profileImageUrl || currentUser?.profileImage}
                                    alt="user"
                                />
                            )}
                            <button className={primaryBtn} onClick={onLogout}>Logout</button>
                        </div>
                    )}
                </nav>

                {/* Mobile Nav Dropdown */}
                {isMenuOpen && (
                    <div className='absolute top-[52px] left-0 w-full bg-white border-b border-[#e8e8ed] py-4 px-6 flex flex-col gap-4 sm:hidden z-40 shadow-sm'>
                        <ul className='flex flex-col gap-4'>
                            <li>
                                <NavLink to='/' className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass} onClick={closeMenu}>Home</NavLink>
                            </li>
                            {!isAuthenticated && (
                                <>
                                    <li>
                                        <NavLink to='register' className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass} onClick={closeMenu}>Register</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='login' className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass} onClick={closeMenu}>Login</NavLink>
                                    </li>
                                </>
                            )}
                            {isAuthenticated && (
                                <>
                                    <li>
                                        <NavLink to='userdashboard' className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass} onClick={closeMenu}>UserProfile</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='authordashboard' className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass} onClick={closeMenu}>AuthorProfile</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='admindashboard' className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass} onClick={closeMenu}>AdminProfile</NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                        {isAuthenticated && (
                            <div className='flex items-center justify-between border-t border-[#e8e8ed] pt-4 mt-2'>
                                <div className='flex items-center gap-3'>
                                    {(currentUser?.profileImageUrl || currentUser?.profileImage) && (
                                        <img
                                            className='rounded-full w-8 h-8 object-cover border border-[#d2d2d7]'
                                            src={currentUser?.profileImageUrl || currentUser?.profileImage}
                                            alt="user"
                                        />
                                    )}
                                    <span className='text-sm font-medium text-[#1d1d1f]'>{currentUser?.username}</span>
                                </div>
                                <button className={primaryBtn} onClick={onLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header
