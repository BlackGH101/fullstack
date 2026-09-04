const Numbers = ({
    personToShow,
    deletePerson
}) => {
    return (
        <div>
        <h2>Numbers</h2>
        {personToShow.map((person) => <div key={person.id}> {person.name} {person.number} <button onClick={() => deletePerson(person.id, person.name)}>delete</button></div>)}
        </div>
    )
}

export default Numbers