import React, { useEffect, useState } from 'react';
import { applySearchRules, applySearchHeaders, applySearchSubHeaders, findRules} from '../services/utils';
import { Divider, Grid, Header as UiHeader, Button } from 'semantic-ui-react';
import Headers from './Headers';
import Rules from './Rules';
import Searchbar from './Searchbar';

const Content = ({rBook})=>{
  const [newRules, setNewRules] = useState(rBook.rules);
  const [newHeaders, setNewHeaders] = useState([]);
  const [searchResultNumber, setSearchResultNumber] = useState(0);
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);
  const dAmount = 30;
  const [displayAmount, setDisplayAmount] = useState(dAmount);
  const [headersActive, setHeadersActive] = useState("");
  const [resultTitle, setResultTitle] = useState("Magic: The Gathering -rulebook")

  useEffect(()=>{
    setDisplayAmount(dAmount);
    if (search.length !== 0)
    {
      setSearching(true);
      const t = setTimeout(()=>{
        setNewRules(applySearchRules(rBook.rules, search));
        setSearching(false);
      },500)
      return ()=>{clearTimeout(t)}
    }
    setSearching(false);
  },[search, rBook.rules])

  const handleSearch = ({target})=>{
    setSearch(target.value)
    setSearching(false);
    if (target.value === '')
    {
		clearSearch();
    }else
      setHeadersActive('all');
  }

  const clearSearch = () =>{
	  setSearch('');
      setHeadersActive('');
      setNewRules(rBook.rules);
	  setResultTitle('Magic: The Gathering -rulebook');
  }

  useEffect(()=>{
    setSearchResultNumber(newRules.length)
  },[newRules])

  const showMore = ()=>{
    setDisplayAmount(displayAmount + dAmount);
  }

  useEffect(()=>{
    setNewHeaders(applySearchHeaders(rBook.headers, newRules, search));
  },[newRules, search, rBook.headers])

  const subHeaderClick = (header)=>{
    setSearch('');
    setNewRules(findRules(rBook.rules, parseInt(header)));
    setHeadersActive(header.substring(0,1));
	setResultTitle(header);
  }

  if (!rBook.headers || !rBook.subHeaders || !rBook.rules)
    return ('');

  return (
      <Grid stackable>
        <Grid.Row columns={2} divided>
          <Grid.Column width={5}>
            <Headers
              headers={newHeaders}
              subHeaders={applySearchSubHeaders(rBook.subHeaders, newRules, search)}
              subHeaderClick={subHeaderClick}
              headersActive={headersActive}
              />
          </Grid.Column>
          <Grid.Column width={11}>
            <Grid.Row>
              <Searchbar value={search} onChange={handleSearch} loading={searching}/>
              {searchResultNumber} results found
			  {search !== '' && <Button onClick={clearSearch} compact basic size='tiny'>clear</Button>}
            </Grid.Row>
            <Grid.Row>
              <Divider />
				<UiHeader>{search ? `Search result for:'${search}'` : resultTitle}</UiHeader>
				<Rules rules={newRules} setSearch={setSearch} displayAmount={displayAmount} showMore={showMore} rBook={rBook}/>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  );
}

export default Content;