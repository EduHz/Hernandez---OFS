const Filter = ({searchName, handleSearch}) => {
  return (
    <>
      <h4>Filter</h4>
      <input type="text" value={searchName} onChange={handleSearch} />
    </>
  );
};

export default Filter;
