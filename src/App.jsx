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

function App() {
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [status, setStatus] = useState('playing');
  const [message, setMessage] = useState('');
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
  }, [todayKey]);

  // Handle physical keyboard input
  useEffect(() => {
    if (status !== 'playing') return;
    const onKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'Enter') {
        if (guess.length === maxLen) handleGuess({ preventDefault: () => {} });
      } else if (e.key === 'Backspace') {
        setGuess(g => g.slice(0, -1));
      } else if (/^[a-zA-Z]$/.test(e.key) && guess.length < maxLen) {
        setGuess(g => g + e.key.toUpperCase());
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [guess, status, maxLen]);

  const handleGuess = (e) => {
    if (e) e.preventDefault();
    if (status !== 'playing') return;
    const normGuess = guess;
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
    setGuess('');
  };

  const keyboardStatus = getKeyboardStatuses(guesses, answer);

  const handleVirtualKey = (key) => {
    if (status !== 'playing') return;
    if (key === 'ENTER') {
      if (guess.length === maxLen) handleGuess({ preventDefault: () => {} });
    } else if (key === '⌫' || key === 'Backspace') {
      setGuess(g => g.slice(0, -1));
    } else if (guess.length < maxLen && /^[A-Z]$/.test(key)) {
      setGuess(g => g + key);
    }
  };

  const alreadyGuessed = status === 'locked';

  return (
    <div className="game-container">
      <div className="nse-stripes"></div>
      <h1 className="game-title">Networkle</h1>
      <h2>Guess the UK Rail Station</h2>
      <p>New station every day. {MAX_GUESSES} guesses per day.</p>
      {status === 'loading' || maxLen === 0 ? (
        <div className="loading">Loading stations...</div>
      ) : status === 'error' ? (
        <div className="locked">{message}</div>
      ) : status === 'locked' || alreadyGuessed ? (
        <div className="game-message" style={{marginTop: '3.5em', color: 'var(--nse-blue)', background: 'var(--nse-white)', zIndex: 2, position: 'relative'}}>
          <b>You've already played today!</b>
          <br />
          Come back tomorrow for a new station.<br />
          <span style={{fontWeight: 400, fontSize: '0.95em', color: '#555'}}>Refresh the page tomorrow for a new puzzle.</span>
        </div>
      ) : (
        <>
          <div className="wordle-grid">
            {[...Array(MAX_GUESSES)].map((_, rowIdx) => {
              let g = guesses[rowIdx] || '';
              let statuses = g ? getLetterStatuses(g, answer) : [];
              // If this is the current guess row
              if (rowIdx === guesses.length && status === 'playing') {
                g = guess.padEnd(maxLen);
                statuses = Array(maxLen).fill('');
              }
              return (
                <div className="wordle-row" key={rowIdx}>
                  {[...Array(maxLen)].map((_, colIdx) => (
                    <div
                      className={`wordle-cell ${statuses[colIdx] || ''} ${rowIdx === guesses.length && status === 'playing' && colIdx < guess.length ? 'active' : ''}`}
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
                      (key === 'ENTER' && (guess.length !== maxLen || status !== 'playing')) ||
                      (key === '⌫' && guess.length === 0) ||
                      (key.length === 1 && (guess.length >= maxLen || status !== 'playing'))
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
      )}
      {(status === 'won' || status === 'lost') && (
        <div className="answer">Today's station: <b>{answerRaw}</b></div>
      )}
      <footer>
        <p style={{marginTop: '2em', fontSize: '0.9em', color: '#888'}}>Made with React & Vite. Not affiliated with National Rail.</p>
      </footer>
    </div>
  );
}

export default App;
