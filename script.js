const mySkills = [
    'HTML & CSS', 
    'JavaScript', 
    'Embedded Systems', 
    'C++ / C', 
    'Circuit Design', 
    'Git & GitHub'
];
const list = document.getElementById('skills-list');
mySkills.forEach(skill => {
    const newLi = document.createElement('li');
    newLi.textContent = skill;
    list.appendChild(newLi);
});