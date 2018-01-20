<?php
header('Access-Control-Allow-Origin: *');
	require_once '../modelos/entidadcuerpoceleste.php';
	require_once '../modelos/modelocuerpoceleste.php';

	$modelcc= new ModelCuerpoCeleste();

	if(isset($_REQUEST['Accion'])){
		switch($_REQUEST['Accion']){

		case 'listar':
				$jsondata=$modelcc->listar();
				//var_dump($jsondata);
				header('Content-type: application/json; charset=utf-8');
				echo json_encode($jsondata);
				break;

        case 'obtener':
            $jsondata = $modelcc->Obtener($_REQUEST['ccId']);
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($jsondata);            
            break;		
  	}
}

?>