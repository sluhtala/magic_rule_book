import React from 'react';
import { Input } from 'semantic-ui-react';

const Searchbar = ({value, onChange})=>{
  return (<>
    <Input placeholder='search' fluid icon='search' value={value} onChange={onChange} />
  </>);
}
export default Searchbar;