 <?php
    require_once './clases/AccesoDatos.php';
    
    class Usuario{

        public $correo;
        public $clave;
        public $nombre;
        public $apellido;
        public $perfil;
        public $legajo;
        public $foto;

        public static function SubirFoto($foto){
            $pathOrigen = $_FILES['foto']['tmp_name'];   
            $pathDestino = "./fotos/".date('h-m-s').'-'.$_FILES['foto']['name'];
        
            move_uploaded_file($pathOrigen, $pathDestino);    

            return $pathDestino;
        }

        #region Consultas
        public function InsertarUsuario(){
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO usuarios (correo,clave,nombre,apellido,perfil,foto,legajo) VALUES (:correo,:clave,:nombre,:apellido,:perfil,:foto,:legajo)");
            $consulta->bindValue(':correo',  $this->correo, PDO::PARAM_STR);
            $consulta->bindValue(':clave',  $this->clave, PDO::PARAM_STR);
            $consulta->bindValue(':nombre', $this->nombre, PDO::PARAM_STR);
            $consulta->bindValue(':apellido',  $this->apellido, PDO::PARAM_STR);
            $consulta->bindValue(':perfil',  $this->perfil, PDO::PARAM_STR);
            $consulta->bindValue(':legajo',  $this->legajo, PDO::PARAM_STR);
            $consulta->bindValue(':foto', $this->foto);

            return $consulta->execute();
        }

        public function TraerTodos(){
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
            $consulta = $objetoAccesoDato->RetornarConsulta('SELECT * FROM usuarios');
            $consulta->execute(); 
            return $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");
        }


        #endregion

        #region Api
        public function CargarUno($request, $response, $args){
            
            $objDelaRespuesta= new stdclass();
            $usu = json_decode($_POST['usu']);
            $file = $_FILES['foto'];
            
            $usuario = new Usuario();
            $path = Usuario::SubirFoto($file);
            $usuario->nombre=$usu->nombre;
            $usuario->apellido=$usu->apellido;
            $usuario->correo=$usu->correo;
            $usuario->clave=$usu->clave;
            $usuario->perfil=$usu->perfil;
            $usuario->legajo = $usu->legajo;
            $usuario->foto=$path;

            if($usuario->InsertarUsuario()){
                $objDelaRespuesta->ok=true;   
            }  
            else{
                $objDelaRespuesta->ok=false;   
            }

            return $response->withJson($objDelaRespuesta, 200);
        }

        public function Listado($request, $response, $args){
            $listado = Usuario::TraerTodos();
            $json = new stdClass;
            $json->listado = $listado;
            $json->ok = true;
            return  $response->withJson($json, 200);
        }
    }