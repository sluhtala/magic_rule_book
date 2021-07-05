
export const findRules = (rules, subNumber)=>{
  const pattern = RegExp(`^${subNumber}[.]`);
  const result = rules.filter((rule)=>pattern.test(rule.text));
  return result;
}

export const findSubHeaders = (headers, mainNumber) => {
  if (headers.length === 0)
    return ;
  const pattern = RegExp('^'+ mainNumber);
  const subHeaders = headers.filter((sub)=>{
    return (
      pattern.test(sub.text)
    )
  });
  return subHeaders;
}

export const applySearchRules =(rules, search)=>{
  if (search === '')
    return rules;
  else
    return rules.filter((r)=>r.text.toLowerCase().includes(search.toLowerCase()))
}

export const applySearchHeaders = (headers, rules, search)=>{
  if (search === '')
    return headers;
  // const rnumbers = rules.map((r)=>r.text.substring(0, r.text.indexOf(' ')))
  const result = headers.filter((h)=>{
  const hnum = parseInt(h.text.substring(0,1));
  return (
    rules.some((r)=>{
      return (
        r.headerNum === hnum
      );
    }
  ) 
  )});
  return result;
}

export const applySearchSubHeaders = (subHeaders, rules, search)=>{
  if (search === '')
    return(subHeaders);
  const result = subHeaders.filter((h)=>{
    const hnum = parseInt(h.text.substr(0, h.text.indexOf('.')))
    return (
      rules.some((r)=>{
        return (r.subNum === hnum);
      })
    )
  })
  return result;
}