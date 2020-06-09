

export function capitalize(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export function search(data, toSearch, key = 'value'){   
    let filter = data.filter((item) => item[key].toLowerCase().match(toSearch.toLowerCase()))
    return filter
}