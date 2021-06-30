import React, { useEffect, useState } from 'react';
import { applySearchRules, applySearchHeaders, applySearchSubHeaders} from '../services/utils';
import { Button, Container, Divider, Grid } from 'semantic-ui-react';
import Headers from './Headers';
import SubHeaders from './Subheaders';
import Rules from './Rules';
import Searchbar from './Searchbar';

const Content = ({rBook, setIsLoading})=>{
  const [newRules, setNewRules] = useState([]);
  const [newHeaders, setNewHeaders] = useState([]);
  const [page, setPage] = useState(1);
  const [searchResultNumber, setSearchResultNumber] = useState(0);
  const resultsAmount = 30;
  const [search, setSearch] = useState('');

  useEffect(()=>{
    setPage(1);
  },[search])

  useEffect(()=>{
    setIsLoading(true);
    const t = setTimeout(async ()=>{
      setNewRules(applySearchRules(rBook.rules, search));
    },100)
    return ()=>{
      clearTimeout(t);
    }
  },[search, rBook.rules, page, setIsLoading])

  useEffect(()=>{
    setSearchResultNumber(newRules.length)
  },[newRules])

  // setnewheaders
  useEffect(()=>{
    setIsLoading(true);
    const t = setTimeout(async ()=>{
      setNewHeaders(applySearchHeaders(rBook.headers, newRules, search));
      setIsLoading(false);
    }, 100)
    return ()=>{
      clearTimeout(t);
    }
  },[newRules, search, rBook.headers, setIsLoading])

  if (!rBook.headers || !rBook.subHeaders || !rBook.rules)
    return ('');

  return (
      <Grid stackable>
        <Grid.Row columns={2}>
          <Grid.Column width={5}>
            <Headers headers={newHeaders}/>
            <SubHeaders headers={applySearchSubHeaders(rBook.subHeaders, newRules, search)}/>
          </Grid.Column>
          <Grid.Column>
          <Searchbar value={search} onChange={({target})=>{setSearch(target.value)}}/>
          {searchResultNumber} results found
          <Divider />
            <Rules rules={newRules.slice(0, page * resultsAmount)}/>
            {searchResultNumber >= page * resultsAmount && <Button icon='arrow down' onClick={()=>{setPage(page + 1)}}/>}
          </Grid.Column>
        </Grid.Row>
      </Grid>
  );
}

export default Content;