import React from 'react';

const SubHeader = ({sub})=>(
  <li>{sub}</li>
)

const SubHeaders = ({headers})=>{
  return (
    <ul>
      {headers.map((sub)=><SubHeader key={sub.id} sub={sub.text}/>)}
    </ul>
  )
}

export default SubHeaders;