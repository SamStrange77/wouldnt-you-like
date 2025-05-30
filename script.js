let initialDate = new Date("2025-05-20").setHours(0,0,0,0);
let TODAY = new Date().toISOString().split("T")[0];
let songListModes = [0, 2];
let charListModes = [3];
let intervalCheck;

console.log('VERSION: 13');
console.log('CHANGES: Theme changes!');
console.log(TODAY + ': ' + dailyRandom(seedify(12)));

//Main Page Button:

document.getElementById('home').onclick = 
    (
        () =>
        {
             location.reload();
        }
    );


//Daily Theme Changes

let body = document.body;

let themes = 
[
    {
        color: 'troy',
        names: ['You are a|WarriorOfTheMind||Well done! Enlighten me, what\'s your name?|You disappoint me...']
    },
    {
        color: 'cyclops',
        names: ['|Defeat|is not allowed.|I\'ve gotta hand it to you, this is quite the treat!|I warned ya, and you failed the test!']
    },
    {
        color: 'ocean',
        names: ['How much longer till your|LuckRunsOut?||Why did we doubt that you could figure this out?|You relied on wit, and then we died on it, woah...']
    },
    {
        color: 'circe',
        names: ['|Wouldn\'tYouLike|A taste of the power?|No, you\'re not a player, you\'re a puppeteer, yeah!|You\'ve made your one wrong move, now you\'re done for...']
    },
    {
        color: 'underworld',
        names: ['But it\'s|NoLongerYou...||You became the Monster!|Were Circe\'s instructions unclear...?']
    },
    {
        color: 'thunder',
        names: ['If you want|AllThePower|You must carry all the blame!|You are a different beast now!|You\'ve doomed us...You\'ve doomed us all!','|ThunderBringHer|Through the wringer|You are a different beast now!|You\'ve doomed us...You\'ve doomed us all!']
    },
    {
        color: 'wisdom',
        names: ['I wanna be|L-L-L-L-Legendary||You overcame these obstacles and scrutiny!|Whatchu gonna do about it, champ?','Fight,|LittleWolf|Fight!|One young wolf has a larger heart than all these men combined!|Go back and cry in your corner...','Why not make it a|Game?||I\'ve played your game and won! Release him!|No one beats me! No one wins my game!']
    },
    {
        color: 'vengeance',
        names: ['It\'s gonna be|Dangerous|My friend!|Every trick, every skill was put to use for this!|You idiot...Can\'t you see?']
    },
    {
        color: 'ithaca',
        names: ['Is it finally time for|TheChallenge|I arranged?|You\'re more cunning than I assumed!|I doubt you can string this...You don\'t have the power...']
    }
]

let day = Math.floor((new Date(TODAY).setHours(0,0,0,0))/(60*24*60*1000))%9;
let text = getRandomElement(themes[day].names, seedify(day));
let loseMsg = '';
let winMsg = ''

body.style.setProperty('background-color',`var(--${themes[day].color})`);
body.style.setProperty('color',`var(--${themes[day].color}text)`);

document.getElementById('pretext').innerHTML = text.split('|')[0];
document.getElementById('maintext').innerHTML = text.split('|')[1];
document.getElementById('posttext').innerHTML = text.split('|')[2];
loseMsg = text.split('|')[4];
winMsg = text.split('|')[3];


//Lists:
    
let songList = [];

let songListDupe = 
[
      "The Horse and The Infant",
      "Just a Man",
      "Full Speed Ahead",
      "Open Arms",
      "Warrior of the Mind",
      "Polyphemus",
      "Survive",
      "Remember Them",
      "My Goodbye",
      "Storm",
      "Luck Runs Out",
      "Keep Your Friends Close",
      "Ruthlessness",
      "Puppeteer",
      "Wouldn't You Like",
      "Done For",
      "There Are Other Ways",
      "The Underworld",
      "No Longer You",
      "Monster",
      "Suffering",
      "Different Beast",
      "Scylla",
      "Mutiny",
      "Thunder Bringer",
      "Legendary",
      "Little Wolf",
      "We'll Be Fine",
      "Love in Paradise",
      "God Games",
      "Not Sorry For Loving You",
      "Dangerous",
      "Charybdis",
      "Get in the Water",
      "Six Hundred Strike",
      "The Challenge",
      "Hold Them Down",
      "Odysseus",
      "I Can't Help But Wonder",
      "Would You Fall In Love With Me Again"
];

let charList = [];

