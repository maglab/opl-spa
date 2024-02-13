function setUserName(nameObj) {
  if (!nameObj) {
    return null;
  }
  const { firstName, lastName, affiliation } = nameObj;
  if (!firstName && !lastName && !affiliation) {
    const userName = "Anonymous";
    return userName;
  }
  const userName = `${firstName} ${lastName} ${
    affiliation ? `- ${affiliation}` : ""
  }`;

  return userName;
}

export default setUserName;
