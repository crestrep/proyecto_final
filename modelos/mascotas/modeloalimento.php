<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once '../config/config.php';
class ModelAlimento{

	private $pdo;

	public function __CONSTRUCT() {
		try{
			$this->pdo=new PDO('mysql:host='.HOST.';dbname='.DB,USERDB,PASSDB);
			$this->pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
		}catch(Exception $e){
			die($e->getMessage());
		}
	}

	public function listar(){
		$responsearray = array();
		try{
			$result = array();
			$stm=$this->pdo->prepare("SELECT * FROM alimento");
			$stm->execute();


			
			foreach($stm->fetchALL(PDO::FETCH_OBJ) as $r){
				$alim = new Alimento();
				$alim->__SET('id',        $r->alimento_id);
				$alim->__SET('nombre',    $r->alimento_nombre);
				$alim->__SET('kilos',     $r->alimento_kilos);
				$alim->__SET('marca',     $r->alimento_marca);
				$alim->__SET('descri',    $r->alimento_descri);
				$result[] = $alim->returnArray();
			}
			$responsearray['success']=true;
			$responsearray['message']='Listado correctamente';
			$responsearray['datos']=$result;

		}catch(Exception $e){
			$responsearray['success']=false;
			$responsearray['message']='Error al listar alimentos';
		}
		return $responsearray;
	}

    public function Registrar(Alimento $data){
        $jsonresponse = array();
        try{
            $sql = "INSERT INTO alimento (alimento_nombre,
            							alimento_kilos,
            							alimento_marca,
            							alimento_descri) 
                    VALUES (?,?,?,?)";

            $this->pdo->prepare($sql)->execute(array($data->__GET('nombre'),
                                                     $data->__GET('kilos'),
                                                     $data->__GET('marca'),
                                                     $data->__GET('descri')));
            $jsonresponse['success'] = true;
            $jsonresponse['message'] = 'Alimento Ingresado correctamente'; 
        } catch (PDOException $pdoException){
            $jsonresponse['success'] = false;
            $jsonresponse['message'] = 'Error al ingresar alimento';
            $jsonresponse['errorQuery'] = $pdoException->getMessage();
        }
        return $jsonresponse;
    }

    public function Actualizar(Alimento $data){
        $jsonresponse = array();
		try{
            $sql = "UPDATE alimento SET 
                           alimento_nombre = ?,
                           alimento_kilos = ?, 
                           alimento_marca = ?,
                           alimento_descri = ?
                    WHERE  alimento_id = ? ";

            $this->pdo->prepare($sql)->execute(array($data->__GET('nombre'),
                                                     $data->__GET('kilos'),
                                                     $data->__GET('marca'),
                                                     $data->__GET('descri'),
                                                     $data->__GET('id')));
            $jsonresponse['success'] = true;
            $jsonresponse['message'] = 'Alimento actualizado correctamente';                 
        } catch (Exception $e){
            echo $e->getMessage();
            $jsonresponse['success'] = false;
            $jsonresponse['message'] = 'Error al actualizar alimento';             
        }
        return $jsonresponse;
    }

    public function Eliminar($id){
        $jsonresponse = array();
        try{
            $stm = $this->pdo->prepare("DELETE FROM alimento WHERE alimento_id = ? ");
            $stm->execute(array($id));
            $jsonresponse['success'] = true;
            $jsonresponse['message'] = 'Alimento Eliminado correctamente';              
        } catch (Exception $e){
            echo $e->getMessage();
            $jsonresponse['success'] = false;
            $jsonresponse['message'] = 'Error al eliminar alimento';
        }
        return $jsonresponse;
    }
   public function Obtener($id){
        $jsonresponse = array();
        try{
            $stm = $this->pdo->prepare("SELECT  * FROM alimento
                                		WHERE alimento_id = ? ");
            $stm->execute(array($id));
            $r = $stm->fetch(PDO::FETCH_OBJ);
				$alim = new Alimento();
					$alim->__SET('id',        $r->alimento_id);
					$alim->__SET('nombre',    $r->alimento_nombre);
					$alim->__SET('kilos',     $r->alimento_kilos);
					$alim->__SET('marca',     $r->alimento_marca);
					$alim->__SET('descri',    $r->alimento_descri);
					 
            $jsonresponse['success'] = true;
            $jsonresponse['message'] = 'Se obtuvo el alimento correctamente';
            $jsonresponse['datos'] = $alim->returnArray();
        } catch (Exception $e){
            //die($e->getMessage());
            $jsonresponse['success'] = false;
            $jsonresponse['message'] = 'Error al Obtener alimento';             
        }
        return $jsonresponse;
    }    
}

?>