const prepData = (data: string): Array<string> => {
  const lines = data.split("\r\n");
  const oneString = lines.join("\t");

  return oneString.split("\t");
};

export default prepData;
