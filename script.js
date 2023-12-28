var agora = new Date();
var dia = String(agora.getDate()).padStart(2, `0`) // o padStart define 2 digitos no número e caso seja somente 1 ele completa com 0 na frente
let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
var mes = agora.getMonth();
var ano = agora.getFullYear();
var dataAtual = `${dia} de ${meses[mes]} de ${ano}`
var dataHoje = window.document.getElementById('dataHoje');
dataHoje.innerHTML = dataAtual


function showAppointments(day) {
    // Aqui você pode adicionar a lógica para mostrar a tabela de agendamentos
    // Por exemplo, você pode exibir a tabela com os horários disponíveis para aquele dia
    console.log("Mostrar agendamentos para o dia", day);
}

function createCalendar(elementId, year, month) {
    var elem = document.getElementById(elementId);
    var firstDay = new Date(year, month, 1).getDay();
    var monthDays = new Date(year, month + 1, 0).getDate();

    var calendar = '<div class="day-header">Dom</div><div class="day-header">Seg</div><div class="day-header">Ter</div><div class="day-header">Qua</div><div class="day-header">Qui</div><div class="day-header">Sex</div><div class="day-header">Sáb</div>';

    for (let i = 0; i < firstDay; i++) {
        calendar += '<div class="day empty"></div>'; // Espaços vazios para dias do mês anterior
    }

        for (let day = 1; day <= monthDays; day++) {
        // Adiciona um evento de clique a cada dia
        calendar += `<div class="day" onclick="showAppointments(${day})">${day}</div>`;
    }

    elem.innerHTML = calendar;
}

function populateYears() {
    var yearSelect = document.getElementById('year');
    var currentYear = new Date().getFullYear();
    
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }
    
    yearSelect.value = currentYear;
}

document.getElementById('showCalendar').addEventListener('click', function() {
    var selectedYear = document.getElementById('year').value;
    var selectedMonth = document.getElementById('month').value;
    createCalendar('calendar', parseInt(selectedYear), parseInt(selectedMonth));
});

populateYears();

// Inicialização com o mês e ano atuais
var currentMonth = new Date().getMonth();
document.getElementById('month').value = currentMonth;
createCalendar('calendar', new Date().getFullYear(), currentMonth);

document.querySelector('.button-link').addEventListener('click', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do link
    // Insira aqui qualquer lógica adicional necessária
    // ...

    // Redireciona para a página
    window.location.href = this.getAttribute('href');
});

document.getElementById('addPersonForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o recarregamento da página

    var postoGraduacao = document.getElementById('postoGraduacao').value;
    var nome = document.getElementById('nome').value;
    var rg = document.getElementById('rg').value;

    // Aqui você pode adicionar o código para processar esses dados
    console.log("Posto/Graduação:", postoGraduacao, "Nome:", nome, "RG:", rg);

    // Redirecionar de volta para a tela de agendamento ou mostrar uma mensagem de sucesso
});

document.getElementById('timeSlotForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var date = document.getElementById('date').value;
    var time = document.getElementById('time').value;
    var slots = document.getElementById('slots').value;

    var appointments = JSON.parse(localStorage.getItem('appointments')) || {};
    if (!appointments[date]) {
        appointments[date] = {};
    }
    appointments[date][time] = parseInt(slots);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    alert('Horário adicionado com sucesso!');
});

function showAppointments(day) {
    var selectedYear = document.getElementById('year').value;
    var selectedMonth = document.getElementById('month').value;
    var selectedDate = new Date(selectedYear, selectedMonth, day).toISOString().split('T')[0];

    var appointments = JSON.parse(localStorage.getItem('appointments')) || {};
    var dayAppointments = appointments[selectedDate];

    if (dayAppointments) {
        var message = "Horários disponíveis:\n";
        for (var time in dayAppointments) {
            message += time + " - Vagas: " + dayAppointments[time] + "\n";
        }
        alert(message);
    } else {
        alert("Dia " + day + ": Nenhum horário marcado.");
    }
}

