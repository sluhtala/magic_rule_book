import React, { useState, useEffect } from 'react';
import SubHeaders from './Subheaders';
import { findSubHeaders } from '../services/utils';
import { Accordion, Header as UiHeader, Segment } from "semantic-ui-react";

const Header = ({header, subHeaders, subHeaderClick, index, headersActive})=>{
	const number = parseInt(header);
	const [sub, setSub] = useState([]);
	const [visible, setVisible] = useState(false);

	useEffect(()=>{
		setSub(findSubHeaders(subHeaders, number))
	},[subHeaders, number])

	useEffect(()=>{
		if (header.substring(0, 1) === headersActive || headersActive === 'all')
		setVisible(true);
		else
		setVisible(false);
	},[headersActive, header])

	return (
		<>
			<Accordion.Title 
				onClick={()=>setVisible(!visible)}
				index={index}
				active={visible}
			>
				<UiHeader size="small">{header}</UiHeader>
				</Accordion.Title>
			<Accordion.Content
				active={visible}
			>
			<SubHeaders
				subHeaders={sub}
				subHeaderClick={subHeaderClick}/>
			</Accordion.Content>
		</>
	)
}

const Headers = ({headers, subHeaders, subHeaderClick, headersActive})=>{
	return (
		<Accordion fluid as={Segment}>
			{
			headers.map((h, i)=>(
				<Header
					index={i}
					key={h.id}
					header={h.text}
					subHeaders={subHeaders}
					subHeaderClick={subHeaderClick}
					headersActive={headersActive}
				/>))
			}
		</Accordion>
	);
}

export default Headers;