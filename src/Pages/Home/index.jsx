import React from 'react';

import { Center, Text } from '../../components';
import MetaTag from '../../components/MetaTag';
import { Link } from 'react-router-dom';
import { FaArrowAltCircleRight } from "../../components/Icons";
import HeaderSpacer from '../../Layout/Header/HeaderSpacer';


const types = [
  {
    id: "100",
    label: "BILL ENTRY",
    url: '/bill-entry/create'
  }
]

const Home = () => {
  return (
    <>
      <MetaTag title="Home" />
      <HeaderSpacer />
      <Center>
        <div className='mt-5'>
          <Text tag='h1' className='fs-4' breeSerif>Available Generators</Text>
        </div>
        <ul className='mt-3 list-group list-group-flush'>
          {
            types.map(({ id, label, url }) => {
              return (
                <li key={id} className='list-group-item d-flex align-items-center'>
                  <FaArrowAltCircleRight />
                  <Link to={url} className='ms-3 link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'>{label}</Link>
                </li>
              )
            })
          }
        </ul>
      </Center>
    </>
  )
}

export default Home;