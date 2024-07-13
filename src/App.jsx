import React from 'react';

function App() {
  function eventHandler() {
    const sentence = document.querySelector("#write").value;
    if (sentence) {
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${sentence}`)
        .then(response => response.json())
        .then(data => {
          console.log("data", data);
          const state = data[0].meanings[0].definitions[0].definition;
          const displayElement = document.querySelector("#display");
          displayElement.style.opacity = 0; // Start transition
          setTimeout(() => {
            displayElement.innerHTML = state;
            displayElement.style.opacity = 1; // End transition
          }, 500); // Match this duration with the transition duration
        })
        .catch(err => {
          console.error("Error", err);
          const displayElement = document.querySelector("#display");
          displayElement.style.opacity = 0; // Start transition
          setTimeout(() => {
            displayElement.innerHTML = "No meaning found";
            displayElement.style.opacity = 1; // End transition
          }, 500); // Match this duration with the transition duration
        });
    } else {
      alert("Please enter a word");
    }
  }

  return (
    <>
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
        <div className="container max-w-md bg-zinc-800 text-white p-8 rounded-lg shadow-lg">
          <div className="text-2xl mb-4 text-center">Dictionary</div>
          <input
            type="text"
            id="write"
            placeholder="Enter a word"
            className="w-full p-2 mb-4 rounded-lg text-black"
          />
          <button
            onClick={eventHandler}
            id="submit"
            className="w-full bg-blue-500 p-2 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
          <div
            id="display"
            className="mt-4 text-lg transition-opacity duration-500 opacity-100"
            style={{ transition: "opacity 0.5s" }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default App;
