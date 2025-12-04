const splitPascalCase = (str) => {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export default splitPascalCase