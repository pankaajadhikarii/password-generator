import { useState, useCallback, useRef } from "react";
 
function App() {
  // useState hook
  const [length, setLength] = useState(10);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  function attachPassword() {
    setPassword(createPassword);
  }

  function handleRangeChange(e) {
    setLength(e.target.value);
  }

  // useCallback hook
  const createPassword = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number == true) string += "01234567890123456789";
    if (character == true) string += "~`!@#$%^&*-_:;'/?.>,<";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length + 1);
      pass += string.charAt(char);
    }

    setPassword(pass);
  }, [length, number, character, setPassword]);

  // useRef hook
  let ref = useRef(null);

  function copyToClipboard() {
    ref.current?.select();
    window.navigator.clipboard.writeText(password);
  }
  return (
    <>
      <div className="w-full max-w-md mx-auto rounded-xl px-4 py-3 my-6 bg-slate-800 text-red-400">
        <h1 className="text-center text-gray-300 mb-3">Password Generator</h1>
        <div className="flex rounded-xl overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Click generate to generate a password"
            readOnly
            ref={ref}
          />

          <button
            className="outline-none bg-red-700 text-gray-300 px-3 py-0.5 shrink-0 hover:bg-red-600"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2 mb-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={10}
              max={15}
              value={length}
              onChange={handleRangeChange}
              className="cursor-pointer"
            />
            <label>Length : {length}</label>
          </div>
        </div>

        <div className="flex items-center gap-x-1 mb-1">
          <input
            type="checkbox"
            id="numberInput"
            className="cursor-pointer"
            defaultChecked={number}
            onChange={() => {
              setNumber((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="characterInput"
            className="cursor-pointer"
            defaultChecked={character}
            onChange={() => {
              setCharacter((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Special Characters</label>
        </div>

        <div>
          <button
            className="text-gray-300 bg-red-700 hover:bg-red-600 rounded-full px-2 
            py-1 my-5 cursor-pointer"
            onClick={attachPassword}
          >
            Generate
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
