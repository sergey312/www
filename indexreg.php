<html xmlns="https://www.w3.org/1999/xhtml"><head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
	<title>НАН</title>
	<base href="http://nun.com">
	<link rel="icon" type="image/x-icon" href="/favicon.ico">
	<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
	<link rel="stylesheet" type="text/css" media="all" href="http://nun.com/css/style.css">
	<link rel="stylesheet" type="text/css" media="all" href="http://nun.com/css/gui.css">
	<link rel="stylesheet" type="text/css" media="all" href="http://nun.com/files/prot.css">
	<!--[if IE]><link rel="stylesheet" type="text/css" media="all" href="/css/ie.css?1"><![endif]-->
	<script type="text/javascript" async="" src="https://www.gstatic.com/recaptcha/api2/v1528855115741/recaptcha__ru.js"></script><script async="" src="//www.google-analytics.com/analytics.js"></script><script type="text/javascript" src="js/jquery.js"></script>


	<script src="https://www.google.com/recaptcha/api.js"></script>
	<?php
	require 'Db.php';
	//$ndb = new Db();
	$con = mysql_connect('localhost','root','');
			if (!$con) {
					echo "Ошибка подключения к серверу MySQL";
					exit;
					}
				$db=mysql_select_db("accounts");
				$q = mysql_query("Select * from `account`");
	$data = $_POST;
	if( isset($data['do_signup']) )
	{
		$errors = array();
		if (trim($data['login']) == '' )
		{
			$errors[] = 'Ведите логин!';
		}

		if (trim($data['email']) == '' )
		{
			$errors[] = 'Ведите email!';
		}

		if (trim($data['password']) == '' )
		{
			$errors[] = 'Ведите password!';
		}

		if (trim($data['password_2']) != $data['password'] )
		{
			$errors[] = 'Повторний пароль веден неверно!';
		}

		if( empty($errors))
		{
			$q = mysql_query("insert account(`name`,`pass`,`email`) value('".$_POST['login']."','".$_POST['password']."','".$_POST['email']."')");
				
			

		echo '<div style="color:red;">Вы успішно Зареєструвались</div><hr>';

		}
		else 
		{
		echo '<div style="color:red;">'.array_shift($errors).'</div><hr>';
		}

	}
	
	?>


</head>
<body>

<!--//
<div align=center><img src="https://pautina.ua/files/baners/ukraine_internet-ua-ix.jpg" alt="ukraine" width="" height="" /></div>
//-->
<div id="header_top" style="font-size: 16px;">NATIONAL UNKRANIAN NETWORK</div>
<div id="clipart" >
	<a href="/" id="logo"></a></td>
	<table cellpadding="0" cellspacing="0" style="width:900px; margin:auto;">
		<tbody><tr>
			<td>
				<td>

				</td>
			</tr>
		</tbody></table>
	</div>

	<div style="border-top:1px solid #999"></div>

	<table cellpadding="0" cellspacing="0" id="body">
		<tbody><tr>
			<td id="td_menu"><div id="menu">
				<div class="block_title"><a href="/">nun.com</a></div>
				<a id="home_link" href="index.php">Головна сторінка</a> 
				<div id="tree_menu">
					<ol id="ol_0">
						<li class="parent_0" id="tree_menu_page_4">
							<a class="page" id="tree_menu_icon_4" href="http://nun.com/indexlk.php" onclick="this.blur()"></a>
							<a class="title" id="tree_menu_title_4" href="http://nun.com/indexlk.php" onclick="this.blur()">Особистий кабінет</a></li>
						<li class="parent_0" id="tree_menu_page_4">
							<a class="page" id="tree_menu_icon_4" href="http://nun.com/indexreg.php" onclick="this.blur()"></a>
							<a class="title" id="tree_menu_title_4" href="http://nun.com/indexreg.php" onclick="this.blur()">Реєстація</a></li>
						<li class="parent_0" id="tree_menu_page_41">
							<a class="page" id="tree_menu_icon_41" href="http://nun.com/indexprice.html" onclick="this.blur()"></a>
							<a class="title" id="tree_menu_title_41" href="http://nun.com/indexprice.html" onclick="this.blur()">Інтернет тарифи</a></li>
						<li class="parent_0" id="tree_menu_page_39">
							<a class="page" id="tree_menu_icon_39" href="http://nun.com/indexfeedback.php" onclick="this.blur()"></a>
							<a class="title" id="tree_menu_title_39" href="http://nun.com/indexfeedback.php" onclick="this.blur()">Зворотній зв&#039;язок</a>
					</ol>
				</div></td>
							<td id="td_content">
							<form action="indexreg.php" method="POST">
								<p>
									<p><strong>Ваш логин</strong>:</p>
									<input type="text" name="login">
								</p>
								<p>	
									<p><strong>Ваш Email</strong></p>
									<input type="email" name="email">
								</p>
								<p>
									<p><strong>Ваш пароль</strong></p>
									<input type="password" name="password">
								</p>
								<p>
									<p><strong>Ведите пароль еще раз</strong></p>
									<input type="password" name="password_2">
								</p>
								<p>
									<input type="submit" name="do_signup">Зареєструватись</input>
								</p>
							</form>
								
							</td></tr>
		</tbody>
	</table>
							<div id="footer">
								© <a onclick="this.target='_blank'" href="https://nun.com">Національна українська мережа</a><br>
							</div>

						</body></html>