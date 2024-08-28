import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: 'Home', slug: "/", active: true },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "SignUp", slug: "/signUp", active: !authStatus },
        { name: "All Posts", slug: "/all-posts", active: authStatus },
        { name: "Add Post", slug: "/add-post", active: authStatus },
    ];

    return (
        <header className='py-3 top-0 left-0 z-50 shadow bg-[#F4ACB7] text-white font-bold'>
            <Container>
                <nav className='relative flex items-center justify-between h-16 sm:h-20'>
                    <div className='sm:text-2xl'>
                        <Link to='/'>
                            <Logo />
                        </Link>
                    </div>

                    {/* Menu Icon for Small Screens */}
                    <div className="text-xl sm:hidden cursor-pointer z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <FontAwesomeIcon icon={faList} />
                    </div>

                    {/* Navigation Items */}
                    <div className={`absolute right-0 w-48 sm:w-auto bg-[#F4ACB7]  ${isMenuOpen ? 'top-full transition-all duration-300 ease-in-out opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible'} sm:opacity-100 sm:translate-y-0 sm:visible sm:flex sm:items-center sm:justify-center sm:gap-8  sm:bg-transparent sm:relative`}>
                        <ul className='flex flex-col sm:flex-row items-center gap-4 sm:gap-8 p-4 sm:p-0'>
                            {navItems.map((item) =>
                                item.active ? (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => navigate(item.slug)}
                                            className='inline-block px-4 py-2 duration-200 hover:bg-[#FFE5D9] hover:text-black rounded-full text-center text-sm sm:text-lg'
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                ) : null
                            )}
                            {authStatus && (
                                <li>
                                    <LogoutBtn />
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
            </Container>
        </header>
    );
}

export default Header;
