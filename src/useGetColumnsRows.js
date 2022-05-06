import data from "./data.json";

export default function useGetColumnsRows() {
  let rows = [];
  function addFolders(temp, count = 1, res) {
    let result = { ROOT: "root" };

    if (Array.isArray(temp)) {
      for (let i = 0; i < temp.length; i++) {
        result[`DIR${count}`] = temp[i];
        if (res) {
          result = { ...result, ...res };
        }
        let a = data[temp[i]];
        if (a) {
          for (let j = 0; j < a.child.length; j++) {
            let b = { ...result };
            if (!/.txt/.test(b[i])) {
              b["DIR" + ++count] = a.child[j];
              addFolders(a.child[j], count, b);
              count = 1;
            }
          }
        }
      }
    } else {
      if (data[temp]?.child) {
        let c = count;
        for (let j = 0; j < data[temp]?.child.length; j++) {
          if (!/.txt/.test(data[temp]?.child[j])) {
            let d = { ...res };
            d[`DIR${++count}`] = data[temp]?.child[j];
            count = c;
            rows.push(d);
          } else {
            if (data[temp]?.child.length === 1) {
              rows.push(res);
            }
          }
        }
      }
    }
  }

  addFolders(data.root.child, 1);

  let max = 0;
  rows.map((e) => {
    max = Math.max(max, Object.keys(e).length);
  });
  let columns = ["ROOT"];
  for (let x = 1; x < max; x++) {
    columns.push(`DIR${x}`);
  }
  return [columns, rows];
}
