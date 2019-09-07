$(function () {

  $(document).on('turbolinks:load', function () {
    
    var search_list = $("#user-search-result");
    var member_list = $("#member_search_result");

    function appendUsers(user) {
      var html = `<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">
                ${user.name}
              </p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" user-id="${user.id}" user-name=${user.name}>追加
                </div>
              </div>`
        search_list.append(html); 
    }

    function appendMembers(name, user_id) {
        var html = `<div class='chat-group-user clearfix js-chat-member' id='chat_group_user_22'>
                <input name='group[user_ids][]' type='hidden' value="${user_id}">
                <p class='chat-group-user__name'>${name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
        member_list.append(html);
    }

    function appendNoUsers(info) {
      var html =`<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ info }</p>
                </div>`
  
      search_list.append(html);
    }

    $(function () {
        $("#user-search-field").on("keyup", function(e) {
            var input = $("#user-search-field").val();
            $.ajax({
                type: 'GET',
                url: '/users',
                data: { keyword: input },
                dataType: 'json'
            })
            .done(function (users) {
              if (input.length === 0) {         
                $('#user-search-result').empty();
              }

            else if (input.length !== 0){     
                $('#user-search-result').empty();
                users.forEach(function(user){ 
                    appendUsers(user)
                });
            }

            else {
                $('#user-search-result').empty(); 
                appendErrMsgToHTML("一致するユーザーが見つかりません");
            }
        })

        .fail(function() {
            alert('ユーザー検索に失敗しました');
        });
    });
   

      $(function () {
        $(document).on('click', '.user-search-add', function () {
            var name = $(this).attr("user-name");
            var user_id = $(this).attr("user-id");
            $(this).parent().remove();
            appendMembers(name, user_id);
        });
        $(document).on("click", '.user-search-remove', function () {
            $(this).parent().remove();
        });
      });
    });
  });
});