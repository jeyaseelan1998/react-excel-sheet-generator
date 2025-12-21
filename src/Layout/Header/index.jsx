import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { xls_file } from '../../components/Images';
import { Center, Text } from '../../components';

import style from "./style.module.css";

const nav = [
    {
        id: "001",
        label: "Home",
        url: "/"
    },
    {
        id: "002",
        label: "History",
        url: "/history"
    },
    {
        id: "003",
        label: "Admin",
        url: "/admin"
    },
]

const Header = () => {
    const { pathname } = useLocation();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <Center>
                <a className="navbar-brand d-flex align-items-center" href="/">
                    <img src={xls_file} alt="Logo" width="30" height="24" className={`d-inline-block align-text-top ${style.navBarLogo}`} />
                    <Text tag="span" className='ms-2' breeSerif>XLSX Generator</Text>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        {
                            nav.map(({ id, label, url }) => {
                                return (
                                    <li className="nav-item" key={id}>
                                        <Link class={`nav-link${pathname === url ? ' active' : ''}`} aria-current="page" to={url}>{label}</Link>
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