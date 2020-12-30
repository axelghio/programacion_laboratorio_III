<?php
    interface IArchivo{
        public function GuardarEnArchivo($nombreArchivo):void;
        public function TraerDeArchivo($nombreArchivo):void;
    }
?>