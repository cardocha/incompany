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

    public function lookup($id){
        $curso = $this->curso->get_por_id($id);
        $curso->unidades = $this->unidade->get_por_curso_id($id);
        echo json_encode($curso);
    }

    private function valida($curso, $edicao)
    {
        $validacao = parent::get_validador($curso);
        $validacao->set_rules('titulo', 'Título', 'required');
        $validacao->set_rules('categoria_id', 'Categoria Curso', 'required');
        $validacao->set_rules('nome_tutor', 'Nome do Tutor', 'required');
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
        $id = 0;
        $msg = "Curso \"".$curso->titulo."\" Removida.";

        if ($curso->id > 0) {
            $id = $this->curso->remover((array)$curso);
        } else {
            $msg = parent::get_errors();
        }

        echo parent::resposta_json($id > 0, $msg, null);
    }
}
