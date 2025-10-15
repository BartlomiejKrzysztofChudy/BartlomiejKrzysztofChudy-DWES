let url  = "https://www.google.com/search/test.js?ok=1"
function descomponerURL(url) {

    const u = new URL(url);

    return{
        protocol: u.protocol.replace(":", ""),
        ipAdres: null,
        subDomain: u.hostname.split(".")[0],
        domainName: u.hostname.split(".").slice(1).join("."),
        folderTree: u.pathname.split("/").filter(x=> x && !x.includes("")),
        targetFile: u.pathname.split("/").pop().includes(".") ? u.pathname.split("/").pop() : null,
        urgumentsFile: u.search
    };

}


console.log(descomponerURL(url))

