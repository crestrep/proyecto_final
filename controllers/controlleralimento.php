<?php
	require_once '../modelos/mascotas/modeloalimento.php';
	require_once '../modelos/mascotas/entidadalimento.php';

	$modelalimento= new ModelAlimento();

	if(isset($_REQUEST['Accion'])){
		switch($_REQUEST['Accion']){


		case 'listar':
				$jsondata=$modelalimento->listar();
				header('Content-type: application/json; charset=utf-8');
				echo json_encode($jsondata);
				break;
		
        case 'registrar':
        	$alim=new Alimento();
	            $alim->__SET('nombre',     $_REQUEST['aliNombre']);
	            $alim->__SET('kilos',      $_REQUEST['aliKilos']);
	            $alim->__SET('marca',      $_REQUEST['aliMarca']);
	            $alim->__SET('descri',     $_REQUEST['aliDescri']);
	        $jsondata = $modelalimento->Registrar($alim);
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($jsondata);
            break;

     	case 'actualizar':
		  		$alim=new Alimento();
	            $alim->__SET('id',      	$_REQUEST['aliId']);
	            $alim->__SET('nombre',      $_REQUEST['aliNombre']);
	            $alim->__SET('kilos',    	$_REQUEST['aliKilos']);
	            $alim->__SET('marca',  		$_REQUEST['aliMarca']);
	            $alim->__SET('descri',		$_REQUEST['aliDescri']);
	        $jsondata = $modelalimento->Actualizar($alim);
            header('Content-type: application/json; charset=utf-8');
			echo json_encode($jsondata);
            break;
        case 'eliminar':
            $jsondata = $modelalimento->Eliminar($_REQUEST['aliId']);
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($jsondata);
            break;

        case 'obtener':
            $jsondata = $modelalimento->Obtener($_REQUEST['aliId']);
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($jsondata);            
            break;		
	}
}

?>