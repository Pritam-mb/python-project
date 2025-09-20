import React from 'react'
import {} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
export default function Header() {
    return (
        <header className="shadow sticky z-50 top-0">
            <nav >
                <div className="flex justify-between items-center bg-gray-800 text-white p-4">
                   <h2>aura</h2>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                to= "/"
                                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/chatbot"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    about
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/hospital"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    emergency
                                </NavLink>
                            </li>
                             {/* <li>
                                <NavLink
                                to="/contact"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Contact
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/github"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Github
                                </NavLink>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}


