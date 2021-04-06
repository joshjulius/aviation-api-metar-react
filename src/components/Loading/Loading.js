import React, { useContext } from 'react';

import { AppContext } from '../context';

const Loading = () => {
    const {message} = useContext(AppContext);
    return <p>{message}</p>
}

export default Loading;