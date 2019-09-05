$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` :"";
    var html = `<div class="message">
      <div class="message__detail">
        <p class="upper-message">
      ${message.user_name}
        </p>
        <p class="upper-message__data">
      ${message.data}
        </p>
      </div>
      <p class="upper-message__data">
        <div>
        ${content}
        </div>
        ${img}
      </p>
    </div>`
    return html;
  }

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
      $('#message_content').val('');
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.form__submit').prop('disabled', false); 
    })

    function scrollBottom(){
      var target = $('.message').last();
      var position = target.offset().top+$('.messages').scrollTop();
      $('.messages').animate({
        scrollTop: position
      }, 300, 'swing');
    }
  })
});