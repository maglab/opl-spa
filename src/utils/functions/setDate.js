function setDate(date) {
  const dateObj = new Date(date);
  const dateString = dateObj.toDateString();
  return dateString;
}

export default setDate;
