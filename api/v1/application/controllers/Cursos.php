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

    private function valida($curso, $edicao)
    {
        $validacao = parent::get_validador($curso);
        $validacao->set_rules('titulo', 'Título', 'required');
        $validacao->set_rules('categoria_id', 'Categoria Curso', 'required');
        $validacao->set_rules('nomeTutor', 'Nome do Tutor', 'required');
        if ($edicao) {
            $validacao->set_rules('id', 'Identificação', 'is_natural_no_zero');
        }
        return $validacao->run();
    }

    protected function persistir($curso)
    {
        $id = 0;
        $validacao = $this->valida((array) $curso, false);
        $msg = "Curso Salvo.";
        
        if ($validacao) {
            $id = $this->curso->persistir((array) $curso);
        } else {
            $msg = parent::get_errors();
        }
        
        echo parent::resposta_json($id > 0, $msg, null); 
    }

    protected function remover($curso)
    {
    
    }
}
