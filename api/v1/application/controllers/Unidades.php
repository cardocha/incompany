<?php
require_once(CONTROLLERS_DIR . 'BaseController.php');

class Unidades extends BaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->load->helper('unidade_helper');
        carregar_dependencias();
    }

    public function index()
    {
        $method = parent::detectar_acao();
        if ($method === "GET") {
            $resultado_query = $this->unidade->get_todos('titulo');
            echo json_encode($resultado_query);
        }
    }

    public function lookup($curso_id){
        $method = parent::detectar_acao();
        if ($method === "GET") {
            $resultado_query = $this->unidade->get_por_curso_id($curso_id);
            $unidades = [];
            foreach($resultado_query as $unidade){
               $unidade->materiais = $this->material->get_por_unidade_id($unidade->id);
               $unidades[] = $unidade;
            }
            echo json_encode($unidades);
        }
    }

    private function valida($unidade, $edicao)
    {
        $validacao = parent::get_validador($unidade);
        $validacao->set_rules('titulo', 'Título', 'required');
        $validacao->set_rules('curso_id', 'Curso', 'required');
        if ($edicao) {
            $validacao->set_rules('id', 'Identificação', 'is_natural_no_zero');
        }
        return $validacao->run();
    }

    protected function persistir($unidade)
    {
        $id = 0;
        $validacao = $this->valida((array) $unidade, false);
        $msg = "Unidade Salva.";

        if ($validacao) {
            $id = $this->unidade->persistir((array)$unidade);
        } else {
            $msg = parent::get_errors();
        }
        
        echo parent::resposta_json($id > 0, $msg, null);
    }

    protected function remover($unidade)
    {
        $id = 0;
        $validacao = $this->valida((array) $unidade, true);
        $possui_materiais = $this->unidade->possui_materiais_vinculados($unidade->id);
        $msg = "Unidade \"".$unidade->titulo."\" Removida.";

        if (!$possui_materiais) {
            if ($validacao) {
                $id = $this->unidade->remover((array)$unidade);
            } else {
                $msg = parent::get_errors();
            }
        }
        else
             $msg = "Unidade \"".$unidade->titulo."\" possui materiais vinculados";

        echo parent::resposta_json($id > 0, $msg, null);
    }

    public function get_curso_selecionado() {
        return parent::get_dados();
    }
}
