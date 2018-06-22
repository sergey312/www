/*
********************************************************************************
(С) Андрей Головко | www.golovko.net
--------------------------------------------------------------------------------

Глобальные переменные и функции

********************************************************************************
*/

$(document).ready(function(){
    
	// анимация в шапке
	$("#header_top").animate({fontSize:"16px" }, 800);
	$("#header_bottom").animate({fontSize:"11px" }, 800); 

 });


var UANA = new Object();

// Браузер
UANA.browser = (window.attachEvent && !window.opera) ? 'IE' : (window.opera ? 'Opera' : (navigator.userAgent.indexOf('Gecko') > -1 ? 'Gecko' : 'unknown'));
UANA.browser_ie5 = navigator.userAgent.indexOf('MSIE 5.') > -1;
UANA.browser_ie6 = navigator.userAgent.indexOf('MSIE 6.') > -1;

// Массив текстов
UANA.TXT = new Array();

/*
-------------------------------------------------------------------------------
Показать / Скрыть блок
-------------------------------------------------------------------------------
*/
function Display(block, display)
{
	block = typeof(block) == 'object' && block.style ? block : document.getElementById(block);
	if(!block || block == undefined)
	{
		return (false);
	}

	// Значение по умолчанию
	var display = display == '0' || display == '1' ? display : 'none';

	// Значения
	var displays = new Array();
	displays['TABLE'] = 'table';
	displays['TR'] = 'table-row';
	displays['TD'] = 'table-cell';
	displays['TH'] = 'table-cell';
	displays['TBODY'] = 'table-row-group';
	displays['THEAD'] = 'table-header-group';
	displays['TFOOT'] = 'table-footer-group';

	// Если спределено свойство
	if(display == '0' || display == '1')
	{
		if(UANA.browser == 'IE' || !displays[block.nodeName]) 
		{
			block.style.display = display == '1' ? 'block' : 'none';
		}
		else
		{
			block.style.display = display == '1' ? displays[block.nodeName] : 'none';
		}
		return (false);
	}	
	
	// Для отсутсвующих стилей и разных браузеров...
	if (!block.style.display)
	{
		if(block.currentStyle && block.currentStyle.display) block.style.display = block.currentStyle.display;
		else block.style.display = 'block';
	}

	if(block.style.display == 'none')
	{
		if(UANA.browser == 'IE') 
		{
			display = 'block';
		}
		else
		{
			display = displays[block.nodeName] ? displays[block.nodeName] : 'block';
		}
	}
	block.style.display = display;
	return false;
}

/*
-------------------------------------------------------------------------------
 Проверка заполнения поля формы
-------------------------------------------------------------------------------
*/
function FillField()
{
	for (var i = 0; i < FillField.arguments.length; i++)
	{
		var field = arguments[i];
		if (!field || field == undefined)
		{
			return false;
		}
		if(!field.value || !RegExp(/\S/).test(field.value))
		{
			return false;
		}
	} 
	return true;
}

/*
-------------------------------------------------------------------------------
Размер группового селекта по кол-ву его елементов
-------------------------------------------------------------------------------
*/
function FullMultipleSelect(form, select)
{
	form = document.forms[form];
	if(!form || !form.elements[select]) 
	{
		return;
	}
	form.elements[select].size=form.elements[select].length;
	return (true);
}

/*
-------------------------------------------------------------------------------
 Ометка и проверка всех чекбоксов списка
-------------------------------------------------------------------------------
*/
function CheckAll(form, field_name, status)
{
	if(!form[field_name])
	{
		return;
	}
	if(form[field_name].length && form[field_name].length > 0)
	{
		for (var i=0; i<form[field_name].length; i++) 
		{
			form[field_name][i].checked = status;
		}
	}
	else
	{
		form[field_name].checked = status;
	}
}
function ValidateCheckAll(form, field_name)
{
	if(!form[field_name])
	{
		return false;
	}
	if(form[field_name].length && form[field_name].length > 0)
	{
		for (var i=0; i<form[field_name].length; i++) 
		{
			if(form[field_name][i].checked == true)
			{
				return true;
			}
		}
	}
	else
	{
		if(form[field_name].checked == true)
		{
			return true;
		}
	}
	return false;
}

/*
-------------------------------------------------------------------------------
 Размеры области окна
-------------------------------------------------------------------------------
*/
function WindowAvailWidth()
{
	var width = window.innerWidth;
	if(width == undefined || width === 0 || isNaN(width))
	{
		width = window.document.documentElement.clientWidth;
	}
	if(width == undefined || width === 0 || isNaN(width))
	{
		width = window.document.body.clientWidth;
	}
	return width;
}
function WindowAvailHeight()
{
	var height = window.innerHeight;
	if(height == undefined || height === 0 || isNaN(height))
	{
		height = window.document.documentElement.clientWidth;
	}
	if(height == undefined || height === 0 || isNaN(height))
	{
		height = window.document.body.clientHeight;
	}
	return height;
}

/*
-------------------------------------------------------------------------------
 Функция для плейсхолдера
-------------------------------------------------------------------------------
*/
function InputPlaceHolder(field, holder_text)
{
	field = !field || !field.tagName || field.tagName != 'INPUT' ? document.getElementById(field) : field;
	if(!field || !field.tagName && field.tagName != 'INPUT')
	{
		 return;
	}

	field.onfocus = function()
	{
		if(this.value.length && this.value == holder_text) 
		{
			this.value = '';
			this.style.color = 'black';
		}
	}
	field.onblur = function()
	{
		if(!this.value.length) 
		{
			this.value = holder_text;
			this.style.color = 'gray';
		}
	}
	if(!field.value.length) 
	{
		field.onblur();
	}
	if(!field.getAttribute('placeholder')) 
	{
		field.setAttribute('placeholder', holder_text);
	}
}

/*
-------------------------------------------------------------------------------
Окошко вспомогательной информации
-------------------------------------------------------------------------------
*/
function HelpInfo(id, title)
{
	var content = document.getElementById(id);
	if(content && typeof(UANA_InnerWindow) == 'object')
	{
		UANA_InnerWindow.Create('help_info', title, content.innerHTML);
		UANA_InnerWindow.Open();
	}
	else
	{
		alert('Вспомогательная информация не найдена...');
	}
}