

export function capitalize(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export function search(data, toSearch){    
    let filter = data.filter((item) => item.value.toLowerCase().match(toSearch.toLowerCase()))
    return filter
}