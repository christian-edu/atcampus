const SearchGroup = () => {
  return (
    <div>
      <h2>Søk etter gruppenavn</h2>
      <h4>Trykk på en gruppe for å sende forespørsel</h4>
      <input type='text' />
      <div>
        <h2>Søk etter gruppekriterier</h2>
        <h4>Velg kriterier for søket</h4>
        <div>
          <div>
            <select name='emne'>
              <option value='Programmering'>Programmering</option>
              <option value='Frontend'>Frontend</option>
              <option value='InteraktivtDesign'>InteraktivtDesign</option>
            </select>
          </div>
          <div>
            <select name='størrelse'>
              <option value='liten'>Liten (1-4stk)</option>
              <option value='Medium'>Liten (5-7stk)</option>
              <option value='Stor'>Stor (8+)</option>
            </select>
          </div>
        </div>
        <div>
          <select name='karaktermål'>
            <option value='A'>A</option>
            <option value='B'>B</option>
            <option value='C'>C</option>
            <option value='D'>D</option>
            <option value='E'>E</option>
            <option value='F'>F</option>
          </select>
        </div>
        <div>
          <select name='arbeidsfrekvens'>
            <option value='Månedlig'>Månedlig</option>
            <option value='Ukentlig'>Ukentlig</option>
          </select>
        </div>
        <div>
          <input type='radio' name={'metode'} id={'fysisk'} />
          <label htmlFor='fysisk'>Fysisk</label>
          <input type='radio' name={'metode'} id={'digitalt'} />
          <label htmlFor='digitalt'>Digitalt</label>
          <input type='radio' name={'metode'} id={'begge'} />
          <label htmlFor='begge'>Begge</label>
        </div>
        <button>Vis resultater</button>
      </div>
    </div>
  );
};

export default SearchGroup;