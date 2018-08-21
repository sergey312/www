<?php


class Db
{
    protected $db;

    public function __construct()
    {
        // $config = require "db1.php";
        $this->db = new PDO('mysql:dbname=localhost;host=accounts,root,password');
    }

    public function query($quety){
        $st=$this->db->prepare ($quety);
        if($st->execute()) {
            return $st->fetchAll (PDO::FETCH_ASSOC);
        }
        return false;
    }
}