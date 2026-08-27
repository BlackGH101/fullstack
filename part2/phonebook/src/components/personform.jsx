const PersonForm = ({
  onSubmit,
  newName,
  onNameChange,
  number,
  onNumberChange
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={onNameChange} />
      </div>

      <div>
        number: <input value={number} onChange={onNumberChange} />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm