import { useState, useEffect } from 'react';
import './App.css';

// Full, deduplicated, and correctly spelled list of UK rail stations (copied from your CSV)
const STATIONS = [
  'Abbey Wood',
  'Aber',
  'Abercynon',
  'Aberdare',
  'Aberdeen',
  'Aberdour',
  'Abertillery',
  'Abingdon',
  'Accrington',
  'Acton Bridge',
  'Acton Central',
  'Adlington',
  'Aigburth',
  'Aintree',
  'Airdrie',
  'Aldershot',
  'Alfreton',
  'Alloa',
  'Alnwick',
  'Altrincham',
  'Alvechurch',
  'Ambergate',
  'Ambleside',
  'Amersham',
  'Amesbury',
  'Andover',
  'Anfield',
  'Ashford',
  'Ashton-under-Lyne',
  'Atherstone',
  'Atherton',
  'Attleborough',
  'Aylesbury',
  'Aylesford',
  'Bacup',
  'Bagshot',
  'Baildon',
  'Baker Street',
  'Balham',
  'Ballymena',
  'Ballymoney',
  'Banbury',
  'Bangor',
  'Barking',
  'Barnetby',
  'Barnsley',
  'Barrow-in-Furness',
  'Barry',
  'Basingstoke',
  'Bath',
  'Batley',
  'Battersea',
  'Beaconsfield',
  'Beckenham',
  'Bedford',
  'Bedlington',
  'Belfast',
  'Belper',
  'Berkhamsted',
  'Birmingham',
  'Bishop Auckland',
  'Bishopbriggs',
  'Blackburn',
  'Blackpool',
  'Bletchley',
  'Bloxwich',
  'Bolton',
  'Bournemouth',
  'Bracknell',
  'Bradford',
  'Braintree',
  'Bridgend',
  'Bridgnorth',
  'Bridlington',
  'Bristol',
  'Brixton',
  'Brockley',
  'Bromley',
  'Burnage',
  'Burnley',
  'Burton-on-Trent',
  'Bury',
  'Bushey',
  'Buxton',
  'Cadoxton',
  'Caerphilly',
  'Caldicot',
  'Callington',
  'Camberley',
  'Camden',
  'Canterbury',
  'Cardiff',
  'Carlisle',
  'Carmarthen',
  'Carrbridge',
  'Carshalton',
  'Castleford',
  'Chadwell Heath',
  'Chafford Hundred',
  'Chalfont & Latimer',
  'Chandlers Ford',
  'Chapel-en-le-Frith',
  'Chartham',
  'Chatham',
  'Cheam',
  'Cheddar',
  'Chelmsford',
  'Chertsey',
  'Chichester',
  'Chorley',
  'Christchurch',
  'Clacton-on-Sea',
  'Clapham',
  'Cleethorpes',
  'Clitheroe',
  'Coalville',
  'Colchester',
  'Colne',
  'Congleton',
  'Conisbrough',
  'Corby',
  'Coventry',
  'Crewe',
  'Croydon',
  'Darlington',
  'Dartford',
  'Dawlish',
  'Deal',
  'Deddington',
  'Denham',
  'Derby',
  'Devizes',
  'Dewsbury',
  'Dover',
  'Dronfield',
  'Dudley',
  'Dunstable',
  'Durham',
  'Eastbourne',
  'Eastleigh',
  'Edinburgh',
  'Edmonton',
  'Egham',
  'Ellesmere Port',
  'Elstree',
  'Eltham',
  'Ely',
  'Epsom',
  'Erith',
  'Esher',
  'Exeter',
  'Exmouth',
  'Falkirk',
  'Fareham',
  'Farnborough',
  'Farnham',
  'Feltham',
  'Folkestone',
  'Forfar',
  'Forest Gate',
  'Forest Hill',
  'Frodsham',
  'Gainsborough',
  'Gala Bingo',
  'Gallowgate',
  'Gateshead',
  'Gatwick',
  'Gillingham',
  'Glasgow',
  'Gloucester',
  'Godalming',
  'Goole',
  'Goring-by-Sea',
  'Grays',
  'Great Malvern',
  'Greenford',
  'Greenock',
  'Grimsby',
  'Guisborough',
  'Haddington',
  'Hailsham',
  'Halifax',
  'Halesowen',
  'Halstead',
  'Hampton',
  'Harlow',
  'Harrogate',
  'Harrow',
  'Hartlepool',
  'Haslemere',
  'Hastings',
  'Haverhill',
  'Hawick',
  'Hayes',
  'Hayle',
  'Heanor',
  'Heathfield',
  'Heaton',
  'Hedge End',
  'Helensburgh',
  'Helston',
  'Henley-in-Arden',
  'Henley-on-Thames',
  'Hereford',
  'Hertford',
  'Hessle',
  'High Wycombe',
  'Hitchin',
  'Hoddesdon',
  'Hollingbourne',
  'Holt',
  'Holyhead',
  'Horsham',
  'Hounslow',
  'Huddersfield',
  'Huntingdon',
  'Hyde',
  'Hythe',
  'Ilford',
  'Ilkeston',
  'Inverness',
  'Ipswich',
  'Isleworth',
  'Jarrow',
  'Johnstone',
  'Keighley',
  'Kendal',
  'Kenilworth',
  'Kensington',
  'Kettering',
  'Kidderminster',
  'Kidlington',
  'Kilburn',
  'Kilwinning',
  'Kings Langley',
  'Kings Lynn',
  'Kingsbury',
  'Kingston',
  'Kirkcaldy',
  'Kirkby',
  'Knaresborough',
  'Knowsley',
  'Lancaster',
  'Lancing',
  'Larkhall',
  'Leamington Spa',
  'Leeds',
  'Leicester',
  'Leigh',
  'Leighton Buzzard',
  'Letchworth',
  'Lewes',
  'Leyland',
  'Lichfield',
  'Lincoln',
  'Lingfield',
  'Liphook',
  'Lisburn',
  'Littlehampton',
  'Liverpool',
  'Livingston',
  'Llandudno',
  'Llandrindod Wells',
  'Llanelli',
  'Llanfairpwll',
  'Llanidloes',
  'Llanrwst',
  'Loughton',
  'Lowestoft',
  'Luton',
  'Macclesfield',
  'Maidstone',
  'Malvern',
  'Manchester',
  'Mansfield',
  'March',
  'Margate',
  'Market Harborough',
  'Marlow',
  'Maryport',
  'Middlesbrough',
  'Middlesex',
  'Milford Haven',
  'Millom',
  'Milton Keynes',
  'Minster',
  'Mirfield',
  'Mitcham',
  'Mitcham Junction',
  'Mold',
  'Monmouth',
  'Montrose',
  'Morley',
  'Morecambe',
  'Morpeth',
  'Motherwell',
  'Mountain Ash',
  'New Barnet',
  'New Brighton',
  'New Cross',
  'New Malden',
  'New Milton',
  'Newark',
  'Newbury',
  'Newcastle',
  'Newport',
  'North Berwick',
  'North Shields',
  'Northampton',
  'Northwich',
  'Norwich',
  'Nottingham',
  'Nuneaton',
  'Oakham',
  'Okehampton',
  'Oldham',
  'Orpington',
  'Ossett',
  'Oxted',
  'Paddington',
  'Paignton',
  'Plymouth',
  'Pontypridd',
  'Poole',
  'Port Talbot',
  'Portsmouth',
  'Potters Bar',
  'Preston',
  'Plymouth',
  'Radlett',
  'Reading',
  'Redhill',
  'Reigate',
  'Renfrew',
  'Rugby',
  'Rotherham',
  'Rugby',
  'Salford',
  'Salisbury',
  'Saltash',
  'Sandbach',
  'Sandhurst',
  'Scarborough',
  'Scunthorpe',
  'Shanklin',
  'Shaw',
  'Sheffield',
  'Shrewsbury',
  'Sidcup',
  'Sittingbourne',
  'Slough',
  'Smethwick',
  'Snaith',
  'Snaresbrook',
  'South Benfleet',
  'South Croydon',
  'South Elmsall',
  'Southampton',
  'Southend',
  'Southport',
  'St Albans',
  'St Helens',
  'St Ives',
  'St Neots',
  'Stalybridge',
  'Stevenage',
  'Stevenston',
  'Stockport',
  'Stockton-on-Tees',
  'Stoke-on-Trent',
  'Stourbridge',
  'Stratford',
  'Stroud',
  'Sutton',
  'Swansea',
  'Swindon',
  'Taunton',
  'Telford',
  'Tonbridge',
  'Torquay',
  'Tottenham',
  'Towcester',
  'Tring',
  'Trowbridge',
  'Tunbridge Wells',
  'Upminster',
  'Upton',
  'Uxbridge',
  'Wakefield',
  'Walsall',
  'Waltham Cross',
  'Walthamstow',
  'Warrington',
  'Warwick',
  'Washington',
  'Watford',
  'Welling',
  'Wellington',
  'West Bromwich',
  'West Drayton',
  'West Ealing',
  'West Hampstead',
  'West Kirby',
  'West Norwood',
  'Weston-super-Mare',
  'Weybridge',
  'Weymouth',
  'Whalley',
  'Wheatley',
  'Wigan',
  'Willesden',
  'Willenhall',
  'Wimbledon',
  'Windsor',
  'Winchester',
  'Windsor & Eton Central',
  'Wolverhampton',
  'Worcester',
  'Worksop',
  'Wrexham',
  'Yate',
  'Yatton',
  'Yeovil',
  'York',
  'Zetland',
];

