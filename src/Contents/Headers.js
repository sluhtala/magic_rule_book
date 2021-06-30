import React from 'react';

const Header = ({header})=>(
  <h2>{header}</h2>
)

const Headers = ({headers})=>{
  if (!headers || !headers.map)
    return '';
  return (
    <>
    {
      headers.map((h)=><Header key={h.id} header={h.text}/>)
    }
    </>
  );
}

export default Headers;