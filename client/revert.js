const fs = require('fs');

const path = 'src/components/features/fileExplorer/data/mockData.ts';
let code = fs.readFileSync(path, 'utf8');

// The replacement was:
// return `{
//    id: ${idStr},
//    parentId: null,
//    commitHash: "mock-hash",
//    branch: "main",
//    status: "unchanged",
//    children: [],
//    name: ${name},
//    path: ${p},
//    type: ${type},`;

code = code.replace(/id: "node_\d+",\s*parentId: null,\s*commitHash: "mock-hash",\s*branch: "main",\s*status: "unchanged",\s*children: \[\]/g, "");

// also root node
code = code.replace(/id: "root",\s*parentId: null,\s*commitHash: "mock-hash",\s*branch: "main",\s*status: "unchanged",\s*children: \[\]/g, "");

fs.writeFileSync(path, code);
