const PersonForm = ({newName, newNumber, handleName, handleNumber, addPerson}) => {
    return (
        <form onSubmit={addPerson}>
        <h4>name :</h4>
        <input value={newName} onChange={handleName} />
        <h4>number :</h4>
        <input value={newNumber} onChange={handleNumber}></input>
        <h4>
        <button type="submit">add</button>
        </h4>
      </form>

    )
}

export default PersonForm