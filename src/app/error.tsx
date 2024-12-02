'use client';
import {useEffect} from 'react';

const Error = ({error}: {error: Error}) => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(error);
  }, [error]);

  return (
    <div className="flex justify-center text-red-600 text-3xl my-8">
      {error.message}
    </div>
  );
};

export default Error;
