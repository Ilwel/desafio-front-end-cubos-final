const makeUrl = (path) => {

  console.log(process.env);
  return `${process.env.REACT_APP_API_URL}${path}`;
}

export default makeUrl;