// src/lib/satori-jsx/jsx-runtime.js

/**
 * The JSX factory function for Satori.
 * This function is called by the transpiler for each JSX element.
 * It transforms the arguments into the object structure Satori expects.
 * @param {string | Function} tag - The element type (e.g., 'div').
 * @param {object} props - The properties of the element, including children.
 * @param {object[]} children - The children of the element.
 * @returns {object} A Satori-compatible VDOM node.
 */
function jsx(
  tag: string | ((props: object) => object),
  props: object,
  ...children: object[]
): object {
  if (typeof tag === "function") {
    return tag({ ...props, children });
  }

  if (tag === "Fragment") {
    return children;
  }

  return {
    type: tag,
    props: {
      ...props,
      children: children.length > 0 ? children : undefined,
    },
  };
}

// The `jsxs` function is an optimization used by the transpiler for elements
// with multiple, static children. For our purposes, its implementation is
// identical to `jsx`.
const jsxs = jsx;

const Fragment = "Fragment";

export { jsx, jsxs, Fragment };
