export function renderCat(cat) {
    const li = document.createElement('li');

    if (cat.lives < 1) {
        li.classList.add('dead');
    }

    const p = document.createElement('p');
    p.textContent = `${cat.name} (${cat.lives} lives)`;

    li.append(p);

    return li;
}
