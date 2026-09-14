import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const subtitle = "Contact";
const el1 = React.createElement('div', null, "<", " ", subtitle, " ", "/>");
const el2 = React.createElement('div', null, `< ${subtitle} />`);

console.log("El1:", renderToStaticMarkup(el1));
console.log("El2:", renderToStaticMarkup(el2));