let charListDupe = 
[
    "Odysseus Troy Saga|",
    "Odysseus Cyclops Saga|",
    "Odysseus Ocean Saga|",
    "Odysseus Circe Saga|",
    "Odysseus Underworld Saga|",
    "Odysseus Thunder Saga|",
    "Odysseus Wisdom Saga|",
    "Odysseus Vengeance Saga|",
    "Odysseus Ithaca Saga|",
    "Soldiers|",
    "Zeus|",
    "Ensemble|",
    "Crew|",
    "Eurylochus|",
    "Polites|",
    "Lotus Eaters|",
    "Athena|",
    "Polyphemus|",
    "Cyclopes|",
    "Perimedes|",
    "Elpenor|",
    "Aeolus|",
    "Winions|",
    "Penelope|",
    "Telemachus|",
    "Poseidon|",
    "Circe|",
    "Hermes|",
    "Dead Crew|",
    "Anticlea|(Odysseus' Mom)",
    "Tiresias|(The Prophet)",
    "Siren Penelope|",
    "Sirens|",
    "Scylla|",
    "Suitors|",
    "Antinous|",
    "Calypso|",
    "Audience|(God Games)",
    "Apollo|",
    "Hephaestus|",
    "Aphrodite|",
    "Ares|",
    "Hera|",
    "Eurymachus|(A Suitor)",
    "Amphinomus|(A Suitor)",
    "Melanthius|(A Servant)"
];

function populate_lists ()
{
    songList = [];
    charList = [];
    
    let dataListSong = document.getElementById('song-names');
    let dataListChar = document.getElementById('char-names');

    dataListSong.innerHTML = ``;
    dataListChar.innerHTML = ``;

    for (let i = 0; i<songListDupe.length; i++)
    {
        songList.push(songListDupe[i]);
        dataListSong.innerHTML +=
        `
            <option value = "${songListDupe[i]}"></option>
        `
    }

    for (let i = 0; i<charListDupe.length; i++)
    {
        charList.push(charListDupe[i]);
        dataListChar.innerHTML +=
        `
            <option value = "${charListDupe[i].split("|")[0]}">${charListDupe[i].split("|")[1]}</option>
        `
    }

}

//Randomisation:

function seedify (num)
{
    return Math.floor(dailyRandom(num) * 213412);
}

function getRandomElement(arr, seed) 
{
  return arr[Math.floor(dailyRandom(seed) * arr.length)];
}

function hashStringFNV1a(str) 
{
  let hash = 0x811c9dc5; // FNV offset basis
  for (let i = 0; i < str.length; i++) 
  {
    hash ^= str.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0; // FNV prime and >>> 0 to keep unsigned
  }
  return hash;
}

function dailyRandom(seed = 0) 
{
  const today = TODAY || new Date().toISOString().split("T")[0];
  const combined = today + seed;
  const hash = hashStringFNV1a(combined);
  return hash / 4294967295;
}

//String Standardisation:

function isLetter (str)
{
  if(str.length === 1 && str.match(/[a-z]/i))
  {
    return true;
  }
  else
  {
    return false;
  }
}

function standardize (word)
{
  for (let i = 0; i<word.length; i++)
  {
    if (isLetter(word.charAt(i)))
    {
      continue;
    }
    word = word.substring(0,i) + word.substring(i+1);
    i--;
  }
  return word
}

//Global Gamestate to keep track of things like the current song

let gameState = 
{
    //Song:
    initialIndex: 0,
    currentIndexSong: 0,
    //Lyric
    finalIndex: 0,
    wordsDone: [],
    currentIndexLyric: 0,
    buttonEnabled: true,
    //Audio:
    duration: 126000,
    startTimestamp: 0,
    endTimestamp: 0,
    url : '',
    //Character:
    currentIndexCharacter: 0,
    //Global
    song: null,
    lyrics: [],
    guesses: 0,
    maxGuesses: [20, 35, 20, 15],
    answerRevealed: false,
    displayCorrect: '',
    checkCorrect: ''
};



//Local Storage savestate:

let defaultState = {
  "Modes": ["songMode", "lyricMode", "audioMode", "characterMode"],
  "ModeNames": ["Song", "Lyric", "Audio", "Character"],
  "Guesses": [[], [], [], []],
  "WonToday": [false, false, false, false],
  "Streak": [0, 0, 0, 0],
  "LastPlayedDate": ['','','', ''],
  "LastInteractedDate": ['','','',''],
  "Attempts": [0,0,0,0],
  "SeenTutorial": [false, false, false, false],
  "acceptedDisclaimer": false
}

let savedState = localStorage.getItem("saveState")
  ? JSON.parse(localStorage.getItem("saveState"))
  : JSON.parse(JSON.stringify(defaultState)); // deep copy

