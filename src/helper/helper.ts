export const stringToHTML = (arg: string) => {
    const parser = new DOMParser(),
      DOM = parser.parseFromString(arg, "text/html");
    return DOM.body.childNodes[0] as HTMLElement;
  };
  