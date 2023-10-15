import { useState } from 'react'
import './App.css'

function App() {
  const [answer, setAnswer] = useState('');
  const [expression, setExpression] = useState('');
  const et = expression.trim();
  const isOperator = (symbol) => {
    return /[*/+-]/.test(symbol);
  }

  const handleClick = (symbol) => {
    if (symbol === 'clear') {
      setAnswer('');
      setExpression('0');
    } else if (symbol === 'negative') {
      if (answer === '') return;
      setAnswer(
        answer.toString().charAt(0) === '-' ? answer.slice(1) : '-' + answer
      );
    } else if (symbol === 'percent') {
      if (answer === '') return;
      setAnswer((parseFloat(answer) / 100).toString());
    } else if (isOperator(symbol)) {
      setExpression(et + ' ' + symbol + ' ');
    } else if (symbol === '=') {
      calculate();
    } else if (symbol === '0') {
      if (expression.charAt(0) !== '0') {
        setExpression(expression + symbol);
      }
    } else if (symbol === '.') {
    const lastNumber = expression.split(/[-+/*]/g).pop();
      if (lastNumber?.includes('.')) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === '0') {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }

  }

  const calculate = () => {
    if (isOperator(et.charAt(et.length - 1))) return;

    const parts = et.split(' ');

    const newParts = [];

    for (let i = parts.length - 1; i >= 0; i--) {
      if (['*', '/', '+'].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(' ');
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression));
    } else {
      setAnswer(eval(newExpression));
    }
    setExpression('');
  }

  return (
    <div>
      <div id="calculator">
        {/* Display */}
        <div id="display">
          <div id='answer'>{answer}</div>
          <div id='expression'>{expression}</div>
        </div>

        {/* Buttons */}
        <button onClick={() => handleClick('clear')} id="clear">c</button>

        <button onClick={() => handleClick('negative')} id="negative">+/-</button>

        <button onClick={() => handleClick('percent')} id="percent">%</button>

        <button onClick={() => handleClick('/')} id="divide">/</button>

        <button onClick={() => handleClick('7')} id="seven">7</button>
        <button onClick={() => handleClick('8')} id="eight">8</button>
        <button onClick={() => handleClick('9')} id="nine">9</button>

        <button onClick={() => handleClick('*')} id="multiply">*</button>

        <button onClick={() => handleClick('4')} id="four">4</button>
        <button onClick={() => handleClick('5')} id="five">5</button>
        <button onClick={() => handleClick('6')} id="six">6</button>

        <button onClick={() => handleClick('-')} id="subtract">-</button>

        <button onClick={() => handleClick('1')} id="one">1</button>
        <button onClick={() => handleClick('2')} id="two">2</button>
        <button onClick={() => handleClick('3')} id="three">3</button>

        <button onClick={() => handleClick('+')} id="add">+</button>

        <button onClick={() => handleClick('0')} id="zero">0</button>

        <button onClick={() => handleClick('.')} id="decimal">.</button>

        <button onClick={() => handleClick('=')} id="equals">=</button>
      </div>
    </div>
  )
}

export default App
