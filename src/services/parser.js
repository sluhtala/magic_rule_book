
function parseData(data)
{
	const result = {headers: [], subHeaders:[], rules:[]};
	const splitted = data.split('\n\r').map((d)=>d.trim());
	const start = splitted.indexOf('1. Game Concepts');
	const end = splitted.lastIndexOf('Glossary');
	const sliced = splitted.slice(start, end);

	sliced.forEach((paragraph, i)=>{
		const number = paragraph.substring(0, paragraph.indexOf(' '))
		if (/^[1-9]\.$/.test(number))
			result.headers.push({id: i, text: paragraph});
		else if (/^[1-9][0-9][0-9]\.$/.test(number))
			result.subHeaders.push({id: i, text: paragraph});
		else
		{
			if (paragraph.length === 0)
				return ;
			const headerNum = parseInt(paragraph.substr(0, 1));
			const subNum = parseInt(paragraph.substring(0, paragraph.indexOf('.')));
			result.rules.push({
				id: i,
				text: paragraph.replace('\u2013', '-'),
				headerNum: headerNum, subNum: subNum}
			);
		}
	})
	return result;
}

const parser = {
  parseData
}

export default parser;