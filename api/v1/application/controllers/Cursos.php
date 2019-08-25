<?php
require_once(CONTROLLERS_DIR . 'BaseController.php');

class Cursos extends BaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->load->helper('curso_helper');
        carregar_dependencias();
    }

    public function index()
    {
        $method = parent::detectar_acao();
        if ($method === "GET") {
            $resultado_query = $this->curso->get_todos('titulo');
            echo json_encode($resultado_query);
        }
    }

     protected function persistir($curso)
    {
      
    }

    protected function remover($curso)
    {
    
    }
}
