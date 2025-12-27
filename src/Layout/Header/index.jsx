import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { xls_file } from '../../components/Images';
import { Center, Text } from '../../components';
import { words } from '../../utils/constants';

import style from "./style.module.css";
import { get } from 'lodash';
import { BiExit } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { deleteCookie, isSuperAdmin } from '../../utils/storage';

const Header = ({ user }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            deleteCookie('token');
            toast.info("Logged out successfully");
            navigate("/guest/login");
        } catch (error) {
            toast.error(error.message);
        }
    }

    const nav = [
        {
            id: "001",
            label: "Home",
            url: "/"
        },
        {
            id: "003",
            label: "Admin",
            url: "/admin",
            hasPermission: isSuperAdmin(user)
        }
    ]

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm fixed-top">
            <Center>
                <a className="navbar-brand d-flex align-items-center" href="/">
                    <img src={xls_file} alt="Logo" width="30" height="24" className={`d-inline-block align-text-top ${style.navBarLogo}`} />
                    <Text tag="span" className='ms-2' breeSerif>{words.appName}</Text>
                </a>
                <button className='btn btn-sm btn-outline-danger d-inline d-lg-none ms-auto me-3' title='Logout' onClick={handleLogout}>
                    <span className='d-none d-sm-inline me-2'>Logout</span>
                    <BiExit />
                </button>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        {
                            nav.map(({ id, label, url, hasPermission }) => {
                                if (hasPermission === false) {
                                    return null;
                                }
                                return (
                                    <li className="nav-item" key={id}>
                                        <Link className={`nav-link${pathname === url ? ' active' : ''}`} aria-current="page" to={url}>{label}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <button className='btn btn btn-outline-danger d-none d-lg-inline' title='Logout' onClick={handleLogout}>
                    Logout <BiExit />
                </button>
            </Center>
        </nav>
    )
}

export default Header;