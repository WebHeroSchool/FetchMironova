
let loader = document.getElementById('loaderP');
let load = function() {
	loaderP.style.display = 'none';
}
let url = window.location.search;
function getName(url) {
	let getUrl = url.split('=');
	let name = getUrl[1];
	if(name == null) {
	name = 'MironovaAlina';
	}
	return name;
}
let user = `https://api.github.com/users/${getName(url)}`;
const getInfo = new Promise((resolve, reject) => {
  setTimeout(() => user ? resolve(user) : reject('Ссылка не найдена'),2000);
});

let now = new Date();
const getDate = new Promise((resolve, reject) => {
	setTimeout(() => {
		load();
		const dataDiv = document.createElement('div');
		dataDiv.textContent = `Текущая дата: ${Date()}`;
		resolve();
    console.log(dataDiv);
	}, 3000);
});
Promise.all([getDate, getInfo])
  .then(([now, user]) => fetch(user))
  .then(res => res.json())
  .then(json => {
    let avatar = document.createElement('img');
    if(json.avatar_url != null) {
      avatar.src = json.avatar_url;
    } else {
      document.body.innerHTML= ('Аватар отсутствует<br>');
    }
    let link = document.createElement('a');
    link.href = json.html_url;
    if(json.login != null) {
      link.innerHTML = json.login +'<br>';
    } else {
      link.innerHTML = 'Нет информации об имени<br>';
    }
    if(json.bio != null) {
      document.body.innerHTML= json.bio +'<br>';
    } else {
      document.body.innerHTML= ('Нет информации о биографии<br>');
    }

    document.body.append(link);
    document.body.append(avatar);
    let today = document.createElement('p');
    today.innerHTML = now;
    document.body.append(today);
    console.log(now)
    })
  .catch(err => document.body.innerHTML = ('Информация о пользователе недоступна'));
console.log(window.location.search);
