import { Annotation, StateGraph } from "@langchain/langgraph";

const InputAnnotation = Annotation.Root({
  statement: Annotation<string>,
});

const startNode = (
  _state: typeof InputAnnotation.State
): typeof InputAnnotation.State => {
  console.log("Start...");
  return { statement: `${_state.statement} I am` };
};

const happyNode = (
  _state: typeof InputAnnotation.State
): typeof InputAnnotation.State => {
  console.log("Happy Node");
  return { statement: `${_state.statement} happy` };
};

const sadNode = (
  _state: typeof InputAnnotation.State
): typeof InputAnnotation.State => {
  console.log("Sad Node");
  return { statement: `${_state.statement} sad` };
};

// The decideMode function will now be handled by edges
const decideMode = (_state: typeof InputAnnotation.State) => {
    if (Math.random() < 0.5) {
      return "happyNode"; // Return node name, not function
    }
    return "sadNode"; // Return node name, not function
  };

const graph = new StateGraph({
  input: InputAnnotation,
  output: InputAnnotation,
})
.addNode("startNode", startNode)
.addNode("happyNode", happyNode)
.addNode("sadNode", sadNode)
.addEdge("__start__", "startNode")
.addConditionalEdges("startNode", decideMode) 
.compile();


  const run = async () => {
    const result = await graph.invoke({statement: ''})
    console.log(result.statement)
  }

  run()