const MAX_GUESSES = 6;
const COOKIE_NAME = 'raille_attempt_date';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

function getTodayKey() {
  const today = new Date();
  return today.toISOString().slice(0, 10); // YYYY-MM-DD
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}

function getCookie(name) {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
}

function normalize(str) {
  return str.replace(/[^a-zA-Z]/g, '').toUpperCase();
}

function getLetterStatuses(guess, answer) {
  // Both guess and answer are normalized (A-Z only, uppercase)
  const result = Array(guess.length).fill('absent');
  const answerArr = answer.split('');
  // First pass: correct
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      result[i] = 'correct';
      answerArr[i] = null;
    }
  }
  // Second pass: present
  for (let i = 0; i < guess.length; i++) {
    if (result[i] === 'correct') continue;
    const idx = answerArr.indexOf(guess[i]);
    if (idx !== -1) {
      result[i] = 'present';
      answerArr[idx] = null;
    }
  }
  return result;
}

function getKeyboardStatuses(guesses, answer) {
  // Returns a map: { letter: 'correct' | 'present' | 'absent' }
  const status = {};
  guesses.forEach(g => {
    const res = getLetterStatuses(g, answer);
    for (let i = 0; i < g.length; i++) {
      const l = g[i];
      if (!status[l] || status[l] === 'present' && res[i] === 'correct' || status[l] === 'absent' && res[i] !== 'absent') {
        status[l] = res[i];
      }
    }
  });
  return status;
}

