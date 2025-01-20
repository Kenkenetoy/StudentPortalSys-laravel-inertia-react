// src/Pages/Layouts/Layout.jsx
import ApplicationLogo from '@/Components/ApplicationLogo';
import ProfilePicture from '@/Components/ProfilePicture.jsx';
import UserName from '@/Components/UserName.jsx';
import { Link, usePage } from '@inertiajs/react';
import classNames from 'classnames';
import { useState } from 'react';

export default function Layout({ children, someProp }) {
    const [opened, setOpened] = useState(false);
    const user = usePage().props.auth.user;
    return (
        <>
            <header className="sticky top-0 z-30 uppercase text-gray-700">
                <div className="relative z-10 text-neutral-100">
                    <div className="flex h-10 items-center justify-start bg-neutral lg:justify-center">
                        <Link
                            href="/"
                            className="absolute left-1/2 z-20 max-h-16 max-w-16 -translate-x-1/2 transform lg:max-h-28 lg:max-w-28" // Center the logo
                        >
                            <ApplicationLogo />
                        </Link>
                        <div
                            className={classNames(
                                'tham tham-e-squeeze tham-w-6 cursor-pointer px-5 md:flex lg:hidden',
                                {
                                    'tham-active': opened, // Apply the white styling when active
                                },
                            )}
                            onClick={() => setOpened(!opened)} // Toggle state on click
                        >
                            <div className="tham-box">
                                <div className="tham-inner bg-base-200" />
                            </div>
                        </div>
                        <div className="hidden items-center justify-center gap-96 lg:flex">
                            <ul className="menu menu-horizontal w-full flex-nowrap justify-end p-0">
                                <li>
                                    <Link href={route('dashboard')}>News</Link>
                                </li>
                                <li>
                                    <Link href={route('dashboard')}>
                                        Careers
                                    </Link>
                                </li>
                                <li>
                                    <details>
                                        <summary>Info for</summary>
                                        <ul className="rounded-t-none bg-base-100 p-2 text-black">
                                            <li className="!lowercase">
                                                <Link
                                                    href={route('profile.edit')}
                                                >
                                                    Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                >
                                                    Log Out
                                                </Link>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                            </ul>
                            <ul className="menu menu-horizontal h-full w-full flex-nowrap p-0">
                                <li>
                                    <Link href={route('dashboard')}>Visit</Link>
                                </li>
                                <li>
                                    <Link href={route('dashboard')}>
                                        Contact Us
                                    </Link>
                                </li>
                                {user ? (
                                    <>
                                        <li className="dropdown dropdown-end h-1">
                                            <div
                                                tabIndex={0}
                                                role="button"
                                                className="avatar btn btn-circle btn-ghost"
                                            >
                                                <div className="w-auto rounded-full">
                                                    <ProfilePicture />
                                                </div>
                                            </div>
                                            <ul
                                                tabIndex={0}
                                                className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
                                            >
                                                <span className="rounded-md px-4 py-3 font-bold capitalize text-base-content">
                                                    <UserName />
                                                </span>
                                                <li>
                                                    <Link
                                                        href={route(
                                                            'dashboard',
                                                        )}
                                                        className="rounded-md px-3 py-2 capitalize text-base-content"
                                                    >
                                                        Dashboard
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={route(
                                                            'profile.edit',
                                                        )}
                                                        className="rounded-md px-3 py-2 capitalize text-base-content"
                                                    >
                                                        Profile
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={route('logout')}
                                                        method="post"
                                                        as="button"
                                                        className="rounded-md px-3 py-2 capitalize text-base-content"
                                                    >
                                                        Log Out
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link href={route('login')}>
                                                Sign In
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={route('register')}>
                                                Register
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="z-5 relative hidden lg:block">
                    <div className="flex h-16 items-center justify-center gap-40 overflow-x-hidden bg-base-100">
                        <ul className="menu menu-horizontal w-full flex-nowrap justify-end p-0 text-lg">
                            <li>
                                <Link href={route('dashboard')}>
                                    Education & research
                                </Link>
                            </li>
                            <li>
                                <Link href={route('dashboard')}>
                                    Admissions
                                </Link>
                            </li>
                        </ul>
                        <ul className="menu menu-horizontal w-full flex-nowrap p-0 text-lg">
                            <li>
                                <Link href={route('dashboard')}>
                                    life at liverpool
                                </Link>
                            </li>
                            <li>
                                <Link href={route('dashboard')}>
                                    who we are
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Dropdown Menu */}
                {opened && (
                    <div className="rounded bg-white shadow-lg md:block lg:hidden">
                        <ul className="p-2">
                            <li>
                                <a
                                    href="#home"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#about"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#contact"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </header>

            <main className="text-gray-700">{children}</main>

            <footer className="footer mx-auto">
                <footer className="footer bg-base-200 p-10 text-base-content">
                    <aside>
                        <svg
                            width="50"
                            height="50"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            className="fill-current"
                        >
                            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                        </svg>
                        <p>
                            ACME Industries Ltd.
                            <br />
                            Providing reliable tech since 1992
                        </p>
                    </aside>
                    <nav>
                        <h6 className="footer-title">Services</h6>
                        <a className="link-hover link">Branding</a>
                        <a className="link-hover link">Design</a>
                        <a className="link-hover link">Marketing</a>
                        <a className="link-hover link">Advertisement</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Company</h6>
                        <a className="link-hover link">About us</a>
                        <a className="link-hover link">Contact</a>
                        <a className="link-hover link">Jobs</a>
                        <a className="link-hover link">Press kit</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Legal</h6>
                        <a className="link-hover link">Terms of use</a>
                        <a className="link-hover link">Privacy policy</a>
                        <a className="link-hover link">Cookie policy</a>
                    </nav>
                </footer>
            </footer>
        </>
    );
}
