<?php

class Alimento{
	private $id;
	private $nombre;
	private $kilos;
	private $marca;
	private $descri;
		
	public function __GET ($k){
		return $this->$k;
	}
	
	public function __SET($k,$v){
		return $this->$k=$v;
	}
	public function returnArray(){
		return get_object_vars($this);
	}
}

?>