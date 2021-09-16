const Word = ({word, validKeys}) => {
  if(!word) return null;
  
  const joinedKeys = validKeys.join('');
  const matched = word.slice(0, joinedKeys.length);
  const remainder = word.slice(joinedKeys.length);
  
  return(
    <>
      <div className="matched">{matched}</div>
      <div className="remainder">{remainder}</div>
    </>
  );
}

export default Word