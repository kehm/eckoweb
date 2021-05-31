import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook for running a standard GET against an API with axios
 *
 * @param {string} url API url
 */
const useFetch = (url) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(
            url,
            {
                headers: { 'Accept': 'application/json' },
                timeout: process.env.REACT_APP_HTTP_TIMEOUT,
            },
        ).then((res) => {
            if (res.data.rows !== undefined) {
                setData(res.data.rows);
            } else setData(res.data);
        }).catch(() => { });
    }, [url]);

    return data;
};

export default useFetch;
