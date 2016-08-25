## SimpleOBJ: Approach

Knowing the format, we can parse an OBJ from a string:

1. Splitting into individual lines
2. Stripping the comments from each line
3. Converting each line into a set of tokens
4. For each set of tokens, use the first token to decide how to decode the rest, store results.
5. Return new model made from parsed OBJ.