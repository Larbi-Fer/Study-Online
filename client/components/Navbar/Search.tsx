'use cleint'

const Search = () => {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSearch}>
      <input className="pan d3" type="text" placeholder="Search ..." id='searchField' />
    </form>
  )
}

export default Search