// Ensure the structure has all the new fields
Object.keys(defaultState)
      .forEach
      (
            key => 
            {
                   
                    if (!(key in savedState)) 
                    {
                            savedState[key] = defaultState[key];
                    }
                    if (Array.isArray(defaultState[key])) 
                    {
                            while (savedState[key].length < defaultState[key].length) 
                            {
                                 savedState[key].push(defaultState[key][savedState[key].length]);
                            }
  
                    }
            }
      );

localStorage.setItem("saveState", JSON.stringify(savedState));

console.log(savedState.TEST_KEY);

setupButtons();

function save()
{
    localStorage.setItem("saveState", JSON.stringify(savedState));
}

if (savedState.acceptedDisclaimer)
{
    closeDisclaimer();
}

function closeDisclaimer()
{
    savedState.acceptedDisclaimer = true;
    save();
    document.getElementById('info-overlay').classList.add('hidden');
}

//Resetting the savestate on a new day

for (let i = 0; i<savedState.LastInteractedDate.length; i++)
{
    if (savedState.LastInteractedDate[i] !== TODAY)
    {
        savedState.Guesses[i] = [];
        savedState.WonToday[i] = false;
        savedState.Attempts[i] = 0;
    }
}

//Function to load all songs:

async function fetchSongs() 
{
  const files = [
    "the-horse-and-the-infant.json",
    "just-a-man.json",
    "full-speed-ahead.json",
    "open-arms.json",
    "warrior-of-the-mind.json",
    "polyphemus.json",
    "survive.json",
    "remember-them.json",
    "my-goodbye.json",
    "storm.json",
    "luck-runs-out.json",
    "keep-your-friends-close.json",
    "ruthlessness.json",
    "puppeteer.json",
    "wouldnt-you-like.json",
    "done-for.json",
    "there-are-other-ways.json",
    "the-underworld.json",
    "no-longer-you.json",
    "monster.json",
    "suffering.json",
    "different-beast.json",
    "scylla.json",
    "mutiny.json",
    "thunder-bringer.json",
    "legendary.json",
    "little-wolf.json",
    "well-be-fine.json",
    "love-in-paradise.json",
    "god-games.json",
    "not-sorry-for-loving-you.json",
    "dangerous.json",
    "charybdis.json",
    "get-in-the-water.json",
    "six-hundred-strike.json",
    "the-challenge.json",
    "hold-them-down.json",
    "odysseus.json",
    "i-cant-help-but-wonder.json",
    "would-you-fall-in-love-with-me-again.json"
  ];

  
  const songs = await Promise.all(
    files.map
    (
        file => fetch("data/" + file+"?v="+Date.now())
        .then
        (
            res => 
            {
                if (!res.ok) throw new Error("HTTP error " + res.status);
                return res.json();
            }
        )
        .catch
        (  
            err => 
            {
                console.error("Failed to fetch:", file, err);
            }
        )
    )  
  );
  return songs;
}

//"Show" functions:

let showFunc =
[
    () => 
    {
        let lyricBox = document.getElementById("lyrics-box");
        lyricBox.style.setProperty('visibility','visible');
        let linesToShow = gameState.lyrics.slice(gameState.initialIndex, gameState.currentIndexSong);
        lyricBox.innerHTML = linesToShow.join(" ") + ' ... ';
    },
    () => 
    {
        let lyricBox = document.getElementById("lyrics-box");
        lyricBox.style.setProperty('visibility','visible');
        let linesToShow = gameState.lyrics.slice(gameState.currentIndexLyric, gameState.finalIndex);
        lyricBox.innerHTML = ' ...' + linesToShow.join(" ") + ' ??? ';
    },
    () =>
    {
        const audioContainer = document.getElementById("audio-container");
        audioContainer.style.setProperty('visibility','visible');
        audioContainer.innerHTML += 
        `
            <img id = "cover" src = "Cover.png"></img>
            <iframe 
                id="sc-widget" 
                width="100%" 
                height="166" 
                scrolling="no" 
                frameborder="no" 
                allow="autoplay"
                style="display: none;" 
                src=${gameState.url}
            </iframe>
        `;

        let iframePlayer = document.getElementById('sc-widget');
        let widget = SC.Widget(iframePlayer);

        widget
        .bind
        (
            SC.Widget.Events.READY, 
            function () 
            {
                console.log("Widget is ready!");
                showPlayButton();
            }
        );
    },
    () =>
    {
        let charBox = document.getElementById("character-box");
        let lyricBox = document.getElementById("lyrics-box");
        if (gameState.guesses > 0)
        {
            lyricBox.style.setProperty('visibility','visible');
            let linesToShow = gameState.lyrics.slice(gameState.currentIndexCharacter, gameState.finalIndex);
            lyricBox.innerHTML = ' ...' + linesToShow.join(" ") + ' ... ';
        }
        charBox.style.setProperty('visibility','visible');
        charBox.innerHTML = `${gameState.lyrics[gameState.finalIndex]}`;
    }
]

