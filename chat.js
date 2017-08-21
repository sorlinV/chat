let msg = document.querySelector("#message");
let chat = document.querySelector("#chat");
let last_id = 0;
document.querySelector("#chat-form").addEventListener("submit", function (e) {
    e.preventDefault();
    fetch('messages.php', {credentials: "same-origin",method: "POST", body: JSON.stringify({id: last_id, message: msg.value})}).then(function (response) {
        return response.status;
    }).then(function (status) {
        if (status != 200) {
            console.log("request fail");
        }
    }).catch(function (err) {
        console.error(err.message);
    });
    msg.value = "";
});

setInterval(function () {
    fetch('messages.php', {method: "POST", body: JSON.stringify({id: last_id, message: ""})}).then(function (response) {
        return response.json();
    }).then(function (messages) {
        last_id = messages['id'];
        for (let m of messages['messages']) {
            let txt = `<p> [${m['date']}]${m['user']} : ${m['text']} </p>`;
            chat.innerHTML = txt + chat.innerHTML;
        }
    });
}, 200);