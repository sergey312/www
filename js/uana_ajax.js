/*
********************************************************************************
(С) Андрей Головко | www.golovko.net
--------------------------------------------------------------------------------

AJAX

********************************************************************************
*/

var UANA_Ajax = new Object();

// Сообщения об ошибках
UANA_Ajax.error_message = new Array();
UANA_Ajax.error_message['block_not_found'] = 'AJAX ERROR: Блок не найден!';
UANA_Ajax.error_message['xmlhttp'] = 'AJAX ERROR: Ошибка запроса XMLHTTP!';
UANA_Ajax.error_message['request_status'] = 'AJAX ERROR: Ошибка ответа сервера!';

// Старт запроса
UANA_Ajax.start = false;

// URL запроса
UANA_Ajax.url = '';

// Режим запроса
UANA_Ajax.mode = '';

// Обновляемый блок
UANA_Ajax.block = false;
UANA_Ajax.block_id = '';

// ----------------------------------------------------------------------------
// Алерт
// ----------------------------------------------------------------------------
UANA_Ajax.Alert = function(url)
{
	// Отправляем запрос
	this.url = url;
	this.mode = 'alert';
	this.Request();
	return;
};

// ----------------------------------------------------------------------------
// Апдейт
// ----------------------------------------------------------------------------
UANA_Ajax.Update = function(block, url)
{
	// Может быть сам блок или ID блока
	this.block = !block || !block.tagName ? document.getElementById(block) : block;
	if(!this.block || !this.block.tagName)
	{
		alert(this.error_message['block_not_found']);
		return;
	}

	// Если у блока есть ID - запоминаем
	this.block_id = this.block.id ? this.block.id : false;
	
	// Отправляем запрос
	this.url = url;
	this.mode = 'update';
	this.Request();
	return;
};

// ----------------------------------------------------------------------------
// Запрос
// ----------------------------------------------------------------------------
UANA_Ajax.Request = function()
{
	var http_request = false;

	// Для мозилы
	if (window.XMLHttpRequest) 
	{
		http_request = new XMLHttpRequest();
		
		// Если ответ сервера - XML документ
		//if (http_request.overrideMimeType) http_request.overrideMimeType('text/xml');
	}

	// Для ИЕ
	else if (window.ActiveXObject) 
	{
		try {http_request = new ActiveXObject("Msxml2.XMLHTTP");} 
		catch (e) 
		{
			try {http_request = new ActiveXObject("Microsoft.XMLHTTP");}
			catch (e) {}
		}
	}

	// Проверяем готовность к отправке запроса
	if (!http_request) 
	{
		alert(this.error_message['xmlhttp']);
		this.start = false;
		return;
	}
	
	// Обработчик ответа
	http_request.onreadystatechange = function() 
	{
		if (http_request.readyState == 4) 
		{
			if (http_request.status == 200)
			{
				// Если сервер возвращает страницу с ошибкой -> алерт!
				if(http_request.responseText.substr(0, 5) == 'ERROR')
				{
					alert(http_request.responseText);
				}
				else
				{
					// Алерт
					if(UANA_Ajax.mode == 'alert') 
					{
						alert(http_request.responseText);
					}
					
					// Обновление блока
					else if(UANA_Ajax.mode == 'update' && UANA_Ajax.block) 
					{
						UANA_Ajax.block.innerHTML = http_request.responseText;
					}
				}
			} 
			else 
			{
				alert(UANA_Ajax.error_message['request_status']+"\n"+'Status: '+http_request.status+"\n"+'URL: '+UANA_Ajax.url);
			}
			
			// Финиш запроса
			UANA_Ajax.start = false;					
			return;
		}
	};

	// Отправка запроса
	this.start = true;
	http_request.open('GET', this.url, true);
	http_request.send(null);
};