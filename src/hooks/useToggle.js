import { useState } from 'react';

function useToggle(initialVal = false) {
  const [state, setState] = useState(initialVal);
  const toggle = () => {
    setState(!state);
    console.log('toggle IT');
  };
  return [state, toggle];
}

export default useToggle;
