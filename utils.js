export function log(...args) {
  const p = document.createElement("p");
  p.textContent = args.join(" ");
  document.body.append(p);
}
