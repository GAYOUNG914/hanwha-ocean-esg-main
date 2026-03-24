
export function toggleClass(_el,_class) {
  if(!_el.classList.contains(_class)) _el.classList.add(_class);
  else _el.classList.remove(_class);
}