//"Wrong" functions:

function wrongFunc (input, mode)
{
    gameState.guesses++;

    document.getElementById("result").innerHTML = 
    `
        <div class = "answer-bubbles wrong-answer hoverable">
            ${input}
        </div>
    ` 
    + document.getElementById("result").innerHTML;
    
    if (gameState.guesses == gameState.maxGuesses[mode])
    {
        gameState.answerRevealed = true; 
        let finalResultBox = document.getElementById('final-result');
        finalResultBox.style.setProperty("visibility","visible");
        savedState.Attempts[mode] = -1;
        savedState.Streak[mode] = 0;
        savedState.WonToday[mode] = true;
        finalResultBox.innerHTML += fullHint(mode);
        navigation(mode);  
        finalResults();  
        save();
    }
    document.getElementById("tries").innerHTML = 
    `
        <p>
            Tries remaining: ${gameState.maxGuesses[mode] - gameState.guesses}
        </p>
    `;
    wrongFuncUnique[mode](input);
}

let wrongFuncUnique = 
[
    (input) =>
    {
        gameState.currentIndexSong++;
        showFunc[0]();     
    },
    (input) =>
    {
        gameState.currentIndexLyric--;
        gameState.wordsDone.push(standardize(input.trim().toLowerCase()))
        showFunc[1]();
    },
    (input) =>
    {
        gameState.endTimestamp+=500;
    },
    (input) =>
    {
        gameState.currentIndexCharacter--;
        showFunc[3]();
    }
];

//"Correct" functions:

function correctFunc (input, mode)
{
    document.getElementById("result").innerHTML = 
    `
      <div class = "answer-bubbles correct-answer hoverable">
        ${gameState.displayCorrect}
      </div>
    ` + document.getElementById("result").innerHTML;
    gameState.answerRevealed = true;
    gameState.guesses++;
    document.getElementById("tries").innerHTML = 
    `
        <p>Tries remaining: ${gameState.maxGuesses[mode] - gameState.guesses}
    `; 
    if (!savedState.WonToday[mode])
    {
      let LastDate = savedState.LastPlayedDate[mode];
      LastDate = new Date(LastDate);
      let today = new Date(TODAY);

      LastDate.setHours(0,0,0,0);
      today.setHours(0,0,0,0)
      if ((today - LastDate)/(1000*60*60*24) > 1)
      {
        savedState.Streak[mode] = 0;
      }
      savedState.Streak[mode]++;
      savedState.Attempts[mode] = gameState.guesses;
      savedState.LastPlayedDate[mode] = new Date(TODAY).toISOString().split("T")[0];
      savedState.WonToday[mode] = true;
      save();
    }
    gameState.answerRevealed = true; 
    let finalResultBox = document.getElementById('final-result');
    finalResultBox.style.setProperty("visibility","visible");
    finalResultBox.innerHTML += fullHint(mode);
    navigation(mode);
    finalResults();
    gameState.endTimestamp = gameState.startTimestamp + 10000;
}



let correctCondition =
[
    (input) =>
    {
        return standardize(gameState.checkCorrect.trim().toLowerCase()) == standardize(input.trim().toLowerCase());
    },
    (input) =>
    {
       return standardize(gameState.checkCorrect.trim().toLowerCase()) == standardize(input.trim().toLowerCase());
    },
    (input) =>
    {
        return standardize(gameState.checkCorrect.trim().toLowerCase()) == standardize(input.trim().toLowerCase());
    },
    (input) =>
    {
        return gameState.checkCorrect.split("/").includes(input);
    },
];

//Start function:

