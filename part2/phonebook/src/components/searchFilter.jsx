const Filter = ({
    search,
    handleSetSearch
}) => {
    return (
        <div>
            filter shown with <input value={search} onChange={handleSetSearch} />
        </div>
    )
}

export default Filter