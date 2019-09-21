function clearForm() {
    $('.inputs input').val('');
    clearErrors();
}

function clearErrors() {
    $('.inputs input').removeClass('errState');
    $('.error').text('');
    $('#errorForm').text('');
}

function validate() {
    valid = true;
    uName = $('#name');
    if (uName.val() == ''){
        uName.addClass('errState');
        uName.siblings('.error').text('“Имя” необходимо заполнить!');
        valid = false;
    }

    uSurName = $('#surname');
    if (uSurName.val() == '') {
        uSurName.addClass('errState');
        uSurName.siblings('.error').text('“Фамилия” необходимо заполнить!');
        valid = false;
    }

    uEmail = $('#email');
    if (uEmail.val() == '') {
        uEmail.addClass('errState');
        uEmail.siblings('.error').text('“E-mail” необходимо заполнить!');
        valid = false;
    }

    uPass = $('#pass');
    if (uPass.val() == '') {
        uPass.addClass('errState');
        uPass.siblings('.error').text('“Пароль” необходимо заполнить!');
        valid = false;
    }

    uRepPass = $('#repeatpass');
    if (uRepPass.val() == '') {
        uRepPass.addClass('errState');
        uRepPass.siblings('.error').text('“Пароль” необходимо заполнить!')
        valid = false;
    }
    else if (uRepPass.val() != uPass.val()) {
        uRepPass.addClass('errState');
        uRepPass.siblings('.error').text('Пароли не совпадают!');
        valid = false;
    }
    return valid
}

function send() {
    var name = $('#name').val(),
        surname = $('#surname').val(),
        email = $('#email').val(),
        pass = $('#pass').val();

    $.ajax({
        type: "POST",
        url: "register.php",
        dataType: 'json',
        data: {
            name : name,
            surname : surname,
            email : email,
            pass : pass
        },
        success: function(data){
            console.log(data);
            if (data == '0'){
                $('.form').hide();
                $('.success').show();
            } else {
                $('#errorForm').text('Такой E-mail уже существует!');
            }
        }
    });
}

$(document).ready(function () {
    $('.reset').click(function () {
        clearForm();
    });

    $('input').focus(function () {
        $(this).removeClass('errState');
        $(this).siblings('.error').text('');
    });

    $('.submit').click(function () {
        clearErrors();
        if (validate()){
            sendAns = send();
        }
    });
});