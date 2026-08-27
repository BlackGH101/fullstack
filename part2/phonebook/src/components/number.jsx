const Numbers = ({
    personToShow
}) => {
    return (
        <div>
        <h2>Numbers</h2>
        {personToShow.map((person, index) => <div key={index}> {person.name} {person.number}</div>)}
        </div>
    )
}

export default Numbers