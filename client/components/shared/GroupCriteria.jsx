const GroupCriteria = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='grid gap-4'>
        <div>
          <select
            name='emne'
            className='w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2'
          >
            <option value='Programmering'>Programmering</option>
            <option value='Frontend'>Frontend</option>
            <option value='InteraktivtDesign'>InteraktivtDesign</option>
          </select>
        </div>
        <div>
          <select
            name='størrelse'
            className='w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2'
          >
            <option value='liten'>Liten (1-4stk)</option>
            <option value='Medium'>Liten (5-7stk)</option>
            <option value='Stor'>Stor (8+)</option>
          </select>
        </div>
        <div>
          <select
            name='karaktermål'
            className='w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2'
          >
            <option value='A'>A</option>
            <option value='B'>B</option>
            <option value='C'>C</option>
            <option value='D'>D</option>
            <option value='E'>E</option>
            <option value='F'>F</option>
          </select>
        </div>
        <div>
          <select
            name='arbeidsfrekvens'
            className='w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2'
          >
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
    </form>
  );
};
export default GroupCriteria;
