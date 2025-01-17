import { Annotation, StateGraph } from "@langchain/langgraph";

const InputAnnotation = Annotation.Root({
  question: Annotation<string>,
});

const OutputAnnotation = Annotation.Root({
  answer: Annotation<string>,
});

const answerNode = (_state: typeof InputAnnotation.State) => {
  return { answer: "bye" };
};

const graph = new StateGraph({
  input: InputAnnotation,
  output: OutputAnnotation,
})
  .addNode("answerNode", answerNode)
  .addEdge("__start__", "answerNode")
  .compile();

const run = async () => {
  const response = await graph.invoke({ question: "hi" });
  console.log(response)
}

run()
