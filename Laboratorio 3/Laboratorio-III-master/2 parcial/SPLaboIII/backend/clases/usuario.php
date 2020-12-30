 <?php
    require_once './clases/AccesoDatos.php';
    require_once './clases/AutentificadorJWT.php';

    
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
            $consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO usuarios (correo,clave,nombre,apellido,perfil,foto) VALUES (:correo,:clave,:nombre,:apellido,:perfil,:foto)");
            $consulta->bindValue(':correo',  $this->correo, PDO::PARAM_STR);
            $consulta->bindValue(':clave',  $this->clave, PDO::PARAM_STR);
            $consulta->bindValue(':nombre', $this->nombre, PDO::PARAM_STR);
            $consulta->bindValue(':apellido',  $this->apellido, PDO::PARAM_STR);
            $consulta->bindValue(':perfil',  $this->perfil, PDO::PARAM_STR);
            $consulta->bindValue(':foto', $this->foto);

            return $consulta->execute();
        }

        public function TraerTodos(){
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
            $consulta = $objetoAccesoDato->RetornarConsulta('SELECT * FROM usuarios');
            $consulta->execute(); 
            return $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");
        }
        public function TraerUno($consulta='SELECT * FROM usuarios'){
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
            $consulta = $objetoAccesoDato->RetornarConsulta($consulta);
            $consulta->execute();
            $retorno = new stdClass();
            $retorno->usuario = $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");
            $retorno->row = $consulta->rowCount(); 
            return $retorno;
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

        public function Validar($request, $response, $args){
            $correo = $_POST['correo'];
            $respuesta = new stdClass();
            $respuesta->ok = false;

            $dato = Usuario::TraerUno("SELECT * FROM usuarios WHERE (correo='$correo')");            

            if($dato->row > 0){
                $respuesta->ok = true;             
            }
           
            return $response->withJson($respuesta, 200);
        }

        public function Login($request, $response, $args){
            $correo = $_POST['correo'];
            $clave = $_POST['clave'];
            $respuesta = new stdClass();
            $respuesta->ok = false;

            $dato = Usuario::TraerUno("SELECT * FROM usuarios WHERE (correo='$correo' AND clave='$clave')");            

            if($dato->row > 0){
                $usuario = $dato->usuario;
                $respuesta->ok = true;          
                $json = new stdClass();
                $json->correo = $usuario[0]->correo;
                $json->nombre = $usuario[0]->nombre;
                $json->apellido = $usuario[0]->apellido;
                $json->perfil = $usuario[0]->perfil;
                
    
                $jwt = AutentificadorJWT::CrearToken($json);
                $respuesta->jwt = $jwt;   
            }
           
            return $response->withJson($respuesta, 200);
        }

        public function Tabla($request, $response, $args){
            $perfil = $request->getHeader('perfil');
            $listado = Usuario::TraerTodos();
            $json = new stdClass;
            $tabla = "<table id='tableUsers' class='table table-bordered table-hover'><thead><tr class='info'><td>Correo</td><td>Nombre</td><td>Apellido</td><td>Perfil</td><td>Foto</td></tr></thead><tbody>";
            foreach($listado as $usu){
                $tabla.="<tr><td>$usu->correo</td><td>$usu->nombre</td><td>$usu->apellido</td><td>$usu->perfil</td>";
                if($perfil[0] == 'empleado'){
                    $tabla.="<td><img class='img-rounded' src='./backend/$usu->foto' height=50px width=50px></td></tr>";
                }
                else if($perfil[0] == 'encargado'){
                    $tabla.="<td><img class='img-thumbnail' src='./backend/$usu->foto' height=50px width=50px></td></tr>";    
                }
                else if($perfil[0] == 'propietario'){
                    $tabla.="<td><img  src='./backend/$usu->foto' height=50px width=50px></td></tr>";
                }
            }

            $tabla.="</tbody></table>";
            $json->ok = isset($tabla) ? true:false;
            $json->tabla = $tabla;

            return $response->withJson($json, 200);
        }

        public static function VerificarToken($request, $response, $args){
            $arrayConToken = $request->getHeader('token');
            $token=$arrayConToken[0];	
            $respuesta = new stdClass();
            $respuesta->ok = false;
                    
            try {
                AutentificadorJWT::VerificarToken($token);
                $respuesta->ok = true;
                $usuario = AutentificadorJWT::ObtenerData($token);
                $respuesta->perfil = $usuario->perfil;
                $respuesta->mensaje = "El token es valido";
            } 
            catch (Exception $e) {
                $respuesta->mensaje = $e->getMessage();           
            }

            return $response->withJson($respuesta, 200);
        }
    }
    