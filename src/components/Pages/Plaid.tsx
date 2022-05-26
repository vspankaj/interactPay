import React, { useCallback, useState, useEffect } from 'react';

import { usePlaidLink, PlaidLinkOnSuccess } from 'react-plaid-link';
import axios from "axios";
import './Plaid.css';
import { link } from 'fs';


const Plaid = () => {
  const [token, setToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [bankData, setBankData] = useState([{}])


  // get link_token from your server when component mounts


  useEffect(() => {
    async function fetchlinktocken() {
      let response = await axios.post("/api/create_link_token");
      console.log("link token" + JSON.stringify(response.data.link_token));
      setToken(response.data.link_token);
    }

    fetchlinktocken()
  }, [])

  const onSuccess = useCallback<PlaidLinkOnSuccess>((publicToken, metadata) => {
    console.log(publicToken, metadata);
    setBankData(metadata.accounts);
    let accessTocken = getAccessTocken(publicToken);
  }, []);

  async function getAccessTocken(publicToken: string) {
    var data = {
      public_token: publicToken
    };
    var response = await axios.post("/api/set_access_token", data);
    console.log(JSON.stringify(response));
    console.log(response.data.access_token);
    setAccessToken(response.data.access_token);
    return response.data.access_token;
  }

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
    // onEvent
    // onExit
  });

  async function getbanktocken() {
    var data = { access_token: accessToken, account_id: "9PxR9p9MajukGgdKZvkzc5d5kKDGDwtE9kMMv" };
    console.log(data)
    var response = await axios.post("/api/get_banktoken", data);
    console.log(JSON.stringify(response.data));
  }

  // async function linkstripe() {
  //   var data = { access_token: accessToken, account_id: "9PxR9p9MajukGgdKZvkzc5d5kKDGDwtE9kMMv" };
  //   console.log(data)
  //   var response = await axios.post("/api/get_banktoken", data);
  //   console.log(JSON.stringify(response.data));
  // }

  
  return (
    <>
      <div className='plaidLauncherContainer'>
        <div className='vertical-center'>
          <button className='btn btn-success d-block lnch-btn mb-2' onClick={() => open()} disabled={!ready}>
            Connect a bank account
          </button>
          {/* {(typeof bankData === 'undefined') ? (
        <p>loading</p>
      ) : (
        bankData.map((acc, i) => (
          <p key={i} > ${acc.name} </p>
        ))

      )} */}
          <button className='btn btn-secondary d-block lnch-btn mb-2' onClick={() => getbanktocken()}>
            Get Bank Tocken
          </button>

          
          {/* <button className='btn btn-secondary d-block lnch-btn' onClick={() => linkstripe()}>
            Link Stripe
          </button> */}
        </div>
      </div>
    </>
  );
};

export default Plaid;