import React, { useState, useEffect, useCallback } from 'react';
import { Input, Loader } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

const App = ()=>{
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false)

  useEffect(()=>{

  },[loading])

  useEffect(()=>{
    if (search === '')
      return ;
    console.log('searching...')
    setLoading(true);
    const t = setTimeout(()=>{
      setLoading(false)
      console.log('done')
    },2000)

    return ()=>{
      console.log(t)
      clearTimeout(t)
      console.log('cleared')
    }
  }, [search])

  useEffect(()=>{

  },[])

  return (
    <div>
      <Input icon='search' value={search} onChange={({target})=>{setSearch(target.value)}}/>
      <Loader active={loading}/>
    </div>
  );
}

export default App;