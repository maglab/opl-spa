function emptyTextValidator(text) {
  return new Promise((resolve, reject) => {
    if (text.length > 0) {
      resolve(text);
    } else {
      reject("Required fields are empty.");
    }
  });
}

export default emptyTextValidator;
