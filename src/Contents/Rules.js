import React, { useEffect, useState } from 'react';
import {Item, Button, Icon, Accordion, Transition, Visibility } from 'semantic-ui-react';

const Rule = ({rule, activeIndex, id, setActiveIndex, setSearch})=>{
	const len = 30;
  const number = rule.substring(0, rule.indexOf(' '));
  const text = rule.substring(rule.indexOf(' ') + 1);
  const title = text.substring(0, len);

  const handleClick = ()=>{
    if (id === activeIndex)
      setActiveIndex(-1);
    else
      setActiveIndex(id);
  }

  const processText = (text)=>{
    const lines = text.split('\n')
    const pattern = /[1-9][0-9][0-9]\.?[0-9]?[a-z]?/;
    const handleLinkClick = (word) => {
      if (word[word.length - 1] === '.')
        setSearch(word.substring(0, word.length - 1));
      else
        setSearch(word)
    }
    return lines.map((l, i)=><div key={i}>{
      l.split(/([ (,)])/).map((w, i)=>(
        pattern.test(w) ?
          <Item
            key={i}
            as='a'
            style={{cursor: 'pointer'}}
            size='tiny'
            onClick={()=>{handleLinkClick(w)}}>
            {w}
          </Item>
          : w))
    }</div>)
  }

	return (
      <>
          <Accordion.Title index={id} active={activeIndex === id} onClick={handleClick}>
            <Icon name='dropdown'/>
            <b>{number}</b>
            { activeIndex !== id && <>{' '}{title}{'...'}</>}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === id}>
            <Transition duration={500} animation='fade down' visible={activeIndex === id}>
              <div>
                {processText(text)}
              </div>
            </Transition>
          </Accordion.Content>
      </>
	);
}

const Rules = ({rules, setSearch, showMore, displayAmount})=>{
  const [activeIndex, setActiveIndex] = useState(-1);
  const [sliced, setSliced] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    setSliced(rules.slice(0, displayAmount))
    setIsLoading(false);
  },[displayAmount, rules])

  const autoLoadMore = ()=>{
    setIsLoading(true);
    setTimeout(()=>{
      showMore();
    }, 500)
  }

  return (
    <>
      <Accordion styled fluid>
          {sliced.map((r, i)=>(
            <Rule
              key={r.id}
              id={r.id}
              rule={r.text}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              setSearch={setSearch}
            />))}
      </Accordion>
      {rules.length > displayAmount && <Visibility onOnScreen={()=>{autoLoadMore()}} continuous><Button loading={isLoading} icon='arrow down' onClick={()=>showMore()}/></Visibility>}
    </>
  );
}

export default Rules;