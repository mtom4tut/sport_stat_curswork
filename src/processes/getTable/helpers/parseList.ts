export function parseLists(listsName: string[]) {
  let str = '';

  listsName.forEach(item => {
    str += `&ranges=${item}`;
  });

  return str;
}
