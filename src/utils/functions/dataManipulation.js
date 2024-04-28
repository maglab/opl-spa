export function setDate(date) {
  const dateObj = new Date(date);
  const dateString = dateObj.toLocaleDateString();
  return dateString;
}

export default setDate;

export function formatFullName(firstName, lastName) {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }
  if (firstName) {
    return firstName;
  }
  if (lastName) {
    return lastName;
  }
  return "Anonymous";
} // Return empty string if both first and last names are empty
