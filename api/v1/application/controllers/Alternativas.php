<?php
require_once(CONTROLLERS_DIR . 'BaseController.php');

class Alternativas extends BaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->load->helper('alternativa_helper');
        carregar_dependencias();
    }

    public function index()
    {
        $method = parent::detectar_acao();
        if ($method === "GET") {
            $resultado_query = $this->categoria->get_todos('ordem');
            echo json_encode($resultado_query);
        }
    }

    public function atualizar(){
        $post = parent::get_dados();
        if(isset($post->data->questaoId) && isset($post->data->alternativaId)){
           $questao = $post->data->questaoId;
           $alternativa = $post->data->alternativaId;

           $this->alternativa->set_todas_alternativas_incorretas($questao);
           $this->alternativa->set_alternativa_correta($alternativa); 
            echo parent::resposta_json(true, "Reposta Salva", null);
        }
        else
          echo parent::resposta_json(false, "Falta a questão e a alternativa", null);

    }

    private function valida($alternativa, $edicao)
    {
        $validacao = parent::get_validador($alternativa);
        $validacao->set_rules('texto', 'Descrição', 'required');
        $validacao->set_rules('questao_id', 'Questão', 'required');
        $validacao->set_rules('ordem', 'Ordem', 'required');
       
        if ($edicao) {
            $validacao->set_rules('id', 'Identificação', 'is_natural_no_zero');
        }
        return $validacao->run();
    }

    public function lookup($questaoId){
        $method = parent::detectar_acao();
        if ($method === "GET") {
            $alternativas = $this->alternativa->get_por_questao_id($questaoId);
            echo json_encode($alternativas);
        }
    }

    protected function persistir($alternativa)
    {
        $id = 0;
        $validacao = $this->valida((array) $alternativa, false);
        $msg = "Alternativa Salva.";

        if(!isset($alternativa->correta))
            $alternativa->correta = false;

        if ($validacao) {
            $id = $this->alternativa->persistir((array)$alternativa);
        } else {
            $msg = parent::get_errors();
        }
        
        echo parent::resposta_json($id > 0, $msg, null);
    }

    protected function remover($alternativa)
    {
        $id = 0;
        $validacao = $alternativa->id > 0;
        $msg = "Alternativa Removida.";

        if ($validacao) {
            $id = $this->alternativa->remover((array)$alternativa);
        } else {
            $msg = parent::get_errors();
        }

        echo parent::resposta_json($id > 0, $msg, null);
    }

}
