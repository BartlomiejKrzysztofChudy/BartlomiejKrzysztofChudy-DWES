function descomponerURL(url) {
    const urlRegex  = "";
    const match = url.match(urlRegex);

    const protocol = match[1];
    const subDomain = match[2] || '';
    const domainName = match[3];
    const targetFile = match[4] || '';
    const argumentsFile = match[5] || '';

  
    return {
        protocol,
        ipAdress,
        subDomain,
        domainName,
        folderTree,
        targetFile,
        argumentsFile
    };
}


const url = '';
console.log(descomponerURL(url));
