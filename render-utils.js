export function renderCat(cat) {
    const li = document.createElement('li');

    const p = document.createElement('p');
    p.textContent = `${cat.name} (${cat.lives} lives)`;

    li.append(p);

    return li;
}
