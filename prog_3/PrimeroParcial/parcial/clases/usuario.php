<?php
class Usuario{
    private string $email;
    private string $clave;
    public array $usuarios;

    public function __construct($email, $clave)
    {
        $this->email = $email;
        $this->clave = $clave;
        $this->usuarios = array();      
    }

    public function ToString() : string
    {
        return $this->email . "-" . $this->clave;
    }

    public function GuardarEnArchivo()
    {
        try
        {
            $archivo = fopen("archivos/usuarios.txt", "a");
            $cantidad = fwrite($archivo, $this->ToString() . "\r\n");
            if($cantidad > 0)
            {
                echo "Se guardo exitosamente el archivo." . PHP_EOL;
            }
            else
            {
                echo "No se pudo guardar en el archivo." . PHP_EOL;
            }
            fclose($archivo);
        }
        catch(Exception $e)
        {
            echo $e->getMessage();
        }
        
    }

    public function TraerTodos()
    {
        $auxUsuarios = array();
        $archivo = fopen("archivos/usuarios.txt", "r");
            while(!feof($archivo))
            {
                $auxArch = fgets($archivo);
                $aux = explode("-", $auxArch);
                for($i = 0; $i < sizeof($aux); $i++)
                {
                    $aux[$i] = trim($aux[$i]);
                }
                if($aux[0] != ""){
                    $auxUser = new usuario($aux[0], $aux[1]);
                    array_push($auxUsuarios, $auxUser);//new usuario($auxUser->email, $auxUser->clave));
                }
            }
        fclose($archivo);
        return $auxUsuarios;
    }

    public static function VerificarExistencia($usuario)
    {
        $users = Usuario::TraerTodos();
        $retorno = false;

        foreach($users as $user)
        {
            if($user->clave == $usuario->clave && $user->email == $usuario->email)
            {
                $retorno = true;
            }
        }
        return $retorno;
    }
}
?>