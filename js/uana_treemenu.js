/*
********************************************************************************
(С) Андрей Головко | www.golovko.net
--------------------------------------------------------------------------------

Дерево меню

********************************************************************************
*/

var UANA_TreeMenu = new Object();

/*
-------------------------------------------------------------------------------
Загрузка меню
-------------------------------------------------------------------------------
*/
UANA_TreeMenu.Load = function(alias)
{
	alias = typeof(alias) == 'string' && alias != '' ? alias.split('/') : new Array();
	var parent_id =	0;
	var parent_ol;

	// Открываем всё по алиасу...
	for (var i=0; i < alias.length; i++)
	{
		parent_ol = document.getElementById('ol_'+parent_id);
		if(parent_ol)
		{
			for(var j = 0; j < parent_ol.childNodes.length; j++)
			{
				if(parent_ol.childNodes[j].nodeName == 'LI' && parent_ol.childNodes[j].title == alias[i])
				{
					parent_id = parent_ol.childNodes[j].id.substr(15);
					UANA_TreeMenu.Tree(parent_id);
					break;
				}
			}
		}
	}
};

/*
-------------------------------------------------------------------------------
Открытие / Закрытие ветки
-------------------------------------------------------------------------------
*/
UANA_TreeMenu.Tree = function(id)
{
	var parent_ol = document.getElementById('ol_'+id);
	var parent_icon = document.getElementById('tree_menu_icon_'+id);
	if(parent_icon && parent_ol)
	{
		// Закрываем если открыто
		if(parent_icon.className && parent_icon.className == "parent_opened")
		{
			parent_icon.className = "parent";
			for(var i = 0; i < parent_ol.childNodes.length; i++)
			{
				if(parent_ol.childNodes[i].nodeName == 'LI')
				{
					parent_ol.childNodes[i].style.display = 'none';
				}
			}
		}
		
		// Открываем если закрыто
		else
		{
			parent_icon.className = "parent_opened";
			for(var i = 0; i < parent_ol.childNodes.length; i++)
			{
				if(parent_ol.childNodes[i].nodeName == 'LI')
				{
					parent_ol.childNodes[i].style.display = 'block';
				}
			}
		}
	}
};