import React from 'react';

const Hide = (props) =>(
  <>
    {
      props.hide ? ''
      :props.children
    }
  </>
)

export default Hide;