function start (songs, mode)
{
    if (!savedState.SeenTutorial[mode])
    {
        showTutorial(mode);
    }

    let howToPlayButton = document.getElementById('tut');

    howToPlayButton.style.setProperty('visibility','visible');

    howToPlayButton.onclick = 
    (
        () =>
        {
            showTutorial(mode);
        }
    )

    //Reset:

    document.getElementById('final-result').innerHTML = ``;
    document.getElementById('final-result').style.setProperty('visibility','hidden');
    document.getElementById('final-final-result').innerHTML = ``;
    document.getElementById('final-final-result').style.setProperty('visibility','hidden');
    document.getElementById('mode-switch').innerHTML = '';
    document.getElementById('audio-container').innerHTML = ``;
    document.getElementById('audio-container').style.setProperty('visibility', 'hidden');
    document.getElementById('lyrics-box').innerHTML = ``;
    document.getElementById('lyrics-box').style.setProperty('visibility', 'hidden');
    document.getElementById('result').innerHTML = ``;
    document.getElementById('character-box').style.setProperty('visibility','hidden');
    
    populate_lists();
    
    gameState.guesses = 0;
    gameState.answerRevealed = false;

    //Setting up the gamestate:
    
        //Global
        gameState.song = getRandomElement(songs, seedify(mode));
        gameState.lyrics = gameState.song.lyrics;
        //Song
        gameState.initialIndex = Math.floor(dailyRandom(seedify(mode+50467)) * (gameState.lyrics.length - gameState.maxGuesses[0] - 1));
        gameState.currentIndexSong = gameState.initialIndex + 1;
        //Lyric
        gameState.finalIndex = Math.floor(dailyRandom(seedify(mode+(71413*mode))) * (gameState.lyrics.length-2-gameState.maxGuesses[mode])) + gameState.maxGuesses[mode] + 1;
        gameState.currentIndexLyric = gameState.finalIndex - 1;
        //Audio
        gameState.url = gameState.song.url;
        gameState.duration = gameState.song.duration;
        gameState.startTimestamp = Math.floor(dailyRandom(seedify(mode+40010)) * (gameState.duration)-10000);
        gameState.endTimestamp = gameState.startTimestamp + 500;
        //Character
        gameState.currentIndexCharacter = gameState.finalIndex;

        switch (mode)
        {
            case 0:
                gameState.displayCorrect = gameState.song.title;
                gameState.checkCorrect = gameState.song.title;
                break;
            case 1:
                gameState.displayCorrect = gameState.song.lyrics[gameState.finalIndex];
                gameState.checkCorrect = gameState.song.words[gameState.finalIndex];
                break;
            case 2:
                gameState.checkCorrect = gameState.song.title;
                gameState.displayCorrect = gameState.song.title;
                break;
            case 3:
                gameState.displayCorrect = gameState.song.singers[gameState.finalIndex];
                gameState.checkCorrect = gameState.song.singers[gameState.finalIndex];
                break;
        }

    console.log('JSON VERSION: ' + gameState.song.version);
    
    document.getElementById("input-field").innerHTML = 
    `
        <input 
            ${ (songListModes.includes(mode)) ? `list = "song-names"` : (charListModes.includes(mode)) ? `list = char-names` : ``} 
            class = "input-fields" 
            id="guess-input" 
            placeholder="Type your guess!"
        >
        <button 
            id = "guess" 
            class = "guess-buttons" 
            onclick="checkGuess(document.getElementById('guess-input').value, ${mode})"
        >
            Submit
        </button>
    `;
    let inputBox = document.getElementById('guess-input');
    if (songListModes.includes(mode))
    {
        inputBox
        .addEventListener
        (
            "blur",
            function () 
            {
                const input = this.value;
                const options = Array.from(document.querySelectorAll("#song-names option"))
                                     .map(option => option.value);
                if (!options.includes(input)) 
                {
                    this.value = "";  // Clear the input if not valid
                }
            }
        );
    }
    else if (charListModes.includes(mode))
    {
        inputBox
        .addEventListener
        (
            "blur",
            function () 
            {
                const input = this.value;
                const options = Array.from(document.querySelectorAll("#char-names option"))
                                     .map(option => option.value);
                console.log(options);
                if (!options.includes(input)) 
                {
                    this.value = "";  // Clear the input if not valid
                }
            }
        );    
    }
    else
    {
        inputBox
        .addEventListener
        (
            "input",
            function () 
            {
                console.log('Change')
                if (gameState.wordsDone.includes(standardize(this.value.trim().toLowerCase()))) 
                {
                    lyricBoxDisable();  // Clear the input if not valid
                }
                else
                {
                    lyricBoxEnable();
                }
            }
        );
    }
    inputBox
    .addEventListener(
        "keydown",
        (event) => 
        {
            if (!gameState.buttonEnabled)
            {
                return;
            }
            if(event.key==="Enter")
            {
                checkGuess(inputBox.value, mode);
            }
        }
    );
    document.getElementById("tries").innerHTML = 
    `   
        <p>Tries remaining: ${gameState.maxGuesses[mode] - gameState.guesses}
    `; 
    showFunc[mode]();
    savedState.Guesses[mode]
     .forEach
    (
        element =>
        {
            console.log(mode + ' ' + element);
            checkGuess(element, mode, true); 
        }
    );
}

//Returning entire hints:

