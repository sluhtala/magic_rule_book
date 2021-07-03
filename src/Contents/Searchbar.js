import React from 'react';
import { Input } from 'semantic-ui-react';

const Searchbar = ({value, onChange, loading})=>{
  return (<>
    <Input placeholder='search'
      fluid
      icon='search'
      value={value}
      onChange={onChange}
      loading={loading}
      />
  </>);
}
export default Searchbar;