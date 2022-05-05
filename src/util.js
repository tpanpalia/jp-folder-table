import data from "./data.json";

export default function getRowsColumns() {
  let arr = [];
  arr.push(data.root.child);
  function addFolders(root) {
    let temp = [];
    if (root.length > 1) {
      for (let i = 0; i < root.length; i++) {
        if (data[root[i]] !== undefined) {
          let a = data[root[i]].child;
          temp = [...temp, ...a];
        }
      }
      arr.push(temp);
      addFolders(temp);
    }
  }
  addFolders(arr[0]);

  let columns = ["ROOT"];
  for (let i = 0; i < arr.length - 1; i++) {
    const str = `DIR${i + 1}`;
    columns.push(str);
  }
  let obj = {};
  for (let i = 0; i < columns.length; i++) {
    if (columns[i] === "ROOT") {
      obj[columns[i]] = "root";
    } else {
      obj[columns[i]] = "";
    }
  }

  function getRows(val, res) {
    res = [...res, [val]];
    if (data[val]) {
      let b = data[val].child;
      if (b !== undefined) {
        let temp = [];
        for (let i = 0; i < b.length; i++) {
          if (!/.txt/.test(b[i])) {
            temp = [...res[0], b[i]];
            res.push(temp);
            getRows(b[i], res);
          }
        }
      }
    }
    return res;
  }

  let rows = [];
  let a = arr[0];
  for (let i = 0; i < a.length; i++) {
    let x = getRows(a[i], []);
    for (let i = 1; i < x.length; i++) {
      let eachRow = x[i];
      let eachObj = { ...obj };
      let keys = Object.keys(eachObj);
      for (let j = 0; j < eachRow.length; j++) {
        eachObj[keys[j + 1]] = eachRow[j];
      }
      rows.push(eachObj);
    }
  }

  return [columns, rows];
}
