import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import keys from "./components/references";
import MyButton from "./components/buttons";

function App() {
  //State Variables:
  const [show, setShow] = useState("0");
  const [prevNumber, setPrevNumber] = useState("");
  const [currentNumber, setCurrentNumber] = useState("");
  const [operation, setOperation] = useState(null);
  const [total, setTotal] = useState(false);

  //Effct Hooks:
  useEffect(() => {
    setShow(currentNumber);
  }, [currentNumber]);

  useEffect(() => {
    setShow("0");
  }, []);

  //Functions:
  const handleNumber = (e) => {
    if (e.target.innerText === "." && currentNumber.includes(".")) return;

    if (currentNumber === "") {
      setCurrentNumber(e.target.innerText);
    } else if (currentNumber.charAt(0) === "0") {
      setCurrentNumber((acumulatedString) => {
        return acumulatedString.substr(1) + e.target.innerText;
      });
    } else {
      setCurrentNumber((acumulatedString) => {
        return acumulatedString + e.target.innerText;
      });
    }
  };

  const operate = (e) => {
    console.log(e.target.innerText);

    if (currentNumber === "" || currentNumber === "0") return;

    if (prevNumber === "") {
      setPrevNumber(currentNumber);
      setCurrentNumber("");
      setOperation(e.target.innerText);
    } else {
      equals(); //Here we are applying function equals. The case is different when function get's triggered by an event listener. In this case,
      //e.target will be undefined. In order to save this case, we need to use the e? operator. This is called Optional Chaining and is the second
      //Use case for ? (the other ones are: Ternary Operator & Nullish Coalescing)
      setOperation(e.target.innerText);
    }
  };

  const equals = (e) => {
    if (currentNumber === "" || currentNumber === "0" || prevNumber === "")
      return;

    if (e?.target === undefined || e?.target !== undefined) {
      const path = e?.target;
      let result;
      switch (operation) {
        case "+":
          result = parseFloat(prevNumber) + parseFloat(currentNumber);
          break;
        case "-":
          result = parseFloat(prevNumber) - parseFloat(currentNumber);
          break;
        case "X":
          result = parseFloat(prevNumber) * parseFloat(currentNumber);
          break;
        case "/":
          result = parseFloat(prevNumber) / parseFloat(currentNumber);
          break;
        default:
          return;
      }

      if (path === undefined) {
        setPrevNumber(String(result));
        setCurrentNumber("");
      } else {
        setCurrentNumber(String(result));
        setPrevNumber("");
      }
    }
  };

  const handleAllClear = () => {
    setCurrentNumber("0");
    setPrevNumber("");
    setOperation(null);
  };

  const minusPlus = () => {
    if (currentNumber.charAt(0) === "0" || currentNumber.charAt(0) == "")
      return;

    if (currentNumber.charAt(0) === "-") {
      setCurrentNumber((acumulatedString) => {
        return acumulatedString.substr(1);
      });
    } else {
      setCurrentNumber((acumulatedString) => {
        return "-" + acumulatedString;
      });
    }
  };

  const applyPercentage = () => {
    if (currentNumber === "" || currentNumber === "0") return;

    if (prevNumber === "") {
      setCurrentNumber((acumulatedString) => {
        return acumulatedString / 100;
      });
    } else {
      setCurrentNumber((acumulatedString) => {
        return parseFloat(prevNumber) * (parseFloat(currentNumber) / 100);
      });
    }
  };

  return (
    <div className="wrapper">
      <div className="display">
        <NumberFormat
          displayType="text"
          value={show}
          thousandSeparator={true}
        />
      </div>

      {keys.map((key) => {
        return (
          <MyButton
            myClass={key.class}
            myFunction={eval(key.function)}
            key={key.id}
            id={key.id}
          />
        );
      })}

      {/* <button className="ac btn" onClick={handleAllClear}>
        AC
      </button>
      <button className="percentage btn" onClick={applyPercentage}>
        %
      </button>
      <button className="minus btn" onClick={minusPlus}>
        +/-
      </button>

      <button className="operand btn" onClick={operate}>
        /
      </button>

      <button className="number btn" onClick={handleNumber}>
        7
      </button>
      <button className="number btn" onClick={handleNumber}>
        8
      </button>
      <button className="number btn" onClick={handleNumber}>
        9
      </button>

      <button className="operand btn" onClick={operate}>
        X
      </button>
      <button className="number btn" onClick={handleNumber}>
        4
      </button>
      <button className="number btn" onClick={handleNumber}>
        5
      </button>
      <button className="number btn" onClick={handleNumber}>
        6
      </button>

      <button className="operand btn" onClick={operate}>
        +
      </button>

      <button className="number btn" onClick={handleNumber}>
        1
      </button>
      <button className="number btn" onClick={handleNumber}>
        2
      </button>
      <button className="number btn" onClick={handleNumber}>
        3
      </button>

      <button className="operand btn" onClick={operate}>
        -
      </button>

      <button className="number zero btn" onClick={handleNumber}>
        0
      </button>

      <button className="number btn" onClick={handleNumber}>
        .
      </button>
      <button className="equal btn" onClick={equals}>
        =
      </button> */}
    </div>
  );
}

export default App;
