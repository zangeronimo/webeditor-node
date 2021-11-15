export const slugGenerate = (name: string) => {
  name = name.replace(/^\s+|\s+$/g, ''); // trim
  name = name.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = "àáäâââãèéëêẽìíïîĩòóöôõùúüûũñç·/_,:;";
  const to   = "aaaaaaaeeeeeiiiiiooooouuuuunc------";
  for (let i=0, l=from.length ; i<l ; i++) {
    name = name.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  name = name.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

  return name;
}
