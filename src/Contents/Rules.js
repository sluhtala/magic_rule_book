import React, { useEffect, useState } from 'react';
import { Icon, Button, Accordion } from 'semantic-ui-react';

const Rule = ({rule, activeIndex, id, setActiveIndex})=>{
	const [act, setHidden] = useState(true);
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

	return (
      <>
      <Accordion.Title index={id} active={activeIndex === id} onClick={handleClick}>
        <Icon name='dropdown'/>
        <b>{number}</b>
        { activeIndex !== id && <>{' '}{title}{'...'}</>}
      </Accordion.Title>
      <Accordion.Content active={activeIndex === id}>
        {text}
      </Accordion.Content>
      </>
	);
}

const Rules = ({rules})=>{
  const [activeIndex, setActiveIndex] = useState(-1);
  return (
    <Accordion styled fluid>
      {rules.map((r, i)=>(
        <Rule
          key={r.id}
          id={r.id}
          rule={r.text}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
         />))}
    </Accordion>
  );
}

export default Rules;