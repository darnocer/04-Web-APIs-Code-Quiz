var myQuestions = [
  {
    question: "Javascript files have an extension of _____.",
    code: "",
    choices: {
      a: ".Java",
      b: ".xml",
      c: ".js",
      d: ".javascript",
    },
    answer: "c",
  },
  {
    question: "The following code is an example of what?",
    code: "var hello = function() {<br/> console.log('Hello World') };",
    choices: {
      a: "Function Expression",
      b: "Function Declaration",
      c: "Function",
      d: "Method",
    },
    answer: "a",
  },
  {
    question: "What will the console.log outputs of the following code be?",
    code:
      "var myVar = 1; <br/> function b() { <br/> console.log(myVar); } <br/> function a() { <br/> var myVar = 2; <br/> b();} <br/> a();",
    choices: {
      a: "1, 1",
      b: "2, 1",
      c: "2, 2",
      d: "1, 2",
    },
    answer: "d",
  },

  {
    question: "What is the result of the following code?",
    code: "NaN === NaN",
    choices: {
      a: "true",
      b: "false",
      c: "undefined",
      d: "error",
    },
    answer: "b",
  },

  {
    question: "What is the result of the following code?",
    code: "typeof function() {}",
    choices: {
      a: "null",
      b: "object",
      c: "undefined",
      d: "function",
    },
    answer: "d",
  },
];
