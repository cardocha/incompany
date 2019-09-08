<?php
require_once(CONTROLLERS_DIR . 'BaseController.php');

class Tags extends BaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->load->helper('tag_helper');
        $this->load->library('form_validation');
        $this->load->model('tag');
    }

    public function index()
    {
        $method = parent::detectar_acao();
        if ($method === "GET") {
            $resultado_query = $this->tag->get_todos('descricao');
            echo json_encode($resultado_query);
        }
    }

    public function lookup($curso_id)
    {
        $method = parent::detectar_acao();
        if ($method === "GET") {
            $resultado_query = $this->tag->get_por_curso_id($curso_id);
            echo json_encode($resultado_query);
        }
    }

    private function valida($categoria, $edicao)
    {
        $validacao = parent::get_validador($categoria);
        $validacao->set_rules('descricao', 'Descrição', 'required');
        $validacao->set_rules('curso_id', 'Curso da Tag', 'required');
        if ($edicao) {
            $validacao->set_rules('id', 'Identificação', 'is_natural_no_zero');
        }
        return $validacao->run();
    }

    protected function persistir($tag)
    {
        $id = 0;
        $validacao = $this->valida((array) $tag, false);
        $msg = "Tag Salva.";

        if ($validacao) {
            $id = $this->tag->persistir((array)$tag);
        } else {
            $msg = parent::get_errors();
        }
        
        echo parent::resposta_json($id > 0, $msg, null);
    }

    protected function remover($tag)
    {
        $id = 0;
        $validacao = $this->valida((array) $tag, true);
        $msg = "Tag \"".$tag->descricao."\" Removida.";

        if ($validacao) {
            $id = $this->tag->remover((array)$tag);
        } else {
            $msg = parent::get_errors();
        }

        if ($id === FALSE)
           $msg = "Esta Tag possui dados vinculados.";

        echo parent::resposta_json($id > 0, $msg, null);
    }
}
