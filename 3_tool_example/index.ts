import { tool } from "@langchain/core/tools";
import { z } from "zod";

const multiplySchema = z.object({
  a: z.number(),
  b: z.number(),
});

const multiply = tool(
  (input) => {
    const result = input.a * input.b;
    return `The multipler of ${input.a} and ${input.b} is ${result}`;
  },
  {
    name: "multiply",
    description: "AMultiply two numbers",
    schema: multiplySchema,
  }
);

const run = async () => {
  const result = await multiply.invoke({ a: 3, b: 4 });
  console.log(result);
};

run();
