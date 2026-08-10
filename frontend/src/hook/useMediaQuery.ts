import { useState, useEffect } from "react";

// this function will run width viewport greater then
// or less then query
// the browser listens for changes

// window.matchMedia this method is will return a object
// that look like this
// {
//   matches:true,
//   media: "('minwidth: 810px')", this value that we send to it
//   onchange: null,
//   addEventListener: function,
//   removeEventListener: function,
// }

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean>(
    () => window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const hanlder = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };
    mediaQuery.addEventListener("change", hanlder);
    return () => mediaQuery.removeEventListener("change", hanlder);
  }, [query]);

  return matches;
}
