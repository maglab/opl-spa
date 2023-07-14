
function setUserName(nameObj){
    const {firstName, lastName, affiliation} = nameObj; 
    if(!firstName && !lastName && !affiliation){
        const userName = "Anonymous";
        return userName
    }else{
        const userName = `${firstName} ${lastName} ${affiliation ? "- "+affiliation : ""}`
        
        return userName
    }
}

export default setUserName