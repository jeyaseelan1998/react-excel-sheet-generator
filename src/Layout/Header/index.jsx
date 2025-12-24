import React, { use } from 'react';
import { Link, useLocation, useOutletContext } from 'react-router-dom';

import { xls_file } from '../../components/Images';
import { Center, Text } from '../../components';
import { words } from '../../utils/constants';

import style from "./style.module.css";
import { get } from 'lodash';

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
        permission: import.meta.env.VITE_APP_SUPER_ADMIN
    },
]

const Header = ({ user }) => {
    const { pathname } = useLocation();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm fixed-top">
            <Center>
                <a className="navbar-brand d-flex align-items-center" href="/">
                    <img src={xls_file} alt="Logo" width="30" height="24" className={`d-inline-block align-text-top ${style.navBarLogo}`} />
                    <Text tag="span" className='ms-2' breeSerif>{words.appName}</Text>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        {
                            nav.map(({ id, label, url, permission }) => {
                                if (permission && permission !== get(user, 'role')) {
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
            </Center>
        </nav>
    )
}

export default Header;