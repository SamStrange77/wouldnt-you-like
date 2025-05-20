let initialDate = new Date("2025-05-20").setHours(0,0,0,0);
let TODAY = new Date().toISOString().split("T")[0];
let songListModes = [0, 2];

console.log('VERSION: ' + 1);
console.log('CHANGES: CHANGED LOCAL STORAGE');
console.log(TODAY + ': ' + dailyRandom(seedify(12)));

let songList = 
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
]

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
    //Global
    song: null,
    lyrics: [],
    guesses: 0,
    maxGuesses: [20, 35, 20],
    answerRevealed: false,
    correct: ''
};

//Local Storage savestate:

let savedState = localStorage.getItem("savedState") ? JSON.parse(localStorage.getItem("savedState")) :
{
  "Modes": ["songMode", "lyricMode", "audioMode"],
  "Guesses": [[], [], []],
  "WonToday": [false, false, false],
  "Streak": [0, 0, 0],
  "LastPlayedDate": ['','',''],
  "LastInteractedDate": ['','',''],
  "Attempts": [0,0,0]
}

function save()
{
    localStorage.setItem("savedState", JSON.stringify(savedState));
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
        lyricBox.removeAttribute('hidden')
        let linesToShow = gameState.lyrics.slice(gameState.initialIndex, gameState.currentIndexSong);
        lyricBox.innerHTML = linesToShow.join(" ") + ' ... ';
    },
    () => 
    {
        let lyricBox = document.getElementById("lyrics-box");
        lyricBox.removeAttribute('hidden')
        let linesToShow = gameState.lyrics.slice(gameState.currentIndexLyric, gameState.finalIndex);
        lyricBox.innerHTML = ' ...' + linesToShow.join(" ") + ' ??? ';
    },
    () =>
    {
        const audioContainer = document.getElementById("audio-container");
        audioContainer.removeAttribute('hidden');
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
        finalResultBox.innerHTML += fullHint(mode);    
        savedState.Attempts[mode] = -1;
        savedState.Streak[mode] = 0;
        savedState.WonToday[mode] = false;
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
    }
];

//"Correct" functions:

function correctFunc (input, mode)
{
    document.getElementById("result").innerHTML = 
    `
      <div class = "answer-bubbles correct-answer hoverable">
        ${gameState.correct}
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
        savedState.SongStreak = 0;
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
    finalResults();
    gameState.endTimestamp = gameState.startTimestamp + 10000;
}

let correctFuncUnique =
[

];

//Start function:

function start (songs, mode)
{
    //Setting up the gamestate:
    
        //Global
        gameState.song = getRandomElement(songs, seedify(mode));
        gameState.lyrics = gameState.song.lyrics;
        //Song
        gameState.initialIndex = Math.floor(dailyRandom(seedify(mode)) * (gameState.lyrics.length - gameState.maxGuesses[0] - 1));
        gameState.currentIndexSong = gameState.initialIndex + 1;
        //Lyric
        gameState.finalIndex = Math.floor(dailyRandom(seedify(mode) * (gameState.lyrics.length-2-gameState.maxGuesses[1]))) + gameState.maxGuesses[1] + 1;
        gameState.currentIndexLyric = gameState.finalIndex - 1;
        //Audio
        gameState.url = gameState.song.url;
        gameState.duration = gameState.song.duration;
        gameState.startTimestamp = Math.floor(dailyRandom(seedify(mode)) * (gameState.duration)-10000);
        gameState.endTimestamp = gameState.startTimestamp + 500;

        switch (mode)
        {
            case 0:
                gameState.correct = gameState.song.title;
                break;
            case 1:
                gameState.correct = gameState.song.words[gameState.finalIndex];
                break;
            case 2:
                gameState.correct = gameState.song.title;
        }
    console.log('VERSION: ' + gameState.song.version);
    
    document.getElementById('mode-switch').innerHTML = '';
    document.getElementById("input-field").innerHTML = 
    `
        <input 
            ${ (songListModes.includes(mode)) ? `list = "song-names"` : ``} 
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
            checkGuess(element, mode, true); 
        }
    );
}

//Returning entire hints:

function fullHint (mode)
{
    let result = savedState.WonToday[mode] ? "You Won!" : "You Lost...";
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
            ${gameState.correct}
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
            ${gameState.correct}
        </div>
    `;

    return fullHints[mode];
}

//Checking guesses:

function checkGuess (userInput, mode, auto = false)
{
    let inputBox = document.getElementById('guess-input');

    //Saving the last-interacted date

    savedState.LastInteractedDate[mode] = new Date(TODAY).toISOString().split("T")[0];
    save();

    if (gameState.answerRevealed) return;
    if (userInput === '') return;
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
    if (standardize(gameState.correct.trim().toLowerCase()) == standardize(userInput.trim().toLowerCase()))
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
    document.getElementById('play-button')
    .addEventListener
    (
        'click', 
        () =>
        {
            play();
        }
    );
}

//Playing:

function play ()
{
    const iframeElement = document.getElementById('sc-widget');
    const widget = SC.Widget(iframeElement);
    widget.seekTo(gameState.startTimestamp)
    widget.play();
    // Clear any existing timer (if you want to allow multiple plays)
    if (window.autoPauseTimeout) 
    {
        clearTimeout(window.autoPauseTimeout);
    }
    // Set a timer to pause after playDurationMs
    window.autoPauseTimeout = setTimeout
    (
        () => 
        {
            widget.pause();
        }, 
        gameState.endTimestamp-gameState.startTimestamp
    );
    console.log(gameState.duration);
    console.log('START:' + gameState.startTimestamp);
    console.log(gameState.endTimestamp);
}

//Displaying final results:

function finalResults ()
{
    finalRes = document.getElementById('final-final-result');
    finalRes.style.setProperty("visibility","visible");
    finalRes.innerHTML += 
    `
      <p>
        Results for Day #${(initialDate - new Date(TODAY).setHours(0,0,0,0))/(-86400000) + 1}<br>
      </p>
    `;
    if (savedState.WonToday[0])
    {
        finalRes.innerHTML += `Song: ` + (savedState.Attempts[0] == -1 ? `lost :(` : `Won in ${savedState.Attempts[0]}` + (savedState.Attempts[0] == 1 ? ` try ` : ` tries `) + `(Streak: ${savedState.Streak[0]})`) + `<br>`
    }
    if (savedState.WonToday[1])
    {
        finalRes.innerHTML += `Lyric: ` + (savedState.Attempts[1] == -1 ? `lost :(` : `Won in ${savedState.Attempts[1]}` + (savedState.Attempts[1] == 1 ? ` try ` : ` tries `) + `(Streak: ${savedState.Streak[1]})`) + `<br>`
    }
    if (savedState.WonToday[2])
    {
        finalRes.innerHTML += `Audio: ` + (savedState.Attempts[1] == -1 ? `lost :(` : `Won in ${savedState.Attempts[2]}` + (savedState.Attempts[2] == 1 ? ` try ` : ` tries `) + `(Streak: ${savedState.Streak[2]})`) + `<br>`
    }
}

//Setting up the buttons:

for (let i = 0; i<savedState.Modes.length; i++)
{
    document.getElementById(savedState.Modes[i]).onclick =
    async () =>
    {
        const songs = await fetchSongs();
        start(songs, i);
    };
}
