const mySkills = ['HTML','CSS','Flexbox','Grid','Javascript'];
const list = document.getElementById('skills-list');
mySkills.forEach(skill => {
    const newLi = document.createElement('li');
    newLi.textContent = skill;
    list.appendChild(newLi);
});