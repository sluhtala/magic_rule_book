import { Grid, Container, Header, Segment, Divider, Loader } from 'semantic-ui-react';
import React, {useEffect, useState} from 'react';
import Searchbar from './Searchbar';
import Naviation from './Navigation';
import Rules from './Rules';

function getSection(rules, number){
	if (!rules || !number)
		return null;
	const mainNum = Math.floor(number / 100);
	if (!rules[mainNum - 1])
		return null;
	const sub = rules[mainNum - 1].content.find((section)=>section.number === number);
	return sub;
}

function findHeader(rules, selected){
	if (!rules || !selected || !selected.main)
		return 'Magic: The Gathering - Rulebook';
	const sub = getSection(rules, selected.sub);
	if (!sub)
		return 'Magic: The Gathering - Rulebook';
	return `${sub.number}. ${sub.header}`;
}

function MainContent(props){
	const [search, setSearch] = useState('');
	const [sectionHeader, setSectionHeader] = useState('');
	const [selectedRules, setSelectedRules] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	
	useEffect(()=>{
		if (!props.rules)
			return ;
		setSectionHeader(findHeader(props.rules, props.selectedSection));
		const section = getSection(props.rules, props.selectedSection.sub)
		if (section)
			setSelectedRules(getSection(props.rules, props.selectedSection.sub).rules);
	},[props.selectedSection, props.rules])


	const navigationClick = (direction)=>{
		if (direction === 'previous')
		{
			const main = Math.floor(props.selectedSection.sub / 100);
			const prev = getSection(props.rules, props.selectedSection.sub - 1)
			if (!prev)
			{
				if (main === 1)
				{
					props.setSelectedSection({});
					setSelectedRules([]);
					return;
				}
				const len = props.rules[main - 2].content.length;
				const lastOf = props.rules[main - 2].content[len - 1];
				props.setSelectedSection({main: main - 1, sub: lastOf.number});
			}
			else
				props.setSelectedSection({main: main, sub: prev.number});
		}
		if (direction === 'next')
		{
			if(!props.selectedSection.sub)
			{
				props.setSelectedSection({main: 1, sub: 100});
				return;
			}
			const next = getSection(props.rules, props.selectedSection.sub + 1);
			const main = Math.floor(props.selectedSection.sub / 100);
			if (!next)
				props.setSelectedSection({main: main + 1, sub: (main + 1) * 100});
			else
				props.setSelectedSection({main: main, sub: next.number});
		}
	}

	const handleSearch = async ({target})=>{
		setSearch(target.value);
		setIsLoading(true);
		if (target.value.length === 0)
		{
			setSectionHeader(findHeader(props.rules, props.selectedSection));
			setIsLoading(false);
			const section = getSection(props.rules, props.selectedSection.sub);
			if (section)
				setSelectedRules(section.rules);
			else
				setSelectedRules([]);
			return ;
		}
		else
			setSectionHeader(`Searching for: '${target.value}'`)
		const sectionsArray = props.rules.map((section)=>{
			return (section.content)
		}).flat(1);
		const rulesArray = sectionsArray.map((section)=>{
			return (section.rules)
		}).flat(1)

		setSelectedRules(rulesArray);
		const pattern = RegExp(target.value);
		const result = sectionsArray.filter((section)=>(
			pattern.test(section.number.toString())
		));
		setIsLoading(false);
	};

	return (
		<Container>
			<Searchbar
			search={search}
			setSearch={setSearch}
			handleSearch={handleSearch}
			/>
			<Segment>
			<Container fluid>
				<Grid>
					<Grid.Row columns={2}>
						<Grid.Column>
							<Header as='p' size='huge' floated='left'>
								{sectionHeader}
							</Header>
						</Grid.Column>
						<Grid.Column>
							<Naviation floated='right'
								selectedSection={props.selectedSection}
								handleClick={navigationClick}
								lastSection={props.lastSection}
								/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
			<Divider/>
			<Loader active={isLoading}/>
			<Container>
				{
					props.selectedSection ?
					<Rules rules={selectedRules}
						selectedSection={props.selectedSection}
					/> :
					''
				}
			</Container>
			</Segment>
		</Container>
	);
}

export default MainContent;