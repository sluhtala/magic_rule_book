import React, { useState, useEffect } from 'react';
import dataService from './services/dataService';
import parser from './services/parser'
import {  Icon, Container, Segment, Loader } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import Contents from './Contents';

function App(){
  const [rBook, setRBook] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(()=>{
    setIsLoading(true);
    dataService.getData()
    .then((data)=>{
      setRBook(parser.parseData(data));
      setIsLoading(false);
    })
    .catch((e)=>{
      console.error(e)
      setIsError(true);
      setIsLoading(false);
    })
  },[])

  return (
    <div>
      <Segment inverted basic>
        An unofficial Magic: The Gathering -rulebook
      </Segment>
      <Container fluid textAlign='left' text>
        <Loader active={isLoading}/>
        {isError && <Icon name='x' size='massive' color='red' />}
        {rBook.headers && rBook.subHeaders && rBook.rules && <Contents rBook={rBook}/>}
      </Container>
    </div>
  )
}

export default App;
