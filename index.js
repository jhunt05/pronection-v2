let linkNav = document.querySelectorAll('[href^="#"]');
const V = 0.3;

for (let i = 0; i < linkNav.length; i++) {
  linkNav[i].addEventListener('click', function(e) { 
    e.preventDefault();

    let w = window.pageYOffset;
    let hash = this.href.replace(/[^#]*(.*)/, '$1');  
    let t = document.querySelector(hash).getBoundingClientRect().top;
    let start = null;
    requestAnimationFrame(step);

    function step(time) {
      if (start === null) start = time;
      
      let progress = time - start;
      let r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
      window.scrollTo(0,r);
          
      if (r != w + t) {
        requestAnimationFrame(step)
      } else {
        location.hash = hash  
        }
      }
  }, false);
}

// Отправка данных на сервер
function send(event, php){
  console.log("Отправка запроса");
  event.preventDefault ? event.preventDefault() : event.returnValue = false;
  var req = new XMLHttpRequest();
  req.open('POST', php, true);
  req.onload = function() {
    if (req.status >= 200 && req.status < 400) {
    json = JSON.parse(this.response); // Ебанный internet explorer 11
        console.log(json);
          
        // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
        if (json.result == "success") {
          // Если сообщение отправлено
          alert("Сообщение отправлено");
        } else {
          // Если произошла ошибка
          alert("Ошибка. Сообщение не отправлено");
        }
      // Если не удалось связаться с php файлом
      } else {alert("Ошибка сервера. Номер: "+req.status);}}; 
  
  // Если не удалось отправить запрос. Стоит блок на хостинге
  req.onerror = function() {alert("Ошибка отправки запроса");};
  req.send(new FormData(event.target));
  }