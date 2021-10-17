import './styles.css'
import searchIcon from '../../assets/search.svg'
import { useState } from 'react'

export default function SearchBar(props) {
  const [search, setSearch] = useState('');

  function handleClick() {

    props.handle(search);

  }

  return (
    <div className="c-search">
      <input placeholder="Procurar por Nome, E-mail ou CPF" className="c-search__input" type="text" onKeyDown={(e) => e.key === 'Enter' ? handleClick() : null} onChange={(e) => setSearch(e.target.value)} />
      <div onClick={handleClick} className="c-search__button-control">
        <img src={searchIcon} alt="" />
        <button >BUSCAR</button>
      </div>
    </div>
  )

}