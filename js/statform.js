/*
********************************************************************************
(С) Андрей Головко | www.golovko.net
--------------------------------------------------------------------------------

Специально, блять для Пушкина!
Шобы, его бляцкая форма авторизации сабмитилась в обход невьебезной защиты!

********************************************************************************
*/
var StatForm = new Object;

// Форма
StatForm.form = false;

// Таблица с полями формы
StatForm.form_table = false;

// Скрытый блок для данных извне
StatForm.hidden_div = false;

// Таймер
StatForm.loading_timer = false;

/*
-------------------------------------------------------------------------------
Создание окна
-------------------------------------------------------------------------------
*/
StatForm.Go = function(form)
{
	
	// Форма
	this.form = form;
	
	// Скрываем форму, показываем загрузку
	this.table = document.getElementById('stat_form_table');
	if(this.table)
	{
		this.table.style.visibility = 'hidden';
	}

	// Вставляем содержание Аяксом
	this.hidden_div = document.getElementById('hidden_div');

	
	if(this.hidden_div && typeof(UANA_Ajax))
	{
		UANA_Ajax.Update('hidden_div', './pautina_stat.php');
	}
	
	// Проверяем окончание загрузки аякса
	if(typeof(UANA_Ajax) && UANA_Ajax.start == true)
	{
		this.loading_timer = window.setInterval(this.Action, 500);
	}
	else
	{
	   this.loading_timer = false;
	   this.Action();
	}

	return (false);	
}

StatForm.Action = function()
{
	// Если аякс еще не закончился - назад...
	if(typeof(UANA_Ajax) && UANA_Ajax.start == true)
	{
		return;
	}

	// Обнуляем таймер
	clearInterval(StatForm.loading_timer);

	// Злоебучая переменная
	var ses = StatForm.hidden_div.innerHTML;

	// Очищаем блок
	StatForm.hidden_div.innerHTML = '';

	// Убираем загрузку
	if(StatForm.table)
	{
		StatForm.table.style.visibility = 'visible';
	}

	// Готовим форму и сабмитим её
	StatForm.form.ses.value = ses;
	StatForm.form.pp.value = hex_md5(StatForm.form.ses.value+" "+StatForm.form.pp.value);	
	StatForm.form.submit();
}