function fullHint (mode)
{
    let result = savedState.Attempts[mode] == -1 ? "You lost...<br>"+loseMsg : "You won!<br>"+winMsg;
    let fullHints = [];
    fullHints[0] = 
    `
        <p>
            ${result}<br>
            ${!savedState.WonToday[mode] ? `` : `Number of tries: ${gameState.guesses}`}<br>
            <br>
            Entire hint:
        </p>
        <div class = "answer-bubbles final-hint">
            ${gameState.lyrics.slice(gameState.initialIndex,gameState.initialIndex+21).join(" ")}
        </div>
        <div class = "answer-bubbles correct-answer">
            ${gameState.displayCorrect}
        </div>
    `;
    fullHints[1] = 
    `
        <p>
            ${result}<br>
            ${!savedState.WonToday[mode] ? `` : `Number of tries: ${gameState.guesses}`}<br>
            <br>
            Entire hint:
        </p>
        <div class = "answer-bubbles final-hint">
            ${gameState.lyrics.slice(gameState.finalIndex-35,gameState.finalIndex).join(" ")}
        </div>
        <div class = "answer-bubbles correct-answer">
            ${gameState.lyrics[gameState.finalIndex]}
        </div>
        ${
            gameState.lyrics.length - gameState.finalIndex > 1 ?
            `
            <div class = "answer-bubbles final-hint">
                ${gameState.lyrics.slice(gameState.finalIndex+1,Math.min(gameState.lyrics.length, gameState.finalIndex+20)).join(" ")}
            </div>
            ` :
            ``
        }
        
    `;
    fullHints[2] = 
    `
        <p>
            ${result}<br>
            ${!savedState.WonToday[mode] ? `` : `Number of tries: ${gameState.guesses}`}<br>
            <br>
        </p>
        <div class = "answer-bubbles correct-answer">
            ${gameState.displayCorrect}
        </div>
    `;
    fullHints[3] = 
    `
        <p>
            ${result}<br>
            ${!savedState.WonToday[mode] ? `` : `Number of tries: ${gameState.guesses}`}<br>
            <br>
            Entire hint:
        </p>
        <div class = "answer-bubbles final-hint">
            ${gameState.lyrics.slice(gameState.finalIndex-gameState.maxGuesses[3],gameState.finalIndex).join(" ")}
        </div>
        <div class = "answer-bubbles character-mode">
            ${gameState.lyrics[gameState.finalIndex]}
        </div>
        <div class = "answer-bubbles correct-answer">
            - ${gameState.displayCorrect}
        </div>
    `;

    return fullHints[mode];
}

//Checking guesses:

function checkGuess (userInput, mode, auto = false)
{
    let inputBox = document.getElementById('guess-input');

    console.log(userInput + ' ' + auto);

    //Saving the last-interacted date

    savedState.LastInteractedDate[mode] = new Date(TODAY).toISOString().split("T")[0];
    save();

    if (gameState.answerRevealed) return;
    if (userInput === '') 
    {
        console.log('empty');
        
            return;
    }
    //Verifying that the song is in the list and also removing it from the list if it is
    if (songListModes.includes(mode))
    {
        if (!songList.includes(userInput))
        {    
            inputBox.value = "";
            return;
        }
        else
        {
            for (let i = 0; i<document.getElementById("song-names").children.length; i++)
            {
                if (document.getElementById("song-names").children[i].value === userInput)
                {
                    document.getElementById("song-names").removeChild(document.getElementById("song-names").children[i]);
                }
            }
            for (let i = 0; i<songList.length; i++)
            {
                if (songList[i] === userInput)
                {
                    songList.splice(i, 1);
                }
            }
        }
    }
    if (charListModes.includes(mode))
    {
        if (!charList.map((element) => element.split("|")[0]).includes(userInput))
        {    
            inputBox.value = "";
            return;
        }
        else
        {
            for (let i = 0; i<document.getElementById("char-names").children.length; i++)
            {
                if (document.getElementById("char-names").children[i].value === userInput)
                {
                    document.getElementById("char-names").removeChild(document.getElementById("char-names").children[i]);
                }
            }
            for (let i = 0; i<charList.length; i++)
            {
                if (charList[i] === userInput)
                {
                    charList.splice(i, 1);
                }
            }
        }
    }
    console.log('hi');
    //Resetting the box
    inputBox.value = "";
    //Adding to memory that they have guessed it
    if (!auto)
    {
        savedState.Guesses[mode].push(userInput);
    }
    save();
    //If correct:
    if (correctCondition[mode](userInput))
    {
        correctFunc(userInput, mode);
    }
    else
    {
        wrongFunc(userInput, mode);
    }
}

//Enabling and Disabling Lyric Box:


function lyricBoxEnable ()
{
   let lyricInputBox = document.getElementById('guess-input');
   lyricInputBox.style.setProperty("border", "#000000");
   lyricInputBox.style.setProperty("border-style", "solid");
   lyricInputBox.style.setProperty("border-thickness", "0.3rem");
   document.getElementById('guess').style.setProperty("visibility","visible");
   document.getElementById('already-guessed-container').style.setProperty("visibility", "hidden");
   gameState.buttonEnabled = true;
}