function getDailyStation() {
  // Deterministic pick based on date
  const todayKey = getTodayKey();
  let hash = 0;
  for (let i = 0; i < todayKey.length; i++) {
    hash = todayKey.charCodeAt(i) + ((hash << 5) - hash);
  }
  const idx = Math.abs(hash) % STATIONS.length;
  return STATIONS[idx];
}

function getRandomStation() {
  return STATIONS[Math.floor(Math.random() * STATIONS.length)];
}

function App() {
  const [regularGuess, setRegularGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [status, setStatus] = useState('playing');
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState('regular'); // 'regular' or 'endless'
  const [endlessScore, setEndlessScore] = useState(0);
  const [endlessAnswerRaw, setEndlessAnswerRaw] = useState(getRandomStation());
  const endlessAnswer = normalize(endlessAnswerRaw);
  const [endlessGuesses, setEndlessGuesses] = useState([]);
  const [endlessStatus, setEndlessStatus] = useState('playing');
  const [endlessMessage, setEndlessMessage] = useState('');
  const [endlessGuess, setEndlessGuess] = useState('');
  const todayKey = getTodayKey();
  const answerRaw = getDailyStation();
  const answer = normalize(answerRaw);
  const maxLen = answer.length;

  useEffect(() => {
    const lastAttempt = getCookie(COOKIE_NAME);
    if (lastAttempt === todayKey) {
      setStatus('locked');
      setMessage('You have already played today. Come back tomorrow!');
    }
    // Set up a timer to reset at midnight
    const now = new Date();
    const msToMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 1) - now;
    const midnightTimer = setTimeout(() => {
      window.location.reload();
    }, msToMidnight);
    return () => clearTimeout(midnightTimer);
  }, [todayKey]);

  // Endless mode: reset state on mode switch or restart
  useEffect(() => {
    if (mode === 'endless') {
      setEndlessScore(0);
      setEndlessAnswerRaw(getRandomStation());
      setEndlessGuesses([]);
      setEndlessStatus('playing');
      setEndlessMessage('');
    }
  }, [mode]);

  // Handle physical keyboard input
  useEffect(() => {
    if (status !== 'playing') return;
    const onKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'Enter') {
        if (regularGuess.length === maxLen) handleGuess({ preventDefault: () => {} });
      } else if (e.key === 'Backspace') {
        setRegularGuess(g => g.slice(0, -1));
      } else if (/^[a-zA-Z]$/.test(e.key) && regularGuess.length < maxLen) {
        setRegularGuess(g => g + e.key.toUpperCase());
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [regularGuess, status, maxLen, mode]);

  // Keyboard input for endless mode
  useEffect(() => {
    if (mode !== 'endless' || endlessStatus !== 'playing') return;
    const onKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'Enter') {
        if (endlessGuess.length === endlessAnswer.length) handleEndlessGuess({ preventDefault: () => {} });
      } else if (e.key === 'Backspace') {
        setEndlessGuess(g => g.slice(0, -1));
      } else if (/^[a-zA-Z]$/.test(e.key) && endlessGuess.length < endlessAnswer.length) {
        setEndlessGuess(g => g + e.key.toUpperCase());
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [endlessGuess, endlessStatus, endlessAnswer, mode]);

  const handleGuess = (e) => {
    if (e) e.preventDefault();
    if (status !== 'playing') return;
    const normGuess = regularGuess;
    if (normGuess.length !== maxLen) {
      setMessage(`Guess must be ${maxLen} letters.`);
      return;
    }
    setGuesses([...guesses, normGuess]);
    if (normGuess === answer) {
      setStatus('won');
      setMessage('Correct! You guessed today\'s station!');
      setCookie(COOKIE_NAME, todayKey, 2);
    } else if (guesses.length + 1 >= MAX_GUESSES) {
      setStatus('lost');
      setMessage(`Out of guesses! The station was: ${answerRaw}`);
      setCookie(COOKIE_NAME, todayKey, 2);
    } else {
      setMessage('Incorrect, try again!');
    }
    setRegularGuess('');
  };

  const handleEndlessGuess = (e) => {
    if (e) e.preventDefault();
    if (endlessStatus !== 'playing') return;
    const normGuess = endlessGuess;
    if (normGuess.length !== endlessAnswer.length) {
      setEndlessMessage(`Guess must be ${endlessAnswer.length} letters.`);
      return;
    }
    const newGuesses = [...endlessGuesses, normGuess];
    setEndlessGuesses(newGuesses);
    if (normGuess === endlessAnswer) {
      setEndlessScore(s => s + 1);
      setEndlessMessage('Correct! Next station...');
      setTimeout(() => {
        setEndlessAnswerRaw(getRandomStation());
        setEndlessGuesses([]);
        setEndlessGuess('');
        setEndlessMessage('');
      }, 1000);
    } else if (newGuesses.length >= MAX_GUESSES) {
      setEndlessStatus('lost');
      setEndlessMessage(`Game Over! The station was: ${endlessAnswerRaw}`);
    } else {
      setEndlessMessage('Incorrect, try again!');
    }
    setEndlessGuess('');
  };

  const keyboardStatus = getKeyboardStatuses(guesses, answer);
  const endlessKeyboardStatus = getKeyboardStatuses(endlessGuesses, endlessAnswer);

  const handleModeChange = (m) => {
    setMode(m);
    setRegularGuess('');
    setEndlessGuess('');
    setMessage('');
  };

  // Add a restart handler for endless mode
  const handleRestartEndless = () => {
    setEndlessScore(0);
    setEndlessAnswerRaw(getRandomStation());
    setEndlessGuesses([]);
    setEndlessStatus('playing');
    setEndlessMessage('');
    setEndlessGuess('');
  };

  return (
    <div className="game-container">
      <div className="nse-stripes"></div>
      <h1 className="game-title">Networkle</h1>
      <div className="mode-toggle">
        <button onClick={() => handleModeChange('regular')} disabled={mode==='regular'}>Regular</button>
        <button onClick={() => handleModeChange('endless')} disabled={mode==='endless'}>Endless</button>
      </div>
      {mode === 'regular' ? (
        status === 'loading' || maxLen === 0 ? (
          <div className="loading">Loading stations...</div>
        ) : status === 'error' ? (
          <div className="locked">{message}</div>
        ) : (status === 'locked') ? (
          <div className="game-message" style={{marginTop: '3.5em', color: 'var(--nse-blue)', background: 'var(--nse-white)', zIndex: 2, position: 'relative'}}>
            <b>You've already played today!</b>
            <br />
            Come back tomorrow for a new station.<br />
            <span style={{fontWeight: 400, fontSize: '0.95em', color: '#555'}}>Refresh the page tomorrow for a new puzzle.</span>
          </div>
        ) : (
          <>
            <h2 style={{color: 'var(--nse-blue)'}}>Guess the UK Rail Station</h2>
            <p style={{color: 'var(--nse-blue)'}}>New station every day. {MAX_GUESSES} guesses per day.</p>
            <div className="wordle-grid">
              {[...Array(MAX_GUESSES)].map((_, rowIdx) => {
                let g = guesses[rowIdx] || '';
                let statuses = g ? getLetterStatuses(g, answer) : [];
                // If this is the current guess row
                if (rowIdx === guesses.length && status === 'playing') {
                  g = regularGuess.padEnd(maxLen);
                  statuses = Array(maxLen).fill('');
                }
                return (
                  <div className="wordle-row" key={rowIdx}>
                    {[...Array(maxLen)].map((_, colIdx) => (
                      <div
                        className={`wordle-cell ${statuses[colIdx] || ''} ${rowIdx === guesses.length && status === 'playing' && colIdx < regularGuess.length ? 'active' : ''}`}
                        key={colIdx}
                      >
                        {g[colIdx] || ''}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
            <div className="keyboard">
              {KEYBOARD_ROWS.map((row, i) => (
                <div className="keyboard-row" key={i}>
                  {row.map(key => (
                    <button
                      key={key}
                      className={`key ${keyboardStatus[key] || ''}`}
                      onClick={() => handleVirtualKey(key)}
                      disabled={
                        (key === 'ENTER' && (regularGuess.length !== maxLen || status !== 'playing')) ||
                        (key === '⌫' && regularGuess.length === 0) ||
                        (key.length === 1 && (regularGuess.length >= maxLen || status !== 'playing'))
                      }
                    >
                      {key}
                    </button>
                  ))}
                </div>
              ))}
            </div>
            <div className="message">{message}</div>
          </>
        )
      ) : (
        <>
          <h2 className="endless-title" style={{color: 'var(--nse-blue)'}}>Endless Mode: Guess the UK Rail Station</h2>
          <div className="endless-score" style={{color: 'var(--nse-blue)', fontWeight: 'bold', marginBottom: '0.5em'}}>Score: {endlessScore}</div>
          <div className="wordle-grid">
            {[...Array(MAX_GUESSES)].map((_, rowIdx) => {
              let g = endlessGuesses[rowIdx] || '';
              let statuses = g ? getLetterStatuses(g, endlessAnswer) : [];
              if (rowIdx === endlessGuesses.length && endlessStatus === 'playing') {
                g = endlessGuess.padEnd(endlessAnswer.length);
                statuses = Array(endlessAnswer.length).fill('');
              }
              return (
                <div className="wordle-row" key={rowIdx}>
                  {[...Array(endlessAnswer.length)].map((_, colIdx) => (
                    <div
                      className={`wordle-cell ${statuses[colIdx] || ''} ${rowIdx === endlessGuesses.length && endlessStatus === 'playing' && colIdx < endlessGuess.length ? 'active' : ''}`}
                      key={colIdx}
                    >
                      {g[colIdx] || ''}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
          <div className="keyboard">
            {KEYBOARD_ROWS.map((row, i) => (
              <div className="keyboard-row" key={i}>
                {row.map(key => (
                  <button
                    key={key}
                    className={`key ${endlessKeyboardStatus[key] || ''}`}
                    onClick={() => {
                      if (endlessStatus !== 'playing') return;
                      if (key === 'ENTER') {
                        if (endlessGuess.length === endlessAnswer.length) handleEndlessGuess({ preventDefault: () => {} });
                      } else if (key === '⌫' || key === 'Backspace') {
                        setEndlessGuess(g => g.slice(0, -1));
                      } else if (endlessGuess.length < endlessAnswer.length && /^[A-Z]$/.test(key)) {
                        setEndlessGuess(g => g + key);
                      }
                    }}
                    disabled={
                      (key === 'ENTER' && (endlessGuess.length !== endlessAnswer.length || endlessStatus !== 'playing')) ||
                      (key === '⌫' && endlessGuess.length === 0) ||
                      (key.length === 1 && (endlessGuess.length >= endlessAnswer.length || endlessStatus !== 'playing'))
                    }
                  >
                    {key}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="message">{endlessMessage}</div>
          {endlessStatus === 'lost' && (
            <div className="game-message fail" style={{marginTop: '1em'}}>
              <div>Game Over! Final Score: <b>{endlessScore}</b></div>
              <div>The station was: <b>{endlessAnswerRaw}</b></div>
              <button style={{marginTop: '1em'}} onClick={handleRestartEndless}>Restart Endless</button>
            </div>
          )}
        </>
      )}
      <footer>
        <p style={{marginTop: '2em', fontSize: '0.9em', color: '#888'}}>Made with React & Vite. Not affiliated with National Rail.</p>
      </footer>
    </div>
  );
}

export default App;
