import React, { useState, useEffect} from 'react';
import { Container, Button, Header, Modal } from 'semantic-ui-react'

const ModalContent = (props)=>{
	const [rule, setRule] = useState(props.rules[props.index]);
	const len = props.rules.length;

	useEffect(()=>{
		setRule(props.rules[props.index])
	},[props.index, props.rules])

	if (!rule)
		return '';
	const ruleNumber = rule.text.substring(0, rule.text.indexOf(' '))
	return (
		<>
			<Modal.Header>
			<Header>{ruleNumber}</Header>
				</Modal.Header>
			<Modal.Content>
				<Container text fluid>
					{rule.text.substring(rule.text.indexOf(' '))}
				</Container>
			</Modal.Content>
			{ len > 1 &&
			<Modal.Actions>
				<Button icon='arrow left' disabled={props.index <= 0}
					onClick={()=>{props.setIndex(props.index - 1)}}/>
				<Button icon='arrow right' disabled={props.index >= len - 1}
					onClick={()=>{props.setIndex(props.index + 1)}}/>
			</Modal.Actions>
			}
		</>
	)
}

const RuleModal = (props)=>{
	const [index, setIndex] = useState(0);

	useEffect(()=>{
		setIndex(0);
	},[props.rules])

	return (
		<Modal
			closeIcon='close'
			content={
				<ModalContent
					rules={props.rules}
					index={index}
					setIndex={setIndex}/>
			}
			on='click'
			trigger={props.trigger}>
		</Modal>
	);
}

export default RuleModal;