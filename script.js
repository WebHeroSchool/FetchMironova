let url = window.location.search;
function getName(url) {
	let getUrl = url.split('=');
	let name = getUrl[1];
	if(name == null) {
	name = 'MironovaAlina';
	}
	return name;
}
function getInfo() {
  fetch(`https://api.github.com/users/${getName(url)}`)
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
    })
  .catch(err => document.body.innerHTML = ('Информация о пользователе недоступна'));
}
getInfo(name);
console.log(window.location.search);
