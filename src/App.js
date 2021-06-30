import React, { useState, useEffect } from 'react';
import dataService from './services/dataService';
import parser from './services/parser'
import { Input, Loader, Icon, Container, Header, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import Hide from './Components/Hide'
import Contents from './Contents';

function App(){
  //const [data, setData] = useState("");
  const [rBook, setRBook] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(()=>{
    setIsLoading(true);
    setTimeout(()=>{
    dataService.getData()
    .then((res)=>{
      //setData(res)
      setRBook(parser.parseData(res));
      setIsLoading(false);
    })
    .catch((e)=>{
      console.error(e)
      setIsError(true);
      setIsLoading(false);
    })
  },1000)
  },[])

  useEffect(()=>{
    console.log(rBook)
  },[rBook])

  const handleInput = ({target})=>{
    setSearch(target.value);
  }

  return (
    <div>
      <Segment inverted basic>
        An unofficial Magic: The Gathering -rulebook
      </Segment>
      <Container fluid>
        {/*<Loader active={isLoading}/>*/}
        <Hide hide={!isError}>
          <Icon name='x' size='massive' color='red' />
        </Hide>
        {rBook.headers && rBook.subHeaders && rBook.rules && <Contents rBook={rBook} search={search} setIsLoading={setIsLoading}/>}
      </Container>
    </div>
  )
}

export default App;
