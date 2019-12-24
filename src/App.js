import React, { useReducer } from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import './App.css';
const initialState = {
  start: "left",
  left: "",
  operator: "",
  right: "",
}
function calc(leftOp, op, rightOp) {
  const num1 = parseInt(leftOp);
  const num2 = parseInt(rightOp);
  switch (op) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
    default:
      return 0;
  }
}
function reducer(state, action) {
  switch (action.type) {
    case "number":
      return {
        ...state,
        [state.start]: state[state.start] + action.data,
      }
    case "operator":
      return {
        ...state,
        left: state.start === "right" ? calc(state.left, state.operator, state.right) : state.left,
        right: "",
        operator: action.data,
        start: "right",
      }
    case "calculate":
      return {
        start: "left",
        left: calc(state.left, state.operator, state.right),
        operator: "",
        right: ""
      }
    case "clear":
      return {
        ...state,
        start: "left",
        left: "",
        operator: "",
        right: "",
        sequence: ""
      }
    default:
      return state;
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const operators = ['+', '-', '*', '/']
  return (
    <div>
      {numbers.map(num => (
        <Button type = "primary" shape = "circle" onClick={({ target }) =>
          dispatch({ type: "number", data: target.textContent })
        }>
          {num}
        </Button>
      ))}
      {operators.map(op => (
        <Button type = "dashed" shape = "circle"onClick={({ target }) =>
          dispatch({ type: "operator", data: target.textContent })
        }>
          {op}
        </Button>
      ))}
      <Button type = "primary" shape = "circle" onClick={() => dispatch({ type: "calculate" })}>=</Button>
      <Button type = "primary" onClick={() => dispatch({ type: "clear" })}>clear</Button>
      <div>
        <p>Result</p>
        {state.left + state.operator + state.right}
      </div>
    </div>
  )
}
export default App;