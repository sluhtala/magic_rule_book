import './App.css';
import React, { useEffect, useState } from 'react';
import { getRules } from './services/dataService';
import parser from './services/parser';
import TableOfContents from './contents/Contents';
import { Container, Grid, Loader } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import MainContent from './main';

function App() {
	const [rules, setRules] = useState([]);
	const [contents, setContents] = useState([]);
	const [glossary, setGlossary] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedSection, setSelectedSection] = useState({});
	const [lastSection, setLastSection] = useState(null);
	const [rulesArray, setRulesArray] = useState([]);

	useEffect(()=>{
		getRules()
		.then((data)=>{
			const lines = data.split('\n').map((line)=>line.trim());
			setContents(parser.getContent(lines))
			setRules(parser.getRules(lines));
			setGlossary(parser.getGlossary(lines));
			setRulesArray(parser.createRulesArray);
			setIsLoading(false);
		})
		.catch((e)=>{
			console.error(e.message);
		})
	},[]);

	useEffect(()=>{
		if (rules.length === 0)
			return;
		let last = 0;
		rules[rules.length - 1].content.forEach((s)=>{
			last = s.number;
		})
		setLastSection(last)
	},[rules])

	return (
		<Container>
				<Grid columns={2} divided stackable>
					<Grid.Row>
						<Grid.Column width={4}>
							<TableOfContents
								contents={contents}
								selectedSection={selectedSection}
								setSelectedSection={setSelectedSection}/>
						</Grid.Column>
						<Grid.Column width={12}>
								{isLoading ? '' :
								<MainContent 
									selectedSection={selectedSection}
									setSelectedSection={setSelectedSection}
									rules={rules}
									glossary={glossary}
									lastSection={lastSection}
									rulesArray={rulesArray}
									/>
								}
								<Loader active={isLoading} />
						</Grid.Column>
					</Grid.Row>
				</Grid>
		</Container>
  );
}

export default App;
