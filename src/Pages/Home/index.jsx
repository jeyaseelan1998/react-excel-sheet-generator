import React from 'react';

import { Center } from '../../components';
import MetaTag from '../../components/MetaTag';
import { Link } from 'react-router-dom';


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
      <Center>
        <div className='row justify-content-center'>
          <ul className='mt-5 list-group  col-12 col-md-4'>
            {
              types.map(({ id, label, url }) => {
                return (
                  <li key={id} className='list-group-item'>
                    <Link to={url}>{label}</Link>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </Center>
    </>
  )
}

export default Home;