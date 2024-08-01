document.addEventListener('DOMContentLoaded', () => {
    // Генерация уникального кода
    function generateUniqueCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
    }

    // Запуск таймера
    function startTimer(expiryTime) {
        const timerElement = document.getElementById('timer');
        function updateTimer() {
            const timeLeft = expiryTime - Date.now();
            if (timeLeft <= 0) {
                timerElement.textContent = 'Код истек.';
                localStorage.setItem('codeStatus', 'expired');
                clearInterval(timerInterval);
                return;
            }
            const minutes = Math.floor(timeLeft / 60000);
            const seconds = Math.floor((timeLeft % 60000) / 1000);
            timerElement.textContent = `Осталось: ${minutes} мин ${seconds} сек`;
        }

        updateTimer();
        const timerInterval = setInterval(updateTimer, 1000);
    }

    // Проверка кода
    document.getElementById('verifyCode').addEventListener('click', function() {
        const inputCode = document.getElementById('codeInput').value.trim();
        const storedCode = localStorage.getItem('verificationCode');
        const codeStatus = localStorage.getItem('codeStatus');
        const expiryTime = localStorage.getItem('codeExpiryTime');

        if (!inputCode) {
            document.getElementById('result').textContent = 'Пожалуйста, введите код.';
            return;
        }

        if (inputCode === storedCode && codeStatus === 'valid') {
            document.getElementById('downloadLink').classList.remove('hidden');
            document.getElementById('diskPassword').classList.remove('hidden');
            document.getElementById('expiryMessage').classList.add('hidden');
            startTimer(parseInt(expiryTime));
        } else if (inputCode === storedCode && codeStatus === 'expired') {
            document.getElementById('result').textContent = 'Срок действия кода истек.';
            document.getElementById('downloadLink').classList.add('hidden');
        } else {
            document.getElementById('result').textContent = 'Неверный код.';
        }
    });

    // Генерация кода
    document.getElementById('generateCode').addEventListener('click', function() {
        const code = generateUniqueCode();
        localStorage.setItem('verificationCode', code);
        localStorage.setItem('codeStatus', 'valid');

        const expiryTime = Date.now() + 15 * 60 * 1000; // Код действителен 15 минут
        localStorage.setItem('codeExpiryTime', expiryTime);

        document.getElementById('result').textContent = `Ваш код: ${code}`;
        document.getElementById('codeDisplay').classList.remove('hidden');
        document.getElementById('downloadLink').classList.add('hidden');
        document.getElementById('diskPassword').classList.add('hidden');
        document.getElementById('expiryMessage').classList.remove('hidden');
    });

    // Перевод страницы на английский язык
    document.getElementById('translateToEn').addEventListener('click', function() {
        document.querySelector('h1').textContent = 'Download Premier Pro 2024';
        document.getElementById('generateCode').innerHTML = '<i class="fas fa-key"></i> Get Code';
        document.getElementById('codeInput').placeholder = 'Enter Code';
        document.getElementById('verifyCode').innerHTML = '<i class="fas fa-check"></i> Verify Code';
        document.getElementById('result').textContent = '';
        document.getElementById('diskPassword').innerHTML = 'Disk Password: <strong>241215</strong>';
        document.getElementById('expiryMessage').textContent = '';
        document.getElementById('timer').textContent = '';
        document.getElementById('downloadLink').innerHTML = '<i class="fas fa-download"></i> Download Premier Pro 2024';
        document.getElementById('virusTotalLink').innerHTML = '<i class="fas fa-shield-virus"></i> Check for Viruses';
        document.getElementById('creatorInfo').innerHTML = '<p>Creator: <strong>Leguskha</strong></p><p>Donate to card: <strong>2200 7012 0006 6212</strong></p>';
    });

    // Перевод страницы на русский язык
    document.getElementById('translateToRu').addEventListener('click', function() {
        document.querySelector('h1').textContent = 'Скачайте Premier Pro 2024';
        document.getElementById('generateCode').innerHTML = '<i class="fas fa-key"></i> Получить код';
        document.getElementById('codeInput').placeholder = 'Введите код';
        document.getElementById('verifyCode').innerHTML = '<i class="fas fa-check"></i> Проверить код';
        document.getElementById('result').textContent = '';
        document.getElementById('diskPassword').innerHTML = 'Пароль для диска: <strong>241215</strong>';
        document.getElementById('expiryMessage').textContent = '';
        document.getElementById('timer').textContent = '';
        document.getElementById('downloadLink').innerHTML = '<i class="fas fa-download"></i> Скачать Premier Pro 2024';
        document.getElementById('virusTotalLink').innerHTML = '<i class="fas fa-shield-virus"></i> Проверить на вирусы';
        document.getElementById('creatorInfo').innerHTML = '<p>Создатель: <strong>Leguskha</strong></p><p>Пожертвование на карту: <strong>2200 7012 0006 6212</strong></p>';
    });

    // Смена на темную тему
    document.getElementById('darkModeToggle').addEventListener('click', function() {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
    });

    // Смена на светлую тему
    document.getElementById('lightModeToggle').addEventListener('click', function() {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
    });

    // Изменение цвета иконок и кнопок
    document.getElementById('iconColor').addEventListener('input', function() {
        const color = this.value;
        document.documentElement.style.setProperty('--button-color', color);
        document.documentElement.style.setProperty('--button-hover-color', shadeColor(color, -20));
    });

    // Функция для затемнения цвета
    function shadeColor(color, percent) {
        let R = parseInt(color.substring(1,3),16);
        let G = parseInt(color.substring(3,5),16);
        let B = parseInt(color.substring(5,7),16);

        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);

        R = (R<255)?R:255;
        G = (G<255)?G:255;
        B = (B<255)?B:255;

        const RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
        const GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
        const BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

        return "#"+RR+GG+BB;
    }
});