function lyricBoxDisable ()
{
   let lyricInputBox = document.getElementById('guess-input');
   lyricInputBox.style.setProperty("border", "#FF0000");
   lyricInputBox.style.setProperty("border-style", "solid");
   lyricInputBox.style.setProperty("border-thickness", "0.3rem");
   document.getElementById('guess').style.setProperty("visibility","hidden");
   document.getElementById('already-guessed-container').style.setProperty("visibility", "visible");
   gameState.buttonEnabled = false;
}

//Showing the play button:

function showPlayButton()
{
    const audioContainer = document.getElementById("audio-container");
    audioContainer.innerHTML += `
      <button id = "play-button" on-click>
        Play
      </button>
    `
    document.getElementById('play-button').onclick =
    (
        () =>
        {
            play();
        }
    );
}

//Playing:

function play ()
{   
    document.getElementById('play-button').innerHTML = `Playing`;
    document.getElementById('play-button').style.setProperty('background-color', '#777');
    document.getElementById('play-button').onclick = ( () => console.log('No lmao'));
    const iframeElement = document.getElementById('sc-widget');
    const widget = SC.Widget(iframeElement);
    widget.seekTo(gameState.startTimestamp)
    widget.play();
    // Clear any existing timer (if you want to allow multiple plays)
    intervalCheck = 
    setInterval
    (
        () =>
        {
            widget.getPosition
            (
                (pos) =>
                {
                    if(pos > gameState.endTimestamp)
                    {
                        pause();
                    }
                }
            )
        },
        50
    );
    console.log(gameState.duration);
    console.log('START:' + gameState.startTimestamp);
    console.log(gameState.endTimestamp);
}

function pause ()
{
    document.getElementById('play-button').innerHTML = `Play`;
    document.getElementById('play-button').style.setProperty('background-color', '#111');
    document.getElementById('play-button').onclick = ( () => play());
    const iframeElement = document.getElementById('sc-widget');
    const widget = SC.Widget(iframeElement);
    widget.pause();
    clearInterval(intervalCheck);
}

//Displaying final results:

function finalResults ()
{
    let copyText = "My Results for Day #" + ((initialDate - new Date(TODAY).setHours(0,0,0,0))/(-86400000) + 1) + "\n\n";

    finalRes = document.getElementById('final-final-result');
    finalRes.style.setProperty("visibility","visible");
    finalRes.innerHTML += 
    `
      <p>
        Results for Day #${(initialDate - new Date(TODAY).setHours(0,0,0,0))/(-86400000) + 1}<br>
      </p>
    `;
    for (let i = 0; i<savedState.ModeNames.length; i++)
    {
      if (savedState.WonToday[i])
      {
        finalRes.innerHTML += `${savedState.ModeNames[i]}: ` + (savedState.Attempts[i] == -1 ? `lost :(` : `Won in ${savedState.Attempts[i]}` + (savedState.Attempts[i] == 1 ? ` try ` : ` tries `) + `(Streak: ${savedState.Streak[i]})`) + `<br>`
        copyText += `${savedState.ModeNames[i]}: ` + (savedState.Attempts[i] == -1 ? `lost :(` : `Won in ${savedState.Attempts[i]}` + (savedState.Attempts[i] == 1 ? ` try ` : ` tries `) + `(Streak: ${savedState.Streak[i]})`) + `\n`
      }
    }
    finalRes.innerHTML +=
    `
        <button id = "copy">
            Copy Results!
        </button>
    `;
    copyText += "\nTry it out at https://samstrange77.github.io/wouldnt-you-like";
    document.getElementById('copy').onclick = 
    (
        () =>
        {
            navigator.clipboard.writeText(copyText);
        }
    )
}

//Navigator Functions:

function navigation (mode)
{
    let finalResultBox = document.getElementById('final-result');
    for (let i = 0; i<savedState.ModeNames.length; i++)
    {
        if (i == mode)
        {
            continue;
        }
        finalResultBox.innerHTML +=
        `
            <button id = "${savedState.Modes[i]}">
                Play ${savedState.ModeNames[i]}!
            </button>
        `;
    }
    setupButtons(mode);
}

//Setting up the buttons:

function setupButtons(mode = -1)
{
    for (let i = 0; i<savedState.Modes.length; i++)
    {
        if (i == mode)
        {
            continue;
        }
        document.getElementById(savedState.Modes[i]).onclick =
        async () =>
        {
            const songs = await fetchSongs();
            start(songs, i);
        };
    }
}

