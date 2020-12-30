<?php
require_once "IParte3.php";
require_once "IParte2.php";
require_once "IParte4.php";

class Televisor implements IParte2
{
    public $tipo;
    public $precio;
    public $paisOrigen;
    public $path;

    public function __construct($tipo = null, $precio = null, $paisOrigen = null, $path = null)
    {
        $this->tipo = $tipo;
        $this->precio = $precio;
        $this->paisOrigen = $paisOrigen;
        $this->path = $path;
    }

    public function ToString()
    {
        return $this->tipo . "-" . $this->precio . "-" . $this->paisOrigen . "-" . $this->path;
    }


    public function Agregar()
    {
        $usuario='root';
        $clave='310393';
        $objetoAccesoDato = new PDO('mysql:host=localhost;dbname=productos_bd;charset=utf8', $usuario, $clave);

        $consulta = $objetoAccesoDato->prepare("INSERT INTO televisores (tipo, precio, pais, foto) VALUES (:tipo, :precio, :pais, :foto)"); 

        $consulta->bindValue(":tipo", $this->tipo);
        $consulta->bindValue(":precio", $this->precio);
        $consulta->bindValue(":pais", $this->paisOrigen);

        if($this->path != null)
        {
            $consulta->bindValue(":foto", $this->path);
        }
        else
        {
            $consulta->bindValue(":foto", " ");
        }
        
        $validacion = $consulta->execute();

        return $validacion;
    }

    public function Traer()
    {
        $usuario='root';
        $clave='310393';
        $objetoAccesoDato = new PDO('mysql:host=localhost;dbname=productos_bd;charset=utf8', $usuario, $clave);

        $consulta = $objetoAccesoDato->prepare("SELECT * FROM televisores");
        
        $consulta->execute();

        $consulta->setFetchMode(PDO::FETCH_INTO, new Televisor);

        return $consulta;
        
    }

    public function CalcularIVA()
    {
        return $this->precio * 1.21;
    }

    public function Modificar($id)
    {
        $usuario='root';
        $clave='310393';
        $objetoAccesoDato = new PDO('mysql:host=localhost;dbname=productos_bd;charset=utf8', $usuario, $clave);

        $consulta =$objetoAccesoDato->prepare("UPDATE televisores SET tipo=:tipo,precio=:precio,pais=:pais,foto=:foto WHERE id=:id");

        $consulta->bindValue(':id',$id);
        $consulta->bindValue(':tipo', $this->tipo);
        $consulta->bindValue(':precio', $this->precio);
        $consulta->bindValue(':pais', $this->paisOrigen);
        $consulta->bindValue(':foto', $this->path);
    
        $consulta->execute();
        
        $validacion = false;

        if($consulta->rowCount() > 0)
        {
            $validacion = true;
        }
        
        return $validacion;   
    }

    public function Eliminar()
    {
        $usuario='root';
        $clave='310393';
        $objetoAccesoDato = new PDO('mysql:host=localhost;dbname=productos_bd;charset=utf8', $usuario, $clave);
        $consulta = $objetoAccesoDato->prepare("DELETE FROM televisores WHERE tipo=:tipo");
        $consulta->bindValue(':tipo', $this->tipo);
        $consulta->execute();
        $validacion = false;

        if($consulta->rowCount() > 0)
        {
            $validacion = true;
        }
        
        return $validacion;
    }

    public function ExisteEnBD()
    {
        $usuario='root';
        $clave='310393';
        $objetoAccesoDato = new PDO('mysql:host=localhost;dbname=productos_bd;charset=utf8', $usuario, $clave);
        
        $consulta =$objetoAccesoDato->prepare("SELECT tipo, precio, pais FROM televisores WHERE tipo=:tipo");

        $consulta->bindValue(':tipo', $this->tipo);

        $validacion = $consulta->execute();
        
        return $validacion;
        
    }

    public function Filtrar()
    {
        $usuario='root';
        $clave='310393';
        $objetoAccesoDato = new PDO('mysql:host=localhost;dbname=productos_bd;charset=utf8', $usuario, $clave);
        
        if(isset($this->tipo) && isset($this->paisOrigen) == false)
        {
            $consulta =$objetoAccesoDato->prepare("SELECT tipo, precio, pais, foto as 'path' FROM televisores WHERE tipo=:tipo");
            $consulta->bindValue(':tipo', $this->tipo);
        }
        else if(isset($this->tipo) == false && isset($this->paisOrigen))
        {
            $consulta =$objetoAccesoDato->prepare("SELECT tipo, precio, pais, foto as 'path' FROM televisores WHERE pais=:pais");
            $consulta->bindValue(':pais', $this->paisOrigen);
        }
        else if(isset($this->tipo) && isset($this->paisOrigen))
        {
            $consulta =$objetoAccesoDato->prepare("SELECT tipo, precio, pais, foto as 'path' FROM televisores WHERE (tipo=:tipo AND pais=:pais )");
            $consulta->bindValue(':tipo', $this->tipo);
            $consulta->bindValue(':pais', $this->paisOrigen);
        }
        else
        {
            $consulta = $objetoAccesoDato->prepare("SELECT tipo, precio, pais, foto as 'path' FROM televisores");
        }

        $consulta->execute();

        $consulta->setFetchMode(PDO::FETCH_INTO, new Televisor);


        return $consulta;
    }
    
}