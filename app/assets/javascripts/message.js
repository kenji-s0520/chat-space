$(document).on('turbolinks:load', function() {

  function buildHTML(message) {
    var img = message.image ? `<img src=${ message.image }>` : "";
    var html = `<div class="message" data-message-id="${message.id}">
      <div class="upper-message">
        <div class="upper-message__user-name">
          ${message.user_name}
        </div>
        <div class="upper-message__data">
          ${message.data}
        </div>
      </div>
      <div class="lower-message">
        <p class="lower-message__content">
          ${message.content}
        </p>
      </div>
        ${img}
    </div>`
    return html;
  }

    // 非同期通信設定

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData:  false,
      contentType:  false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('form')[0].reset();
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.form__submit').prop('disabled', false); 
    })
  })

    // 自動更新設定

  var reloadMessages = function() {
    if (location.href.match(/\/groups\/\d+\/messages/)){
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      var last_message_id = $('.message').last().data('message-id');
      var href = 'api/messages'
      $.ajax({
        url: href,
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function (message){
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
          })
        })
      .fail(function() {
        alert('自動更新に失敗しました。');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});