//Tutorial:

function showTutorial (mode)
{
    document.getElementById('tutorial-overlay').classList.remove('hidden');
    document.getElementById('modal').innerHTML = tutorials[mode];
    document.getElementById('close_tut').onclick =
    (
        () =>
        {
            closeTutorial(mode);
        }
    )

}

function closeTutorial (mode)
{
    console.log(mode);
    savedState.SeenTutorial[mode] = true;
    save();
    document.getElementById('tutorial-overlay').classList.add('hidden'); 
}

let tutorials = 
[
    `
        <h2>
            <b>
                How to Play
            </b>
        </h2>
        <p>
            Guess the song from EPIC: The Musical. Changes every 24 hours<br>
        </p>

        <h2>
            <b>
                Song Mode
            </b>
        </h2>

        <p>
            In Song Mode, you get words from the lyrics as a hint:<br>
        </p>

        <div class = "answer-bubbles final-hint">
            Who ...
        </div>

        <p>
            Each incorrect guess reveals another word.<br>
        </p>

        <div class = "answer-bubbles final-hint">
            Who hurts ...
        </div>

        <p>
            Try and guess the song in as few tries as possible!
        </p>

        <div class = "answer-bubbles correct-answer">
            Remember Them
        </div>

        <br>
        <p>
            Don't disappoint Athena...
        </p>
        <div id = "centering_button">
            <button id="close_tut">
                Got it!
            </button>
        </div>
    `,
    `
        <h2>
            <b>
                How to Play
            </b>
        </h2>
        <p>
            Guess the next word in the song from EPIC: The Musical. Changes every 24 hours<br>
        </p>

        <h2>
            <b>
                Lyric Mode
            </b>
        </h2>

        <p>
            In Lyric Mode, you get words from the lyrics as a hint:<br>
        </p>

        <div class = "answer-bubbles final-hint">
            ... a ???
        </div>

        <p>
            Each incorrect guess reveals another word before the original hint.<br>
        </p>

        <div class = "answer-bubbles final-hint">
            ... like a ???
        </div>

        <p>
            Try and guess the word in place of the "???" in as few tries as possible!
        </p>

        <div class = "answer-bubbles correct-answer">
            taste
        </div>

        <br>
        <p>
            Don't disappoint Athena...
        </p>
        <div id = "centering_button">
            <button id="close_tut">
                Got it!
            </button>
        </div>
    `,
    `
        <h2>
            <b>
                How to Play
            </b>
        </h2>
        <p>
            Guess the song from EPIC: The Musical. Changes every 24 hours<br>
        </p>

        <h2>
            <b>
                Audio Mode
            </b>
        </h2>

        <p>
            In Audio Mode, you get a short clip (0.5) seconds from a given song as a hint.<br><br>
            Each incorrect guess increases the length of the clip by 0.5 seconds, starting from the same point.<br><br>
            Try and guess the song in as few tries as possible!<br><br>
            Don't disappoint Athena...
        </p>
        <div id = "centering_button">
            <button id="close_tut">
                Got it!
            </button>
        </div>
    `,
    
    `
        <h2>
            <b>
                How to Play
            </b>
        </h2>
        <p>
            Guess the character from EPIC: The Musical. Changes every 24 hours<br>
        </p>

        <h2>
            <b>
                Character Mode
            </b>
        </h2>

        <p>
            In Character Mode, you get a word (gold), for which you have to guess the character that said it.<br><br>
        </p>


        <div class = "answer-bubbles character-mode">
            like
        </div>
        <br>
            Each incorrect word adds an extra word. However, you only have to guess the speaker for the word in gold.<br><br>
           
        <div class = "answer-bubbles final-hint">
            ... mistake
        </div>
        

        <div class = "answer-bubbles character-mode">
            like
        </div>
        <br>
        <p>
            Try and guess the character in as few tries as possible!<br><br>
        </p>
        <div class = "answer-bubbles correct-answer">
            Odysseus Thunder Saga
        </div>

        <h2>
            <b>
                Notes
            </b>
        </h2>
        <p>
            1) Odysseus is split across Sagas. Thus, Odysseus in Troy Saga is different from Odysseus in Vengeance Saga, for example.<br><br>
            2) Ensembles are named differently depending on the context (Eg. Suitors/Crew/Audience). You must pick appropriately.<br><br>
            3) If two people are singing the same lines at the same time, both are an acceptable answer.<br><br>
            This mode is a bit subjective, so I apologise if you think an answer is right when it isn't.<br><br>

            Regardless, don't disappoint Athena...
        </p>
        <div id = "centering_button">
            <button id="close_tut">
                Got it!
            </button>
        </div>
    `
];
