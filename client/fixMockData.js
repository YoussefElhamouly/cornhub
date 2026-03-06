const fs = require('fs');

const path = 'src/components/features/fileExplorer/data/mockData.ts';
let code = fs.readFileSync(path, 'utf8');

// I will parse the javascript using regex in a smarter way by replacing the children property and node property safely
function insertProperties(str) {
  let counter = 1;
  return str.replace(/\{\s*name:\s*([^,]+),\s*path:\s*([^,]+),\s*type:\s*([^,]+),/g, (match, name, pathVal, type) => {
    return `{
    id: "node_${counter++}",
    parentId: null,
    commitHash: "mock-hash",
    branch: "main",
    status: "unchanged",
    name: ${name},
    path: ${pathVal},
    type: ${type},`;
  });
}

code = insertProperties(code);

// update synthetic root as well
code = code.replace(/name: "root",\s*path: "",\s*type: "folder",/, `id: "root",
      parentId: null,
      commitHash: "",
      branch: "",
      status: "unchanged",
      name: "root",
      path: "",
      type: "folder",`);

fs.writeFileSync(path, code);
