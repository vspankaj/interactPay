import React, { useEffect, useState } from 'react';

function Stripe() {
    const [backendData, setBackendData] = useState([{}])
    useEffect(() => {
        fetch("/api")
            .then(res => res.json())
            .then(
                data => {
                    console.log(data)
                    setBackendData(data)
                }
            )
    }, []);

    return (
        <>
            <h1>Add Stripe code Here</h1>
            <div>

                {(typeof backendData === 'undefined') ? (
                    <p>loading</p>
                ) : backendData.message}
            </div>
        </>
    )

}
export default Stripe