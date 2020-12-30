<?php
class usuario{
    public string $email;
    public string $clave;
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

    #region Guardamos en Archivo.
    public function GuardarEnArchivo()
    {
        $archivo = fopen("archivo/users.txt", "a");
        fwrite($archivo, $this->ToString() . "\r\n");
        fclose($archivo);
    }
    #endregion

    public function AgregarUser($user)
    {
        array_push($this->usuarios, $user);
    }

    public function TraerArchivo()
    {
        $archivo = fopen("archivo/users.txt", "r");
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
                    $this->AgregarUser($auxUser);
                }
            }
        fclose($archivo);
    }

    public function Login() : bool
    {
        $retorno = false;
        $this->TraerArchivo();

        foreach($this->usuarios as $aux)
        {
            if($aux->email == $this->email && $aux->clave == $this->clave)
            {
                $retorno = true;
                break;
            }
        }
        return $retorno;
    }
}
?>