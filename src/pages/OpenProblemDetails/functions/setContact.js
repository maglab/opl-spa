export default function setContact(apiData) {
  if (apiData.contact) {
    const nameString = `${apiData.contact.first_name} ${apiData.contact.last_name}`;
    return nameString;
  }
}
