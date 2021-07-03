import React from 'react';
import { List } from 'semantic-ui-react';

const SubHeader = ({sub, subHeaderClick})=>{
  return (
    <List.Item className='ui' as='a' onClick={()=>subHeaderClick(sub)}>{sub}</List.Item>
  )
}


const SubHeaders = ({subHeaders, subHeaderClick})=>{
  return (
    <List>
      {subHeaders.map((sub)=>(
        <SubHeader
          key={sub.id}
          sub={sub.text}
          subHeaderClick={subHeaderClick}
          />))}
    </List>
  )
}

export default SubHeaders;