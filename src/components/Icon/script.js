const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const dirs = fs.readdirSync(path.resolve(__dirname, './files'));

const subItems = dirs.map(dir => {
  const files = fs.readdirSync(path.resolve(__dirname, `./files/${dir}`));
  const template = `
    ${files.map(file => {
      return `"${`${file.replace('.svg', '')}-${dir}`.toUpperCase()}": require('./files/${dir}/${file}').default,`
    }).join('\n')}
  `;
  return template;
}).join('\n');

const template = `
  // This file is auto generated by script.js. DO NOT EDIT DIRECTLY!!!
  export default {
    ${subItems}
  } as const;
`;

fs.writeFileSync(path.resolve(__dirname, './Icons.ts'), prettier.format(template, { parser: 'typescript' }), 'utf8')